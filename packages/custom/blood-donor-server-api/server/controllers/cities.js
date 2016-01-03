'use strict';

exports.getCities = function(req, res) {
    console.log("Entering Function Cities::getCities()");
    
    var cities=[
        {id:0,name:'Mangalore'},
        {id:1,name:'Bangalore'},
        {id:2,name:'davangere'},
        {id:3,name:'mangalore'}
    ];
    //return the cities as json packet data and send it to the client
    res.jsonp(cities);
    
    console.log("Cities::getCities() -> returning JSON data");
    console.log("Exiting Function Cities::getCities()");
  }