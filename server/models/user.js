const bcrypt = require ('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
        required:true, 
        min:[8, 'Too short'], 
        max:[32, 'Too long']},
    email: {
        type: String, 
        min:[8, 'Too short'], 
        max:[32, 'Too long'], 
        required: 'Email is required', 
        lowercase: true, 
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String, 
        min:[4, 'Too short'], 
        max:[32, 'Too long'], 
        required: 'Password is required'
    },
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}]
    
});
userSchema.methods.hasSamePassword = function(requestedPassword){

    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash){
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);