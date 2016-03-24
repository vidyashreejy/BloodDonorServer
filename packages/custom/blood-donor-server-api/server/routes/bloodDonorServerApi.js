'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(BloodDonorServerApi, app, auth, database) {
  //enable CORS..
  app.use(function(req,res,next) {
      res.header("Access-Control-Allow-Origin","*");
      res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
      res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS");
      next();
  });
  
  app.get('/api/bloodDonorServerApi/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/api/bloodDonorServerApi/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/api/bloodDonorServerApi/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/api/bloodDonorServerApi/example/render', function(req, res, next) {
    BloodDonorServerApi.render('index', {
      package: 'blood-donor-server-api'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
  
  // Project specific routes added by us...
  var cities = require('../controllers/cities');
  app.get('/api/bloodDonorServerApi/cities/get', cities.getCities);
  
  var bloodGroup = require('../controllers/bloodGroup');
  app.get('/api/bloodDonorServerApi/bloodGroup/get', bloodGroup.getBloodGroup);
};
