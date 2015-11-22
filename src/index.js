import * as core from './core'
import caller from 'caller'

export default function unwire (modulePath, mock) {
  return core.unwire(modulePath, caller(), mock)
}

export function flush (modulePath) {
  return core.flush(modulePath, caller())
}

export const unwireWithContext = core.unwire
export const flushWithContext = core.flush
export const flushAllModules = core.flushAllModules
