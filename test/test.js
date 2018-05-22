const test = require('ava')

const {mock, replace, flush} = require('../src')

function mockReadFile() {
  return () => 'some content'
}

test('should fail by default', t => {
  const main = require('./helpers/main')

  // By default, main() should throw an error
  t.throws(main, /no such file or directory/)

  // Remove ./helpers/main from require.cache
  flush('./helpers/main')
})

test('should replace readFile in ./helpers/main', t => {
  // Mock readfile
  // https://www.npmjs.org/package/rewire => details on how to use rewire
  mock('./helpers/read-file', mockReadFile)

  // Load main
  // note that it now uses the rewired version of readFile
  flush('./helpers/main')
  const main = require('./helpers/main')

  t.is(main(), 'some content')

  flush('./helpers/main')
})

test('should mock everytime', t => {
  const a = mock('./helpers/read-file', mockReadFile)
  const b = mock('./helpers/read-file', mockReadFile)
  t.not(a, b)
})

test('should replace a css file', t => {
  const value = {container: 'container'}
  replace('./helpers/styles.css', value)
  t.is(require('./helpers/styles.css'), value)
  flush('./helpers/styles.css')
})

test('should mock a core module', t => {
  mock('fs', mockReadFile)
  t.is(require('fs')(), 'some content')
  flush('fs')
})
