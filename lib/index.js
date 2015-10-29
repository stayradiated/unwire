import * as lib from './unwire';
import caller from './caller';

export default function unwire (path, mock) {
  return lib.unwire(path, caller(), mock);
}

export function flush (path) {
  return lib.flush(path, caller());
}

export const flushAll = lib.flushAll;

// remove self from require.cache
// so that `module.parent` is always up to date
delete require.cache[__filename];
