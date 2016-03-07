'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flushAllModules = exports.flushWithContext = exports.unwireWithContext = exports.replaceWithContext = undefined;
exports.default = unwire;
exports.replace = replace;
exports.flush = flush;

var _core = require('./core');

var core = _interopRequireWildcard(_core);

var _caller = require('caller');

var _caller2 = _interopRequireDefault(_caller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function unwire(modulePath, mock) {
  return core.unwire(modulePath, (0, _caller2.default)(), mock);
}

function replace(modulePath, value) {
  return core.replace(modulePath, (0, _caller2.default)(), value);
}

function flush(modulePath) {
  return core.flush(modulePath, (0, _caller2.default)());
}

var replaceWithContext = exports.replaceWithContext = core.replace;
var unwireWithContext = exports.unwireWithContext = core.unwire;
var flushWithContext = exports.flushWithContext = core.flush;
var flushAllModules = exports.flushAllModules = core.flushAllModules;