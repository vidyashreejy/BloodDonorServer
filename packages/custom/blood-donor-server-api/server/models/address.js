'use strict';

/**
 * Module dependencies.
 */
module.exports = function(mongoose) {
    var Schema = mongoose.Schema;

   /* Address Schema */
   var AddressSchema = new Schema({
     DonorId: { type: Schema.Types.ObjectId, ref: 'Donor', required: true },
     DoorNo: { type: String },
     StreetNo1: { type: String, required: true },
     StreetNo2: { type: String },
     City: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
     PinCode: { type: Number, required: true },
     Country: { type: String, required: true },
   
  });

    /* Validation*/
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

    // Add the model to the DB...
    var Address = mongoose.model('Address', AddressSchema);
    return Address;
}