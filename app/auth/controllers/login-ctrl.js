'use strict';
angular.module('main')
.controller('LoginCtrl', function (
  Auth,
  $ionicLoading,
  $log,
  $state
) {

  this.login = function () {
    $ionicLoading.show();
    Auth.login()
    .then(function (data) {
      Auth.data.user.id = Math.round(Math.random() * 10000);
      $log.info('Successfully logged. ID: ' + data.id);
      $state.go('main');
    })
    .finally(function () {
      $ionicLoading.hide();
    });
  };

});
