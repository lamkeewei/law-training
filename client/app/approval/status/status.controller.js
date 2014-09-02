'use strict';

angular.module('lawInternshipApp')
  .controller('StatusCtrl', function ($scope, request) {
    $scope.request = request;
  });
