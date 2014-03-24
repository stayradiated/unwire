# Unwire

> Dependency injection with 'require()'

Unwire uses [rewire](https://www.npmjs.org/package/rewire) to allow you to
inject code.

However, it also manipulates `require.cache` so that any files that depend on
it will be given the rewired version.

## Install

```
npm install unwire
```

## Example Usage

**source/readFile.js**

*A module that uses a dependency you want to replace*

```javascript
var fs = require('fs');

module.exports = function() {
    return fs.readFileSync('somefile.txt');
};
```

**source/main.js**

*A module that uses a rewired module*

```javascript
var readFile = require('../source/readFile');

module.exports = function () {
    return readFile();
};
```

**test/mock_fs**

*Something to replace fs with*

```javascript
module.exports = {
    readFileSync: function () {
        return 'some content';
    }
}
```

**test.js**

*The test*

```javascript
var unwire = require('unwire');
var mockFs = require('../test/mock_fs');

var readFile = unwire('../source/readFile');

// readFile will now use mockFs instead of it's version of fs
readFile.__set__('fs', mockFs);

// main will require() the rewired version of readFile
var main = require('./source/main');

assert(main() === 'some content');
```

## What This Solves

Having to rewire all the files and replace the dependencies.

**test.js**

```javascript
var rewire = require('rewire');
var mockFs = require('../test/mock_fs/');

var readFile = rewire('./source/readFile');
var main = rewire('./source/main');

// what we want to avoid
readFile.__set__('fs', mockFs);
main.__set__('readFile', readFile);

assert(main() === 'some content');
```

## Changelog

### 0.0.2

- Use `module.parent` to detect where unwire is being called from
- Add readme
- Add better tests
- Add unwire.flush();

### 0.0.1

- Initial commit
