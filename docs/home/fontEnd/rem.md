## 移动端适配方案——rem

### 什么是rem?

rem是一个相对单位，是相对于根元素的字体大小的计算值。也就是相对于html元素设置的字体大小的单位。

浏览器的默认字体是16px，也就是`1rem=16px`。如果设置了html的字体大小为20px，那么1rem=20px

### 为什么需要rem

我们在进行移动端或做响应式布局的时候，有这几个问题：

**1、viewport缩放**

```js
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0 />
```
但是不同屏幕分辨率的手机需要设置不同的比例缩放，initial-scale设置的越大，页面内容就会拉伸的越厉害，页面内容也越失真

**2、固定宽度布局**

页面宽度固定，在pc端还可以，但是在移动端就不行了。

**3、响应式布局**

响应式局部的局限性在于无法100%兼容，适应不了日益更新的手机端；需要针对不同的屏幕大小设置不同的css样式，比较麻烦；针对复杂的页面结构表现形式有限。

就是因为在不同屏幕下，如果使用px绝对单位，就会出现各种各样的问题，这个时候就需要使用相对单位了。而rem是根据根元素(html)来动态显示大小，就能很好的适应不同屏幕下尺寸的需求。

```css
html{
	font-size: 20px;
}
li{
	width: 1.2rem;	/*1.2*20=24px*/
	height: 1rem;   /*1*20=20px*/
}
```
也就是我们只需要根据不同屏幕设置不同的html的font-size,使用了rem单位的元素就会自适应显示相应的尺寸了。

### rem和em

em也是相对单位，只不过是相对于父级字体大小的，在页面层级嵌套过程中，对于整个布局来说，使用em就比较麻烦。

还有就是浏览器窗口发生变化时，如果使用em，那原来的布局也会发生改变。所以依然还是使用rem来进行移动端，响应式布局。

### 设置默认值`html{font-size:62.5%}`

浏览器默认字体大小是16px，默认字体最小值是12px。

默认情况下，1rem=16px，20px=1.25rem等，这些值对于计算来说很不方便，出于这个原因，设置html的font-size为10px，计算起来是不是更加方便呢。但浏览器字体最小是12px，所以设置成百分比形式。

如果将16px看成是100%，那1px=6.25%，所以10px=62.5%。因此设置`html{font-size:62.5%}`

这里的1rem=10px，所以12px=1.2rem。px与rem的转换通过10就可以得来，很方便了吧！所以通常情况下：

```css
html:{font-size:62.5%}
div{font-size:1.4rem /*14px*/}
```

因为不同屏幕分辨率的问题，我们可以使用媒体查询根据不同屏幕大小设置html的字体。

```css
@media screen and (min-width: 360px){
    html {
        font-size: 87.5%;
    }
}
@media screen and (min-width: 320px){
    html {
        font-size: 72%;
    }
}
html {
    font-size: 62.5%;
}
```

## 使用js来动态获取屏幕大小设置html字体大小

在上面我们将html设置成62.5%,也就是根据浏览器默认的字体大小16px来设置。然后根据媒体查询方式来根据不同的屏幕大小设置不同的font-size

但是现在移动端屏幕大小众多，一个个来设置往往不现实。所以我们采用js方式来动态设置rem的值

```js
// * 这里的html字体大小是根据iphone5的宽度来设置的，iphone5的宽度是320px,平均分成20份，每一份就是16px，也就是1rem=16px
document.documentElement.style.fontSize = document.documentElement.clientWidth/20 + 'px'; 
```
这样html的font-size就被设置了16px了。

更具兼容性的js如下

设计图是480px的情况下

```js
(function (doc, win) {
  let docEl = doc.documentElement
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = 14 * (clientWidth / 320) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
```

设计图是750px的情况下

```js
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			if(clientWidth >= 750) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			}
		};
	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
```

在有设计图的前提下，为了方便切图好计算，如果我们直接设置html的font-size为100px，那么在750px下，就是7.5rem，页面是iPhone5的那么计算出的结果就是6.4rem。

设置时还可以这样设置:

```js
document.documentElement.style.fontSize = document.documentElement.clientWidth / 以rem为单位的页面总宽 + 'px';
```

```js
// 如iPhone6的设计图就是：
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
// iPhone5的设计图就是：
document.documentElement.style.fontSize = document.documentElement.clientWidth / 6.4 + 'px';
```
这样在测量设计图时，直接设置转换为100px，在设计图上就可以得出的rem值了。


**某些大厂对文字的解决方案**

在某些厂商，文字还是使用px单位来实现，只不过是使用媒体查询方式。比如网易的操作

```js
@media screen and (max-width: 321px) {
    body {
        font-size:16px
    }
}
 
@media screen and (min-width: 321px) and (max-width:400px) {
    body {
        font-size:17px
    }
}
 
@media screen and (min-width: 400px) {
    body {
        font-size:19px
    }
}
// 或者：
@media screen and (max-width: 321px) {
    header,footer {
        font-size:16px
    }
}
 
@media screen and (min-width: 321px) and (max-width:400px) {
    header,footer {
        font-size:17px
    }
}
 
@media screen and (min-width: 400px) {
    header,footer {
        font-size:19px
    }
}
```


### rem的局限性

如果移动端布局时全部使用rem是不推荐的。因为文本的字体大小在不同的屏幕下相差并不大，图片的拉伸缩放比例是固定的，如果都使用rem，那么在不同屏幕下，字号不一致，体验并不好；然后图片可以使用百分比来实现比例的缩放。所以在布局时，一般我们使用rem来设置元素的宽高就行了。没必要页面上所有元素都使用rem。

### vw的使用

虽然目前市面上大多数移动端布局使用的是rem，但rem并不能适应所有终端，随着viewport单位越来越受到众多浏览器的支持，越来越多的移动端开始使用vw单位来进行布局。

参考：[vw使用](https://www.cnblogs.com/luxiaoxing/p/7544375.html)

