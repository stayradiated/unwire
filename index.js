'use strict';

var Path = require('path');
var rewire = require('rewire');
var resolve = require('resolve');

var unwire = function unwire (path) {
  
  var folder = Path.dirname(module.parent.filename);
  var fullPath = resolve.sync(path, { basedir: folder });

  var original = require(fullPath);
  var fake = rewire(fullPath);

  // Overwrite cache
  require.cache[fullPath].exports = fake;

  // Allow require.cache to be reset to the original
  fake.__unwire__ = function __unwire__ () {
    require.cache[fullPath].exports = original;
  };

  return fake;
};

module.exports = unwire;
