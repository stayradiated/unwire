module.exports = function () {
  // see https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  const origPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = function (_, stack) {
    return stack;
  };
  const stack = new Error().stack;
  Error.prepareStackTrace = origPrepareStackTrace;
  return stack[2].getFileName();
};