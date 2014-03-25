'use strict';

var unwire = require('./unwire');


module.exports = function (path) {
  return unwire(path, module.parent.filename);
};

module.exports.flush = function (path) {
  return unwire.flush(path, module.parent.filename);
};


// remove self from require.cache
// so that 'module.parent' is always up to date
delete require.cache[__filename];
