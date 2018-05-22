const core = require('./core')
const caller = require('caller')

function unwire (modulePath, mock) {
  return core.unwire(modulePath, caller(), mock)
}

function replace (modulePath, value) {
  return core.replace(modulePath, caller(), value)
}

function flush (modulePath) {
  return core.flush(modulePath, caller())
}

module.exports = {
  unwire,
  replace,
  flush,
  replaceWithContext: core.replace,
  unwireWithContext: core.unwire,
  flushWithContext: core.flush,
  flushAllModules: core.flushAllModules,
  resolveModulePath: core.resolveModulePath
}
