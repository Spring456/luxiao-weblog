## 混合式开发数据交互

混合式开发主要是H5端和安卓或IOS进行数据交互

### 方案

在我的实际开发中，方案有两种，

一种是安卓或IOS在app上起一格webview，然后把前端H5页面嵌入进去，这样我们在前端可以使用window对象的方式来实现交互；

第二种是安卓或IOS做一个js桥接，让我们可以通过这个js进行方法调用。

### H5向安卓/IOS传事件

比如在H5页面有个按钮，点击按钮，调用安卓/IOS的某个事件。使用第一种方式可以这么写：

```js
const android = window.android;
try {
    android.callPhone();
} catch (e) {
    console.log('出现错误, 如果在非android环境下访问, 出现该警告是正常的.')
}
```
上面的代码，就是前端调用安卓`callPhone`方法，安卓起了webview，就可以将`android`对象挂载到window上，我们就可以使用这个方法了。

### 安卓/IOS向H5传参或调用事件

安卓/IOS向H5传参，大多是通过URL方式来传值的。也可以通过事件传值。调用H5页面的事件。

```js
// H5端
window['callPhone'] = callH5Phone()

// callPhone是安卓传过来的事件，他们挂载在window上的事件来调用H5页面的事件，H5页面的事件是`callH5Phone`
```

### 桥接的方式

使用`WebViewJavascriptBridge`第三方库，这需要和H5协商方法名，并定义数据交互规则。

```js
this.$Bridge.default.registerhandler(
      "onVarietyBack",
      (data, responseCallback) => {
        // data是原生app传递给h5的参数
        console.log(data)
        responseCallback()
      }
    );
```
比如上面的传输方式，`registerhandler`是协商好的事件名，表示注册，然后`onVarietyBack`表示方法名，data表示原生app传递给H5的参数，`responseCallback`表示H5向原生app传递的方法

