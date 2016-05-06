'use strict';

var async = require('async');
var mongoose = require('mongoose');
var Location = mongoose.model('Location');
var BloodGroup = mongoose.model('BloodGroup');
var Donor = mongoose.model('Donor');

function handleError(err, res, message) {
    console.error("***>>>" + err);
    return res.status(500).json({ error: message + " --->>>" + err});
}

exports.getDonor = function(req, res) {
    console.log("--->>> Entering Function Donor::getDonor()");
    
    var bloodType = req.query.bloodType.trim();
    var city = req.query.city.trim();
    
    if (bloodType == undefined || city == undefined) {
        return res.status(500).json({ error: 'Invalid Parameters' });
    }
    
    console.log("Searching donors in " + city + " with BloodGroup " + bloodType);
    
    // Fetch information from the DB Table/Collection...        
    BloodGroup.findOne({name:bloodType}, function(err, bgObj) {
        // Process errors if any...
        if (err) return handleError(err, res, "Unable to retrieve BloodGroup");
        
        Location.findOne({CityName: city}, function(err, cityObj) {
            // Process errors if any...
            if (err) return handleError(err, res, "Unable to retrieve Locations");
            
            Donor.find({BloodGroupID: bgObj._id, LocationId: cityObj._id}, function(err, donor) {
                // Process errors if any...
                if (err) return handleError(err, res, "Unable to retrieve Donors");
        
                console.log("--->>> Donor::getDonor() -> returning JSON data from DB");
                //return the cities as json packet data and send it to the client
                res.jsonp(donor);
            });
        });
    });
}
