// Usually readFile is actually readFile
// but in the test, it is the rewired version of readFile
const readFile = require('./read-file')

module.exports = function() {
  return readFile()
}
