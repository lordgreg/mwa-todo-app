'use strict';
angular.module('main')
.service('Tasks', function (
  $q,
  Auth
) {

  this.data = {
    tasks: []
  };

  this.addTask = function (task) {
    this.data.tasks.push(task);
    return this.saveTasks();
  };

  this.getTasks = function () {
    return localforage.getItem('tasks-' + Auth.data.user.id);
  };

  this.saveTasks = function (tasks) {
    if (!tasks) {
      tasks = this.data.tasks;
    }
    return localforage.setItem('tasks-' + Auth.data.user.id, tasks);
  };

  this.deleteTask = function (taskId) {
    var defer = $q.defer();

    var foundIndexOfTask = this.findTaskIndex(taskId);

    if (foundIndexOfTask > -1) {
      this.data.tasks.splice(foundIndexOfTask, 1);
      return this.saveTasks();
    }
    else {
      defer.reject('Task was not found in array of tasks.');
    }

    return defer.promise;
  };

  this.updateTask = function (task) {
    var defer = $q.defer();

    var foundIndexOfTask = this.findTaskIndex(task.id);

    if (foundIndexOfTask > -1) {
      this.data.tasks[foundIndexOfTask] = task;
      return this.saveTasks();
    }
    else {
      defer.reject('Task was not found in array of tasks.');
    }

    return defer.promise;
  };

  this.findTaskIndex = function (taskId) {
    var foundIndexOfTask = -1;

    this.data.tasks.forEach(function (item, index) {
      if (item.id === taskId) {
        foundIndexOfTask = index;
        return;
      }
    });

    return foundIndexOfTask;
  };

});
