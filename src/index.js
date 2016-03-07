import * as core from './core'
import caller from 'caller'

export default function unwire (modulePath, mock) {
  return core.unwire(modulePath, caller(), mock)
}

export function replace (modulePath, value) {
  return core.replace(modulePath, caller(), value)
}

export function flush (modulePath) {
  return core.flush(modulePath, caller())
}

export const replaceWithContext = core.replace
export const unwireWithContext = core.unwire
export const flushWithContext = core.flush
export const flushAllModules = core.flushAllModules
