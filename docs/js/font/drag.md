## HTML的拖拽API--Drag与Drop

### 拖拽api介绍

在H5中，任何元素都可以拖拽！使用到的api就是drag相关属性

H5中拖拽属性：draggable： auto | true | false

要想让某个元素需要拖拽，需要先设置该元素的draggable为true。

注意：链接和图片默认是可拖动的，则不需要 draggable 属性。

拖拽主要有两个动作，一个是拖拽目标触发的事件，一个是释放目标时的事件

`1、Drag(在拖拽目标时触发事件)`

* dragstart - 元素开始拖动时触发此事件

* drag - 元素正在拖动时触发此事件

* dragend - 元素拖动结束后触发此事件

`2、Drop(在目标区域释放时触发事件)`

* dragenter - 当被拖动的元素进入目标区域内时触发此事件

* dragover - 当被拖动的元素在目标区域内拖动时触发此事件

* dragleave - 当被拖动的元素离开目标区域时触发此事件

* drop - 当被拖动的元素在目标区域被放下时触发此事件

`3、dataTransfer来实现数据的存储和获取`

拖拽事件中，每个event事件对象中都会有dataTransfer对象用来保存被拖动的数据。它可以保存一项或多项数据、一种或者多种数据类型。

可以通过setData进行设值操作；可以通过getData进行取值操作。

### 实现一个拖拽

实现拖拽一个按钮到一个div里面。

```html
<!DOCTYPE html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title></title>
</head>
<style type="text/css">
	#div{
		width: 200px;
		height: 200px;
		border: 1px solid #ccc;
	}
</style>
<body>
	<div id='div'></div>
	<button type="button" id='btn' draggable="true">按钮</button>
	<script type="text/javascript">
		let oDiv = document.getElementById('div')
		let oBtn = document.getElementById('btn')
		// 拖拽按钮事件
		// 拖拽开始
		oBtn.ondragstart = function(e){
			console.log('拖拽开始')
			e.dataTransfer.setData('btns',e.target.id)
		}
		// 正在拖拽中
		oBtn.ondrag = function(){
			console.log('拖拽过程中')
		}
		// 拖拽结束
		oBtn.ondragend = function(){
			console.log('拖拽结束')
		}
		// 拖动的元素进入目标区域时
		oDiv.ondragenter = function(){
			console.log('元素进入目标区域')
		}	
		// 拖动元素在目标区域内触发
		oDiv.ondragover = function(e){
			e.preventDefault()
			console.log('元素在目标区域拖动')
		}
		// 拖动元素在目标区域被放下时触发
		oDiv.ondrop = function(e){
			e.preventDefault()
			let btnId = e.dataTransfer.getData('btns')
			e.target.appendChild(document.getElementById(btnId))
			console.log('元素在目标区域被放下')
		}
		// 拖动元素离开目标区域
		oDiv.ondragleave = function(){
			console.log('元素离开目标区域')
		}
	</script>
</body>
</html>
```

关键代码就是拖拽元素时，ondragstart事件；以及拖拽元素到目标区域时的ondrop事件。

使用dataTransfer将需要保存的数据存起来。同时还需要在放置以及拖拽时，需要使用`event.preventDefault()`禁用元素的默认行为。


