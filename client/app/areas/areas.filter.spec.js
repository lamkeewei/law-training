'use strict';

describe('Filter: areas', function () {

  // load the filter's module
  beforeEach(module('lawInternshipApp'));

  // initialize a new instance of the filter before each test
  var areas;
  beforeEach(inject(function ($filter) {
    areas = $filter('areas');
  }));

  it('should return the input prefixed with "areas filter:"', function () {
    var text = 'angularjs';
    expect(areas(text)).toBe('areas filter: ' + text);
  });

});
