/**
 * 缓冲区裁剪
 */
var buffer1 = new Buffer('youj');
// 裁剪缓冲区
var buffer2 = buffer1.slice(0,2);
console.log('buffer2 content:',buffer2.toString()); // buffer2 content: yo