const express = require('express'); //import na package
const mongoose = require('mongoose');
const config = require('./config/dev');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');


mongoose.connect(config.DB_URI, { useNewUrlParser : true }).then( () => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});


const app = express();  //prisvojuvanje na package na applikacija
app.use('/api/v1/rentals', rentalRoutes);

const PORT = process.env.PORT || 3001;  //kreiranje na port

app.listen(PORT, function(){ //aplikacijata da raboti so http
    console.log("App is running");
})