'use strict';

angular.module('lawInternshipApp')
  .controller('InfoCtrl', function ($scope, listing) {
    console.log(listing);
    $scope.listing = listing;
  });
