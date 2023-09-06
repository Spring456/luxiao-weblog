## JS中的闭包

### 什么是闭包？

根据MDN对闭包的定义：

> 在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。可以在一个内层函数中访问到其外层函数的作用域。

MDN对闭包的定义感觉比较晦涩，我们简单一点：`闭包就是函数和函数内部能访问到的变量组成的`

```js
var a=1;
function fn(){
    console.log(a)
}
fn()
```
在上面的例子中，有一个变量a，有一个函数fn()，fn()函数里能访问到变量a，最后执行。

好，这就是一个闭包！

在《JavaScript权威指南》中就讲到了：`从技术的角度讲，所有的JavaScript函数都是闭包`。

但通常情况下，我们对于闭包的理解并不是这样。

通常意义上的闭包形式是：`是函数套函数的方式`。如下面的代码：

```js
function fn(){
    var a = 1
    function fn1(){
        a++
        console.log(a)
    }
    return fn1()
}
fn()//2
```

像上面两个函数嵌套组成，`里面的函数能够访问到定义在外面函数里的变量`，函数fn1里面能访问到定义在函数fn里面的变量a。内部函数执行通过retrun出来，最后执行外面函数，就能将内部函数里的值打印出来。这样的形式，我们就称之为闭包。

为什么要用这样的形式呢？

这是因为`尽量少使用全局变量，使用局部变量。`而使用函数嵌套函数的方式，也是为了能使用局部变量

使用retrun也是为了让我们能够使用内部函数。也可以用window.fn的方式修改。

```js
function fn(){
    var a= 1
    function fn1(){
        a++
        console.log(a)
    }
    window.fn2 = fn1
}
fn()
fn2()//2
```

好了，通过上面的例子，我们可以总结如下：

1、闭包就是函数和函数能够访问到的变量。

2、闭包一般是函数嵌套函数的方式展现

3、闭包的存在就是为了访问局部变量

4、函数嵌套函数这种形式正好符合闭包的定义，而不是故意要使用闭包
## 闭包的特点

### 1、 外层函数的变量运算之后，闭包函数才进行运行。
```javascript
<script type="text/javascript">
    function fn(){
        var a=10;
        function fn1(){
            console.log(a)
        }
        a++;
        return fn1()
    }
    fn()//11
</script>
```
当我们将a这个运算写在闭包函数外面的时候,最后的结果确实自增之后的值.这也是闭包函数的一个特点

### 2、闭包中使用的局部变量,一定是局部变量变化最后的值,

就像上面的变量a在函数内部,同时a也在闭包函数外面,但闭包函数中最后运行的值是所有变量以及其运算符变化之后的值.

### 3、闭包中使用的外层所有局部变量都会存起来用,如果有变量操作在闭包函数中,则不会保存在内存中,只要在调用时,会执行闭包函数的内部代码
```javascript
<script type="text/javascript">
    function fn(){
        var a=10;
        return function fn1(){
            a++;
            console.log(a)
        }
    }
    fn()();//11
    fn()();//11
    var fn2=fn();
    fn2();//11
    fn2();//12
    fn2();//13
</script>
```
从上面的例子我们可以看出,如果将fn()赋值给另一个变量,当多次执行时,值是增加的,也就是多次执行了闭包里面的a++操作.但是我们单纯调用fn()()后,就不会发生这样的事情。
### 再来看几个闭包的简单例子

`第一个例子`

```javascript
<script type="text/javascript">
    function fn(){
        var a=1;
        // 这是一个闭包，可以访问变量a
         add = function (){
            a+=1
        };
        // 这是另一个闭包，可以访问变量a
        function func(){
            var b=2;
            console.log(a+b)
        }
        // 将函数func可以被外面使用
        return func
    }
    var result = fn();//结果是func函数
    result();//3
    add();//改变a的值
    result()//4，
</script>
```
这个例子很容易理解，从作用域链的角度来说，func()可以访问变量a和变量b，因此第一次调用等于3；

再来看`add = function() { a += 1 }` 这一行。首先，变量 add 前面没有使用 var 关键字，因此 add 是一个全局变量，而不是局部变量。其次，add 的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，和 func 处于同一作用域，能够访问a的值，当我们调用`add()`时，变量a加1，再执行`result()`，结果就是4。

如果继续调用`result()`，结果还是4，此时变量`a=2`的值保存在内存中，可以被函数`func()`访问到，变量b的值，依然是2，所以结果是4。

如果将上面的例子改一下：

```js
function fn(){
    var a=1;
    // 这是一个闭包，可以访问变量a
        add = function (){
        a+=1
    };
    // 这是另一个闭包，可以访问变量a
    function func(){
        var b=2;
        b++
        console.log(a+b)
    }
    // 将函数func可以被外面使用
    return func
}
var result = fn();//结果是func函数
result();//4
add();//改变a的值
result()//5
add()
result()//6
```
1、第一次调用`result()`,就是执行`func()`，此时a=1，b=3，结果为4

2、调用`add()，result()`后，a=2,b=3;结果为5

3、再次调用`add(),result()`后，a=3,b=3,结果为6

可以看出，函数`func()`作为一个闭包函数，可以访问到其外部变量a(作用域链的原因)，外部变量的值一直被保存在内存中，通过调用`add()`自增。变量b属于`func()`的局部变量，每次调用都会重置。

` 第二个例子`

```js
var a=[]
for(var i=0;i<4;i++){
    a[i] = function(){
        console.log(i)
    }
}
a[0]()//4
a[1]()//4
a[2]()//4
a[3]()//4
```

在循环中的函数执行，为什么最后的结果都是4呢？

当执行到函数a[0]的时候，函数作用域链上自身没有值，只有往上找，找到全局的作用域结果是4，此时上下文中`i`的值已经运行完了，最后再运行a[0]()时，取得的结果就是4。如何改造？使用匿名函数建立闭包。

```js
var a=[]
for(var i=0;i<4;i++){
    a[i] = (function(i){
        return function(){
            console.log(i)
        }
    })(i)
}
a[0]()//0
a[1]()//1
a[2]()//2
a[3]()//3
```

这是因为在a[i]运行之前，循环已经结束，全局上下文的i为4，当执行a[i]的时候，匿名函数的作用域链发生了改变，它的函数上下文从0开始，找到就不往全局去找了，所以从0开始。

还有一个办法，就是将声明变量由var改为let即可

### 改造为闭包函数，将全局变量改成局部变量并访问

来看一个简单案例：

(1)，我们想获取一个数值，在任何地方都可以访问到这个变量，则定义一个全局的变量。
```javascript
<script type="text/javascript">
    var globalNum = 0;
    function add(){
        return globalNum++
    };
    console.log(add())//0
    console.log(add())//1
    console.log(add())//2
</script>
```
定义了全局变量globalNum ，代码任何地方都可以访问到，体验不是很好，把变量放在函数内，定义成局部变量。
```javascript
<script type="text/javascript">
    
    function add(){
        var globalNum = 0;
        return globalNum++
    };
    console.log(add())//0
    console.log(add())//0
    console.log(add())//0
</script>
```
定义成局部变量后，每一次执行都会初始化一下，执行的结果都是0，如果还希望是之前的结果，如何做呢？定义一个闭包函数即可。
```javascript
<script type="text/javascript">
    
    function add(){
        var globalNum = 0;
        var count = function(){
            return globalNum++
        }
        count();
        return globalNum
    };
    
    console.log(add())//1
    console.log(add())//1
    console.log(add())//1
</script>
```
我们在add()函数内部，再定义一个count ()内嵌函数（闭包），内嵌函数count ()可以访问父函数的globalNum变量。现在我们只需要在外部访问count()函数，保证globalNum = 0只执行一次就可以了。
```javascript
<script type="text/javascript">
    
    function add(){
        var globalNum = 0;
        var count = function(){
            return globalNum++
        }
        return count//把函数暴露出来再外部调用
    };
    var sum = add()
    console.log(sum())//0
    console.log(sum())//1
    console.log(sum())//2
</script>
```
globalNum变量受add()保护，只能通过函数count改变


## 使用闭包需要注意的要点:

1.IE中的内存泄露问题

内存泄露是指你用不到的变量依然占据着内存空间，不能被再次利用起来。闭包里面的变量本来就是我们需要用的，因此不存在内存泄露问题。到时再IE里面使用闭包会导致回收不了闭包里面的变量，导致内存泄露。这是IE的问题不是闭包的问题。

我们来解决一下IE的内存泄漏问题.

```javascript
<script type="text/javascript">
    window.onload=function(){
        var oDiv=document.getElementById('div1')
        oDiv.onclick=function(){
            alert(oDiv.id)
        }
    }
    </script>
</head>
<body>
    <div id="div1">11111</div>
</body>
```
比如上面的例子,oDiv从DOM节点获取,然后点击oDiv触发div的id,这样就会造成内存泄漏,解决的办法就是在后面添加上
window.onload=function(){oDiv.onclick=null}这段代码
```javascript
<script type="text/javascript">
    window.onload=function(){
        var oDiv=document.getElementById('div1')
        oDiv.onclick=function(){
            alert(oDiv.id)
        }
        window.onload=function(){
            oDiv.onclick=null;
        }
    }
</script>
```
还有一种解决办法:将值存起来,然后在代码执行完毕后清除掉
```javascript
<script type="text/javascript">
window.onload=function(){
    var oDiv=document.getElementById('div1')
    var id=oDiv.id;
    oDiv.onclick=function(){
        alert(oDiv.id)
    }
    oDiv=null
}
</script>
```
2.闭包会在父函数外部,改变父函数内部变量的值.所以如果把父函数当做对象使用,把闭包当做它的公用方法,把内部变量当做它的私有属性,这个时候不要随便改变父函数内部变量的值.

在实际项目中,我们通常在循环以及对象中使用闭包比较多,有时会造成一些问题.

在循环中使用闭包函数
先来看正常情况

```javascript
<script type="text/javascript">
    var arr=[];
    for(var i=0;i<5;i++){
        arr[i]=i;
    }
    console.log(arr)//[0,1,2,3,4]
</script>
```
正常情况无异议,再来看看循环有函数的情况
```javascript
<script type="text/javascript">
    window.onload=function(){
        var oLi=document.getElementsByTagName('li')
        for(var i=0;i<oLi.length;i++){
            oLi[i].onclick=function(){
                alert(i);//每次点击都会弹出3
            }
        }
    }
</script>
```
比如上例,在HTML有3个li,按照上面的写法,会弹出3次3,也就是length的值.这是因为当我们调用函数的时候,循环内容已经运行完毕,最后的结果是3,如果我们想每次点击获取对应元素的下标,就需要用到闭包函数的解决方法,将值保存起来使用.

上例我们有两种方法可以解决,第一种是利用匿名函数的自身调用.在事件外面套一个匿名函数,然后将i作为参数传进去.这是因为匿名函数的i的值已经保存在内存中,闭包函数调用的时候就使用这些值,不会弹出之前的3,而是依次弹出索引值
```javascript
<script type="text/javascript">
    window.onload=function(){
        var oLi=document.getElementsByTagName('li')
        for(var i=0;i<oLi.length;i++){
            (function(i){
                oLi[i].onclick=function(){
                    alert(i);//依次点击弹出0,1,2
            }
            })(i)
            
        }
    }
</script>
```
第二种方法是将点击事件的函数作为一个匿名函数,在函数内部用return返回一个函数,函数内再执行命令.这是因为点击事件时,将i的值保存在内部,然后再通过调用闭包函数就得到了已经在内存中保存的值.
```javascript
<script type="text/javascript">
    window.onload=function(){
        var oLi=document.getElementsByTagName('li')
        for(var i=0;i<oLi.length;i++){
                oLi[i].onclick=(function(i){
                    return function(){
                        alert(i);//依次点击弹出0,1,2
                    }   
            })(i)
            
        }
    }
</script>
```
以上是闭包在循环中的运用.那么闭包在对象中又会产生什么问题呢?

在对象中使用函数,经常会用到this关键字,这就存在this指向问题.

## 在对象中使用闭包
```javascript
<script type="text/javascript">
    var name="lili";
    var obj={
        name:"lilei",
        age:20,
        love:function fn(){
            console.log(this.name)
        }
    }
    obj.love();//lilei
    var obj1={
        name:"lilei",
        age:22,
        love:function(){
            return function(){
                console.log(this.name)
            }
        }
    }
    obj1.love()()//lili
</script
```
从上面两个例子我们可以看出,在对象中,如果是闭包函数,那么它里面的this指向的是window.  如果我们想改变this指向问题,有下面这种方法
我们在函数内部,将this用一个变量that存起来,然后再来访问这个变量.
```javascript
<script type="text/javascript">
    var obj1={
        name:"lilei",
        age:22,
        love:function(){
            var that=this;
            return function(){
                console.log(that.name)
            }
        }
    }
    obj1.love()()//lilei
</script>
```
在对象中的闭包,this都指向window,需要改变this指向问题

以上是使用闭包时的一些问题。那么闭包的优缺点有哪些呢？以及使用场景是什么呢？

优点：
1、避免全局变量的污染

2、调试对变量走势更清晰认识

3、保护函数内变量安全，加强了封装性

闭包之所以会占用资源是当函数a执行结束后, 变量i不会因为函数a的结束而销毁, 因为b的执行需要依赖a中的变量

缺点：

使用闭包会造成内存浪费的问题，这个内存浪费不仅仅因为它常驻内存，更重要的是，对闭包的使用不当会造成无效内存的产生

闭包使用场景

1.使用闭包可以在JavaScript中模拟块级作用域；

2.闭包可以用于在对象中创建私有变量。

推荐文章：

文档：[闭包](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

文章：[JavaScript 的静态作用域链与“动态”闭包链](https://juejin.cn/post/6957913856488243237)
     [知乎中关于闭包的讨论](https://www.zhihu.com/question/34210214)