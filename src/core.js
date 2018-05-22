const fs = require('fs')
const path = require('path')
const resolve = require('resolve')

const ORIGINAL = Symbol('Original')

function resolveModulePath(modulePath, context) {
  if (resolve.isCore(modulePath)) {
    return modulePath
  }
  const folder = path.dirname(context)
  const resolvedPath = resolve.sync(modulePath, {basedir: folder})
  return fs.realpathSync(resolvedPath)
}

function replace(modulePath, context, value) {
  const fullPath = resolveModulePath(modulePath, context)

  // Overwrite the require cache
  require.cache[fullPath] = {
    exports: value
  }

  return value
}

function mock(modulePath, context, mock = x => x) {
  const fullPath = resolveModulePath(modulePath, context)
  const cache = require.cache[fullPath]

  // Check if we have already rewired this path
  let original
  if (
    typeof cache !== 'undefined' &&
    Object.hasOwnProperty.call(cache, ORIGINAL)
  ) {
    original = cache[ORIGINAL]
  } else {
    original = require(fullPath)
  }

  // Mock the module
  const mockedModule = mock(original)

  // Overwrite the require cache
  require.cache[fullPath] = {
    exports: mockedModule,
    [ORIGINAL]: original
  }

  return mockedModule
}

// Remove a module from the require cache
function flush(modulePath, context) {
  const fullPath = resolveModulePath(modulePath, context)
  return delete require.cache[fullPath]
}

// Completely clear the require cache
function flushAllModules() {
  for (const key in require.cache) {
    if (Object.hasOwnProperty.call(require.cache, key)) {
      delete require.cache[key]
    }
  }
}

module.exports = {
  flush,
  flushAllModules,
  mock,
  replace,
  resolveModulePath
}
