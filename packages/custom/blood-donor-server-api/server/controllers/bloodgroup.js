'use strict';

var mongoose = require('mongoose');
var BloodGroup = mongoose.model('BloodGroup');

exports.getBloodGroup = function(req, res) {
    console.log("--->>> Entering Function bloodGroup::getBloodGroup()");
      
    // Fetch information from the DB Table/Collection...
    BloodGroup.find({}, function(err, bloodGroups) {
        // Process errors if any...
        if (err) return console.error("***>>>" + err);
        
        console.log("--->>> bloodGroup::getbloodGroup() -> returning JSON data from DB");
        //return the BloodGroup as json packet data and send it to the client
        res.jsonp(bloodGroups);
    });
    
    console.log("--->>> Exiting Function bloodGroup::getBloodGroup()");
}