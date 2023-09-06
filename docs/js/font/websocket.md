## 了解了解websocket

### websocket是什么

websocket是一个应用层协议，基于TCP传输协议，并复用HTTP的握手通道。能够让客户端和服务端通过web建立全双工通信。

什么是全双工通信？

就是双方双向通信。即通信的双方可以同时发送和接收信息的信息交互方式。

### websocket解决了什么问题

HTTP半双工通信

在websocket出现之前，如果想实现信息推送，常用的实现方法有：`轮询，长轮询和iframe流`

HTTP是客户端向服务端提交请求，服务端响应请求，返回资源。特点就是同一时刻数据是单向的，服务器不能主动推送数据给客户端。

在类似体育赛事，聊天室，实时位置这类场景，如果通过传统的http方式，只能通过轮询来了解服务器有没有新的信息变化。这种方式需要发送请求，不停链接服务器，非常浪费资源，效率较低。

全双工通信

websocket在客户端和服务端建立了一个长久的连接，客户端和服务端都可以任意发送数据，是一种全双工通信。

websocket的出现，就可以让服务器主动向客户端发送消息，客户端也可以向服务端发送消息，使得浏览器具备了实时双向通信的能力。对于解决上述问题是一个比较好的解决方案。

### 其他方式总结

ajax轮询：间隔一定时间，就会向服务端请求数据

长轮询：服务器在一定时间内，保持请求处于打开状态，在这时间内收到请求就返回，时间到了，就关闭

流：浏览器发送请求，服务器会无限期或长时间处于打开的状态，该响应持续更新，每当有消息就响应一下。


### websocket的一些api---事件

事件：

1、创建使用

通过`new WebSocket()`创建websocket实例，参数是服务器地址，服务器地址必须使用`ws://`或`wss://`开头，表明这是一个websocket连接。如果是多协议，可以用数组的方式。

```js
let url = 'ws://localhost:3000'
let ws = new WebSocket(url)
// 多协议。第二参数可以是一个字符串，也可以是一个数组。可以让一个服务器实现多种websocket子协议
let ws = new WebSockey(url,''||[])
```

2、open---服务器相应websocket连接请求触发

```js
ws.onopen = function(){
  ws.send('客户端向服务端发送')
}
```

3、message---服务器有响应数据时触发

```js
ws.onmessage = function(e){
  console.log(e)//服务器传过来的值
}
```

4、error---出错时触发，并且会关闭连接。可以根据错误信息按需处理

```js
ws.onerror = function(e){
  console.log(e)
}
```

5、close

连接关闭时触发，连接失败也会触发。客户端和服务端都可以设置。

```js
ws.onclose=function(e){
  console.log(e)
}
```

### websocket的一些api---方法

1、send方法---客户端向服务器发送数据。在发送数据时一定要在连接建立之后，所以一般会在onopen事件后触发

```js
ws.onopen=function(e){
  ws.send('向服务器发送消息')
}
```

2、close---关闭连接。

```js
ws.close()
```

### websocket的一些api---常量

CONNECTING--0--连接还未开启

OPEN--1--连接开启可以通信

CLOSING--2--连接正在关闭中

CLOSED--3--连接已经关闭

### websocket的一些api---属性

binaryType：表示连接传输的二进制数据类型的字符串。默认为"blob"。string类型

bufferedAmount：只读。如果使用send()方法发送的数据过大，虽然send()方法会马上执行，但数据并不是马上传输。浏览器会缓存应用流出的数据，你可以使用bufferedAmount属性检查已经进入队列但还未被传输的数据大小。在一定程度上可以避免网络饱和。 Number类型

protocol： 在构造函数中，protocol参数让服务端知道客户端使用的WebSocket协议。而在实例socket中就是连接建立前为空，连接建立后为客户端和服务器端确定下来的协议名称。  String/Array类型

readyState：只读。连接当前状态，这些状态是与常量相对应的。 String类型

extensions：	服务器选择的扩展。目前，这只是一个空字符串或通过连接协商的扩展列表。 String类型

### 实现一个websocket

1、安装express






