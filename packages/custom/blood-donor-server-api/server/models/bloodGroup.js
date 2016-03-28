'use strict';

module.exports = function(mongoose) {
    var Schema = mongoose.Schema;  
    
    /* bloodGroup Schema */
    var bloodGroupSchema = new Schema({
    name: { type: String, required: true }
    });

    /* Validations */
    bloodGroupSchema.path('name').validate(function(bloodGroupName) {
    return !!bloodGroupName;
    }, 'Name cannot be blank');
    
    // Add the model to the DB...
    var BloodGroup = mongoose.model('BloodGroup', bloodGroupSchema);
    return BloodGroup;
}