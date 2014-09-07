'use strict';

angular.module('lawInternshipApp')
  .directive('listing', function ($modal, Listing, $window) {
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
      }
    };
  });