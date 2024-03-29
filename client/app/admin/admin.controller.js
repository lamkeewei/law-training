'use strict';

angular.module('lawInternshipApp')
  .controller('AdminCtrl', function ($scope, $http, Listing, _, PNotify, Auth, $location, $modal, $window) {
    if (!Auth.isAdmin()) {
      $location.path('/login');
    }

    $scope.input = {
      period: {}
    };
    
    $scope.search = {
      firm: {}
    };
    $scope.newListing = {
      application: [],
      interview: []
    };

    $scope.datepickerOptions = {
      'show-weeks': false
    };

    $scope.openFlags = {};
    $scope.currentListing = angular.copy($scope.newListing);

    $scope.setCategories = function(listings){
      var categories = _.reduce(listings, function(arr, el){
        arr = arr.concat(el.practiceAreas);
        return arr;
      }, []);

      $scope.categories = _.reduce(_.uniq(categories), function(arr, el){
        arr.push({
          category: el,
          active: true
        });
        return arr;
      }, []);
    };

    $scope.listings = Listing.query(function(listings) {
      $scope.setCategories(listings);
    });

    $scope.newCategories = [];

    $scope.setAreas = function(areas){
      angular.forEach($scope.categories, function(c){
        c.selected = false;
      });

      angular.forEach(areas, function(a){
        var match = _.find($scope.categories, { category: a }) 
        if (match) {
          match.selected = true;
        }
      });
    };

    $scope.addNewCategory = function() {
      $scope.newCategories.push({});
    };

    $scope.isSelected = false;
    $scope.selectListing = function(listing) {
        $scope.setCategories($scope.listings);
        angular.forEach($scope.listings, function(l) {
          l.active = false;
        });
        listing.active = true;

        $scope.currentListing = Listing.get({ id: listing._id });
        $scope.setAreas(listing.practiceAreas);
        $scope.isSelected = true;
        $scope.search.firm.name = '';
        $scope.submitted = false;
        $scope.form.$setPristine();
        $scope.cancelAdd();
    };

    $scope.confirmAdd = function(){
      $scope.categories.push({
        category: $scope.input.newArea,
        selected: true
      });

      $scope.newCategories.length = 0;
    };

    $scope.cancelAdd = function(){
      $scope.input.newArea = '';
      $scope.newCategories.length = 0;
    };

    $scope.setNewListing = function(){
      $scope.setCategories($scope.listings);
      angular.forEach($scope.listings, function(l) {
        l.active = false;
      });
      $scope.currentListing = angular.copy($scope.newListing);
      $scope.setAreas([]);
      $scope.isSelected = false;
      $scope.search.firm.name = '';
      $scope.submitted = false;
      $scope.form.$setPristine();
      $scope.cancelAdd();
      $scope.cancelAddPeriod('showInterview');
      $scope.cancelAddPeriod('showApplication');
    };

    $scope.open = function(e, field){
      e.preventDefault();
      e.stopPropagation();
      Object.keys($scope.openFlags).forEach(function(k){
        if (k !== field) {
          $scope.openFlags[k] = false;          
        }
      });
      $scope.openFlags[field] = !$scope.openFlags[field];
    };

    $scope.delete = function(){
      var id = $scope.currentListing._id;
      Listing.delete({ id: id }, function(){
        var index = _.findIndex($scope.listings, { _id: id });
        $scope.listings.splice(index, 1);
        var notify = new PNotify({
          title: 'Listing Deleted',
          text: $scope.currentListing.name + ' has been deleted!'
        });

        $scope.setNewListing();

      });
    };

    $scope.resetSelected = function(){
      var id = $scope.currentListing._id;
      $scope.currentListing = Listing.get({ id: id });
      $scope.currentListing = angular.copy(original);
      $scope.cancelAddPeriod('showInterview');
      $scope.cancelAddPeriod('showApplication');
      $scope.submitted = false;
    };

    $scope.create = function(form){
      $scope.submitted = true;

      if (form.$valid) {
        var practiceAreas = _.filter($scope.categories, { selected: true });
        practiceAreas = _.reduce(practiceAreas, function(arr, a){
          arr.push(a.category);
          return arr;
        }, []);

        $scope.currentListing.practiceAreas = practiceAreas;

        Listing.save($scope.currentListing, function(listing){
          $scope.listings.push(listing);
          $scope.setNewListing();

          var notify = new PNotify({
            title: 'Listing Created',
            text: listing.name + ' has been added!',
            type: 'success'
          });
        });
      }
    };

    $scope.save = function(form){
      $scope.submitted = true;

      if (form.$valid) {
        var practiceAreas = _.filter($scope.categories, { selected: true });
        practiceAreas = _.reduce(practiceAreas, function(arr, a){
          arr.push(a.category);
          return arr;
        }, []);

        $scope.currentListing.practiceAreas = practiceAreas;

        Listing.update({ id: $scope.currentListing._id }, $scope.currentListing, function(listing){
          var index = _.findIndex($scope.listings, { _id: listing._id });
          $scope.listings[index] = listing;
          $scope.selectListing(listing);

          var notify = new PNotify({
            title: 'Save Successful',
            text: listing.name + ' has been updated!',
            type: 'success'
          });

          $scope.form.$setPristine();
          $scope.cancelAddPeriod('showInterview');
          $scope.cancelAddPeriod('showApplication');
        });
      }
    };

    $scope.getNumAreas = function(){
      var active = _.filter($scope.categories, { selected: true });
      return active.length;
    };

    $scope.addPeriod = function(field, displayToggle){
      if (!$scope.input.period.start || !$scope.input.period.end) {
        $scope.input.periodError = true;
        return;
      }

      $scope.currentListing[field].push($scope.input.period);
      $scope.cancelAddPeriod(displayToggle);
    };

    $scope.cancelAddPeriod = function(field){
      $scope.input.period = {};
      $scope.input[field] = false;
      $scope.input.periodError = false;
    };

    $scope.deletePeriod = function(index, field){
      $scope.form.$setDirty();
      $scope.currentListing[field].splice(index, 1);
    };

    $scope.launchInfoModal = function(){
      var modalInstance = $modal.open({
        templateUrl: 'app/admin/textEditor/textEditor.html',
        size: 'lg',
        controller: 'TexteditorCtrl',
        backdrop: 'static',
        resolve: {
          additionalInfo: function() {
            return $scope.currentListing.additionalInfo;
          }
        }
      });

      modalInstance.result.then(function(additionalInfo){
        $scope.form.$setDirty();
        $scope.currentListing.additionalInfo = additionalInfo;
      });
    };
  });
