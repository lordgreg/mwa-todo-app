'use strict';

describe('module: main, controller: DetailCtrl', function () {

  // load the controller's module
  beforeEach(module('auth'));
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var DetailCtrl, $rootScope, $scope;
  beforeEach(inject(function ($controller, _$rootScope_) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    DetailCtrl = $controller('DetailCtrl', { $scope: $scope });
  }));

  it('should do something', function () {
    expect(!!DetailCtrl).toBe(true);
  });

  it('should not have data defined', function () {
    expect(!!DetailCtrl.data).not.toBe(false);
  });

});
