# Unwire

> Dependency injection for Node.js

## Install

```
npm install unwire
```

## Example Usage

**config.js**

*The file that uses a dependency you want to mock*

```javascript
const fs = require('fs')

function readConfig () {
  return fs.readFileSync('./config.json')
}

module.exports = readConfig
```

**test.js**

*Testing config.js but mocking the fs module*

```javascript
const assert = require('assert')
const { mock } = require('unwire')

const mockFs = (config) => ({
  readFileSync: () => config,
})

// force fs.readFileSync to read our expected config
const expectedConfig = 'CONFIG'
mock('fs', mockFs(expectedConfig))

// load config.js - it will use the mocked fs object
const readConfig = require('./config.js')

const config = readConfig()
assert.equal(config, expectedConfig)
```

## API

### mock(modulePath, mock)

### replace(modulePath, value)

### flush(modulePath)

### mockWithContext(modulePath, context, mock)

### replaceWithContext(modulePath, context, value)

### flushWithContext(modulePath, context)

### flushAllModules()

### resolveModulePath(modulePath, context)

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
