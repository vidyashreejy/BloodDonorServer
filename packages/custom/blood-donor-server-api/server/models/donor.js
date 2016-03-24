'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Donor Schema
 */
var DonorSchema = new Schema({
  Name: { type: String, required: true },
  DOB: { type: Date, required: true, trim: true },
  Sex: {
    type: String
  },
  BloodGroup: {
    type: String,
    ref: 'User',
    required: true
  },
 
   Address: {
    type: String,
    required: true, 
    trim: true
  },
  ContactNo: {
    type: String,
    required: true
  },
   Location: {
    type: String,
    required: true, 
    trim: true
  },
  EmailId: {
    type: String,
    required: true
  },
   Password: {
    type: String,
    required: true
  }
});

/**
 * Validations
 */
DonorSchema.path('Name').validate(function(Name) {
  return !!Name;
}, 'Name cannot be blank');

DonorSchema.path('DOB').validate(function(DOB) {
  return !!DOB;
}, 'DOB cannot be blank');

DonorSchema.path('BloodGroup').validate(function(BloodGroup) {
  return !!BloodGroup;
}, 'BloodGroup cannot be blank');

DonorSchema.path('Address').validate(function(Address) {
  return !!Address;
}, 'Address cannot be blank');

DonorSchema.path('Location').validate(function(Location) {
  return !!Location;
}, 'Location cannot be blank');

DonorSchema.path('Password').validate(function(Password) {
  return !!Password;
}, 'Password cannot be blank');



/**
 * Statics
 */
DonorSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Donor', DonorSchema);
