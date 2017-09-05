import fs from 'fs'
import path from 'path'
import resolve from 'resolve'

const ORIGINAL = Symbol('Original')

export function resolveModulePath (modulePath, context) {
  if (resolve.isCore(modulePath)) {
    return modulePath
  }
  const folder = path.dirname(context)
  const resolvedPath = resolve.sync(modulePath, {basedir: folder})
  return fs.realpathSync(resolvedPath)
}

export function replace (modulePath, context, value) {
  const fullPath = resolveModulePath(modulePath, context)

  // overwrite the require cache
  require.cache[fullPath] = {
    exports: value,
  }

  return value
}

export function unwire (modulePath, context, mock = (x) => x) {
  const fullPath = resolveModulePath(modulePath, context)
  const cache = require.cache[fullPath]

  // check if we have already rewired this path
  var original
  if ((typeof cache !== 'undefined') && cache.hasOwnProperty(ORIGINAL)) {
    original = cache[ORIGINAL]
  } else {
    original = require(fullPath)
  }

  // mock the module
  const mockedModule = mock(original)

  // overwrite the require cache
  require.cache[fullPath] = {
    exports: mockedModule,
    [ORIGINAL]: original,
  }

  return mockedModule
}

// remove a module from the require cache
export function flush (modulePath, context) {
  const fullPath = resolveModulePath(modulePath, context)
  return delete require.cache[fullPath]
}

// completely clear the require cache
export function flushAllModules () {
  for (const key in require.cache) {
    if (require.cache.hasOwnProperty(key)) {
      delete require.cache[key]
    }
  }
}
