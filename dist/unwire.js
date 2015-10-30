import path from 'path';
import resolve from 'resolve';

const ORIGINAL = Symbol('original');

export function unwire(module, from, mock) {
  const folder = path.dirname(from);
  const fullPath = resolve.sync(module, { basedir: folder });

  // check if we have already rewired this path
  var original;
  const cache = require.cache[fullPath];
  if (typeof cache !== 'undefined' && cache.hasOwnProperty(ORIGINAL)) {
    original = cache[ORIGINAL];
  } else {
    original = require(fullPath);
  }

  // Overwrite cache
  const fake = mock(original);

  require.cache[fullPath] = {
    exports: fake,
    [ORIGINAL]: original
  };

  return fake;
}

// only delete a single module
export function flush(module, from) {
  const folder = path.dirname(from);
  const fullPath = resolve.sync(module, { basedir: folder });
  return delete require.cache[fullPath];
}

// reset everything
export function flushAll() {
  for (const key in require.cache) {
    if (require.cache.hasOwnProperty(key)) {
      delete require.cache[key];
    }
  }
}