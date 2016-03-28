'use strict';

/* Module Dependencies */
// import async to make control flow simplier
var async = require('async');

var mongoose = require('mongoose');

var mean = require('meanio');
var config = mean.loadConfig();

var Location = require('./location')(mongoose);
exports.Location = Location;

var BloodGroup = require('./bloodGroup')(mongoose);
exports.BloodGroup = BloodGroup;

var Donor = require('./donor')(mongoose);
exports.Donor = Donor;

/* Population */
function handleError(err) {
    if (err) console.error(err);
    mongoose.disconnect();
}

function populateCities() {
    //var Location = require('./location')(mongoose)
    //var Location = mongoose.model('Location');
    
    // check whether the table is empty or not...
    Location.findOne({},function(err,doc){
        if(!doc){
            // Table/Collection is empty, hence populate table...
            console.info('--->>> Locations table is empty so adding default entries...');
            var citiesData = [
                {CityName: 'Bangalore'},
                {CityName: 'Mangalore'},
                {CityName: 'Davangere'},
                {CityName: 'Mysore'},
                {CityName: 'Hubli'},
                {CityName: 'Dharwad'},
                {CityName: 'Belgaum'},
                {CityName: 'Shivamoga'}
            ];
            
            // create all of the Cities
            async.each(citiesData, function(item, cb) {
                Location.create(item, cb);
            }, function(err) {
                if (err) {
                    handleError(err);
                }
                console.info('--->>> Locations table is populated with default entries');
            });
        }
        else {
            console.info('--->>> Locations table contains data, so not adding default entries...');
        }
    });
}

function populateBloodGroup() {
    //var BloodGroup = mongoose.model('BloodGroup');
    //var BloodGroup = require('./bloodGroup')(mongoose)
    
    // Check whether the table is empty or not...
    BloodGroup.findOne({},function(err,doc){
        if(!doc){
            // Table/Collection is empty, hence populate table...
            var bloodGroupData = [
                {name: 'A+'},
                {name: 'A-'},
                {name: 'B+'},
                {name: 'B-'},
                {name: 'AB+'},
                {name: 'AB-'},
                {name: 'O+'},
                {name: 'O-'}
            ];
            
            // create all of the BloodGroups
            console.info('--->>> BloodGroup table is empty so adding default entries...');
            async.each(bloodGroupData, function(item, cb) {
                BloodGroup.create(item, cb);
            }, function(err) {
                if (err) {
                    handleError(err);
                }
                console.info('--->>> BloodGroup table is populated with default entries');
            });
        }
        else {
            console.info('--->>> BloodGroup table contains data, so not adding default entries...');
        }
    });   
}

function populateDonors() {
    //var Donor = mongoose.model('Donor');
    
    Donor.findOne({},function(err,doc){
        if(!doc){
            // Table/Collection is empty, hence populate table...
            console.info('--->>> Donor table is empty so adding default entries...');
            //var Location = mongoose.model('Location');
            //var Location = require('./location')(mongoose)
            
            var cityNamesArray = ['Bangalore', 'Mangalore', 'Davangere', 'Mysore', 'Hubli', 'Dharwad', 'Belgaum', 'Shivamoga'];
            var cityObjs = {};
            
            async.each(cityNamesArray, function(item, callback) {
                Location.findOne({CityName:item}, function(err, city) {
                    cityObjs[item]=city;
                    // Async call is done, alert via callback
                    callback();
                });
            }, function(err) {
                if (err) {
                    handleError(err);
                }
                console.info('--->>> Loaded Cities Table');
                
                var bloodGroupArray = [ 'A+','A-','B+', 'B-', 'AB+', 'AB-', 'O+', 'O-' ];
                var bloodGroupObjs = {};
                async.each(bloodGroupArray, function(item, callback) {
                    BloodGroup.findOne({name:item}, function(err, bloodGroup) {
                        bloodGroupObjs[item]=bloodGroup;
                        callback();
                    });
                }, function(err) {
                    if (err) {
                        handleError(err);
                    }
                    console.info('--->>> Loaded BloodGroup Table');
                
                var donorsData = [
                    {Name: 'John',   DOB:Date('1994-02-09'),Sex:'M', BloodGroupID: bloodGroupObjs['A+']._id, 
                        ContactNo:'88283333',EmailId:'John@yahoo.com',Password:'John', LocationId: cityObjs['Bangalore']._id},
                    {Name: 'Ram',    DOB:Date('1996-09-30'),Sex:'M', BloodGroupID: bloodGroupObjs['A-']._id, 
                        ContactNo:'88383333',EmailId:'Ram@gmail.com',Password:'Ram', LocationId: cityObjs['Mangalore']._id}, 
                    {Name: 'Rahim',  DOB:Date('1985-08-25'),Sex:'M', BloodGroupID: bloodGroupObjs['B+']._id, 
                        ContactNo:'884883333',EmailId:'Rahim@yahoo.com',Password:'Rahim', LocationId: cityObjs['Davangere']._id}, 
                    {Name: 'David',  DOB:Date('1999-07-20'),Sex:'M', BloodGroupID: bloodGroupObjs['A+']._id, 
                        ContactNo:'88483333',EmailId:'David@yahoo.com',Password:'David', LocationId: cityObjs['Mysore']._id}, 
                    {Name: 'Krishna',DOB:Date('1980-05-15'),Sex:'M', BloodGroupID: bloodGroupObjs['B-']._id, 
                        ContactNo:'58883333',EmailId:'Krishna@hotmail.com',Password:'Krishna', LocationId: cityObjs['Hubli']._id}, 
                    {Name: 'Sareen', DOB:Date('1985-04-10'),Sex:'F', BloodGroupID: bloodGroupObjs['AB+']._id, 
                        ContactNo:'86883333',EmailId:'Sareen@yahoo.com',Password:'Sareen', LocationId: cityObjs['Dharwad']._id}, 
                    {Name: 'Fathima',DOB:Date('1990-01-04'),Sex:'F', BloodGroupID: bloodGroupObjs['AB-']._id, 
                        ContactNo:'68883333',EmailId:'Fathima@yahoo.com',Password:'Fathima', LocationId: cityObjs['Belgaum']._id }, 
                    {Name: 'Justin', DOB:Date('1977-12-01'),Sex:'M', BloodGroupID: bloodGroupObjs['O+']._id, 
                        ContactNo:'88783333',EmailId:'Justin@yahoo.com',Password:'Justin', LocationId: cityObjs['Shivamoga']._id}];
                    
                async.each(donorsData, function(item, cb) {
                    Donor.create(item, cb);
                }, function(err) {
                    if (err) {
                        handleError(err);
                    }
                    console.info('--->>> Donor table is is populated with default entries');
                    // Close DB Connection...
                    db.close();
                });
                });
             });
        }
        else {
            console.info('--->>> Donor table contains data, so not adding default entries...');
        }
    });
}

console.info('--->>> DB Connection string: ' + config.db);

var db = mongoose.createConnection(config.db); 

db.on('error', console.error.bind(console, ' MongoDB Connection Error: '));
db.once('open', function () {
    console.info('--->>> DB Connection open from models.js...');
    // Populate the tables if necessary...
    populateCities();
    
    populateBloodGroup();
    
    populateDonors();
});