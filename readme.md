# Node.js 教程
# Node.js 安装配置
# Node.js 创建第一个应用
使用Node.js时，我们不仅仅在实现一个应用，同时还实现了整个HTTP服务器。事实上，我们的Web应用以及对应的Web服务器基本上是一样的。

在我们创建Node.js第一个"Hello, World!"应用前，让我们先了解下Node.js应用是由哪几部分组成的：
1. **引入 required 模块:** 我们可以使用 require 指令来载入 Node.js 模块
2. **创建服务器：** 服务器可以监听客户端的请求，类似于Apache 、Nginx等HTTP服务器。
3. **接收请求与响应请求：** 服务器很容易创建，客户端可以使用浏览器或终端发送HTTP请求，服务器接收请求后返回响应数据。


* * *
`创建 Node.js 应用`
###### 步骤一、引入required 模块
我们使用`require`指令来载入`http`模块，并将实例化的`HTTP`赋值给变量`http`，实例如下：
```
var http = require("http");
```
###### 步骤二、创建服务器
接下来我们使用`http.createServer()`方法创建服务器，并使用`listen`方法绑定`8888`端口。 函数通过`request`, `response`参数来接收和响应数据。

实例如下，在你项目的根目录下创建一个叫server.js的文件，并写入以下代码：
```
var http = require('http');

http.createServer(function(request,response) {
 // 发送 HTTP 头部
 // HTTP 状态值：200 ：OK
 // 内容类型：text/plain
 response.writeHead(200, {'Content-type':'text/plain'});

 // 发送响应数据 "Hello World"
 response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```
# Node.js NPM 使用介绍
NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：

允许用户从NPM服务器下载别人编写的第三方包到本地使用。
允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

由于新版的nodejs已经集成了npm，所以之前npm也一并安装好了。同样可以通过输入

"npm -v"

来测试是否成功安装。命令如下，出现版本提示表示安装成功:
```
$ npm -v
6.4.1
```
如果你安装的是旧版本的 npm，可以很容易得通过 npm 命令来升级，命令如下：
```
$ sudo npm install npm -g
/usr/local/bin/npm -> /usr/local/lib/node_modules/npm/bin/npm-cli.js
npm@2.14.2 /usr/local/lib/node_modules/npm
```
如果是 Window 系统使用以下命令即可：
```
npm install npm -g
```

* * *
`全局安装与本地安装`
npm 的包安装分为本地安装（local）、全局安装（global）两种，从敲的命令行来看，差别只是有没有-g而已，比如
```
npm install express          # 本地安装
npm install express -g   # 全局安装
```
如果出现以下错误：
```
$ npm config set proxy null
```
###### 本地安装
- i. 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。
- i. 可以通过 require() 来引入本地安装的包。

###### 全局安装

- i. 将安装包放在 /usr/local 下或者你 node 的安装目录。
- i. 可以直接在命令行里使用。

如果你希望具备两者功能，则需要在两个地方安装它或使用 npm link。
##### `NPM 应用`

NPM建立了一个NodeJS生态圈，NodeJS开发者和用户可以在里边互通有无。以下介绍NPM应用的三种场景：

##### 下载第三方包

我们可以使用以下命令来下载第三方包。
```
$ npm install argv
...
argv@0.0.2 node_modules\argv
```
下载好之后，argv包就放在了工程目录下的node_modules目录中，因此在代码中只需要通过require('argv')的方式就好，无需指定第三方包路径。

以上命令默认下载最新版第三方包，如果想要下载指定版本的话，可以在包名后边加上@<version>，例如通过以下命令可下载0.0.1版的argv。
```
$ npm install argv@0.0.1
...
argv@0.0.1 node_modules\argv
```
NPM对package.json的字段做了扩展，允许在其中申明第三方包依赖。因此，上边例子中的package.json可以改写如下：
```
{
    "name": "node-echo",
    "main": "./lib/echo.js",
    "dependencies": {
        "argv": "0.0.2"
    }
}
```
这样处理后，在工程目录下就可以使用npm install命令批量安装第三方包了。

更重要的是，当以后node-echo也上传到了NPM服务器，别人下载这个包时，NPM会根据包中申明的第三方包依赖自动下载进一步依赖的第三方包。

例如，使用npm install node-echo命令时，NPM会自动创建以下目录结构。
```
- project/
    - node_modules/
        - node-echo/
            - node_modules/
                + argv/
            ...
    ...
```
如此一来，用户只需关心自己直接使用的第三方包，不需要自己去解决所有包的依赖关系。
##### 安装命令行程序
从NPM服务上下载安装一个命令行程序的方法与第三方包类似。

例如上例中的node-echo提供了命令行使用方式，只要node-echo自己配置好了相关的package.json字段，对于用户而言，只需要使用以下命令安装程序。
```
$ npm install node-echo -g
```
参数中的-g表示全局安装，因此node-echo会默认安装到以下位置，并且NPM会自动创建好Linux系统下需要的软链文件或Windows系统下需要的.cmd文件。

```
- /usr/local/               # Linux系统下
    - lib/node_modules/
        + node-echo/
        ...
    - bin/
        node-echo
        ...
    ...

- %APPDATA%\npm\            # Windows系统下
    - node_modules\
        + node-echo\
        ...
    node-echo.cmd
    ...
```
##### 发布代码
第一次使用NPM发布代码前需要注册一个账号。终端下运行npm adduser，之后按照提示做即可。

账号注册完成后，接着我们需要编辑package.json文件，加入NPM必需的字段。接着上边node-echo的例子，package.json里必要的字段如下。
```
{
    "name": "node-echo",           # 包名，在NPM服务器上须要保持唯一
    "version": "1.0.0",            # 当前版本号
    "dependencies": {              # 第三方包依赖，需要指定包名和版本号
        "argv": "0.0.2"
      },
    "main": "./lib/echo.js",       # 入口模块位置
    "bin" : {
        "node-echo": "./bin/node-echo"      # 命令行程序名和主模块位置
    }
}
```

之后，我们就可以在package.json所在目录下运行npm publish发布代码了。

##### `版本号`
使用NPM下载和发布代码时都会接触到版本号。NPM使用语义版本号来管理代码，这里简单介绍一下。

语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。

- 如果只是修复bug，需要更新Z位。
- 如果是新增了功能，但是向下兼容，需要更新Y位。
- 如果有大变动，向下不兼容，需要更新X位。

版本号有了这个保证后，在申明第三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。

NPM支持的所有版本号范围指定方式可以查看[官方文档](https://cloud.tencent.com/developer/doc/1282?from=10680)。

##### `NPM 常用命令`

除了可以在[npmjs.org/doc/](https://www.npmjs.com/package/doc)查看官方文档外，这里再介绍一些NPM常用命令。
NPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。
- NPM提供了很多命令，例如install和publish，使用npm help可查看所有命令。
- 使用npm help <command>可查看某条命令的详细帮助，例如npm help install。
- 在package.json所在目录下使用npm install . -g可先在本地安装当前命令行程序，可用于发布前的本地测试。
- 使用npm update <package>可以把当前目录下node_modules子目录里边的对应模块更新至最新版本。
- 使用npm update <package> -g可以把全局安装的对应命令行程序更新至最新版。
- 使用npm cache clear可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人。
- 使用npm unpublish <package>@<version>可以撤销发布自己发布过的某个版本代码。

# Node.js REPL(交互式解释器)
##### `Node.js REPL(交互式解释器)`
Node.js REPL(Read Eval Print Loop:交互式解释器) 表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应。

REPL 的交互式的编程环境可以实时的验证你所编写的代码，非常适合于验证 Node.js 和 JavaScript 的相关 API。

Node 自带了交互式解释器，可以执行以下任务：
- 读取 - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中。
- 执行 - 执行输入的数据结构
- 打印 - 输出结果
- 循环 - 循环操作以上步骤直到用户两次按下 ctrl-c 按钮退出。

Node 的交互式解释器可以很好的调试 Javascript 代码。

开始学习 REPL

我们可以输入以下命令来启动 Node 的终端：
```
$ node
>
```
这时我们就可以在 > 后输入简单的表达式，并按下回车键来计算结果。

##### 简单的表达式运算

接下来让我们在 Node.js REPL 的命令行窗口中执行简单的数学运算：
```
$ node
> 1 +4
5
> 5 / 2
2.5
> 3 * 6
18
> 4 - 1
3
> 1 + ( 2 * 3 ) - 4
3
>
```
##### 使用变量

你可以将数据存储在变量中，并在你需要的使用它。

变量声明需要使用 var 关键字，如果没有使用 var 关键字变量会直接打印出来。

使用 var 关键字的变量可以使用 console.log() 来输出变量。

```
$ node
> x = 10
10
> var y = 10
undefined
> x + y
20
> console.log("Hello World")
Hello World
undefined
> console.log("www.w3cschool.cn")
www.w3cschool.cn
undefined
```
##### 多行表达式
```
$ node
> var x = 0
undefined
> do {
... x++;
... console.log("x: " + x);
... } while ( x < 5 );
x: 1
x: 2
x: 3
x: 4
x: 5
undefined
>
```
... 三个点的符号是系统自动生成的，你回车换行后即可。Node 会自动检测是否为连续的表达式。
##### 下划线(_)变量
你可以使用下划线(_)获取表达式的运算结果：
```
$ node
> var x = 10
undefined
> var y = 20
undefined
> x + y
30
> var sum = _
undefined
> console.log(sum)
30
undefined
>
```
###### `REPL 命令`
- ctrl + c - 退出当前终端。
- ctrl + c 按下两次 - 退出 Node REPL。
- ctrl + d - 退出 Node REPL.
- 向上/向下 键 - 查看输入的历史命令
- tab 键 - 列出当前命令
- .help - 列出使用命令
- .break - 退出多行表达式
- .clear - 退出多行表达式
- .save filename - 保存当前的 Node REPL 会话到指定文件
- .load filename - 载入当前 Node REPL 会话的文件内容。

###### `停止 REPL`
前面我们已经提到按下两次 ctrl + c 建就能退出 REPL:
```
$ node
>
(^C again to quit)
>
```
# Node.js 回调函数
###### `Node.js 回调函数`

Node.js 异步编程的直接体现就是回调。

异步编程依托于回调来实现，但不能说使用了回调后程序就异步化了。

回调函数在完成任务后就会被调用，Node 使用了大量的回调函数，Node 所有 API 都支持回调函数。

例如，我们可以一边读取文件，一边执行其他命令，在文件读取完成后，我们将文件内容作为回调函数的参数返回。这样在执行代码时就没有阻塞或等待文件 I/O 操作。这就大大提高了 Node.js 的性能，可以处理大量的并发请求。

###### `阻塞代码实例`

创建一个文件 input.txt ，内容如下：

```
W3Cschool教程官网地址：www.w3cschool.cn
```
创建 main.js文件，代码如下：
```
var fs = require("fs");

var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log("程序执行结束！");
```
以上代码执行结果如下：
```
$ node main.js
W3Cschool教程官网地址：www.w3cschool.cn

程序执行结束!
```
###### `非阻塞代码实例`

创建一个文件 input.txt ，内容如下：

```
W3Cschool教程官网地址：www.w3cschool.cn
```
创建 main.js文件，代码如下：
```
var fs = require("fs");

fs.readFile('input.txt',function (err,data) {
   if (err) return console.log.error(err);
  console.log(data.toString());
});

console.log("程序执行结束！");
```
以上代码执行结果如下：
```
$ node main.js
程序执行结束!
W3Cschool教程官网地址：www.w3cschool.cn
```
以上两个实例我们了解了阻塞与非阻塞调用的不同。第一个实例在文件读取完后才执行完程序。 第二个实例我们呢不需要等待文件读取完，这样就可以在读取文件时同时执行接下来的代码，大大提高了程序的性能。

因此，阻塞按是按顺序执行的，而非阻塞是不需要按顺序的，所以如果需要处理回调函数的参数，我们就需要写在回调函数内。

# Node.js 事件循环
###### `Node.js 事件循环`

Node.js 是单进程单线程应用程序，但是通过事件和回调支持并发，所以性能非常高。

Node.js 的每一个 API 都是异步的，并作为一个独立线程运行，使用异步函数调用，并处理并发。

Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。

Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

###### `事件驱动程序`

Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。

当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。

这个模型非常高效可扩展性非常强，因为webserver一直接受请求而不等待任何读写操作。（这也被称之为非阻塞式IO或者事件驱动IO）

在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。
![](https://user-gold-cdn.xitu.io/2019/8/12/16c85c3b07cbbe12?w=626&h=252&f=jpeg&s=14357)

整个事件驱动的流程就是这么实现的，非常简洁。有点类似于观察者模式，事件相当于一个主题(Subject)，而所有注册到这个事件上的处理函数相当于观察者(Observer)。

Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，如下实例：

```
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
```
以下程序绑定事件处理程序：
```
// 绑定事件及事件的处理程序
eventEmitter.on('eventName', eventHandler);
```
我们可以通过程序触发事件：
```
// 触发事件
eventEmitter.emit('eventName');
```
##### 实例

创建 main.js，代码如下所示：
```
var fs = require("fs");

fs.readFile('input.txt',function (err,data) {
   if (err) return console.log.error(err);
  console.log("===== 我打印的是 data 的内容====",data.toString());
});

console.log("程序执行结束！");

console.log("========================== 下面要执行 events 模块的内容了=========================");

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
eventEmitter.on('data_received',function(){
 console.log('数据连接成功。');
});

// 触发 connection 事件
eventEmitter.emit('connection');
console.log('程序执行完毕。');
```
接下来让我们执行以上代码：
```
程序执行结束！
===================== 下面要执行 events 模块的内容了=====================
连接成功。
数据连接成功。
程序执行完毕。
===== 我打印的是 data 的内容==== W3Cschool教程官网地址：www.w3cschool.cn
```
###### `Node 应用程序是如何工作的？`

 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数。

接下来让我们来重新看下前面的实例，创建一个 input.txt ,文件内容如下：

```
W3Cschool教程官网地址：www.w3cschool.cn
```
创建 main.js 文件，代码如下：
```
var fs = require("fs");

fs.readFile('input.txt', function (err, data) {
   if (err){
      console.log(err.stack);
      return;
   }
   console.log(data.toString());
});
console.log("程序执行完毕");
```
以上程序中 fs.readFile() 是异步函数用于读取文件。 如果在读取文件过程中发生错误，错误 err 对象就会输出错误信息。

如果没发生错误，readFile 跳过 err 对象的输出，文件内容就通过回调函数输出。

执行以上代码，执行结果如下：

```
程序执行完毕
W3Cschool教程官网地址：www.w3cschool.cn
```
接下来我们删除 input.txt 文件，执行结果如下所示：
```
程序执行完毕
Error: ENOENT, open 'input.txt'
```
# Node.js 事件
###### `Node.js 事件`

Node.js 所有的异步 I/O 操作在完成时都会**发送一个事件到事件队列**。

Node.js 里面的许多对象都会分发事件：一个`net.Server`对象会在每次有新连接时分发一个事件， 一个`fs.readStream`对象会在文件被打开的时候发出一个事件。 所有这些产生事件的对象都是 `events.EventEmitter` 的实例。 你可以通过`require("events");`来访问该模块。

下面我们用一个简单的例子说明 EventEmitter 的用法：

```
// event.js
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
event.on('some_event',function() {
    console.log('some_event occured.');
});
setTimeout(function(){
    event.emit('some_event');
},1000);
```
运行这段代码，1秒后控制台输出了 'some_event occured'。其原理是 event 对象注册了事件 some_event 的一个监听器，然后我们通过 setTimeout 在1000毫秒以后向 event 对象发送事件 some_event，此时会调用 some_event 的监听器。

###### `EventEmitter介绍`
events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就 是事件发射与事件监听器功能的封装。

EventEmitter 的每个事件由一个事件名和若干个参 数组成，事件名是一个字符串，通常表达一定的语义。对于每个事件，EventEmitter 支持 若干个事件监听器。

当事件发射时，注册到这个事件的事件监听器被依次调用，事件参数作 为回调函数参数传递。

让我们以下面的例子解释这个过程：
```
/**
 * EventEmitter 介绍
 */
var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('someEvent',function (arg1,arg2){
    console.log('listener1',arg1,arg2);
});
emitter.on('someEvent',function (arg1,arg2){
    console.log('listener2',arg1,arg2);
});
emitter.emit('someEvent','byvoid',1991);
```
运行的结果是：
```
listener1 byvoid 1991
listener2 byvoid 1991
```
以上例子中，emitter 为事件 someEvent 注册了两个事件监听器，然后发射了 someEvent 事件。运行结果中可以看到两个事件监听器回调函数被先后调用。 这就是`EventEmitter`最简单的用法。

##### EventEmitter常用的API
EventEmitter.on(event, listener)、emitter.addListener(event, listener) 为指定事件注册一个监听器，接收一个字符串 event 和一个回调函数 listener。
```
server.on('connection', function (stream) {
  console.log('someone connected!');
});
```

EventEmitter.emit(event, arg1, arg2, ...) 发射 event 事件，传递若干可选参数到事件监听器的参数表。

EventEmitter.once(event, listener) 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。

```
server.once('connection', function (stream) {
  console.log('Ah, we have our first user!');
});
```

EventEmitter.removeListener(event, listener) 移除指定事件的某个监听器，listener 必须是该事件已经注册过的监听器。
```
var callback = function(stream) {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```

EventEmitter.removeAllListeners(event) 移除所有事件的所有监听器， 如果指定 event，则移除指定事件的所有监听器。

* * *

###### `error 事件`
EventEmitter 定义了一个特殊的事件 error，它包含了"错误"的语义，我们在遇到 异常的时候通常会发射 error 事件。

当 error 被发射时，EventEmitter 规定如果没有响 应的监听器，Node.js 会把它当作异常，退出程序并打印调用栈。

我们一般要为会发射 error 事件的对象设置监听器，避免遇到错误后整个程序崩溃。例如：

```
var events = require('events');
var emitter = new events.EventEmitter();
emitter.emit('error');
```
运行时会显示以下错误：
```
node.js:201
throw e; // process.nextTick error, or 'error' event on first tick

Error: Uncaught, unspecified 'error' event.
at EventEmitter.emit (events.js:50:15)
at Object. (/home/byvoid/error.js:5:9)
at Module._compile (module.js:441:26)
at Object..js (module.js:459:10)
at Module.load (module.js:348:31)
at Function._load (module.js:308:12)
at Array.0 (module.js:479:10)
at EventEmitter._tickCallback (node.js:192:40)
```

* * *
###### `继承 EventEmitter`
大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

为什么要这样做呢？原因有两点：

首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发射应该是一个对象的方法。

其次JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。

# Node.js Buffer(缓冲区)
###### `Node.js Buffer(缓冲区)`

JavaScript 语言自身只有字符串数据类型？这样理解可以吗？

但在处理像`TCP流`或`文件流`时，必须使用到`二进制数据`。因此在 Node.js 中，定义了一个 `Buffer 类`，该类用来`创建一个专门存放二进制数据的缓存区`。

在 Node.js 中，Buffer 类是随 Node 内核一起发布的核心库。**Buffer 库** 为 Node.js `带来了一种存储原始数据的方法`，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。原始数据存储在 Buffer 类的实例中。一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。

###### `创建 Buffer 类`

Node Buffer 类可以通过多种方式来创建。

##### 方法一
创建长度为 10 字节的 Buffer 实例：
```
var buf = new Buffer(10);
```
##### 方法二
通过给定的数组创建 Buffer 实例：
```
var buf = new Buffer([10,20,30,40,50]);
```
##### 方法三
通过一个字符串创建 Buffer 实例：
```
var buf = new Buffer("www.w3cschool.cn","utf-8");
```
utf-8 是默认的编码方式，此外它同样支持以下编码："ascii", "utf8", "utf16le", "ucs2", "base64" 和 "hex"。
###### `写入缓冲区`
##### 语法
写入 Node 缓冲区的语法如下所示：
```
buf.write(string[, offset[, length]][, encoding])
```
##### 参数
参数描述如下：
- string - 写入缓冲区的字符串。
- offset - 缓冲区开始写入的索引值，默认为 0 。
- length - 写入的字节数，默认为 buffer.length
- encoding - 使用的编码。默认为 'utf8' 。

##### 返回值
返回实际写入的大小。如果 buffer 空间不足，则只会写入部分字符串。

##### 实例
```
buf = new Buffer(256);
len = buf.write("www.w3cschool.cn");

console.log("写入字节数："+ len);
```
执行以上代码，输出结果为：
```
$node main.js
写入字节数 : 16
```

###### `从缓冲区读取数据`

##### 语法
读取 Node 缓冲区数据的语法如下所示：
```
buf.toString([encoding[,start[,end]]])
```
##### 参数
参数描述如下：
- encoding - 使用的编码。默认为 'utf8' 。
- start - 指定开始读取的索引位置，默认为 0。
- end - 结束位置，默认为缓冲区的末尾。

##### 返回值
解码缓冲区数据并使用指定的编码返回字符串
##### 实例
```
buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // 输出: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // 输出: abcde
console.log( buf.toString('utf8',0,5));    // 输出: abcde
console.log( buf.toString(undefined,0,5)); // 使用 'utf8' 编码, 并输出: abcde
```
执行以上代码，输出结果为：
```
$ node main.js
abcdefghijklmnopqrstuvwxyz
abcde
abcde
abcde
```
###### `将 Buffer 转换为 JSON 对象`
##### 语法
将 Node Buffer 转换为 JSON 对象的函数语法格式如下：
```
buf.toJSON();
```
##### 返回值
返回 JSON 对象。
##### 实例
```
var buf = new Buffer('www.w3cschool.cn');
var json = buf.toJSON(buf);

console.log(json);
```
执行以上代码，输出结果为：
```
{ type: 'Buffer',
  data: [ 119, 119, 119, 46, 119, 51, 99, 115, 99, 104, 111, 111, 108, 46, 99, 110 ] }
```
###### `缓冲区合并`
##### 语法
Node 缓冲区合并的语法如下所示：
```
Buffer.concat(list[, totalLength])
```
##### 参数
参数描述如下：

- list - 用于合并的 Buffer 对象数组列表。
- totalLength - 指定合并后Buffer对象的总长度。

##### 返回值
返回一个多个成员合并的新 Buffer 对象。

##### 实例
```
var buffer1 = new Buffer('W3Cschool教程 ');
var buffer2 = new Buffer('www.w3cschool.cn');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());
```
执行以上代码，输出结果为：
```
buffer3 内容: W3Cschool教程 www.w3cschool.cn
```
###### `缓冲区比较`
##### 语法

Node Buffer 比较的函数语法如下所示, 该方法在 Node.js v0.12.2 版本引入：
```
buf.compare(otherBuffer);
```
##### 参数
参数描述如下：

- otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
##### 返回值
返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。

##### 实例

```
var buffer1 = new Buffer('ABC');
var buffer2 = new Buffer('ABCD');
var result = buffer1.compare(buffer2);

if(result < 0) {
   console.log(buffer1 + " 在 " + buffer2 + "之前");
}else if(result == 0){
   console.log(buffer1 + " 与 " + buffer2 + "相同");
}else {
   console.log(buffer1 + " 在 " + buffer2 + "之后");
}
```

执行以上代码，输出结果为：
```
ABC在ABCD之前
```
###### `拷贝缓冲区`
Node 缓冲区拷贝语法如下所示：

```
buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
```

##### 参数
参数描述如下：

- targetBuffer - 要拷贝的 Buffer 对象。
- targetStart - 数字, 可选, 默认: 0
- sourceStart - 数字, 可选, 默认: 0
- sourceEnd - 数字, 可选, 默认: buffer.length
返回值
没有返回值。
##### 实例
```
var buffer1 = new Buffer('ABC');
// 拷贝一个缓冲区
var buffer2 = new Buffer(3);
buffer1.copy(buffer2);
console.log("buffer2 content: " + buffer2.toString());
```
执行以上代码，输出结果为：
```
buffer2 content: ABC
```
###### `缓冲区裁剪`

Node 缓冲区裁剪语法如下所示：
```
buf.slice([start[, end]])
```
##### 参数

参数描述如下：

- start - 数字, 可选, 默认: 0
- end - 数字, 可选, 默认: buffer.length

#####返回值
返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。

##### 实例
```
var buffer1 = new Buffer('youj');
// 剪切缓冲区
var buffer2 = buffer1.slice(0,2);
console.log("buffer2 content: " + buffer2.toString());
```
执行以上代码，输出结果为：
```
buffer2 content: yo
```

###### `缓冲区长度`

##### 语法
Node 缓冲区长度计算语法如下所示：
```
buf.length;
```
##### 返回值
返回 Buffer 对象所占据的内存长度。

##### 实例
```
var buffer = new Buffer('www.w3cschool.cn');
// 缓冲区长度
console.log('buffer length:' + buffer.length);
```
执行以上代码，输出结果为：
```
buffer length: 16
```
###### `方法参考手册`

| 序号 | 方法 & 描述 |
|--------|--------|
|    1    |   new Buffer(size) 分配一个新的 size 大小单位为8位字节的 buffer。 注意, size 必须小于 kMaxLength，否则，将会抛出异常 RangeError。   |
|   2    |   new Buffer(buffer) 拷贝参数 buffer 的数据到 Buffer 实例。  |
|   3    |  new Buffer(str, encoding)分配一个新的 buffer ，其中包含着传入的 str 字符串。 encoding 编码方式默认为 'utf8'。  |
|   4    |   buf.length返回这个 buffer 的 bytes 数。注意这未必是 buffer 里面内容的大小。length 是 buffer 对象所分配的内存数，它不会随着这个 buffer 对象内容的改变而改变。  |
|   5    |   buf.write(string, offset[, length])根据参数 offset 偏移量和指定的 encoding 编码方式，将参数 string 数据写入buffer。 offset 偏移量默认值是 0, encoding 编码方式默认是 utf8。 length 长度是将要写入的字符串的 bytes 大小。 返回 number 类型，表示写入了多少 8 位字节流。如果 buffer 没有足够的空间来放整个 string，它将只会只写入部分字符串。 length 默认是 buffer.length - offset。 这个方法不会出现写入部分字符。   |
|   6    |  buf.writeUIntLE(value, offset, byteLength, noAssert)将value 写入到 buffer 里， 它由offset 和 byteLength 决定，支持 48 位计算，例如：var b = new Buffer(6); b.writeUIntBE(0x1234567890ab, 0, 6); // <Buffer 12 34 56 78 90 ab> noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。   |
|   7    |  buf.writeUIntBE(value, offset, byteLength, noAssert)将value 写入到 buffer 里， 它由offset 和 byteLength 决定，支持 48 位计算。noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。   |
|    8    |  buf.writeIntLE(value, offset, byteLength, noAssert)将value 写入到 buffer 里， 它由offset 和 byteLength 决定，支持 48 位计算。noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。   |
|    9    |   buf.writeIntBE(value, offset, byteLength, noAssert)将value 写入到 buffer 里， 它由offset 和 byteLength 决定，支持 48 位计算。noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。   |
|    10    |   buf.readUIntLE(offset, byteLength, noAssert)支持读取 48 位以下的数字。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。   |
|    11    |   buf.readUIntBE(offset, byteLength, noAssert)支持读取 48 位以下的数字。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。     |
|    12   |   buf.readIntLE(offset, byteLength, noAssert)支持读取 48 位以下的数字。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。     |
|    13   |    buf.readIntBE(offset, byteLength, noAssert)支持读取 48 位以下的数字。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。    |
|    14    |   buf.toString([encoding[, start, end]])根据 encoding 参数（默认是 'utf8'）返回一个解码过的 string 类型。还会根据传入的参数 start (默认是 0) 和 end (默认是 buffer.length)作为取值范围。     |
|    15    |    buf.toJSON()将 Buffer 实例转换为 JSON 对象。    |
|    16   |    bufindex获取或设置指定的字节。返回值代表一个字节，所以返回值的合法范围是十六进制0x00到0xFF 或者十进制0至 255。    |
|    17     |  buf.equals(otherBuffer)比较两个缓冲区是否相等，如果是返回 true，否则返回 false。  |
|    18   |    buf.compare(otherBuffer)比较两个 Buffer 对象，返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。    |
|    19    |   buf.copy(target[, targetStart[, sourceStart, sourceEnd]])buffer 拷贝，源和目标可以相同。 targetStart 目标开始偏移和 sourceStart 源开始偏移默认都是 0。 sourceEnd 源结束位置偏移默认是源的长度 buffer.length 。    |
|    20    |   buf.slice([start, end])剪切 Buffer 对象，根据 start(默认是 0 ) 和 end (默认是 buffer.length ) 偏移和裁剪了索引。 负的索引是从 buffer 尾部开始计算的。     |
|    21   |    buf.readUInt8(offset, noAssert)根据指定的偏移量，读取一个有符号 8 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 如果这样 offset 可能会超出buffer 的末尾。默认是 false。    |
|    22   |    buf.readUInt16LE(offset, noAssert)根据指定的偏移量，使用特殊的 endian 字节序格式读取一个有符号 16 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。    |
|    23   |   buf.readUInt16BE(offset, noAssert)根据指定的偏移量，使用特殊的 endian 字节序格式读取一个有符号 16 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。     |
|    24    |   buf.readUInt32LE(offset, noAssert)根据指定的偏移量，使用指定的 endian 字节序格式读取一个有符号 32 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。    |
|    25   |  buf.readUInt32BE(offset, noAssert)根据指定的偏移量，使用指定的 endian 字节序格式读取一个有符号 32 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。    |
|    26   |  buf.readInt8(offset, noAssert)根据指定的偏移量，读取一个 signed 8 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。  |
|    27   |  buf.readInt16LE(offset, noAssert)根据指定的偏移量，使用特殊的 endian 格式读取一个 signed 16 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。   |
|    28    |   buf.readInt16BE(offset, noAssert)根据指定的偏移量，使用特殊的 endian 格式读取一个 signed 16 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。   |
|    29   |   buf.readInt32LE(offset, noAssert)根据指定的偏移量，使用指定的 endian 字节序格式读取一个 signed 32 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。     |
|    30   |   buf.readInt32BE(offset, noAssert)根据指定的偏移量，使用指定的 endian 字节序格式读取一个 signed 32 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。    |
|    31    | buf.readFloatLE(offset, noAssert)根据指定的偏移量，使用指定的 endian 字节序格式读取一个 32 位浮点数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer的末尾。默认是 false。   |
|    32   |   buf.readFloatBE(offset, noAssert)根据指定的偏移量，使用指定的 endian 字节序格式读取一个 32 位浮点数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer的末尾。默认是 false。    |
|    33   |  buf.readDoubleLE(offset, noAssert)根据指定的偏移量，使用指定的 endian字节序格式读取一个 64 位double。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。    |
|    34    |   buf.readDoubleBE(offset, noAssert)根据指定的偏移量，使用指定的 endian字节序格式读取一个 64 位double。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。     |
|    35   |    buf.writeUInt8(value, offset, noAssert)根据传入的 offset 偏移量将 value 写入 buffer。注意：value 必须是一个合法的有符号 8 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则不要使用。默认是 false。    |
|    36   |   buf.writeUInt16LE(value, offset, noAssert)根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的有符号 16 位整数。若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。  |
|    37   |  buf.writeUInt16BE(value, offset, noAssert)根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的有符号 16 位整数。若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。    |
|    38    |  buf.writeUInt32LE(value, offset, noAssert)根据传入的 offset 偏移量和指定的 endian 格式将 value 写入buffer。注意：value 必须是一个合法的有符号 32 位整数。若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着value 可能过大，或者offset可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。    |
|    39   |    buf.writeUInt32BE(value, offset, noAssert)根据传入的 offset 偏移量和指定的 endian 格式将 value 写入buffer。注意：value 必须是一个合法的有符号 32 位整数。若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着value 可能过大，或者offset可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。    |
|    40   |    buf.writeInt8(value, offset, noAssert) |

# Node.js Stream(流)
###### `Node.js Stream(流)`

`Stream` 是 Node.js 中非常重要的一个模块，应用广泛。

`Stream` 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的`request 对象`就是一个 `Stream`，还有`stdout`（标准输出）。

该抽象接口是可读、可写或是既可读又可写的，通过这些接口，我们可以和磁盘文件、套接字、HTTP请求来交互，实现数据从一个地方流动到另一个地方的功能。

Node.js，Stream 有四种流类型：

- Readable - 可读操作。
- Writable - 可写操作。
- Duplex - 可读可写操作.
- Transform - 操作被写入数据，然后读出结果。


所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

- data - 当有数据可读时触发。
- end - 没有更多的数据可读时触发。
- error - 在接收和写入过程中发生错误时触发。
- finish - 所有数据已被写入到底层系统时触发。

###### `从流中读取数据`

创建 input.txt 文件，内容如下：
```
W3Cschool教程官网地址：www.w3cschool.cn
```
创建 main.js 文件, 代码如下：
```
var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('input.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```
###### `写入流`

创建 streamdemo2.js 文件, 代码如下：
```
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
```
以上程序会将 data 变量的数据写入到 output.txt 文件中。代码执行结果如下：
```
$ node main.js
程序执行完毕
写入完成。
```
查看 output.txt 文件的内容：
```
$ cat output.txt
W3Cschool教程官网地址：www.w3cschool.cn
```
###### `管道流`

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
![](https://user-gold-cdn.xitu.io/2019/8/13/16c8b71cf5e53c17?w=397&h=398&f=png&s=13115)

如上面的图片所示，我们把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。

以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。

创建 streamdemo3.js 文件, 代码如下：
```
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
```
代码执行结果如下：
```
$ node main.js
程序执行完毕
```
查看 output.txt 文件的内容：
```
$ cat output.txt
W3Cschool教程官网地址：www.w3cschool.cn
管道流操作实例
```

###### `链式流`

链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。

接下来我们就是用管道和链式来压缩和解压文件。

创建 compress.js 文件, 代码如下：
```
var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));

console.log("文件压缩完成。");
```
代码执行结果如下：
```
$ node compress.js
文件压缩完成。
```
执行完以上操作后，我们可以看到当前目录下生成了 input.txt 的压缩文件 input.txt.gz。

接下来，让我们来解压该文件，创建 decompress.js 文件，代码如下：
```
var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
console.log("文件解压完成。");
```
代码执行结果如下：
```
$ node decompress.js
文件解压完成。
```
# Node.js 模块系统
###### `Node.js 模块系统`

为了让`Node.js`的文件可以相互调用，`Node.js`提供了一个简单的模块系统。

模块是`Node.js` 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 `Node.js` 文件就是一个模块，这个文件可能是`JavaScript 代码``、JSON` 或者`编译过的C/C++ 扩展`。

###### `创建模块`

在 Node.js 中，创建一个模块非常简单，如下我们创建一个 'CreateModuledemo.js' 文件，代码如下:
```
var hello = require('./hello');
hello.world();
```
以上实例中，代码 require('./hello') 引入了当前目录下的hello.js文件（./ 为当前目录，node.js默认后缀为js）。

Node.js 提供了exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。

接下来我们就来创建hello.js文件，代码如下：
```
exports.world = function() {
  console.log('Hello World');
}
```
在以上示例中，hello.js 通过 exports 对象把 world 作为模块的访问接口，在 CreateModuledemo.js 中通过 require('./hello') 加载这个模块，然后就可以直接访 问CreateModuledemo.js 中 exports 对象的成员函数了。

有时候我们只是想把一个对象封装到模块中，格式如下：
```
module.exports = function() {
  // ...
}
```

例如:

```
//hello1.js
function Hello() {
 var name;
    this.setName = function(thyName) {
       name = thyName;
  };
   this.sayHello = function() {
     console.log('Hello ' + name);
  };
};
module.exports = Hello;
```
这样就可以直接获得这个对象了：
```
//main.js
var Hello = require('./hello');
hello = new Hello();
hello.setName('BYVoid');
hello.sayHello();
```
模块接口的唯一变化是使用 module.exports = Hello 代替了exports.world = function(){}。 在外部引用该模块时，其接口对象就是要输出的 Hello 对象本身，而不是原先的 exports。

###### `服务端的模块放在哪里`

也许你已经注意到，我们已经在代码中使用了模块了。像这样：
```
var http = require("http");

...

http.createServer(...);
```
Node.js中自带了一个叫做"http"的模块，我们在我们的代码中请求它并把返回值赋给一个本地变量。

这把我们的本地变量变成了一个拥有所有 http 模块所提供的公共方法的对象。

Node.js 的 require方法中的文件查找策略如下：

由于Node.js中存在4类模块（原生模块和3种文件模块），尽管require方法极其简单，但是内部的加载却是十分复杂的，其加载优先级也各自不同。如下图所示：

![](https://user-gold-cdn.xitu.io/2019/8/13/16c8b71cf5bf062c?w=479&h=601&f=jpeg&s=29861)

##### 从文件模块缓存中加载

尽管原生模块与文件模块的优先级不同，但是都不会优先于从文件模块的缓存中加载已经存在的模块。

从原生模块加载

原生模块的优先级仅次于文件模块缓存的优先级。require方法在解析文件名之后，优先检查模块是否在原生模块列表中。以http模块为例，尽管在目录下存在一个http/http.js/http.node/http.json文件，require("http")都不会从这些文件中加载，而是从原生模块中加载。

原生模块也有一个缓存区，同样也是优先从缓存区加载。如果缓存区没有被加载过，则调用原生模块的加载方式进行加载和执行。

##### 从文件加载

当文件模块缓存中不存在，而且不是原生模块的时候，Node.js会解析require方法传入的参数，并从文件系统中加载实际的文件，加载过程中的包装和编译细节在前一节中已经介绍过，这里我们将详细描述查找文件模块的过程，其中，也有一些细节值得知晓。

require方法接受以下几种参数的传递：

- http、fs、path等，原生模块。
- ./mod或../mod，相对路径的文件模块。
- /pathtomodule/mod，绝对路径的文件模块。
- mod，非原生模块的文件模块。

# Node.js 函数
###### `Node.js 函数`

在JavaScript中，一个函数可以作为另一个函数接收一个参数。我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数。

Node.js中函数的使用与Javascript类似，举例来说，你可以这样做：
```
function say(word) {
  console.log(word);
}

function execute(someFunction, value) {
  someFunction(value);
}

execute(say, "Hello");
```
以上代码中，我们把 say 函数作为execute函数的第一个变量进行了传递。这里返回的不是 say 的返回值，而是 say 本身！

这样一来， say 就变成了execute 中的本地变量 someFunction ，execute可以通过调用 someFunction() （带括号的形式）来使用 say 函数。

当然，因为 say 有一个变量， execute 在调用 someFunction 时可以传递这样一个变量。

###### `匿名函数`

我们可以把一个函数作为变量传递。但是我们不一定要绕这个"先定义，再传递"的圈子，我们可以直接在另一个函数的括号中定义和传递这个函数：

```
function execute(someFunction, value) {
  someFunction(value);
}

execute(function(word){ console.log(word) }, "Hello");
```
我们在 execute 接受第一个参数的地方直接定义了我们准备传递给 execute 的函数。

用这种方式，我们甚至不用给这个函数起名字，这也是为什么它被叫做匿名函数 。

###### `函数传递是如何让HTTP服务器工作的`

带着这些知识，我们再来看看我们简约而不简单的HTTP服务器：

```
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(8888);
```
现在它看上去应该清晰了很多：我们向 createServer 函数传递了一个匿名函数。

用这样的代码也可以达到同样的目的：
```
var http = require("http");

function onRequest(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}

http.createServer(onRequest).listen(8888);
```
# Node.js 路由
###### `Node.js 路由`

我们要为路由提供请求的URL和其他需要的GET及POST参数，随后路由需要根据这些数据来执行相应的代码。

因此，我们需要查看`HTTP`请求，从中提取出请求的URL以及GET/POST参数。这一功能应当属于路由还是服务器（甚至作为一个模块自身的功能）确实值得探讨，但这里暂定其为我们的HTTP服务器的功能。

我们需要的所有数据都会包含在`request`对象中，该对象作为`onRequest()`回调函数的第一个参数传递。但是为了解析这些数据，我们需要额外的`Node.JS`模块，它们分别是`url`和`querystring`模块。

```
                   url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
              querystring(string)["foo"]    |
                                            |
                         querystring(string)["hello"]
```

当然我们也可以用querystring模块来解析POST请求体中的参数，稍后会有演示。

现在我们来给onRequest()函数加上一些逻辑，用来找出浏览器请求的URL路径：

```
var url = require("url");

function start() {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```
好了，我们的应用现在可以通过请求的URL路径来区别不同请求了--这使我们得以使用路由（还未完成）来将请求以URL路径为基准映射到处理程序上。

在我们所要构建的应用中，这意味着来自/start和/upload的请求可以使用不同的代码来处理。稍后我们将看到这些内容是如何整合到一起的。

现在我们可以来编写路由了，建立一个名为router.js的文件，添加以下内容：
```
function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route;
```
如你所见，这段代码什么也没干，不过对于现在来说这是应该的。在添加更多的逻辑以前，我们先来看看如何把路由和服务器整合起来。

我们的服务器应当知道路由的存在并加以有效利用。我们当然可以通过硬编码的方式将这一依赖项绑定到服务器上，但是其它语言的编程经验告诉我们这会是一件非常痛苦的事，因此我们将使用依赖注入的方式较松散地添加路由模块。

首先，我们来扩展一下服务器的start()函数，以便将路由函数作为参数传递过去：

```
var http = require("http");
var url = require("url");

function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    route(pathname);

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;
```
同时，我们会相应扩展index.js，使得路由函数可以被注入到服务器中：
```
var server = require("./server");
var router = require("./router");

server.start(router.route);
```
在这里，我们传递的函数依旧什么也没做。

如果现在启动应用（node index.js，始终记得这个命令行），随后请求一个URL，你将会看到应用输出相应的信息，这表明我们的HTTP服务器已经在使用路由模块了，并会将请求的路径传递给路由：

```
bash$ node index.js
Request for /foo received.
About to route a request for /foo
```
# Node.js 全局对象
###### `Node.js 全局对象`

本节介绍 Node.js 全局对象，global 全局对象无需引用就可以直接使用。

`JavaScript` 中有一个特殊的对象，称为`全局对象（Global Object）`，它及其所有属性都可以在程序的任何地方访问，即全局变量。

在浏览器 `JavaScript` 中，通常`window` 是全局对象， 而Node.js 中的全局对象是 `global`，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

我们在Node.js 中能够直接访问到对象通常都是 `global` 的属性，如 `console`、`process` 等，下面逐一介绍。

###### `全局对象与全局变量`

global 最根本的作用是作为全局变量的宿主。按照 ECMAScript 的定义，满足以下条件的变量是全局变量：

- 在最外层定义的变量；
- 全局对象的属性；
- 隐式定义的变量（未定义直接赋值的变量）。

当你定义一个全局变量时，这个变量同时也会成为全局对象的属性，反之亦然。需要注 意的是，在Node.js 中你不可能在最外层定义变量，因为所有用户代码都是属于当前模块的， 而模块本身不是最外层上下文。

**注意：**  永远使用var 定义变量以避免引入全局变量，因为全局变量会污染 命名空间，提高代码的耦合风险。

- - -
###### `process`

process 是一个全局变量，即 global 对象的属性。

它用于描述当前Node.js 进程状态 的对象，提供了一个与操作系统的简单接口。通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍process 对象的一些最常用的成员方法。

process.argv是命令行参数数组，第一个元素是 node，第二个元素是脚本文件名， 从第三个元素开始每个元素是一个运行参数。
```
console.log(process.argv);
```
将以上代码存储为argv.js，通过以下命令运行：
```
$ node argv.js 1991 name=byvoid --v "Carbo Kuo"
[ '/Users/guoguo/.nvm/versions/node/v8.12.0/bin/node',
  '/Users/guoguo/Desktop/node-pro/argv.js',
  '1991',
  'name=byvoid',
  '--v',
  'Guo Guo' ]
```
- process.stdout是标准输出流，通常我们使用的 console.log() 向标准输出打印 字符，而 process.stdout.write() 函数提供了更底层的接口。
- process.stdin是标准输入流，初始时它是被暂停的，要想从标准输入读取数据， 你必须恢复流，并手动编写流的事件响应函数。

```
process.stdin.resume();
process.stdin.on('data', function(data) {
process.stdout.write('read from console: ' + data.toString());
});
```
- process.nextTick(callback)的功能是为事件循环设置一项任务，Node.js 会在 下次事件循环调响应时调用 callback。

初学者很可能不理解这个函数的作用，有什么任务不能在当下执行完，需要交给下次事 件循环响应来做呢？

我们讨论过，Node.js 适合I/O 密集型的应用，而不是计算密集型的应用， 因为一个Node.js 进程只有一个线程，因此在任何时刻都只有一个事件在执行。

如果这个事 件占用大量的CPU 时间，执行事件循环中的下一个事件就需要等待很久，因此Node.js 的一 个编程原则就是尽量缩短每个事件的执行时间。process.nextTick() 提供了一个这样的 工具，可以把复杂的工作拆散，变成一个个较小的事件。

```
function doSomething(args, callback) {
  somethingComplicated(args);
  callback();
}
doSomething(function onEnd() {
  compute();
});
```
我们假设compute() 和somethingComplicated() 是两个较为耗时的函数，以上 的程序在调用 doSomething() 时会先执行somethingComplicated()，然后立即调用 回调函数，在 onEnd() 中又会执行 compute()。下面用process.nextTick() 改写上 面的程序：
```
function doSometing(args,callback){
	somethingComplicated(args);
    process.nextTick(callback);
}
doSometing(function onEnd(){
   compute();
});
```
改写后的程序会把上面耗时的操作拆分为两个事件，减少每个事件的执行时间，提高事件响应速度。

注意： 不要使用setTimeout(fn,0)代替process.nextTick(callback)， 前者比后者效率要低得多。

我们探讨了process对象常用的几个成员，除此之外process还展示了process.platform、 process.pid、process.execPath、process.memoryUsage() 等方法，以及POSIX 进程信号响应机制。有兴趣的读者可以访问 [http://nodejs.org/api/process.html](http://nodejs.org/api/process.html) 了解详细 内容。

######`console`

console 用于提供控制台标准输出，它是由Internet Explorer 的JScript 引擎提供的调试 工具，后来逐渐成为浏览器的事实标准。

Node.js 沿用了这个标准，提供与习惯行为一致的 console 对象，用于向标准输出流（stdout）或标准错误流（stderr）输出字符。  console.log()：向标准输出流打印字符并以换行符结束。

console.log 接受若干 个参数，如果只有一个参数，则输出这个参数的字符串形式。如果有多个参数，则 以类似于C 语言 printf() 命令的格式输出。

第一个参数是一个字符串，如果没有 参数，只打印一个换行。
```
console.log('Hello world');
console.log('byvoid%diovyb');
console.log('byvoid%diovyb', 1991);
```
运行结果为：
```
Hello world
byvoid%diovyb
byvoid1991iovyb
```
- console.error()：与console.log() 用法相同，只是向标准错误流输出。
- console.trace()：向标准错误流输出当前的调用栈。

```
console.trace();
```
运行结果为：
```
Trace:
at Object.<anonymous> (/home/byvoid/consoletrace.js:1:71)
at Module._compile (module.js:441:26)
at Object..js (module.js:459:10)
at Module.load (module.js:348:31)
at Function._load (module.js:308:12)
at Array.0 (module.js:479:10)
at EventEmitter._tickCallback (node.js:192:40)
```
# Node.js 常用工具util
###### `Node.js 常用工具util`

util作为Node.js的一个核心模块，能够提供常用函数的集合，弥补核心JavaScript的功能过于精简的不足。

###### `util.inherits`

util.inherits(constructor, superConstructor)是一个实现对象间原型继承的函数。

与常见的基于类的不同，JavaScript的面向对象特性是基于原型的。JavaScript没有提供对象继承的语言级别特性，而是通过原型复制来实现的。

在这里我们只介绍util.inherits的用法，示例如下：
```
var util = require('util');
function Base() {
    this.name = 'base';
    this.base = 1991;
    this.sayHello = function() {
        console.log('Hello ' + this.name);
    };
}

Base.prototype.showName = function() {
    console.log(this.name);
};

function Sub() {
    this.name = 'sub';
}
util.inherits(Sub,Base);
var objBase = new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub = new Sub();
objSub.showName();
// objSub.sayHello();
console.log(objSub);
```
我们定义了一个基础对象Base和一个继承自Base的Sub，Base有三个在构造函数内定义的属性和一个原型中定义的函数，通过util.inherits实现继承。运行结果如下：
```
base
Hello base
Base { name: 'base', base: 1991, sayHello: [Function] }
sub
Sub { name: 'sub' }
```
**注意：** Sub仅仅继承了Base在原型中定义的函数，而构造函数内部创造的base属性和sayHello函数都没有被Sub继承。

同时，在原型中定义的属性不会被console.log作为对象的属性输出。如果我们去掉objSub.sayHello(); 这行的注释，将会看到：

```
base
Hello base
Base { name: 'base', base: 1991, sayHello: [Function] }
sub
/Users/guoguo/Desktop/node-pro/utilInheritsDemo.js:24
objSub.sayHello();
       ^

TypeError: objSub.sayHello is not a function
    at Object.<anonymous> (/Users/guoguo/Desktop/node-pro/utilInheritsDemo.js:24:8)
    at Module._compile (module.js:653:30)
    at Object.Module._extensions..js (module.js:664:10)
    at Module.load (module.js:566:32)
    at tryModuleLoad (module.js:506:12)
    at Function.Module._load (module.js:498:3)
    at Function.Module.runMain (module.js:694:10)
    at startup (bootstrap_node.js:204:16)
    at bootstrap_node.js:625:3
```
###### `util.inspect`

util.inspect(object,showHidden,depth,colors)方法可以将任意对象转换为字符串，通常用于调试和错误输出。它至少接受一个object参数，即要转换的对象。

showHidden是一个可选参数，如果值为true，将会输出更多隐藏信息。

depth表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多少。如果不指定depth，则默认递归2层，指定为null时表示将不限递归层数完整遍历对象。 如果color值为true，则输出格式将会以ANSI颜色编码，通常用于在终端显示更漂亮的效果。

特别要指出的是，util.inspect并不会简单地直接把对象转换为字符串，即使该对象定义了toString方法也不会调用。

```
 var util = require('util');

 function Person(){
     this.name = 'guoguo';
     this.toString = function() {
         return this.name;
     };
 }

 var obj = new Person();
 console.log(util.inspect(obj));
 console.log(util.inspect(obj,true));
```
运行结果是：
```
Person { name: 'guoguo', toString: [Function] }
Person {
  name: 'guoguo',
  toString:
   { [Function]
     [length]: 0,
     [name]: '',
     [arguments]: null,
     [caller]: null,
     [prototype]: { [constructor]: [Circular] } } }
```
###### `util.isArray(object)`

如果给定的参数 "object" 是一个数组返回true，否则返回false。

```
var util = require('util');

util.isArray([])	// true
util.isArray(new Array) 	// true
util.isArray({})	// false
```
###### `util.isRegExp(object)`

如果给定的参数"object"是一个正则表达式返回true，否则返回false。
```
var util = require('util');

util.isRegExp(/some regexp/)	// true
util.isRegExp(new RegExp('another regexp'))	// true
util.isRegExp({})	// false
```
###### `util.isDate(object)`

如果给定的参数 "object" 是一个日期返回true，否则返回false。
```
var util = require('util');

util.isDate(new Date())
  // true
util.isDate(Date())
  // false (without 'new' returns a String)
util.isDate({})
  // false
```

###### `util.isError(object)`

如果给定的参数 "object" 是一个错误对象返回true，否则返回false。
```
var util = require('util');

util.isError(new Error())
  // true
util.isError(new TypeError())
  // true
util.isError({ name: 'Error', message: 'an error occurred' })
  // false
```
更多详情可以访问 [http://nodejs.org/api/util.html](http://nodejs.org/api/util.html) 了解详细内容。

# Node.js 文件系统
###### `Node.js 文件系统`

Node.js文件系统被封装在fs模块中，它提供了文件的读取、写入、更名、删除、遍历目录、链接等POSIX文件系统操作。

与其他模块不同的是，fs模块中所有的操作都提供了异步的和同步的两个版本，例如读取文件内容的函数有异步的fs.readFile()和同步的fs.readFileSync()。我们以几个函数为代表，介绍fs常用的功能，并列出fs所有函数的定义和功能。

###### `fs.readFile`
Node.js读取文件函数语法如下：
```
fs.readFile(filename,[encoding],[callback(err,data)])
```
- filename（必选），表示要读取的文件名。
- encoding（可选），表示文件的字符编码。
- callback 是回调函数，用于接收文件的内容。

如果不指定encoding，则callback就是第二个参数。回调函数提供两个参数err和data，err表示有没有错误发生，data是文件内容。如果指定了encoding，data是一个解析后的字符串，否则data将会是以Buffer形式表示的二进制数据。

例如以下程序，我们从content.txt中读取数据，但不指定编码：
```
var fs = require('fs');
fs.readFile('content.txt', function(err, data) {
    if(err) {
        console.error(err);
  } else{
      console.log(data);
   }
});
```
假设content.txt中的内容是UTF-8编码的Text文本文件示例，运行结果如下：
```
<Buffer 54 65 78 74 20 e6 96 87 e6 9c ac e6 96 87 e4 bb b6 e7 a4 ba e4 be 8b>
```
这个程序以二进制的模式读取了文件的内容，data的值是Buffer对象。如果我们给fs.readFile的encoding指定编码：
```
var fs = require('fs');
    fs.readFile('content.txt', 'utf-8', function(err, data) {
    if (err) {
       console.error(err);
  } else {
     console.log(data);
   }
});
```
那么运行结果则是：
```
Text 文本文件示例
```
当读取文件出现错误时，err将会是Error对象。如果content.txt不存在，运行前面的代码则会出现以下结果：
```
{ [Error: ENOENT, no such file or directory 'content.txt'] errno: 34, code: 'ENOENT',
path: 'content.txt' }
```
###### `fs.readFileSync`

fs.readFileSync(filename, encoding)是fs.readFile同步的版本。它接受和 fs.readFile 相同的参数，而读取到的文件内容会以函数返回值的形式返回。如果有错误发生，fs将会抛出异常，你需要使用try和catch捕捉并处理异常。

**注意：** 与同步I/O函数不同，Node.js中异步函数大多没有返回值。

###### `fs.open`

fs.open(path, flags, mode, callback(err, fd))是POSIX open函数的封装，类似于C语言标准库中的fopen函数。它接受两个必选参数，path为文件的路径， flags 可以是以下值：

- r ：以读取模式打开文件。
- r+ ：以读写模式打开文件。
- w ：以写入模式打开文件，如果文件不存在则创建。
- w+ ：以读写模式打开文件，如果文件不存在则创建。
- a ：以追加模式打开文件，如果文件不存在则创建。
- a+ ：以读取追加模式打开文件，如果文件不存在则创建

###### `fs.read`

fs.read语法格式如下：

```
fs.read(fd, buffer, offset, length, position, [callback(err, bytesRead, buffer)])
```

参数说明：

- fd: 读取数据并写入buffer指向的缓冲区对象。
- offset: 是buffer的写入偏移量。
- length: 是要从文件中读取的字节数。
- position: 是文件读取的起始位置，如果position的值为null，则会从当前文件指针的位置读取。
- callback:回调函数传递bytesRead和buffer，分别表示读取的字节数和缓冲区对象。

以下是一个使用fs.open和fs.read的示例。

```
var fs = require('fs');
fs.open('content.txt', 'r', function(err, fd) {
    if(err) {
        console.error(err);
      return;
  }
    var buf = new Buffer(8);
  fs.read(fd, buf, 0, 8, null, function(err, bytesRead, buffer) {
      if(err) {
            console.error(err);
          return;
      }
        console.log('bytesRead: ' + bytesRead);
        console.log(buffer);
 })
});
```
运行结果是：
```
bytesRead: 8
<Buffer 54 65 78 74 20 e6 96 87>
```

一般来说，除非必要，否则不要使用这种方式读取文件，因为它要求你手动管理缓冲区和文件指针，尤其是在你不知道文件大小的时候，这将会是一件很麻烦的事情。

###### `fs 模块函数表`
![](https://user-gold-cdn.xitu.io/2019/8/14/16c90a7713cc4eb5?w=778&h=689&f=png&s=144759)

更多详情可点击查看：[http://nodejs.org/api/fs.html](http://nodejs.org/api/fs.html)

* * *
2019-8-14
* * *
