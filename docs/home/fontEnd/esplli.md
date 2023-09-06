## css实现文本的中文，英文强制换行和不换行，单行多行文本的省略号

### 对单行文本

1. word-break:break-all;只对英文起作用，以字母作为换行依据

2. word-wrap:break-word; 只对英文起作用，以单词作为换行依据

3.{white-space:pre-wrap; 只对中文起作用，强制换行

4.{white-space:nowrap; 强制不换行，都起作用

5.{white-space:nowrap; overflow:hidden; text-overflow:ellipsis;不换行，超出部分隐藏且以省略号形式出现

注意，一定要指定容器的宽度，不然的话是没有用的。

单行文本的省略号

```html
<div id="app">
    <p class="p1">单行文本以省略号结尾单行文本以省略号结尾单行文本以省略号结尾</p>
    <p class="p2">This is a passage,This is a passage,This is a passage,This is a passage</p>
</div>
```
```css
<style>
    *{
        margin: 0;
        padding: 0;
    }
    .p1,.p2{
        width: 200px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
</style>
```
多行文本的省略号

多行文本使用下面代码来实现多行文本的省略号

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```
依然需要给元素定宽

```html
<div id="app">
    <p class="p3">多行文本以省略号结尾多行文本以省略号结尾多行文本以省略号结尾多行文本以省略号结尾多行文本以省略号结尾多行文本以省略号结尾多行文本以省略号结尾</p>
</div>

<style>
    .p3{
        width: 200px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
</style>
```