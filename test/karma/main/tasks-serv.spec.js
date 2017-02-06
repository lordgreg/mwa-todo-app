'use strict';

describe('module: main, service: Tasks', function () {

  // load the service's module
  beforeEach(module('auth'));
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Tasks;
  beforeEach(inject(function (_Tasks_) {
    Tasks = _Tasks_;
  }));

  it('should do something', function () {
    expect(!!Tasks).toBe(true);
  });

});
