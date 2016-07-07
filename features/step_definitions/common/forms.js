var assert = require('assert');

module.exports = function () {
  this.When(/^I fill the input "([^"]*)" with "([^"]*)"$/, function (id, value, callback) {
    browser
      .waitForVisible('#' + id, 1000)
      .setValue('#' + id, value)
      .call(callback);
  });

  this.When(/^I click on "([^"]*)" button$/, function (id, callback) {
    browser
      .waitForVisible('#' + id, 1000)
      .click('#' + id)
      .call(callback);
  });

  this.When(/^I check the checkbox with class "([^"]*)"$/, function (cssClass, callback) {
    browser
    .waitForVisible('input[type=checkbox].' + cssClass, 1000)
    .click('input[type=checkbox].' + cssClass)
    .call(callback);
  });

  this.When(/^I select in "([^"]*)" the text "([^"]*)"$/, function (id, text, callback) {
    browser
    .selectByVisibleText('#' + id, text)
    .call(callback);
  });

  this.When(/^I click the confirm button in the modal$/, function (callback) {
    browser
    .waitForVisible('.modal button.btn-danger', 1000)
    .click('.modal button.btn-danger')
    .pause(1200)
    .call(callback);
  });

  this.Then(/^the field "([^"]*)" has the value "([^"]*)"$/, function (id, value, callback) {
    browser
      .getValue('#' + id)
      .then((inputValue) => {
        assert.equal(inputValue, value, 'The value ' + value + ' is not present in field ' + id);
      })
      .call(callback);
  });

  this.Then(/^I have input "([^"]*)"$/, function (field, callback) {
    browser
      .waitForVisible('input[id="' + field + '"]', 1000)
      .call(callback);
  });

  this.Then(/^I have an input with id "([^"]*)"$/, function (id, callback) {
    browser
      .waitForVisible('input#' + id, 1000)
      .call(callback);
  });

  this.Then(/^I can see "([^"]*)" modal$/, function(id, callback) {
    browser
      .waitForVisible('.modal #' + id, 1000)
      .call(callback);
  });

  this.Then(/^The button "([^"]*)" is ?(not)* disabled$/, function (id, not, callback) {
    if (not) {
      browser
        .waitForEnabled('#' + id, 120000)
        .call(callback);
    }
    else {
      browser
        .getAttribute('#' + id, 'disabled')
        .then(function(value) {
          assert.equal(value, 'true');
        })
        .call(callback);
    }
  });

  this.Then(/^The input "([^"]*)" is ?(not)* disabled$/, function (name, not, callback) {
    browser
      .getAttribute('input[id="' + name +'"]', 'disabled')
      .then(function(value) {
        if (not) {
          assert.equal(value, null);
        }
        else {
          assert.equal(value, 'true');
        }
      })
      .call(callback);
  });

  this.Then(/^The input "([^"]*)" is ?(not)* empty$/, function (name, not, callback) {
    browser
      .getText('input[id="' + name +'"]')
      .then(function(value) {
        if (not) {
          assert(value);
        }
        else {
          assert(!value);
        }
      })
      .call(callback);
  });
};