'use strict';

module.exports = function(mongoose) {
    var Schema = mongoose.Schema;  

    /* Donor Schema */
    var DonorSchema = new Schema({
    Name: { type: String, required: true },
    DOB: { type: Date, required: true, trim: true },
    Sex: { type: String },
    BloodGroupID: {  type: Schema.Types.ObjectId, ref: 'BloodGroup', required: true },  
    ContactNo: { type: String, required: true },
    LocationId: {  type: Schema.Types.ObjectId, ref: 'Location', required:true },
    EmailId: { type: String, required: true },
    Password: { type: String, required: true }
    });

    /* Validations */
    DonorSchema.path('Name').validate(function(Name) {
    return !!Name;
    }, 'Name cannot be blank');

    DonorSchema.path('DOB').validate(function(DOB) {
    return !!DOB;
    }, 'DOB cannot be blank');

    DonorSchema.path('BloodGroupID').validate(function(BloodGroupID) {
    return !!BloodGroupID;
    }, 'BloodGroup cannot be blank');

    DonorSchema.path('LocationId').validate(function(LocationId) {
    return !!LocationId;
    }, 'Location cannot be blank');

    DonorSchema.path('EmailId').validate(function(EmailId) {
    return !!EmailId;
    }, 'EmailId cannot be blank');

    DonorSchema.path('Password').validate(function(Password) {
    return !!Password;
    }, 'Password cannot be blank');

    // Add the model to the DB...
    var Donor = mongoose.model('Donor', DonorSchema);
    return Donor;
}
    

