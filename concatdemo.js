var buffer1 = new Buffer('w3cschool教程');
var buffer2 = new Buffer('www.w3cschool.cn');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容：" + buffer3.toString());
