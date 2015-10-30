import path from 'path';
import resolve from 'resolve';

const ORIGINAL = Symbol('original');

export function getFullPath (module, from) {
  const folder = path.dirname(from);
  return resolve.sync(module, {basedir: folder});
}

export function unwire (module, from, mock) {
  const fullPath = getFullPath(module, from);

  // check if we have already rewired this path
  var original;
  const cache = require.cache[fullPath];
  if ((typeof cache !== 'undefined') && cache.hasOwnProperty(ORIGINAL)) {
    original = cache[ORIGINAL];
  } else {
    original = require(fullPath);
  }

  // Overwrite cache
  const fake = mock(original);

  require.cache[fullPath] = {
    exports: fake,
    [ORIGINAL]: original,
  };

  return fake;
}

// remove a module from the require cache
export function flush (module, from) {
  const fullPath = getFullPath(module, from);
  return delete require.cache[fullPath];
}

// completly clear the require cache
export function flushAll () {
  for (const key in require.cache) {
    if (require.cache.hasOwnProperty(key)) {
      delete require.cache[key];
    }
  }
}

