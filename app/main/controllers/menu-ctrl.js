'use strict';
angular.module('main')
  .controller('MenuCtrl', function (
    $state,
    Auth
  ) {

    this.user = Auth.data.user;

    this.logout = function () {
      Auth.logout()
        .then(function () {
          $state.go('auth');
        });
    };

  });
