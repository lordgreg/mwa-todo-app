'use strict';

var utility = require('../utility.js');
var EC = protractor.ExpectedConditions;
var flow = protractor.promise.controlFlow();

describe('List Page', function () {

  beforeEach(function (done) {

    utility.login()
      .then(function () {
        done();
      });
  });

  it('Should be on list', function () {
    expect(EC.urlContains('/main/list'));
  });

  it('Should have add icon in top-right side', function (done) {
    var addTaskButton = element(by.css('[nav-bar="active"] [ui-sref="main.detail"]'));
    addTaskButton.click();
    expect(browser.getCurrentUrl()).toContain('main/detail');
    element(by.css('[nav-bar="active"] [ui-sref="main.list"]')).click()
      .then(function () {
        expect(browser.getCurrentUrl()).toContain('main/list');
        done();
      });
  });

  it('Should have none (0) elements in Task view', function () {
    var tasks = element.all(by.repeater('task in ctrl.data.tasks'));

    expect(tasks.length).toBe(undefined);
  });

  it('Should have clickable menu button', function () {
    var menuButton = element(by.css('ion-view.list-page .nav-bar-block[nav-bar="active"] button[menu-toggle="left"]'));

    // this part is only to check if our CSS selector above returns ONLY ONE element
    // var howManyMenuButtons = element.all(by.css('ion-view.list-page .nav-bar-block[nav-bar="active"] button[menu-toggle="left"]'));
    // howManyMenuButtons.count()
    // .then(function (number) {
      // console.log('We have ' + number + ' menu button(s)!');
    // });

    // check if menu is there...
    expect(menuButton.isDisplayed()).toBe(true);

    // click on it...
    menuButton.click();

    // now expect body to have extra class 'menu-open'
    expect(element(by.css('body.menu-open')).isPresent()).toBe(true);

  });

});
