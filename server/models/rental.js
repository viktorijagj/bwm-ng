const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const rentalShema = new Shema({
    title:{type: String, required:true, max:[128, 'Too long, max is 120 characters']},
    city:{type: String, required:true, lowercase:true},
    street:{type: String, required:true, min:[4, 'Too short']},
    category:{type: String, required:true, lowercase:true},
    image:{type: String, required:true},
    bedrooms: Number,
    shared: Boolean,
    description: {type:String, required:true},
    dailyrate:Number,
    createdAt: {type:Date, default: Date.now}

});

module.exports = mongoose.model('Rental', rentalShema);