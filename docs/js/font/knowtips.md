## 关于JS的一些小知识

### 获取URL参数

```js
const q = {};
location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
console.log(q);
```

### ios手机容器滚动条滑动不顺畅

```css
overflow: auto;
-webkit-overflow-scrolling: touch;
```

### h5底部输入框被键盘遮挡问题

如果你遇到h5页面这个问题，当输入框在最底部，点击软键盘后输入框会被遮挡，可以如下解决问题：

```js
var getHeight = $(document).height();

$(window).resize(function(){
 if($(document).height() < getHeight) {
  $('#footer').css('position','static');
 }else {
  $('#footer').css('position','absolute');
 }
});
```
### 触屏即播放

```js
$('html').one('touchstart',function(){
 audio.play()
})
```

### 生成6位数字验证码

```js
// 方法一
('000000' + Math.floor(Math.random() *  999999)).slice(-6);
// 方法二
Math.random().toString().slice(-6);
// 方法三
Math.random().toFixed(6).slice(-6);
// 方法四
'' + Math.floor(Math.random() * 999999);
```

### 16进制颜色代码生成

```js
(function() {
  
return '#'+('00000'+ 
  (Math.random()*0x1000000<<0).toString(16)).slice(-6);
})();
```

### 驼峰命名转下划线

```js
'componentMapModelRegistry'.match(/^[a-z][a-z0-9]+|[A-Z][a-z0-9]*/g).join('_').toLowerCase(); 
```

### 替换所有

String.replace()函数允许你使用字符串或正则表达式来替换字符串，本身这个函数只替换第一次出现的字符串，不过你可以使用正则表达多中的/g来模拟replaceAll()函数功能：

```js
var string = "john john";
console.log(string.replace(/hn/, "ana")); // "joana john"
console.log(string.replace(/hn/g, "ana")); // "joana joana"
```

