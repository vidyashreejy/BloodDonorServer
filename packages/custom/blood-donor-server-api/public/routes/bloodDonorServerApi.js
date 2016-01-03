'use strict';

angular.module('mean.blood-donor-server-api').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('bloodDonorServerApi example page', {
      url: '/bloodDonorServerApi/example',
      templateUrl: 'blood-donor-server-api/views/index.html'
    });
  }
]);
