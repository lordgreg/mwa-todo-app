'use strict';

var EC = protractor.ExpectedConditions;

describe('Login Page', function () {

  beforeEach(function () {
    browser.get('/#/auth');
  });

  it('Should be on login page', function () {
    expect(EC.urlContains('#/auth')).toBeTruthy();
  });

  it('Should have empty fields', function () {
    expect(element(by.model('ctrl.loginData.email')).getText()).toBe('');
    expect(element(by.model('ctrl.loginData.password')).getText()).toBe('');
    expect(element(by.css('[ng-click="ctrl.login()"]')).isEnabled()).toBeFalsy();
  });

  it('Should fill username and password and check if button is enabled', function () {
    element(by.model('ctrl.loginData.email')).clear();
    element(by.model('ctrl.loginData.password')).clear();
    element(by.model('ctrl.loginData.email')).sendKeys('mwa@mwaysolutions.com');
    element(by.model('ctrl.loginData.password')).sendKeys('abc123');

    expect(element(by.css('[ng-click="ctrl.login()"]')).isEnabled()).toBeTruthy();
  });

  it('Should fill wrong data, submit, and see Invalid credentials', function () {
    element(by.model('ctrl.loginData.email')).clear();
    element(by.model('ctrl.loginData.password')).clear();
    element(by.model('ctrl.loginData.email')).sendKeys('aaaaaa');
    element(by.model('ctrl.loginData.password')).sendKeys('bbbbbb');

    element(by.css('[ng-click="ctrl.login()"]')).click();

    var popUp = element(by.css('.popup .popup-body'));

    expect(popUp.getText()).toBe('Invalid credentials.');
  });

  it('Should log-in and land on main/list page', function () {
    element(by.model('ctrl.loginData.email')).clear();
    element(by.model('ctrl.loginData.password')).clear();
    element(by.model('ctrl.loginData.email')).sendKeys('mwa@mwaysolutions.com');
    element(by.model('ctrl.loginData.password')).sendKeys('abc123');

    element(by.css('[ng-click="ctrl.login()"]')).click();

    browser.wait(
      EC.not(
        EC.urlContains('/auth')
      ), 8000)
      .then(function () {
        expect(EC.urlContains('main/list'));
      });

  });

});
