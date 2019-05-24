import anyTest, {TestInterface} from 'ava';

const test = anyTest as TestInterface<{}>;

const { mock, replace, flush } = require('./index')

const MOCK_FS = () => ({
  readFileSync: () => 'some content'
})

test('should fail by default', t => {
  flush('./testHelpers/main')
  const main = require('./testHelpers/main')

  // By default, main() should throw an error
  t.throws(main, /no such file or directory/)
})

test('should mock fs in ./testHelpers/main', t => {
  // Mock readfile
  // https://www.npmjs.org/package/rewire => details on how to use rewire
  mock('fs', MOCK_FS)

  // Load main
  // note that it now uses the rewired version of readFile
  flush('./testHelpers/main')
  const main = require('./testHelpers/main')

  t.is(main(), 'some content')
})

test('should mock everytime', t => {
  const a = mock('fs', MOCK_FS)
  const b = mock('fs', MOCK_FS)
  t.not(a, b)
})

test('should replace a files contents', t => {
  const value = {container: 'container'}
  replace('./testHelpers/empty', value)
  t.is(require('./testHelpers/empty'), value)
  flush('./testHelpers/empty')
})
