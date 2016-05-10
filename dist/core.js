'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveModulePath = resolveModulePath;
exports.replace = replace;
exports.unwire = unwire;
exports.flush = flush;
exports.flushAllModules = flushAllModules;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ORIGINAL = Symbol('Original');

function resolveModulePath(modulePath, context) {
  var folder = _path2.default.dirname(context);
  var resolvedPath = _resolve2.default.sync(modulePath, { basedir: folder });
  return _fs2.default.realpathSync(resolvedPath);
}

function replace(modulePath, context, value) {
  var fullPath = resolveModulePath(modulePath, context);

  // overwrite the require cache
  require.cache[fullPath] = {
    exports: value
  };

  return value;
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