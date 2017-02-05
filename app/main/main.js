'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main/list');
    $stateProvider
      .state('main', {
        url: '/main',
        abstract: true,
        templateUrl: 'main/templates/menu.html',
        controller: 'MenuCtrl as menu',
        resolve: {
          auth: function ($state, $q, $log, Auth) {
            return Auth.getUser()
              .then(function (data) {
                if (data && data.id) {
                  angular.merge(Auth.data.user, Auth.data.user, data);
                }
                return $q.resolve('Auth resolve done.');
              })
              .catch(function (err) {
                $log.error(err);
                return $q.reject(err);
              });
          }
        }
      })
      .state('main.list', {
        url: '/list',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-view.html',
            controller: 'ListViewCtrl as ctrl'
          }
        }
      })
      .state('main.detail', {
        url: '/detail/:taskId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/detail.html',
            controller: 'DetailCtrl as ctrl'
          }
        }
      })
      ;
  })
  .run(function (
    $rootScope,
    $state,
    $ionicHistory,
    $log,
    $cordovaStatusbar,
    Auth
  ) {

    document.addEventListener('deviceready', function () {
      if (window.cordova) {
        $cordovaStatusbar.styleHex('#66cc33');
      }
    });

    // state change success handler
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      $log.info('State change success validation');

      if (toState.name === 'auth' || toState.name === 'list') {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
      }

      if (toState.name === 'auth') {
        return;
      }

      // currently not logged in
      if (!Auth.isLoggedIn()) {
        $state.go('auth');
      }
    });
  })

  // error catching for angular ui router
  .run(function ($rootScope, $log) {
    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        // this is required if you want to prevent the $UrlRouter reverting the URL to the previous valid location
        event.preventDefault();
        $log.error(error);
        throw new Error(error);
      });
  })
  ;
