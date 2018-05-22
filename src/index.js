const caller = require('caller')
const core = require('./core')

function mock(modulePath, mock) {
  return core.mock(modulePath, caller(), mock)
}

function replace(modulePath, value) {
  return core.replace(modulePath, caller(), value)
}

function flush(modulePath) {
  return core.flush(modulePath, caller())
}

module.exports = {
  mock,
  replace,
  flush,
  mockWithContext: core.mock,
  replaceWithContext: core.replace,
  flushWithContext: core.flush,
  flushAllModules: core.flushAllModules,
  resolveModulePath: core.resolveModulePath
}
