'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.resolveModulePath = resolveModulePath;
exports.unwire = unwire;
exports.flush = flush;
exports.flushAllModules = flushAllModules;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var ORIGINAL = Symbol('Original');

function resolveModulePath(modulePath, context) {
  var folder = _path2['default'].dirname(context);
  return _resolve2['default'].sync(modulePath, { basedir: folder });
}

function unwire(modulePath, context) {
  var mock = arguments.length <= 2 || arguments[2] === undefined ? function (x) {
    return x;
  } : arguments[2];

  var fullPath = resolveModulePath(modulePath, context);
  var cache = require.cache[fullPath];

  // check if we have already rewired this path
  var original;
  if (typeof cache !== 'undefined' && cache.hasOwnProperty(ORIGINAL)) {
    original = cache[ORIGINAL];
  } else {
    original = require(fullPath);
  }

  // mock the module
  var mockedModule = mock(original);

  // overwrite the require cache
  require.cache[fullPath] = _defineProperty({
    exports: mockedModule
  }, ORIGINAL, original);

  return mockedModule;
}

// remove a module from the require cache

function flush(modulePath, context) {
  var fullPath = resolveModulePath(modulePath, context);
  return delete require.cache[fullPath];
}

// completely clear the require cache

function flushAllModules() {
  for (var key in require.cache) {
    if (require.cache.hasOwnProperty(key)) {
      delete require.cache[key];
    }
  }
}