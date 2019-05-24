import fs from 'fs'
import path from 'path'
import resolve from 'resolve'

import { MockFn } from './types'

const I = (x: any): any => x
const ORIGINAL = Symbol('Original')

const resolveModulePath = (modulePath: string, context: string) => {
  if (resolve.isCore(modulePath)) {
    return modulePath
  }
  const folder = path.dirname(context)
  const resolvedPath = resolve.sync(modulePath, {basedir: folder})
  return fs.realpathSync(resolvedPath)
}

const replace = (modulePath: string, context: string, value: any) => {
  const fullPath = resolveModulePath(modulePath, context)

  // Overwrite the require cache
  require.cache[fullPath] = {
    exports: value,
  }

  return value
}

const mock = (modulePath: string, context: string, mock: MockFn = I) => {
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
    [ORIGINAL]: original,
  }

  return mockedModule
}

// Remove a module from the require cache
const flush = (modulePath: string, context: string) => {
  const fullPath = resolveModulePath(modulePath, context)
  return delete require.cache[fullPath]
}

// Completely clear the require cache
const flushAllModules = () => {
  for (const key in require.cache) {
    if (Object.hasOwnProperty.call(require.cache, key)) {
      delete require.cache[key]
    }
  }
}

export { flush, flushAllModules, mock, replace, resolveModulePath }
