'use strict';
angular.module('main')
  .controller('DetailCtrl', function (
    $state,
    $scope,
    $ionicPopup,
    $log,
    Auth,
    Tasks
  ) {

    this.data = Tasks.data;

    this.taskData = {
      id: null,
      title: null,
      text: null,
      createDate: null,
      editDate: null,
      done: false
    };

    $scope.$on('$ionicView.beforeEnter', function (event, data) {
      var taskId = data.stateParams.taskId;

      if (taskId) {
        var foundTask = Tasks.data.tasks.filter(function (single) {
          return (single.id === taskId);
        });

        if (foundTask.length === 1) {
          angular.merge(this.taskData, this.taskData, foundTask[0]);
        }
      }
    }.bind(this));

    this.addTask = function () {
      this.taskData.createDate = Date.now();
      this.taskData.id = this.taskData.createDate + '-' + Math.round(Math.random(1000000) * 1000000);

      Tasks.addTask(this.taskData)
        .then(function () {
          $state.go('main.list');
        });
    };

    this.deleteTask = function () {
      var that = this;
      $ionicPopup.confirm({
        title: 'Ohhhhhh',
        template: 'Are you sure you want to delete task?'
      })
        .then(function (res) {
          if (res) {
            Tasks.deleteTask(that.taskData.id)
              .then(function () {
                $state.go('main.list');
              })
              .catch(function (err) {
                $log.error(err);
              });
          }
        });
    };

    this.updateTask = function () {
      Tasks.updateTask(this.taskData)
        .then(function () {
          $state.go('main.list');
        })
        .catch(function (err) {
          $log.error(err);
        });

    };

  });
