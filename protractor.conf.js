'use strict';

var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

// An example configuration file.
exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  //seleniumServerJar: deprecated, this should be set on node_modules/protractor/config.json

  // Capabilities to be passed to the webdriver instance.
  maxSessions: 1,
  multiCapabilities: [
    // tablet
    {
      browserName: 'chrome',
      chromeOptions: {
        'args': [
          '--window-size=768,1024'
        ]
      }
    },
    // phone
    {
      browserName: 'chrome',
      chromeOptions: {
        'args': [
          '--window-size=375,667'
        ]
      }
    },
  ],

  baseUrl: 'http://localhost:3000',

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['test/protractor/**/*.js'],

  jasmineNodeOpts: {
    showColors: true,
    silent: true,
    // defaultTimeoutInterval: 360000,
    print: function () {
    }
  },

  onPrepare: function () {
    /*globals jasmine*/
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }
};
