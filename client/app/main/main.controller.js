'use strict';

angular.module('lawInternshipApp')
  .controller('MainCtrl', function ($scope, Listing, _, localStorageService, $modal) {
    $scope.search = {
      categories: {}
    };

    $scope.input = {};

    $scope.saved = [];

    $scope.types = [{
      category: 'Approved',
      active: true,
    }, {
      category: 'Overseas',
      active: true,
    }, {
      category: 'Need Approval',
      active: true,
    }];

    if (localStorageService.get('saved')) {
      $scope.savedIds = localStorageService.get('saved');
    } else {
      $scope.savedIds = [];
    }

    $scope.listings = Listing.query(function(listings) {
      var categories = _.reduce(listings, function(arr, el){
        arr = arr.concat(el.practiceAreas);
        return arr;
      }, []);

      $scope.categories = _.reduce(_.uniq(categories), function(arr, el){
        arr.push({
          category: el,
          active: false
        });
        return arr;
      }, []);
      
      angular.forEach($scope.savedIds, function(id){
        var listing = _.find(listings, { _id: id });

        if (listing) {
          $scope.saved.push(listing);
        }        
      });      
    });

    $scope.reset = function(){
      $scope.search.name = '';
      
      angular.forEach($scope.categories, function(c){
        c.active = true;
      });
    };

    $scope.save = function(){
      var savedIds = _.reduce($scope.saved, function(arr, c){
        arr.push(c._id);
        return arr;
      }, []);

      localStorageService.set('saved', savedIds);
    };

    $scope.bookmark = function(listing) {
      $scope.saved.push(listing);
      $scope.save();
    };

    $scope.isSaved = function(listing) {
      var match = _.findIndex($scope.saved, { _id: listing._id });
      return match > -1;
    };

    $scope.unbookmark = function(listing){
      var index = _.findIndex($scope.saved, { _id: listing._id });
      $scope.saved.splice(index, 1);
      $scope.save();
    };

    $scope.toggleState = true;
    $scope.toggleAll = function(){
      $scope.toggleState = !$scope.toggleState;
      angular.forEach($scope.categories, function(c){
        c.active = $scope.toggleState;
      });
    };

    $scope.selectArea = function(area) {
      area.active = !area.active;
      $scope.search.categories.category = '';
    };

    $scope.selectedCategories = [];
    $scope.selectCategory = function(item, model, label){
      $scope.input.category = '';
      var exists = _.findIndex($scope.selectedCategories, {category: label});
      if (exists === -1) {
        $scope.selectedCategories.push(item);       
      }
    };

    $scope.deselectCategory = function(category){
      _.remove($scope.selectedCategories, function(el){
        return el.category === category.category;
      });
    };
  });