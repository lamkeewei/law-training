'use strict';

angular.module('lawInternshipApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        authenticate: true,
        resolve: {
          approvals: ['Approval', function(Approval){
            return Approval.query().$promise;
          }]
        }
      });
  });