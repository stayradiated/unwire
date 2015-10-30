"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = caller;

function caller() {
  // see https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  var origPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };

  var stack = new Error().stack;
  Error.prepareStackTrace = origPrepareStackTrace;

  return stack[2].getFileName();
}

;
module.exports = exports["default"];