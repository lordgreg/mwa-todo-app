'use strict';
angular.module('auth')
.service('Auth', function (
  $log,
  $timeout,
  $q
) {

  this.data = {
    user: {
      id: null
    }
  };

  this.isLoggedIn = function () {
    return (this.data.user.id) ? true : false;
  };

  this.login = function () {
    var defer = $q.defer();
    var that = this;

    $log.info('Simulating login request');

    $timeout(function () {
      defer.resolve(that.data.user);
    }, 3000);

    return defer.promise;
  };

});
