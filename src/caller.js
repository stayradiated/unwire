export default function caller () {
  // see https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  const origPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = (_, stack) => stack;

  const stack = (new Error()).stack;
  Error.prepareStackTrace = origPrepareStackTrace;

  return stack[2].getFileName();
};
