'use strict';

angular.module('lawInternshipApp')
  .filter('areas', function ($filter, $log) {
    return function (listings, categories, types) {
      var filtered;

      if (categories.length > 0) {        
        filtered = _.filter(listings, function(listing){
          var areas = listing.practiceAreas;
          var contain = 0;

          angular.forEach(categories, function(category) {
            var match = _.findIndex(areas, function(a){
              return a === category.category;
            });

            if (match > - 1){ 
              contain++;
            }
          });

          return contain === categories.length;
        });
      } else {
        filtered = listings;
      }

      types = _.filter(types, { active: true });
      filtered = _.filter(filtered, function(listing){
        var contain = false;
        angular.forEach(types, function(t){
          if (listing.type === t.category) {
            contain = true;
          }
        });

        return contain;
      });

      return filtered;
    };
  });
