## echarts使用心得以及v-charts使用小结

### echarts的响应式

每次窗口大小改变的时候都会触发onresize事件，这个时候我们将echarts对象的尺寸赋值给窗口的大小这个属性，从而实现图表对象与窗口对象的尺寸一致的情况

```js
window.onresize = echart.resize;
echart.setOption(option);
```

### echarts异步请求

使用ajax获取数据的时候，可以先设置完其他样式，显示一个空直角坐标。然后用ajax获取数据请求。

### x轴数据显示不全，被截取的操作

当X轴上面要渲染的数据太多的时候就会出现只渲染出来一部分，但是图表中的数据显示(比如说柱状图中的每个柱子)又会自动的进行宽度的缩放，所以会导致X轴与图中的信息不相匹配的问题，解决的方法是在X轴设置axisLabel :{ interval:0 }这个属性问题就可以解决了，Y轴的使用方法相同

### x轴换行

将x轴需要换行的地方使用/n，显示时就换行了

### 当碰到有tab切换时，再显示图表出现的问题

最近在使用echart时，出现了一个问题就是：手机上使用echarts，页面中有tab切换图表。除了第一个可以正常显示外，其他的图表的宽度必须设置成很大。比如说第一个tab的图表的宽度我设置为100%，第二个tab图表的宽我必须设置成300%才行。而且使用grid还不行。在手机端需要做适配，所以设置具体的宽度并不好，设置成百分比会出现问题。

解决：

原因：原因可能是在进行tab切换时，其宽度并没有加载出来。此时，我们需要将宽度重新加载一遍。

```js
document.getElementById('box').style.width = window.innerWidth+'px';
```
获取屏幕宽度，echarts的宽度和屏幕的宽度一致

```js
let box= echarts.init(document.getElementById('box'));
```
再进行初始化，这个时候设置宽度为百分之100就可以了。不用担心适配问题

## v-charts用法小结

v-charts是基于echarts的二次封装，使用起来异常方便，地址：https://v-charts.js.org/#/。

功能没有echarts那么丰富，但一般情况下是够用了。在这里不讲怎么引入，使用，直接看官方的api即可。由于其API写的比较简单。因此在使用过程中踩过不少的坑，现做一个小结，方便后来人。

### 1.在v-charts中使用xAxis

在v-charts中使用xAxis时，需要执行3步。第一个步骤是在html中使用:xAxis=“xAxis”；第二步是在data里面定义xAxis，声明为一个空对象；第三步也就是非常重要的一步就是在methods中，使用

this.xAxis={}

但是在这一步，我们相当于是用xAxis将原有的覆盖了，所以我们要在this.xAxis中重新定义横坐标data，否则图表会变形。只要重新定义了data，之后我们就可以使用xAxis的其他任何属性了。

### 2、横坐标被截取

横坐标太多不能显示完全，常用的解决办法有两种：

一种是横坐标倾斜，一种就是自定义横坐标间距。

```js
this.xAxis = {
      type:'category',
      data:rows1,
      boundaryGap:true,
      axisLabel:{
          rotate:30,
          interval:0
      }
    };
```

用法和echarts类似，interval表示间距，为0表示横坐标数据全部展示，rotate表示倾斜角度。

如果不想使用倾斜，那就自定义间隔，设置interval的数值即可。

但是我在实际工作中，还碰到一个问题就是：同样的代码，同样的浏览器，同样的电脑配置，当横坐标是日期时，横坐标最右边的数值被截取了。这让我很是无语。找了很多原因，最后解决的办法是加上：grid=grid，然后给grid设置right值才解决的。