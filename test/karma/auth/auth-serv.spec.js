'use strict';

describe('module: auth, service: Auth', function () {

  // load the service's module
  beforeEach(module('auth'));
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Auth;
  beforeEach(inject(function (_Auth_) {
    Auth = _Auth_;
  }));

  it('Should check if Auth is defined', function () {
    expect(!!Auth).toBe(true);
  });

  it('Should check if user object is undefined', function () {
    expect(Auth.data.user.id).toBe(null);
  });

  it('Should check if user is logged in', function () {
    Auth.data.user.id = 123;
    expect(Auth.isLoggedIn()).toBe(true);
  });

  it('Should save user and retrieve it from localforage', function (done) {
    Auth.saveUser({ id: 123, name: 'test', email: 'no@email.com'})
    .then(function () {
      Auth.getUser()
      .then(function (user) {
        expect(user.id).toBe(123);
        done();
      });
    });
  });

});
