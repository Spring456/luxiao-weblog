## node中的http模块

开启一个本地服务器需要Node.js中http核心模块

1、http--模块提供了搭建本地服务器的API,首先我们在项目中引入；

```js
let http = require('http')
```

引入之后我们利用http.createServer()方法得到一个服务器实例。

```js
let server = http.createServer() // createServer()方法返回一个server实例，所以我们需要一个变量来接收
```

2、给服务器实例绑定接收request的事情处理函数

给服务器绑定接收请求的处理事件，当服务器接收到客户端发送的请求后，会调用后面的处理函数，处理函数接收两个参数：请求信息对象，响应信息对象。

```js
server.on('request', (req, res) => {
  console.log(req.url) // 获取到请求的路径（请求路径永远以“/”开头）
})
```

3、绑定监听端口号，开启服务器。代码如下：

```js
server.listen(3000, () => {
  console.log('服务器开启成功，可以通过访问http://127.0.0.1:3000/来获取数据~~')
})
​
// server.listen()用来绑定监听的端口号，可以传入第二个参数，当服务器开启成功后，触发后面的回调函数
```

设置状态码和响应头

> response.writeHead(200, { 'Content-Type': 'text/plain' });

设置响应头

> response.setHeader('Content-Type', 'text/html');

写入内容

> response.write(fileData);

结束响应

> response.end();