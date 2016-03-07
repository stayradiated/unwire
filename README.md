# Unwire

> Dependency injection with 'require()'

## Install

```
npm install unwire
```

## Example Usage

**request.js**

*The file that uses a dependency you want to mock*

```javascript
var http = require('http');

module.exports = function (fn) {
  return http.request({
    host: 'https://npmjs.org',
    path: '/',
  }, fn);
};
```

**test.js**

*Testing source/test.js but mocking http*

```javascript
var assert = require('assert');
var unwire = require('unwire').unwire;

function mockRequest (value) {
  return {
    request: function (options, callback) {
      return callback(null, value);
    },
  };
};

describe('request.js', function () {
  it('should make a http request', function () {
    var requsetValue = 'request value';
    var request = unwire('./request.js', mockRequest(requestValue));

    request(function (err, response) {
      assert.equal(err, null);
      assert.equal(response, requestValue);
    });
  });
});
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
