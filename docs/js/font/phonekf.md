## 移动开发的代码片段


+ **1、强制让文档的宽度与设备的宽度保持1:1，并且文档最大的宽度比例是1.0，且不允许用户点击屏幕放大浏览**

```js
<meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
```

+ **2、iphone设备中的safari私有meta标签，表示允许全屏模式浏览**

```js
<meta content="yes" name="apple-mobile-web-app-capable" />
```

+ **3、iphone的私有标签，它指定的iphone中safari顶端的状态条的样式；**

```js
<meta content="black" name="apple-mobile-web-app-status-bar-style" />
```

+ **4、告诉设备忽略将页面中的数字识别为电话号码。**

```js
<meta content="telephone=no" name="format-detection" />
```

+ **5、Android中禁止自动识别页面中的邮件地址，iOS中不会自动识别邮件地址；**

```js
<meta content="email=no" name="format-detection" />
```

+ **6、去掉手持设备点击时出现的透明层，一般会在头部做格式化**

```js
a,button,input{
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent; /* For some Androids */
}
```

在应用了此属性时，链接的 active属性会实效，解决的方法是，在页面unload时运行document.addEventListener("touchstart", function(){}, true);使active状态可用。（注：在小米系统下，点击链接仍然会出现红色的边框

+ **7、使用rem单位布局移动端时，加入如下JS代码.实现rem与html的font-size之间的关系，实现相对于视窗宽度的百分比**

```js
<script>
document.addEventListener("DOMContentLoaded", function(event) {
    document.documentElement.style.fontSize = window.innerWidth/10 + "px";
  });
</script>
```

上述这段代码是将rem和html之间字体的大小换算。
以上这些语句是可以直接复制在<head>里面即可。

+ **8、viewport**

viewport也就是可视区域，在PC端，我们很清楚viewport是什么，就是除去所有工具栏，状态栏，滚动条等之后看到的网页区域。在移动设备屏幕宽度不同于传统web，在移动设备中，屏幕是浏览器可视的那部分区域，屏幕的宽度往往只有320像素或640像素，而传统的桌面端网站页面远远大于移动设备的屏幕尺寸，为了使桌面端页面能够在移动端正常显示，移动端浏览器虚拟出了一种viewport的显示窗口。在不同的设备中这一显示出窗口的大小不同。但都无一例外地大于移动设备的屏幕大小。viewport自动加以缩放以适应屏幕宽度。在这里我们用到以下属性

```js
width——viewport的宽度(范围从200到10000，默认是980像素）
height——viewport的高度（范围从223到10000）
initial-scale——初始的缩放比例（范围从0到10，一般设置为1.0）
minimun-scale-  ——允许用户缩放到的最小比例
maximum-scale-   ——允许用户缩放到的最大比例
user-scalable-   ——用户是否可以手动缩放（yes  no)一般设置为no，不能手动缩放
```

+ **9、移动端meta标签设置**

```js
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">	//编码

<meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0;maximum-scale=1.0; user-scalable=no;"/>

<meta name=”apple-mobile-web-app-capable” content=”yes” />  // 离线应用的另一个技巧	
	
<meta name=”apple-mobile-web-app-status-bar-style” content=black” />  // 隐藏状态栏	
	
<meta content="black" name="apple-mobile-web-app-status-bar-style" />	//指定的iphone中safari顶端的状态条的样式    
    
<meta content="telephone=no" name="format-detection" />		//告诉设备忽略将页面中的数字识别为电话号码	
	
<meta name="Author" contect="Mr.He"/ >
```

+ **10、移动端link引入文件的设置**

```js
<link rel=”apple-touch-startup-image” href=”startup.png” /> // 设置开始页面图片

<link rel=”apple-touch-icon” href=”iphon_tetris_icon.png”/> // 在设置书签的时候可以显示好看的图标

<link rel="stylesheet" media="all and (orientation:portrait)" href="portrait.css">	// 肖像模式样式	
	
<link rel="stylesheet" media="all and (orientation:landscape)" href="landscape.css"   // 风景模式样式

//竖屏时使用的样式 
<style media="all and (orientation:portrait)" type="text/css">
#landscape { display: none; }
</style>

//横屏时使用的样式 
<style media="all and (orientation:landscape)" type="text/css">
#portrait { display: none; }
</style>
```

+ **11、屏幕旋转事件——onorientationchange**

屏幕旋转事件监听，可随时发现屏幕旋转时的状态

```js
// 判断屏幕是否旋转
function orientationChange() { 
	switch(window.orientation) { 
	　　case 0:  
			alert("肖像模式 0,screen-width: " + screen.width + "; screen-height:" + screen.height); 
			break; 
	　　case -90:  
			alert("左旋 -90,screen-width: " + screen.width + "; screen-height:" + screen.height); 
			break; 
	　　case 90:    
			alert("右旋 90,screen-width: " + screen.width + "; screen-height:" + screen.height); 
			break; 
	　　case 180:    
		　　alert("风景模式 180,screen-width: " + screen.width + "; screen-height:" + screen.height); 
		　　break; 
	};
};
// 添加事件监听 
addEventListener('load', function(){ 
	orientationChange(); 
	window.onorientationchange = orientationChange; });
```

+ **12、处理事件时，隐藏地址栏，防止滚动条出现**

```js
// 隐藏地址栏  & 处理事件的时候 ，防止滚动条出现
addEventListener('load', function(){ 
    	setTimeout(function(){ window.scrollTo(0, 1); }, 100); 
});
```

+ **13、判断是否为iphone**

```js
// 判断是否为 iPhone ： 
function isAppleMobile() { 
	return (navigator.platform.indexOf('iPad') != -1); 
};
```

+ **14、双手指滑动事件**

```js
// 双手指滑动事件
addEventListener('load',　　function(){ window.onmousewheel = twoFingerScroll;}, 
     false				// 兼容各浏览器，表示在冒泡阶段调用事件处理程序 (true 捕获阶段)
); 
function twoFingerScroll(ev) { 
	var delta =ev.wheelDelta/120;              //对 delta 值进行判断(比如正负) ，而后执行相应操作 
	return true; 
};
```

+ **15、检测iphone或ipod**

```js
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
　　if (document.cookie.indexOf("iphone_redirect=false") == -1) {
　　　　window.location = "http://m.example.com";
　　}
}
```


