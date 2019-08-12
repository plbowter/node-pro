var fs = require("fs");

fs.readFile('input.txt',function (err,data) {
   if (err) return console.log.error(err);
  console.log("===== 我打印的是 data 的内容====",data.toString());
});

console.log("程序执行结束！");

console.log("=================== 下面要执行 events 模块的内容了 ================");

// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
 console.log('连接成功。');

// 触发 data_received 事件
eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection',connectHandler);

// 使用匿名函数绑定 data_received 事件
even
