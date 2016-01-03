'use strict';

/* jshint -W098 */
angular.module('mean.blood-donor-server-api').controller('BloodDonorServerApiController', ['$scope', 'Global', 'BloodDonorServerApi',
  function($scope, Global, BloodDonorServerApi) {
    $scope.global = Global;
    $scope.package = {
      name: 'blood-donor-server-api'
    };
  }
]);
