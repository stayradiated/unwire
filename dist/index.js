'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = unwire;
exports.flush = flush;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _core = require('./core');

var core = _interopRequireWildcard(_core);

var _caller = require('caller');

var _caller2 = _interopRequireDefault(_caller);

function unwire(modulePath, mock) {
  return core.unwire(modulePath, (0, _caller2['default'])(), mock);
}

function flush(modulePath) {
  return core.flush(modulePath, (0, _caller2['default'])());
}

var unwireWithContext = core.unwire;
exports.unwireWithContext = unwireWithContext;
var flushWithContext = core.flush;
exports.flushWithContext = flushWithContext;
var flushAllModules = core.flushAllModules;
exports.flushAllModules = flushAllModules;