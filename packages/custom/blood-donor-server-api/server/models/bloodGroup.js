'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var mean = require('meanio');
var config = mean.loadConfig();

/**
 * bloodGroup Schema
 */
var bloodGroupSchema = new Schema({
  name: { type: String, required: true }
});

/**
 * Validations
 */
bloodGroupSchema.path('name').validate(function(bloodGroupName) {
  return !!bloodGroupName;
}, 'Name cannot be blank');

// Add the model to the DB...
var BloodGroup = mongoose.model('BloodGroup', bloodGroupSchema);

/**
 * Population
 */
function done(err) {
    if (err) console.error(err);
    mongoose.disconnect();
}

function populateBloodGroup() {
    BloodGroup.create({name: 'A+'},  function(err, obj) { if (err) done(err); }),
    BloodGroup.create({name: 'A-'},  function(err, obj) { if (err) done(err); }),
    BloodGroup.create({name: 'B+'},  function(err, obj) { if (err) done(err); }),
    BloodGroup.create({name: 'B-'},  function(err, obj) { if (err) done(err); }),
    BloodGroup.create({name: 'AB+'},  function(err, obj) { if (err) done(err); }),
    BloodGroup.create({name: 'AB-'},  function(err, obj) { if (err) done(err); }),
    BloodGroup.create({name: 'O+'},  function(err, obj) { if (err) done(err); }),
    BloodGroup.create({name: 'O-'},  function(err, obj) { if (err) done(err); })
}

console.info('--->>> DB Connection string: ' + config.db);

var db = mongoose.createConnection(config.db);

db.on('error', console.error.bind(console, ' MongoDB Connection Error: '));
db.once('open', function () {
    console.info('--->>> DB Connection open...');
    // Connected, now check whether the table is empty or not...
    BloodGroup.findOne({},function(err,doc){
        if(!doc){
            // Table/Collection is empty, hence populate table...
            console.info('--->>> Locations table is empty so adding default entries...');
            populateBloodGroup();
        }
        else {
            console.info('--->>> Locations table contains data, so not adding default entries...');
        }
    });
    
    // Close DB Connection...
    db.close();
});