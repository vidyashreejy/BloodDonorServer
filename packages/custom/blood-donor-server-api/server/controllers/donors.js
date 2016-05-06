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

exports.viewDonors = function(res) {
    console.log("--->>> Entering Function Donor::viewDonors()");
    Donor.find(function(err, completeDonors) {
         // Process errors if any...
         if (err) return handleError(err, res, "Unable to retrieve Donors");
        
         console.log("--->>> Donor::viewDonors() -> returning JSON data from DB");
         //return the donors as json packet data and send it to the client
         res.jsonp(completeDonors);
    });
}