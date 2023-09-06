## vue路由模式及原理

### vue路由模式

vue中，路由模式主要有两种：`hash模式和history模式`。`默认是hash模式`

hash模式：也就是url后面带'#'号键。`http://localhost:8082/#login`

history模式：url后面不带'#'号键。`http://localhost:8082/login`

在vue项目里，路由文件下，使用`mode:hash`来确定使用哪种路由模式。

当页面发生改变时，这两种模式下，浏览器都会新增一个记录。区别在于是否重新请求页面。

### hash模式和history模式特点

`hash模式特点：`

hash模式后面的'#'号键，表示页面中的位置。通过`window.location.hash`获取.

1、hash模式的原理是触发 onhashchange 事件，可通过 window 对象监听

```js
window.addEventListener("hashchange",func,false)；
```

2、hash模式不会向服务端请求，改变hash值，也就是改变'#'后面的值，并不会重新请求页面。跳转到与当前URL同文档的url。

这里说的不会重新请求页面，是说不会重新请求html，进入到页面后，页面加载会执行生命周期里面的代码

```js
http://localhost:8082/#login //如果重新请求，只会发送http://localhost:8082,所以不会重新请求页面
```

3、hash值发生改变时，浏览器就会在历史记录里新增一个记录

4、hash模式会创建hashHistory对象,在路由发生改变时，会触发两个方法，push方法和replace方法

push()方法将新路由添加到历史记录的栈顶，replace()方法则是把当前路由替换成新的路由。

`history模式特点`

history 的原理是利用H5的api，分别是history.back()、history.go()、history.forward()、history.pushState()、history.replaceState()、window.onpopState()这几个方法

1、history模式，监听地址变化，使用：`window.onpopstate`

1、vue中history模式，通过history Api的pushState()和replaceState()两个方法来实现的

pushState()可以改变url地址且不会发送请求,replaceState()可以读取历史记录栈,还可以对浏览器记录进行修改。与hash模式的两个方法功能相同

2、history模式需要后端配合，因为url路径修改后会请求服务器数据。如果服务器无响应就会出现404错误。所以需要服务器配置一个默认路径。比如在nginx里面配置重定向地址










