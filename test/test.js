var assert = require('assert');
var unwire = require('../lib');

var mockFs = {
  readFileSync: function () {
    return 'some content';
  }
};


describe('unwire', function () {

  it('should replace readFile in ./source/main', function () {

    var main = require('./source/main');

    // by default, main() should throw an error
    assert.throws(main, /no such file or directory/);

    // remove ./source/main from require.cache 
    unwire.flush('./source/main');

    // unwire readfile
    // https://www.npmjs.org/package/rewire => details on how to use rewire
    var readFile = unwire('./source/readFile');
    readFile.__set__('fs', mockFs);

    // load main
    // note that it now uses the rewired version of readFile
    main = require('./source/main');

    assert(main() === 'some content');

  });

  it('should reuse the unwired version', function () {

    // flush everything
    unwire.flush();

    var a = unwire('./source/readFile');
    var b = unwire('./source/readFile');

    assert.equal(a, b);

    a.__unwire__();

    var c = unwire('./source/readFile');
    assert.notEqual(a, c);
    assert.notEqual(b, c);

  });

});
