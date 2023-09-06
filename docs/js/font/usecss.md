## 高频实用的CSS片段代码

### 1、图片5px的问题

使用图片时，图片底部会多出5px的间距。解决

1、给父元素设置font-size: 0

2、给img设置display: block

3、给img设置vertical-align: bottom

4、给父元素设置line-height: 5px;

### 使用vh单位使元素高度和屏幕一样

给一个div加背景图片，这个背景图片的高度充满整个屏幕。要么就要设置html,body的height为100%，然后div需要定位才行。

简单方法就是只用设置div的高度为100vh。使用vh这个单位就可以充满整个屏幕了。

### 修改input的placeholder样式

> .placehoder-custom::-webkit-input-placeholder

### 使用caret-color改变光标颜色

```css
<input type="text" class="caret-color" />
.caret-color {
  caret-color: #ffd476;
}
```

### 移除type="number"尾部的箭头

```css
/* 关键css */
.no-arrow::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
```

### IOS滚动条卡顿

在IOS机器上，经常遇到元素滚动时卡顿的情况，只需要一行css即可让其支持弹性滚动

```css
body,html{   
  -webkit-overflow-scrolling: touch;
}
```

### 隐藏滚动条

```css
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
```

### 禁止选择文本

> user-select: none;

### 单行文本溢出显示省略号

```css
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
```

### 多行文本溢出显示省略号

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
/* 设置n行，也包括1 */
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

### 一键变灰

```css
body{
  filter: grayscale(1);
}
```