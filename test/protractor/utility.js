'use strict';

var login = function () {
  var EC = protractor.ExpectedConditions;
  browser.get('/#/auth');
  element(by.model('ctrl.loginData.email')).clear();
  element(by.model('ctrl.loginData.password')).clear();
  // element.all(by.model('ctrl.loginData.rememberMe')).get(0).click();
  element(by.model('ctrl.loginData.email')).sendKeys('mwa@mwaysolutions.com');
  element(by.model('ctrl.loginData.password')).sendKeys('abc123');
  element(by.css('[ng-click="ctrl.login()"]')).click();
  browser.wait(
    EC.not(
      EC.urlContains('/auth')
    )
  , 8000);
};

module.exports.login = login;
