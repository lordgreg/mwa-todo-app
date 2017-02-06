'use strict';
angular.module('main')
  .controller('ListViewCtrl', function (
    $scope,
    $state,
    Auth,
    Tasks
  ) {

    this.user = Auth.data.user;
    this.data = Tasks.data;

    $scope.$on('$ionicView.beforeEnter', function () {
      Tasks.getTasks()
      .then(function (tasks) {
        angular.merge(Tasks.data.tasks, Tasks.data.tasks, tasks);
      });

    });

  });
