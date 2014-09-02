'use strict';

angular.module('lawInternshipApp')
  .directive('fullHeight', function ($window) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var resize = function(){
          var windowHeight = $window.innerHeight;
          var width = $window.innerWidth;
          if (width > 992) {
            element.css('height', windowHeight + 'px');
          } else {
            element.css('height', 'auto');
          }

          if (attrs.always) {
            element.css('height', windowHeight + 'px');
          }
        };

        angular.element($window).bind('resize', function(){
          resize();
        });

        resize();
      }
    };
  });