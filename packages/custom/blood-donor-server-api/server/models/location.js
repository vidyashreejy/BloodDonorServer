'use strict';

module.exports = function(mongoose) {
    var Schema = mongoose.Schema;  
    
    /* Location Schema */
    var LocationSchema = new Schema({
        CityName: { type: String, required: true }
    });
    
    /* Validations */
    LocationSchema.path('CityName').validate(function(CityName) {
    return !!CityName;
    }, 'CityName cannot be blank');

    // Add the model to the DB...
    var Location = mongoose.model('Location', LocationSchema);
    return Location;
}