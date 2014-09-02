'use strict';

angular.module('lawInternshipApp')
  .controller('ApprovalCtrl', function ($scope, $modalInstance, listing, Approval) {
    $scope.listing = listing;
    $scope.approval = {
      companyId: listing._id
    }
    $scope.state = {};

    $scope.datepickerOptions = {
      'show-weeks': false
    };

    $scope.open = function(e, field){
      e.preventDefault();
      e.stopPropagation();
      
      $scope.state.start = false;
      $scope.state.end = false;

      $scope.state[field] = !$scope.state[field];
    };

    $scope.validDate = function(){
      return $scope.approval.start < $scope.approval.end;
    };

    $scope.send = function(form){
      $scope.state.submitted = true;

      if (form.$valid && $scope.validDate()) {
        $modalInstance.close($scope.approval);
      }
    }
  });
