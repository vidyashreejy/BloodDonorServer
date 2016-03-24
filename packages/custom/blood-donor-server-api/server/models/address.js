'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Address Schema
 */
var AddressSchema = new Schema({
  DonorId: { type: Number, required: true, trim: true },
  DoorNo: { type: String },
  StreetNo1: { type: String, required: true, trim: true },
  StreetNo2: { type: String },
  City: { type: String, required: true, trim: true },
  PinCode: { type: Number, required: true, trim: true },
  Country: { type: String, required: true, trim: true },
   
});

/**
 * Validations
 */
AddressSchema.path('DonorId').validate(function(DonorId) {
  return !!DonorId;
}, 'DonorId cannot be blank');

AddressSchema.path('StreetNo1').validate(function(StreetNo1) {
  return !!StreetNo1;
}, 'StreetNo1 cannot be blank');

AddressSchema.path('City').validate(function(City) {
  return !!City;
}, 'City cannot be blank');

AddressSchema.path('PinCode').validate(function(PinCode) {
  return !!PinCode;
}, 'PinCode cannot be blank');

AddressSchema.path('Country').validate(function(Country) {
  return !!Country;
}, 'Country cannot be blank');


/**
 * Statics
 */
AddressSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Address', AddressSchema);
