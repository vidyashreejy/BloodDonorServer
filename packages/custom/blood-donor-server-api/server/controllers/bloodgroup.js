'use strict';

exports.getBloodGroup = function(req, res) {
    console.log("Entering Function BloodGroup::getBloodGroup()");
    
    var bloodGoup=[
        {id:1, name:'A+'},
        {id:2, name:'A-'},
        {id:3, name:'B+'},
        {id:4, name:'B-'},
        {id:3, name:'AB+'},
        {id:4, name:'AB-'},
        {id:3, name:'O+'},
        {id:4, name:'O-'}
    ];
    //return the blood group as json packet data and send it to the client
    res.jsonp(bloodGoup);
    
    console.log("BloodGroup::getBloodGroup() -> returning JSON data");
    console.log("Exiting Function BloodGroup::getBloodGroup()");
  }