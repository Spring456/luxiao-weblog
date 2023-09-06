## 跨域之CORS

### 什么是Cors

CORS:即Cross-origin resource sharing(跨来源资源共享)。基本思想就是使用额外的HTTP头部让浏览器和服务器沟通，然后在于服务器有没有开启CORS配置。

CORS需要浏览器和服务器共同设置。浏览器都支持该功能，对于用户来说是一种无感知的操作。关键在于服务器是否开启了CORS配置，允许跨域访问。

### CORS跨域请求分类

浏览器跨域请求分为两种：`简单请求和非简单请求`

对于简单请求，浏览器是先请求后判断，浏览器收到服务器返回的HTTP响应后，即可知道请求是否跨域

对于非简单请求，浏览器采用预检请求，先询问服务器是否支持跨域请求。通过之后，再发送XHTMLRequest请求。

`什么是简单请求：`

简单请求需要同时满足以下两大条件：

1、请求方法是三种之一：GET/POST/HEAD

2、HTTP头信息不超出以下字段

Accept、Accept-Language、Content-Language、Last-Event-ID、

Content-Type：仅限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

凡是不符合上面要求的，都是非简单请求。

### 简单请求

对于简单请求，浏览器采取的是先请求后判断的方式。浏览器先向服务器发出请求，请求头中增加Origin字段。Origin字段是用来向服务器说明本次请求是来自哪个源。服务器是否允许此次访问。

如果origin携带的域在服务器允许范围内，返回的HTTP响应头中就会包括如下字段：

`1、Access-Control-Allow-Origin`

它的值要么是一个地址要么是一个星号，表示接受的域名。星号表示接收任意域名的请求。

`2、Access-Control-Allow-Credentials`

这个值是一个布尔值，表示是否发送cookie,默认情况下，Cookie不包括在CORS请求之中，设为true，表示Cookie可以包含在请求中，一起发给服务器。

`3、Access-Control-Allow-Headers`：发送的头信息

`4、Access-Control-Allow-Methods`：发送的请求方法

### 非简单请求

如果是非简单请求，浏览器会先发送预检请求，询问服务器是否支持跨域请求。在发送请求时的流程是：

1、正式请求之前，浏览器会预先发送一个OPTIONS请求，询问服务器当前域名是否在许可名单中，以及可以使用哪些HTTP方法和头字段

2、服务器收到预检请求之后，检查Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段，并做出响应

2、得到服务器肯定答复后，浏览器才会正式触发请求

### 跨域配置

跨域解决办法需要浏览器端和服务端一起设置。比如采用CORS跨域解决，那么浏览器端已经实现了，需要服务器端开启允许CORS跨域才行。



