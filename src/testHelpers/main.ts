const fs = require('fs')

module.exports = function() {
  return fs.readFileSync('/tmp/some_file_that_does_not_exist')
}
