'use strict';

var Path = require('path');
var rewire = require('rewire');
var resolve = require('resolve');

var unwire = function unwire (path, from) {
  
  var folder = Path.dirname(from);
  var fullPath = resolve.sync(path, { basedir: folder });

  var original = require(fullPath);
  var cache = require.cache[fullPath];

  // If we have already rewired this path, the use that
  if (cache.__original__) return cache.exports;

  // Overwrite cache
  var fake = rewire(fullPath);
  cache.__original__ = original;
  cache.exports = fake;

  // Allow require.cache to be reset to the original
  fake.__unwire__ = function __unwire__ () {
    cache.exports = cache.__original__;
    delete cache.__original__;
  };

  return fake;
};


unwire.flush = function (path, from) {

  // only delete a single path
  if (path) {
    var folder = Path.dirname(from);
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
