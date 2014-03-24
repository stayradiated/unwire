'use strict';

var rewire = require('rewire');
var resolve = require('resolve');

var unwire = function unwire (req) {
  return function (path) {
    var fullPath = req.resolve(path);

    var original = require(fullPath);
    var fake = rewire(fullPath);

    req.cache[fullPath].exports = fake;

    fake.__unwire__ = function __unwire__ () {
      require.cache[fullPath].exports = original;
    };

    return fake;
  };
};

module.exports = unwire;
