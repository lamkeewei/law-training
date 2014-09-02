'use strict';

describe('Service: listing', function () {

  // load the service's module
  beforeEach(module('lawInternshipApp'));

  // instantiate service
  var listing;
  beforeEach(inject(function (_listing_) {
    listing = _listing_;
  }));

  it('should do something', function () {
    expect(!!listing).toBe(true);
  });

});
