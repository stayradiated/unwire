// usually readFile is actually readFile
// but in the test, it is the rewired version of readFile
var readFile = require('./readFile')

module.exports = function () {
  return readFile()
}
