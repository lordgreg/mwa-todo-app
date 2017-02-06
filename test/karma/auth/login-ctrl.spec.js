'use strict';

describe('module: auth, controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  beforeEach(module('auth'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var LoginCtrl;
  beforeEach(inject(function ($controller) {
    LoginCtrl = $controller('LoginCtrl');
  }));

  it('Should check if controller is defined', function () {
    expect(!!LoginCtrl).toBe(true);
  });

  it('Should checkif initLoginData() resets object', function () {
    LoginCtrl.loginData.id = 1234567890;
    LoginCtrl.initLoginData();

    expect(LoginCtrl.loginData.id).toBe(undefined);
  });

});
