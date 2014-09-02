'use strict';

angular.module('lawInternshipApp')
  .factory('Approval', function ($resource) {
    return $resource('/api/approvals/:id', {}, {
      update: {
        method: 'PUT'
      }
    });
  });
