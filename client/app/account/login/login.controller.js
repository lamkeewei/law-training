'use strict';

angular.module('lawInternshipApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, User) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          var user = User.get(function(user){
            if (user.role === 'admin') {
              $location.path('/admin');  
            } else {
              $location.path('/');            
            }
          });
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
