const MongooseHelpers = require('../helpers/mongoose');
const User = require('../models/user');
const config = require('../config/dev');
const jwt = require('jsonwebtoken');
exports.auth = function(req, res){
    const { email, password } = req.body;
    if(!password || !email){
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Please provide email and password'}]});
    }
    User.findOne({email}, function(err,user){
        if(err){
            return res.status(422).send({errors: MongooseHelpers.normalizeErrors(err.errors)
            });
        }
        if(!user){
            return res.status(422).send({errors: [{title:'Invalid user!', detail: 'User does not exist!'}]});
        }
        if(user.hasSamePassword(password)){
           const token =  jwt.sign({
               userid : user.id,
               username : user.username
           },
           config.SECRET, {expiresIn: '1h'}
           );
           return res.json(token);
        }
        else{
            return res.status(422).send({errors: [{title:'Wrong Data!', detail: 'Wrong email or password!'}]});
        }
    });
   
    
}

exports.register = function(req, res){
    // const username = req.body.username;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirmation = req.body.passwordConfirmation;
    const {username, email, password, passwordConfirmation } = req.body;
    if(!email || !password){
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Please provide email and password'}]});
    }
    if(password !== passwordConfirmation){
       return res.status(422).send({errors: [{title:'Password inccorect!', detail: 'Passwords are not matching!'}]});
    }
    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({
                errors: MongooseHelpers.normalizeErrors(err.errors)
            });
        }
        if(existingUser){
            return res.status(422).send({errors: [{title: 'User exist!', detail: 'User already exist!'}]});

        }
        const user = new User({
            username,
            email,
            password
        });
        user.save(function(err){
            if(err){
            return res.status(422).send(function(err){
                if(err){
                    return res.status(422).send({
                        errors: MongooseHelpers.normalizeErrors(err.errors)
                    });
                }
            });
            }
            return res.json({'registered': true});
        })
    })    
}

exports.authMiddleware = function(req,res,next){
    const token= req.header.authorization;
    if(token){
        const user = parseToken(token);
        user.findById(user.userid, function(err,user){
            if(err){
                return res.status(422).send({
                    errors: MongooseHelpers.normalizeErrors(err.errors)
                });
            }
            if(user){
                return res.status(422).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});
            }
            else{
                return res.status(422).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access!'}]});

            }
        })
    }
}
function parseToken(token){
    return jwt.verify(token.split(' ')[1], config.SECRET);
}