'use strict';
angular.module('main')
  .controller('LoginCtrl', function (
    Auth,
    $ionicLoading,
    $ionicPopup,
    $log,
    $state
  ) {

    this.loginData = {};

    this.initLoginData = function () {
      this.loginData = {
        email: '',
        password: '',
        rememberMe: false
      };
    };
    this.initLoginData();


    this.login = function () {
      var that = this;
      $ionicLoading.show();
      Auth.login(this.loginData)
        .then(function (/*data*/) {
          if (that.loginData.rememberMe) {
            Auth.saveUser(Auth.data.user);
          }
          else {
            that.initLoginData();
          }
          $state.go('main.list');
        })
        .catch(function (err) {
          $ionicPopup.alert({
            title: 'noes!',
            template: err.message + ''
          });
        })
        .finally(function () {
          $ionicLoading.hide();
        });
    };

  });
