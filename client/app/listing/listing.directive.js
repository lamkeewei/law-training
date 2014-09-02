'use strict';

angular.module('lawInternshipApp')
  .directive('listing', function ($modal, Listing, Approval, $window) {
    return {
      templateUrl: 'app/listing/listing.html',
      restrict: 'EA',
      scope: {
        listing: '=',
        bookmark: '&',
        unbookmark: '&',
        moreInfo: '&',
        saved: '=',
        flag: '@'
      },
      link: function (scope, element, attrs) {
        scope.openInfo = function(listing){
          $modal.open({
            templateUrl: 'app/main/info/info.html',
            controller: 'InfoCtrl',
            resolve: {
              listing: function(){
                var id = scope.listing._id;
                return Listing.get({ id: id }).$promise;
              }
            }
          });
        };

        scope.getApproval = function(){
          var modalInstance = $modal.open({
            templateUrl: 'app/approval/approval.html',
            controller: 'ApprovalCtrl',
            resolve: {
              listing: function(){
                var id = scope.listing._id;
                return Listing.get({ id: id }).$promise;
              }
            }
          });

          modalInstance.result.then(function(approval){
            Approval.save(approval, function(){
              new $window.PNotify({
                type: 'success',
                title: 'Application Submitted',
                text: 'Please check your email for confirmation'
              });
            });
          });
        };
      }
    };
  });