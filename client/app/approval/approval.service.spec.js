'use strict';

describe('Service: approval', function () {

  // load the service's module
  beforeEach(module('lawInternshipApp'));

  // instantiate service
  var approval;
  beforeEach(inject(function (_approval_) {
    approval = _approval_;
  }));

  it('should do something', function () {
    expect(!!approval).toBe(true);
  });

});
