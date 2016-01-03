'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var BloodDonorServerApi = new Module('blood-donor-server-api');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
BloodDonorServerApi.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  BloodDonorServerApi.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  BloodDonorServerApi.menus.add({
    title: 'bloodDonorServerApi example page',
    link: 'bloodDonorServerApi example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  BloodDonorServerApi.aggregateAsset('css', 'bloodDonorServerApi.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    BloodDonorServerApi.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    BloodDonorServerApi.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    BloodDonorServerApi.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return BloodDonorServerApi;
});
