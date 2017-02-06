'use strict';

describe('module: main, controller: ListViewCtrl', function () {

  // load the controller's module
  beforeEach(module('auth'));
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ListViewCtrl, $rootScope, $scope;
  beforeEach(inject(function ($controller, _$rootScope_) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    ListViewCtrl = $controller('ListViewCtrl', { $scope: $scope });
  }));

  it('should do something', function () {
    expect(!!ListViewCtrl).toBe(true);
  });

});
