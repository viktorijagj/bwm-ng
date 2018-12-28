const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

const UserCtr = require('../controllers/user');
//testing
router.get('/secret', UserCtr.authMiddleware, function(req,res){
    res.json({"secret": true});
})
router.get('', function(req, res){
    Rental.find({}, function(error, foundRentals){
        res.json(foundRentals);
    });
});

router.get('/:id', function(req,res){
    const rentalId = req.params.id;

    Rental.findById(rentalId, function(error, foundRentals){
        if(error){
            res.status(422).send({errors: [{title: 'Rental Error', detail: 'Could not find Rental'}]});
        }
        res.json(foundRentals);
    });
});

module.exports = router;