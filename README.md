# Unwire

> Dependency injection with 'require()'

Unwire uses [rewire](https://www.npmjs.org/package/rewire) to allow you to
inject code.

However, it also manipulates `require.cache` so that any files that depend on
it will be given the rewired version.

## Install

```
npm install --save-dev unwire
```

## Example Usage

**source/readFile.js**

*A module that uses a dependency you want to replace*

```javascript
var fs = require('fs');

module.exports = function () {

  // normally this would fail
  // but in the test, we replace 'fs' with 'mock_fs'
  return fs.readFileSync('some_file_that_does_not_exist.txt');

};
```

**source/main.js**

*A module that uses a rewired module*

```javascript
// usually readFile is actually readFile
// but in the test, it is the rewired version of readFile
var readFile = require('./readFile');

module.exports = function () {
  return readFile();
};
```

**test.js**

*Testing source/main.js but using a mocked fs*

```javascript
var assert = require('assert');
var unwire = require('unwire');

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
});
```

## What This Solves

Having to rewire all the files and replace the dependencies.

**test.js**

```javascript
var assert = require('assert');
var rewire = require('rewire');

var mockFs = {
  readFileSync: function () {
    return 'some content';
  }
};

// we have to rewire both readFile and main
// even though we only want to change readFile

var readFile = rewire('./source/readFile');
var main = rewire('./source/main');

readFile.__set__('fs', mockFs);
main.__set__('readFile', readFile);

assert(main() === 'some content');
```

## API

### unwire

Rewire a module and overwrite the original in `require.cache`.

**Parameters:**

- `path` (string) : the module to rewire

**Example:**

```javascript
var unwire = require('unwire');

var readFile = unwire('./source/readFile');
readFile.__set__('fs', mockFs);

var main = require('./source/main');
main();
```


### unwire(path).\_\_unwire\_\_

Reset `require.cache` with the original module.

**Parameters:**

- *No parameters*

**Example:**

```javascript
var unwire = require('unwire');

var original = require('./source/readFile');
var modified = unwire('./source/readFile');

require('./source/readFile') === modified; // true
require('./source/readFile') === original; // false

readFile.__unwire__();

require('./source/readFile') === modified; // false
require('./source/readFile') === original; // true
```


### unwire.flush

Remove a module from `require.cache`. If not path is specified, it flushes all
modules.

**Parameters:**

- `[path]` (string) : optional. The module to reset.

**Example:**

```javascript
var unwire = require('unwire');

// source/main is loaded into cache before readFile is unwired
require('./source/main');

var readFile = unwire('./source/readFile');
readFile.__set__('fs', { ... });

// source/main has already been cached, so it doesn't work
var main = require('./source/main');
main(); // throw error

// source/main is removed from cache
unwire.flush('./source/main');

// source/main is reloaded and now uses the unwired version of readFile
main = require('./source/main');
main(); // success!
```

## License

The MIT License (MIT)

Copyright (c) 2014 George Czabania

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


## Changelog

### 0.0.4

- Fix bug with unwire().\_\_unwire\_\_ not always reverting to the original
  version
- Move code into lib/
- Split code into two files. One with logic and the other with the public api.
- Update docs with better examples
- Add MIT license

### 0.0.3

- Remove self from require.cache so that module.parent is always up to date

### 0.0.2

- Use `module.parent` to detect where unwire is being called from
- Add readme
- Add better tests
- Add unwire.flush();

### 0.0.1

- Initial commit
