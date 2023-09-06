## 浏览器的回流和重绘以及性能

### 什么是回流和重绘

**回流(reflow)**：又叫做重排，即重新排列页面。由于某些元素的属性，位置等改变，导致浏览器需要重新渲染这部分的DOM的过程。比如width,height,resize()

**重绘(repaint)**：页面中元素样式的改变但并不影响它在文档流中的位置大小，不影响页面布局的，叫做重绘。比如改变元素的color,background-color,visibility,outline等

回流必定会引起重绘,重绘不一定会引起回流

回流的开销会更大，浏览器需要重新渲染页面，DOM需要重新计算生成，所以我们应尽量减少回流的产生。

### 回流

`**1、触发回流的操作**`

* 页面首次渲染

* 浏览器窗口大小发生改变(resize事件)

* 动态添加或删除样式表

* 元素尺寸大小位置发生改变(宽高，边距等)

* 元素内容发生改变(文字长度，图片数量大小，input输入框输入等)

* 字体大小发生改变(font-size)

* JS添加或删除DOM元素(display:none/block等)

* 操作某些css属性(如:hover)

* 查询某些属性或调用某些方法(offsetWidth 和 offsetHeight)

`**2、导致回流的属性和方法**`

尺寸位置类：width,height,margin,padding,border,border-width,min-height,min-width,vertical-align等

文字大小类：font-size

操作css属性：:hover,position:absolute

添加删除DOM元素：display:none/block

查询某些属性：clientWidth,clientHeight,clientTop,clientLeft,offsetWidth,offsetHeight,offsetTop,offsetLeft,scrollWidth,scrollHeight,scrollTop,scrollLeft

调用某些方法：scrollIntoView(),scrollTo(),getComputedStyle(),getBoundingClientRect(),scrollIntoViewIfNeeded(),resize()

### 为什么获取一些属性或调用方法也会导致回流？

因为以上属性和方法都需要返回最新的布局信息，因此浏览器不得不触发回流重绘来返回正确的值。大多数浏览器都会通过队列化修改并批量执行来优化重排过程。浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才会进行批量修改并清空队列。但是，在获取布局信息的时候，会强制刷新队列

### 重绘

`**1、导致重绘的属性或方法**`

颜色类：color

背景属性:background/background-image/background-position/background-repeat/background-size

outline属性:outline-color/outline/outline-style/outline-width

边框部分属性：border-style/border-radius

其他：visibility/text-decoration/box-shadow、

### 小疑问--绝对定位会不会影响回流？

绝对定位会脱离文档流，改变他的值，应该也会回流，只是影响的是当前图层，不会影响其他图层；如果absolute和static(定位的默认属性)相互切换时，肯定会回流的。


### 如何减少回流和重绘

减少回流和重绘的方法主要从两个方面来实现：css方面和JS方面

**css方面主要的操作有：**

1、除了表格，其他地方避免使用table布局(当然现在也不使用table布局了)

table布局时，会因为修改其中一小块数据会导致表格都会重新渲染。

2、使用class时，尽可能在DOM树的最末端改变。

因为css选择的渲染是从右到左，将class放在最末端，避免节点层级过多。

比如有这么一个结构:

```html
<div class='box'>
  <div class='left'>
    <div class='title'>回流和重绘</div>
    <div class='content'>
      <span class=''>...</span>
    </div>
  </div>
</div>
```
如果我们想给上面的span标签加样式。我们可以有多种方法，但尽可能的是直接加到span本身，而不是其父级再来触发span的样式。

3、避免使用内联样式

4、避免使用css表达式(calc())

5、css3硬件加速--使用transform、opacity、filters、Will-change

**JS方法**

1、避免频繁操作DOM结构

通过 documentFragment 创建一个 dom 文档片段,在它上面批量操作 dom，操作完成之后，再添加到文档中，这样只会触发一次重排。

2、避免频繁操作css样式

如果我们需要修改元素样式，可以先将元素样式写好，然后往元素上添加class名即可。

传统的写法：

```javascript
window.onload=function(){
      // 按钮dom
			const oBtn = document.getElementById('btn')
      // 元素box的dom
			const el = document.querySelector('.box')
      //点击事件添加样式
			oBtn.onclick = function(){
				el.style.width = '300px'
				el.style.height = '150px'
				el.style.color='blue'
				el.style.border = '1px dashed pink'
			}
		}
```

我们将需要改变的样式在css里面写好，然后直接添加class名更好

```javascript
<style>
	.update{
		width:300px;
		height:150px;
		color:blue;
		border:1px dashed pink
	}
</style>

<script type="text/javascript">
		window.onload=function(){
			const oBtn = document.getElementById('btn')
			const el = document.querySelector('.box')
			oBtn.onclick = function(){
				el.classList.add('update)
			}
		}
</script>
```

3、DOM离线处理，处理完成之后再显示出来

设置DOM的属性为display:none，元素不可见，从渲染树中完全移除，对该DOM的操作不会引起回流和重绘，操作完成之后再设置display:block改为显示，只会触发这一次的回流与重绘

4、避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。

5、对具有复杂动画的元素使用`absoult`或`fixed`，使它脱离文档流,开销较小