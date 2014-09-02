'use strict';

angular.module('lawInternshipApp')
  .factory('Listing', function ($resource) {
    return $resource('/api/listings/:id', {}, {
      update: {
        method: 'PUT'        
      }
    })
  });
