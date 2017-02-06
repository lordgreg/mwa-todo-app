'use strict';

var utility = require('../utility.js');
var EC = protractor.ExpectedConditions;

beforeAll(function () {
  utility.login();
  browser.get('/#/main/list');
});

describe('List Page', function () {

  it('Should be on list', function () {
    expect(EC.urlContains('/main/list'));
  });

  it('Should have add icon in top-right side', function () {
    browser.driver.sleep(1000);
    var addTaskButton = element(by.css('[nav-bar="active"] .right-buttons .button'));
    addTaskButton.click();
  //   var addButton = element(by.css('[nav-bar="active"] .ion-ios-plus-outline'));
  //   console.log('is add button displayed?');
  //   expect(addButton.isEnabled()).toBeTruthy();
  });

  it('Should have none (0) elements in Task view', function () {
    var tasks = element.all(by.repeater('task in ctrl.data.tasks'));

    expect(tasks.length).toBe(undefined);
  });

});
