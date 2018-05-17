# Unwire

> Dependency injection with 'require()'

## Install

```
npm install unwire
```

## Example Usage

**config.js**

*The file that uses a dependency you want to mock*

```javascript
import fs from 'fs'

export default function readConfig () {
  return fs.readFileSync('./config.json')
}
```

**test.js**

*Testing source/test.js but mocking http*

```javascript
import assert from 'assert'
import { unwire } from 'unwire'

function mockFs (config) {
  return {
    readFileSync: () => config,
  }
}

describe('request.js', function () {
  it('should make a http request', function () {
    const expectedConfig = 'CONFIG'

    // replace fs with our mocked fs
    unwire('fs', mockFs(expectedConfig))

    // load config.js - it will use the mocked fs object
    const readConfig = require('./config.js')

    const config = readConfig()
    assert.equal(config, expectedConfig)
  })
})
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
