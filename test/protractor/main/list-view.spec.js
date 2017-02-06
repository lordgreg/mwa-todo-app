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

});
