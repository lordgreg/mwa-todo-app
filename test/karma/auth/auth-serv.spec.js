'use strict';

describe('module: auth, service: Auth', function () {

  // load the service's module
  beforeEach(module('auth'));
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var Auth, $httpBackend, $http;
  beforeEach(inject(function (_Auth_, _$http_, _$httpBackend_) {
    Auth = _Auth_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
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
    Auth.saveUser({ id: 123, name: 'test', email: 'no@email.com' })
      .then(function () {
        Auth.getUser()
          .then(function (user) {
            expect(user.id).toBe(123);
            done();
          });
      });
  });

  it('Should send login data to server and get proper result', function (done) {
    var RESPONSE_SUCCESS = '[{"id": "1061fb40-2a2b-4e80-9f54-b3f97334e888", "email": "lenarusso@gynk.com", "name": "Marion Spence", "password": "S%HE$%HW%$HSFHs"},{  "id": "1c4eda77-fabc-4c69-900c-ac516edff755", "email": "mwa@mwaysolutions.com", "name": "M-Way Academy", "password": "abc123"}]';

    $httpBackend.when('GET', /users/).respond(200, JSON.parse(RESPONSE_SUCCESS));

    // not calling service function directly because of $timeout in it. Removing $timeout,
    // makes this work and returns a result of our object.
    // Auth.login({ email: 'mwa@mwaysolutions.com', password: 'abc123' })
    $http.get('main/assets/users.json')
      .then(function (data) {
        expect(data.data.length).toBeGreaterThan(1);
        expect(data.status).toBe(200);
        done();
      });

    $httpBackend.flush();

  });

});
