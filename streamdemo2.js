var fs = require("fs");
var data = 'W3Cschool教程官网地址：www.w3cschool.cn';

// 创建一个可以写入的流，写入到文件 output.txt 中
var writerSteam = fs.createWriteStream('output.txt');

// 使用 utf8 编码写入数据
writerSteam.write(data,'UTF8');

// 标记文件末尾
writerSteam.end();

// 处理流事件 --> data,end,and error
writerSteam.on('finish',function(){
    console.log('写入完成。');
});

writerSteam.on('error',function(err){
    console.log(err.stack);
});

console.log("程序执行完毕");