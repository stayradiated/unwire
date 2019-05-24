import caller from 'caller'
import * as core from './core'

import { MockFn } from './types'

function mock (modulePath: string, mock: MockFn) {
  return core.mock(modulePath, caller(), mock)
}

function replace (modulePath: string, value: any) {
  return core.replace(modulePath, caller(), value)
}

function flush (modulePath: string) {
  return core.flush(modulePath, caller())
}

const mockWithContext = core.mock
const replaceWithContext = core.replace
const flushWithContext = core.flush
const flushAllModules = core.flushAllModules
const resolveModulePath = core.resolveModulePath

export {
  mock,
  replace,
  flush,
  mockWithContext,
  replaceWithContext,
  flushWithContext,
  flushAllModules,
  resolveModulePath,
}
