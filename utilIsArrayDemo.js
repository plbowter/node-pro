var util = require('util');

var arr1 = util.isArray([])
// true
var arr2 = util.isArray(new Array)
// true
var arr3 = util.isArray({})

console.log(arr1,arr2,arr3);