'use strict';

var unwire = require('./index');

var unwired = unwire('./index');

console.log(unwired);

console.log(require('./index'));

unwired.__unwire__();

console.log(require('./index'));




