// 'use strict';

// var utility = require('../utility.js');
// var EC = protractor.ExpectedConditions;

// beforeEach(function () {
//   utility.login();
// });

// describe('List Page', function () {

//   it('Should be on list', function () {
//     expect(EC.urlContains('/main/list'));
//   });

//   it('Should have add icon in top-right side', function () {
//     var addButton = element(by.css('[nav-bar="active"] .buttons-right button[ui-sref="main.detail"]'));

//     expect(addButton).toBeTruthy();
//   });

//   it('Should have none (0) elements in Task view', function () {
//     var tasks = element.all(by.repeater('task in ctrl.data.tasks'));

//     expect(tasks).toBe([]);
//   });

// });
