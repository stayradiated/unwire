import assert from 'assert'
import {describe, it} from 'mocha'

import unwire, {replace, flush} from '../src'

function mockReadFile (original) {
  return () => 'some content'
}

describe('unwire', () => {
  it('should fail by default', () => {
    const main = require('./source/main')

    // by default, main() should throw an error
    assert.throws(main, /no such file or directory/)

    // remove ./source/main from require.cache
    flush('./source/main')
  })

  it('should replace readFile in ./source/main', () => {
    // unwire readfile
    // https://www.npmjs.org/package/rewire => details on how to use rewire
    unwire('./source/readFile', mockReadFile)

    // load main
    // note that it now uses the rewired version of readFile
    flush('./source/main')
    const main = require('./source/main')

    assert(main() === 'some content')

    flush('./source/main')
  })

  it('should mock everytime', () => {
    const a = unwire('./source/readFile', mockReadFile)
    const b = unwire('./source/readFile', mockReadFile)
    assert.notEqual(a, b)
  })

  it('should replace a css file', () => {
    const value = {container: 'container'}
    replace('./source/styles.css', value)
    assert.equal(require('./source/styles.css'), value)
    flush('./source/styles.css')
  })

  it('should mock a core module', () => {
    unwire('fs', mockReadFile)
    assert.equal(require('fs')(), 'some content')
    flush('fs')
  })
})
