'use strict';
angular.module('auth', [
  'ionic',
  'ngCordova',
  'ui.router'
])
.config(function ($stateProvider) {

  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('auth', {
      url: '/auth',
      templateUrl: 'auth/templates/login.html',
      controller: 'LoginCtrl as ctrl'
    });
});
