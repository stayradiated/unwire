'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = unwire;
exports.flush = flush;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _unwire = require('./unwire');

var lib = _interopRequireWildcard(_unwire);

var _caller = require('./caller');

var _caller2 = _interopRequireDefault(_caller);

function unwire(path, mock) {
  return lib.unwire(path, (0, _caller2['default'])(), mock);
}

function flush(path) {
  return lib.flush(path, (0, _caller2['default'])());
}

var flushAll = lib.flushAll;

exports.flushAll = flushAll;
// remove self from require.cache
// so that `module.parent` is always up to date
delete require.cache[__filename];