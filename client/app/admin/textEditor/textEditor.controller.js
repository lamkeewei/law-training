'use strict';

angular.module('lawInternshipApp')
  .controller('TexteditorCtrl', function ($scope, additionalInfo) {
    if (additionalInfo) {
      $scope.additionalInfo = additionalInfo;      
    }
  });
