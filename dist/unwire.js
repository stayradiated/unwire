'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.unwire = unwire;
exports.flush = flush;
exports.flushAll = flushAll;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var ORIGINAL = Symbol('original');

function unwire(module, from, mock) {
  var folder = _path2['default'].dirname(from);
  var fullPath = _resolve2['default'].sync(module, { basedir: folder });

  // check if we have already rewired this path
  var original;
  var cache = require.cache[fullPath];
  if (typeof cache !== 'undefined' && cache.hasOwnProperty(ORIGINAL)) {
    original = cache[ORIGINAL];
  } else {
    original = require(fullPath);
  }

  // Overwrite cache
  var fake = mock(original);

  require.cache[fullPath] = _defineProperty({
    exports: fake
  }, ORIGINAL, original);

  return fake;
}

// only delete a single module

function flush(module, from) {
  var folder = _path2['default'].dirname(from);
  var fullPath = _resolve2['default'].sync(module, { basedir: folder });
  return delete require.cache[fullPath];
}

// reset everything

function flushAll() {
  for (var key in require.cache) {
    if (require.cache.hasOwnProperty(key)) {
      delete require.cache[key];
    }
  }
}