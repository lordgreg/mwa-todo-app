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
          auth: function ($state, $q, Auth) {
            return Auth.getUser()
            .then(function (data) {
              if (data && data) {
                angular.merge(Auth.data.user, Auth.data.user, data);
              }
              else {
                $state.go('auth');
                return $q.reject('No data stored.');
              }
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
    Auth
  ) {
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
