'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var mean = require('meanio');
var config = mean.loadConfig();

/**
 * Location Schema
 */
var LocationSchema = new Schema({
  CityName: { type: String, required: true }
});

/**
 * Validations
 */
LocationSchema.path('CityName').validate(function(CityName) {
  return !!CityName;
}, 'CityName cannot be blank');

// Add the model to the DB...
var Location = mongoose.model('Location', LocationSchema);

/**
 * Population
 */
function done(err) {
    if (err) console.error(err);
    mongoose.disconnect();
}

function populateCities() {
    Location.create({CityName: 'Bangalore'},  function(err, obj) { if (err) done(err); }),
    Location.create({CityName: 'Mangalore'},  function(err, obj) { if (err) done(err); }),
    Location.create({CityName: 'Davangere'},  function(err, obj) { if (err) done(err); }),
    Location.create({CityName: 'Mysore'},  function(err, obj) { if (err) done(err); }),
    Location.create({CityName: 'Hubli'},  function(err, obj) { if (err) done(err); }),
    Location.create({CityName: 'Dharwad'},  function(err, obj) { if (err) done(err); }),
    Location.create({CityName: 'Belgaum'},  function(err, obj) { if (err) done(err); }),
    Location.create({CityName: 'Shivamoga'},  function(err, obj) { if (err) done(err); })
}

console.info('--->>> DB Connection string: ' + config.db);

var db = mongoose.createConnection(config.db);

db.on('error', console.error.bind(console, ' MongoDB Connection Error: '));
db.once('open', function () {
    console.info('--->>> DB Connection open...');
    // Connected, now check whether the table is empty or not...
    Location.findOne({},function(err,doc){
        if(!doc){
            // Table/Collection is empty, hence populate table...
            console.info('--->>> Locations table is empty so adding default entries...');
            populateCities();
        }
        else {
            console.info('--->>> Locations table contains data, so not adding default entries...');
        }
    });
    
    // Close DB Connection...
    db.close();
});