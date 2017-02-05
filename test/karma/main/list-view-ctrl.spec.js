'use strict';

describe('module: main, controller: ListViewCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ListViewCtrl;
  beforeEach(inject(function ($controller) {
    ListViewCtrl = $controller('ListViewCtrl');
  }));

  it('should do something', function () {
    expect(!!ListViewCtrl).toBe(true);
  });

});
