var fs = require('fs')

module.exports = function () {
  // normally this would fail
  // but in the test, we replace 'fs' with 'mock_fs'
  return fs.readFileSync('some_file_that_does_not_exist.txt')
}
