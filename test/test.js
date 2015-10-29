import assert from 'assert';
import unwire, {flush, flushAll} from '../lib';

function mockReadFile (original) {
  return function () {
    return 'some content';
  };
};

describe('unwire', function () {

  it('should fail by default', function () {
    const main = require('./source/main');

    // by default, main() should throw an error
    assert.throws(main, /no such file or directory/);

    // remove ./source/main from require.cache 
    flush('./source/main');
  });

  it('should replace readFile in ./source/main', function () {
    // unwire readfile
    // https://www.npmjs.org/package/rewire => details on how to use rewire
    const readFile = unwire('./source/readFile', mockReadFile);

    // load main
    // note that it now uses the rewired version of readFile
    flush('./source/main');
    const main = require('./source/main');

    assert(main() === 'some content');

    flush('./source/main');
  });

  it('should reuse the unwired version', function () {
    const a = unwire('./source/readFile', mockReadFile);
    const b = unwire('./source/readFile', mockReadFile);

    assert.equal(a, b);

    flushAll();
    const c = unwire('./source/readFile', mockReadFile);

    assert.notEqual(a, c);
    assert.notEqual(b, c);
  });
});
