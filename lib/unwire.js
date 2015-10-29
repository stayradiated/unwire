import path from 'path';
import resolve from 'resolve';

const UNWIRED = Symbol('original');

export function unwire (module, from, mock) {
  const folder = path.dirname(from);
  const fullPath = resolve.sync(module, {basedir: folder});

  const original = require(fullPath);
  const cache = require.cache[fullPath];

  // check if we have already rewired this path
  if (cache[UNWIRED]) {
    return cache.exports;
  }

  // Overwrite cache
  const fake = mock(original);
  cache[UNWIRED] = true;
  cache.exports = fake;

  return fake;
}


// only delete a single module
export function flush (module, from) {
  const folder = path.dirname(from);
  const fullPath = resolve.sync(module, {basedir: folder});
  return delete require.cache[fullPath];
}

// reset everything
export function flushAll () {
  for (const key in require.cache) {
    if (require.cache.hasOwnProperty(key)) {
      delete require.cache[key];
    }
  }
}

