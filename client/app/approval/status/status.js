'use strict';

angular.module('lawInternshipApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('status', {
        url: '/approvals/status/:id',
        templateUrl: 'app/approval/status/status.html',
        controller: 'StatusCtrl',
        resolve: {
          request: ['$stateParams', 'Approval', '$q', function($stateParams, Approval, $q){
            var deferred = $q.defer();
            Approval.get({ id: $stateParams.id }, function(approval){
              deferred.resolve(approval);
            }, function() {
              deferred.resolve({});
            });

            return deferred.promise;
          }]
        }
      });
  });