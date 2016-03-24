'use strict';

var mongoose = require('mongoose');
var Location = mongoose.model('Location');

exports.getCities = function(req, res) {
    console.log("--->>> Entering Function Cities::getCities()");
      
    // Fetch information from the DB Table/Collection...
    Location.find({}, function(err, cities) {
        // Process errors if any...
        if (err) return console.error("***>>>" + err);
        
        console.log("--->>> Cities::getCities() -> returning JSON data from DB");
        //return the cities as json packet data and send it to the client
        res.jsonp(cities);
    });
    
    console.log("--->>> Exiting Function Cities::getCities()");
}