'use strict';
angular.module('auth')
  .service('Auth', function (
    $log,
    $timeout,
    $q,
    $http,
    Config
  ) {

    this.data = {
      user: {
        id: null
      }
    };

    this.isLoggedIn = function () {
      return (this.data.user.id) ? true : false;
    };

    this.login = function (loginData) {
      var defer = $q.defer();
      var that = this;

      $log.info('Simulating login request');
      $timeout(function () {
        $http.get(Config.ENV.SERVER_URL + 'users.json')
          .then(function (data) {
            var foundUser = that.findUserData(loginData, data.data);

            if (foundUser) {
              angular.merge(that.data.user, that.data.user, foundUser);
              defer.resolve(that.data.user);
            }
            else {
              $log.info('Invalid credentials.');
              defer.reject({ message: 'Invalid credentials.' });
            }
          })
          .catch(function (err) {
            defer.reject(err);
          });
      }, 1000);

      return defer.promise;
    };

    this.logout = function () {
      return this.deleteUser();
    };

    this.findUserData = function (loginData, usersArray) {
      var foundUser = usersArray.filter(function (single) {
        return (single.email === loginData.email && single.password === loginData.password);
      });

      if (foundUser.length === 1) {
        return foundUser[0];
      }

      else {
        return undefined;
      }
    };

    this.saveUser = function (user) {
      if (!user) {
        user = this.data.user;
      }
      return localforage.setItem('user', user);
    };

    this.getUser = function () {
      return localforage.getItem('user');
    };

    this.deleteUser = function () {
      return localforage.removeItem('user');
    };

  });
