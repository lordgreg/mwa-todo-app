'use strict';

exports.config = {
  seleniumAddress: 'http://localhost:4723/wd/hub',

  // iOS specific (capabilities and baseUrl)
  // https://github.com/appium/appium/blob/master/docs/en/writing-running-appium/caps.md for all parameters
  capabilities: {
    app: '/Users/[USER_NAME]/Projects/@Test/generator-m-ionic-demo/platforms/ios/build/device/My Project.app',
    autoWebview: true,
    browserName: '',
    platformName: 'iOS',
    xcodeConfigFile: '/Users/[USER_NAME]/Projects/@Test/generator-m-ionic-demo/xcodeConfig.xcconfig',
    automationName: 'XCUITest', // use with xcode8
    platformVersion: '', // include version of available simulator os
    udid: 'b4a4c06c2a76e9d4e69be5f6b19c7dfc11544224',
    deviceName: 'iPad von Martin Wieland', // to start on simulator: iPad 2; to get udid from real device, type `instruments -s devices`
  },

  baseUrl: 'http://localhost:3000',

  specs: ['./test/protractor/**/*.js'],

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
