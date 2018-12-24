import anyTest, {TestInterface} from 'ava';

const test = anyTest as TestInterface<{}>;

const { mock, replace, flush } = require('../src')

const MOCK_FS = () => ({
  readFileSync: () => 'some content'
})

test('should fail by default', t => {
  flush('./helpers/main')
  const main = require('./helpers/main')

  // By default, main() should throw an error
  t.throws(main, /no such file or directory/)
})

test('should replace fs in ./helpers/main', t => {
  // Mock readfile
  // https://www.npmjs.org/package/rewire => details on how to use rewire
  mock('fs', MOCK_FS)

  // Load main
  // note that it now uses the rewired version of readFile
  flush('./helpers/main')
  const main = require('./helpers/main')

  t.is(main(), 'some content')
})

test('should mock everytime', t => {
  const a = mock('fs', MOCK_FS)
  const b = mock('fs', MOCK_FS)
  t.not(a, b)
})

test('should replace a css file', t => {
  const value = {container: 'container'}
  replace('./helpers/styles.css', value)
  t.is(require('./helpers/styles.css'), value)
  flush('./helpers/styles.css')
})
