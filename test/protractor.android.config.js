'use strict';

exports.config = {
  seleniumAddress: 'http://localhost:4723/wd/hub',

  capabilities: {
    platformName: 'android',
    platformVersion: '',
    deviceName: '02157df2b9c54f22', // enter device id here
    browserName: '',
    autoWebview: true,
    app: '/Users/[USER_NAME]/Projects/@Test/generator-m-ionic-demo/platforms/android/build/outputs/apk/android-debug.apk'
  },

  baseUrl: 'http://10.0.2.2:3000',

  specs: ['../test/protractor/**/*.js'],

  /* configuring wd in onPrepare
   * wdBridge helps to bridge wd driver with other selenium clients
   * See https://github.com/sebv/wd-bridge/blob/master/README.md
   *
   * To fix the browser.get() issues, replace location
   * http://flashquartermaster.com/2016/08/02/automated-cross-platform-testing-of-ios-and-android-hybrid-ionic-cordova-angular-apps-using-cucumber-protractor-chai-and-appium/
   */
  onPrepare: function () {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);

    //To navigate using file:// rather than http://
    var defer = protractor.promise.defer();

    /*globals browser*/
    browser.ignoreSynchronization = true;

    browser.executeScript('return window.location;').then(function (location) {
      browser.resetUrl = 'file://';
      browser.baseUrl = location.origin + location.pathname;
      defer.fulfill();
    });

    return defer.promise;
  }
};
