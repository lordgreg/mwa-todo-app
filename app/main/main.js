'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main');
    $stateProvider
      .state('main', {
        url: '/main',
        template: '<ion-view view-title="main"></ion-view>',
        // templateUrl: 'main/templates/<someTemplate>.html',
        // controller: 'SomeCtrl as ctrl'
      });
  })
  .run(function (
    $rootScope,
    $state,
    $ionicHistory,
    $log,
    Auth
  ) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState/*, toParams, fromState, fromParams*/) {
      $log.warn('State change success validation');
      if (toState.name === 'auth' || toState.name === 'main') {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
      }

      if (!Auth.isLoggedIn()) {

        $state.go('auth');
      }

      if (toState.name === 'auth') {
        return;
      }
    });
  })

  ;
