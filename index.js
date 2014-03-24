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

unwire.flush = function (path) {

  // only delete a single path
  if (path) {
    var folder = Path.dirname(module.parent.filename);
    var fullPath = resolve.sync(path, { basedir: folder });
    return delete require.cache[fullPath];
  }

  // else delete everything
  for (var key in require.cache) {
    if (! require.cache.hasOwnProperty(key)) continue;
    delete require.cache[key];
  }

};

module.exports = unwire;
