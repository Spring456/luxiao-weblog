## h5页面复制文字到剪切板

需求：点击h5页面的复制按钮，将文字复制到剪切板，在微信或QQ发送给他人。

```html
<div id="app">
    <p id='selector'>这是需要复制的一段文字</p>
    <p class="mapcolor" id='copy'>复制</p>
</div>

<script>
// 复制链接地址并关闭分享且提醒
var aEle = document.querySelector('#copy');
aEle.addEventListener('click',function(){
    var copyDOM = document.querySelector('#selector');
    var range = document.createRange();
    range.selectNode(copyDOM);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    var successful = document.execCommand('copy');
    try {
        // Now that we've selected the anchor text, execute the copy command
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copy email command was ' + msg);
    } catch(err) {
        console.log('Oops, unable to copy');
    }
    // Remove the selections - NOTE: Should use
    // removeRange(range) when it is supported
    window.getSelection().removeAllRanges();
},false);
</script>
```

在这里其实用到了document的一个方法--createRange()；

创建range对象很简单 var range = document.createRange() 

操作range对象，有两个步骤，1选择节点，2,操作节点

选择节点：

最简单的选择节点方法：

 selectNode() :选择整个节点，包括子节点

 selectNodeContents()  选择节点的子节点

以上2个方法只能选择节点集合，需要精细选择节点，要用到的是 setStart()  和  setEnd() 个方法都接受两个参数：一个参照节点，一个节点偏移量

2.操作节点

 deleteContents() 这个方法能够从文档中删除范围缩包含的内容

 extractContents() 会删除并返回文档片段

 CloneContents() 创建范围对象的一个副本，不会影响原来的节点

 insertNode() 向范围选区的开始处插入一个节点

 surroundContents() 环绕范围插入内容 

其他：

复制 DOM 范围  ： 可以使用 cloneRange()方法复制范围。这个方法会创建调用它的范围的一个副本。

 var newRange = range.cloneRange();  

清理 DOM 范围 ：

在使用完范围之后，最好是调用 detach() 方法，以便从创建范围的文档中分离出该范围。调用
detach()之后，就可以放心地解除对范围的引用，从而让垃圾回收机制回收其内存了。来看下面的
例子

range.detach(); //从文档中分离
range = null; //解除引用 
推荐在使用范围的最后再执行这两个步骤。一旦分离范围，就不能再恢复使用了。 