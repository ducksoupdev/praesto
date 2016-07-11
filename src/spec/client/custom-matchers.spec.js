"use strict";

var customMatchers = {
  toEqualData: function () {
    return {
      compare: function (actual, expectedText) {
        return {
          pass: angular.equals(expectedText, actual)
        };
      }
    };
  }
};

beforeEach(function () {
  jasmine.addMatchers(customMatchers);
});
