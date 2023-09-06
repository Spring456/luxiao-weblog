## box-shadow内外阴影的用法

### 用法

> box-shadow: h-shadow v-shadow blur spread color inset;

### 各项属性

h-shadow 必需。水平阴影的位置。允许负值。

v-shadow 必需。垂直阴影的位置。允许负值。

blur 可选。模糊距离。

spread 可选。阴影的尺寸。

color 可选。阴影的颜色。请参阅 CSS 颜色值。

inset 可选。将外部阴影 (outset) 改为内部阴影。

```html
<div class="box shadow"></div>
<style>
    .box{
        width: 100px;
        height: 100px;
        border: 1px solid #000;
    }
    .shadow{
        box-shadow: 2px 2px 2px red;
    }
</style>
```

上面的代码是一个最基本的box-shadow外阴影，其中它的值分别表示：x轴，y轴，阴影模糊距离，阴影颜色。

其中x-offset为正值时，生成右边阴影，反之为负值，生成左边阴影；y-offset为正值时，生成底部阴影，反之生成顶部阴影；阴影模糊半径如果为0，则生成实影效果。如果加上阴影模糊半径，阴影清晰度向外扩散，更具阴影效果。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<div class="top">top</div>
<br>
<div class="right">right</div>
<br>
<div class="bottom">bottom</div>
<br>
<div class="left">left</div>
</body>
<style>
div{
	width: 100px;
	height: 100px;
	border: 1px solid red;
	text-align: center;
	line-height: 100px;
}
.top {  
      box-shadow: 0 -2px 5px red;  
    }  
.right {  
	box-shadow: 2px 0 5px green;  
}  
.bottom {  
	box-shadow: 0 2px 5px blue;  
}  
.left {  
	box-shadow: -2px 0 5px orange;  
} 
</style>
<script type="text/javascript">

</script>
</html>

```
如果想使用内阴影，只需要加上属性inset

```css
.shadow{
    box-shadow: inset 2px 2px 2px red;
}
```

如果想实现单边阴影效果，则需要对阴影扩展半径进行设置.下面是设置向内的单边阴影

1、单边上边阴影

```css
box-shadow:inset 0 4px 5px -3px blue;
```

2、单边左边阴影

```css
box-shadow:inset 4px 0 5px -3px green;  
```

3、单边下边阴影

```css
box-shadow:inset 0 -4px 5px -3px red; 
```

4、单边右边阴影

```css
box-shadow:inset -4px 0 5px -3px orange;
```

如果想实现向外的单边阴影，和向内的单边阴影反着的。