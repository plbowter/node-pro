var buffer1 = new Buffer('ABC');
// 拷贝一个缓冲区
var buffer2 = new Buffer(3);

 console.log('==== 打印的是buffer 的内容====' + buffer1);
 console.log('==== 打印的是buffer.toString()的内容===' + buffer1.toString());

// var result = buffer1.copy(buffer2);
buffer1.copy(buffer2);

// console.log('====打印的是result的结果===' + result);
// console.log('====打印的是result.toString()的结果====' + result.toString());

 console.log('====打印的是 buffer2的结果====' + buffer2);
 console.log('====打印的是 buffer2.toString()的结果====' + buffer2.toString());

 console.log('buffer2 content：' + buffer2.toString());

