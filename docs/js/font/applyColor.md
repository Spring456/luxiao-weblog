## 浏览器相关——浏览器页面渲染机制

### 页面加载过程

![页面加载过程](../../media/liulanqi.png)

### 浏览器的组成

浏览器的核心是两个部分：`渲染引擎`和`JavaScript引擎`,也是两个线程，分别是GUI渲染线程与JS引擎线程。为了防止不可预期的结果，这两个线程是互斥的。

GUI渲染线程负责DOM的解析和CSSOM的解析，这两种解析是并行发生，不会相互阻塞。

渲染引擎就是将文档渲染出来，不同的浏览器有不同的渲染引擎，渲染文档时，主要有4个步骤：

![渲染引擎](../../media/huiliu.png)

JS引擎就是加载处理JS脚本的。它的加载、解析与执行会阻塞DOM的构建。影响页面在解析文档上的顺序和构建渲染树时的操作。

### 浏览器渲染过程
#### 1、解析HTML,CSS,JS

* 一是HTML/SVG/XHTML，HTML字符串描述了一个页面的结构，浏览器会把HTML结构字符串解析转换DOM树形结构。

  * 浏览器将HTLM文件构建为DOM树，可以分为这几个步骤：

  字节数据——字符串——Token(标记)——Node(节点)——DOM树

  字节数据：浏览器根据文件指定编码(UTF-8)将传输过来的二进制字节数据转换为字符串。

  token(标记处理):将输入解析成符号，HTML符号包括开始标签，结束标签，属性值，属性名等

  构建DOM树：解析器获取这些标记之后，用合适的方法创建DOM对象并把这些符号插入到DOM对象中。

* 二是CSS，解析CSS会产生CSS规则树

  * 解析CSS为CSSOM可以分为这几个步骤

  字节数据——字符串——Token(标记)——Node(节点)——CSSOM

  浏览器css解析器根据语法规范解析所有的css文件，然后得到一个解析表。

* 三是Javascript脚本，等到Javascript 脚本文件加载后， 通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree。

#### 2、构建渲染树(rending tree)

渲染树不等于DOM树，渲染树只会包括需要显示的节点和这些节点的样式信息。会忽略那些不需要渲染的节点(比如使用了display:none隐藏的节点)

CSS 的 Rule Tree主要是为了完成匹配并把CSS Rule附加上Rendering Tree上的每个Element（也就是每个Frame）

构建DOM树的过程，要经历计算尺寸、计算样式权重、解析js文件。

#### 3、渲染布局

确定渲染树中每个节点的几何属性，比如位置，大小等等。遍历渲染树，调用渲染器的 paint() 方法在屏幕上显示其内容。又叫布局(layout)和回流重绘的过程。

#### 绘制

调用操作系统Native GUI的API绘制。

整个过程如下：

![浏览器渲染机制](../../media/xuanran.png)

### JavaScript引擎

如果在解析HTML过程中遇到了`<script>`，就暂停解析，GUI线程就会挂起，进入JS引擎，这样dom解析就被阻塞了。

JS引擎执行完毕，再将控制权交给渲染引擎，往下渲染HTML文档。如果脚本加载时间较长，那么浏览器就会一直等待脚本下载完成再执行后面的html文档。这样页面就会卡住

JS文件不只是可以更改DOM，还可以更改CSS样式，更改CSSOM。所以JS想修改CSSOM，那必须要先拿到CSSOM，所以在这种情况下，浏览器会下载和构建CSSOM，然后执行JS，最后构建DOM

### 在`<script>`里执行JS代码

**1、直接在`<script>`里写js代码**

脚本文件放在页面顶部，这个时候DOM节点还没有生成完成，如果在这里就调用DOM节点，会报错。

```js
<script type="text/javascript">
  console.log(document.getElementById('p'))//null
</script>
<body>
  <p id='p'>123</p>
</body>
```
如上，在`<script>`获取页面元素，会显示为null，因为此时DOM节点还没有渲染完成。

两种解决办法：

(1)、使用`window.onload`

```js
<script type="text/javascript">
		window.onload=function(){
			console.log(document.getElementById('p'))
		}
	</script>
	<body>
		<p id='p'>123</p>
	</body>
```

(2)、将`<script>`标签放到页面底部

```js
<body>
  <p id='p'>123</p>
</body>
<script type="text/javascript">
  console.log(document.getElementById('p'));
</script>
```

(3)、设定DOMContentLoaded事件的回调函数

```js
<script type="text/javascript">
  document.addEventListener(
        'DOMContentLoaded',
        function (event) {
          console.log(document.getElementById('p'));
        }
      );
</script>
<body>
  <p id='p'>123</p>
</body>
```

### 引入外部JS文件时，async和defer

由于`<script>`标签使用js可以直接在里面写入，也可以引入外部js文件，因此就带来以下几种情况

1、引入外部JS文件`<script src="vue.js"></script>`

这种情况下，浏览器会立即加载并执行脚本。会阻塞后面文档的加载

2、使用async异步加载`<script src="vue.js" async></script>`

async 属性表示异步执行引入的JS文件。使用另一个进程下载脚本，下载时不会阻塞浏览器渲染。这种情况下，浏览器渲染流程如下:

a、浏览器解析HTML网页

b、当解析到`<script>`标签里面有async属性时，就开启另一个进程

c、浏览器一边下载渲染HTML，一边并行下载`<script>`标签中的外部脚本

d、当脚本下载完成后，就暂停HTML解析，开始执行脚本

e、脚本执行完成，再解析渲染HTML网页

async的弊端就是无法保证脚本的执行顺序，哪个脚本先执行完成就执行哪个脚本。如果脚本之间有依赖关系，最好不使用这个属性。


3、defer属性延迟加载，`<script src="vue.js" defer></script>`

defer属性表示延迟加载，是等待DOM加载完成之后才执行脚本，加载脚本是并行的。这种情况下，浏览器渲染流程如下:

a、浏览器解析HTML网页

b、当解析到`<script>`标签里面有defer属性时，就开启另一个进程

c、浏览器一边下载渲染HTML，一边并行下载`<script>`标签中的外部脚本

d、当浏览器完成解析HTML后，再来执行已经下载完成的脚本

e、脚本执行完成，再解析渲染HTML网页

defer属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。下载的脚本文件在DOMContentLoaded事件触发前执行（即刚刚读取完</html>标签），而且可以保证执行顺序就是它们在页面上出现的顺序。

对于内置而不是加载外部脚本的script标签，以及动态生成的script标签，defer属性不起作用

### 影响渲染效率的因素--回流重绘

通过上面渲染引擎的四个阶段,在解析阶段，JS文本的内容或属性会影响到页面渲染；当页面解析完成之后就要构建渲染树，生成DOM树后要布局到页面上，这个时候JS又会动态修改DOM属性或CSS属性又会导致重新布局，这个时候就会发生回流重绘。

回流重绘参考：[回流重绘](https://spring456.github.io/web_docs.github.io/#/FrontEnd/Basic/reflow)

页面在渲染过程中，开销比较大的就是这一环节。所以性能优化中有一条就是减少对DOM的操作是有道理的。


### 前端渲染和ssr渲染

前端渲染是服务端将静态文件发送给客户端，客户端获取到文件之后，在浏览器运行JS，根据运行结果生成相应的DOM

ssr渲染：服务端渲染下，用户第一次请求页面时，服务器将需要的页面以HTML字符串的形式返回给客户端，客户端直接渲染成HTML结构内容。不需要再去运行JS生成DOM了。这样速度更快。

### 总结

1、浏览器有两大核心：渲染引擎和JS引擎。渲染引擎负责渲染HTML和CSS，两者是并行进行。JS引擎负责渲染JS文件

2、浏览器工作流程可以分为：解析HTML，CSS，JS——构建渲染树——渲染布局——绘制

3、解析DOM时，碰到`<script>`标签时，GUI线程挂起阻塞DOM解析，进入JS引擎渲染JS。

4、如果`<script>`标签没有async或defer属性，则解析JS文件和css，等待CSSOM构建完成后，再执行JS，执行完毕再解析HTML，重新构建

5、如果有async或defer，则按照规则延迟或者解析但不执行js文件。此时HTML解析照常进行。如果是async属性，js加载完成后就立即执行阻塞HTML解析；如果是defer，则等HTML解析完成后再执行js文件



