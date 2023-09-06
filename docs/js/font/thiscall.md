## 搞懂this指向

### 函数和this

首先说结论：`谁最后调用它，就指向谁`

这句话包含了两个重要的点：调用和谁，

既然是调用，那肯定是存在于函数中了，所以`有this的地方就有函数`。而函数有两种，普通函数和箭头函数。

这个'谁'指的是`当前方法执行的最直接环境上下文`。这个就难以理解了。那我们根据普通函数和箭头函数在不同场景下来细说。

普通函数调用共有4种方法调用

> 1、作为一个函数调用(obj())

> 2、函数作为方法调用(obj.a())

> 3、使用构造函数调用函数(var obj = new Object())

> 4、作为函数方法调用(call,apply)(obj.call(obj1,''))

好，既然知道了上面4种调用方法，那我们运用场景就可以分为你这几种了：

`箭头函数、new、直接调用(obj())、作为方法调用(obj.a())、call和apply，bind调用`

### 箭头函数

实际上，只要当前函数是箭头函数，那么它里面的this就不会改变，指向外层的this。外层的this指向哪里，箭头函数里面的this就指向哪里。

箭头函数需要记着这句话：`箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined`。

至于外层的this指向哪里，那就继续分析是属于哪种场景了。

```js
var obj = {
  say:function(){
    console.log(this)//obj
    return ()=>{
      console.log(this)//obj
    }
  }
}
let say1 = obj.say()
say1()
```
`obj.say()`的this指向了obj，say1()调用的是一个箭头函数，由于箭头函数没有this，指向外层的this，所以也指向了obj

在严格模式下，箭头函数里面的是this是undefined，在普通模式下才是指向最近的一层非箭头函数。
### new

使用new操作符调用函数之后，函数里面的this就指向了新创建的那个对象.

```js
function Person(name){
  this.name = name
  console.log(this)//Person {name: ''}
}
var person = new Person()
console.log(person)//Person {name: ''}
```
箭头函数不能当做构造函数，所以不能和new一起使用。里面的this也无从说被修改

```js
var obj = ()=>{
  console.log(this)
}
new obj()//报错 obj is not a constructor
```

### 直接调用

直接调用,也就是这样的形式：`函数()`，此时this指向window

```js
function say(){
  console.log(this.name)
}
var name = 'hello world'
say()
```
直接调用时，this指向全局对象（非严格模式下）.其实`say()`是`window.say()`，window作为调用方是可以省略的。所以此时this指向window

严格模式下，this指向undefined，undefined上没有this对象，会抛出错误。

全局作用域下，this指向window

```js
console.log(this==window)//true
```

### 作为方法调用

作为方法调用时，就是`obj.xx()`方式。作为方法调用时，this指向前面的调用方

```js
var obj = {
  a:'hello world',
  fn:function(){
    console.log(this.a)
  }
}
obj.fn()//hello world
```
### 使用call,apply,bind

通过`call,apply,bind`的方式，可以显式的指定this的指向。他们的`第一个参数就是this指向的对象`。如果第一个参数为空，则指向window.

```js
function say(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'world',
    say: say
}
var name = 'xiaoming';
var sayHi = person.say;
sayHi()//Hello xiaoming  this指向window
sayHi.call(person)//Hello world,this指向person
```
如果不使用call，那函数sayHi()是调用say()，通过赋值之后再调用，`sayHi()`就是window下的一个方法了，本身就是`window.sayHi()`形式，此时this指向window。还是印证了那句话：`如果函数前面没有那个点，this就指向window`

`sayHi.call(person)`，此时call改变了this的指向，指向了函数person。

使用call或apply就一定会绑定到第一个参数吗？不一定，看下面的例子

```js
function say(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'world',
    say: say
}
var name = 'xiaoming';
var Hi = function(fn){
  console.log(fn)
  fn()
}
Hi.call(person,person.say)//Hello xiaoming
```
上面的代码里，`Hi.call(person,person.say)`中`person.say`当做参数传给了Hi函数，此时已经将`person.say`赋值给了`fn`了,执行fn的时候，最后的执行其实是fn()，相当于直接调用say()方法，直接调用，前面没有调用方，其实还是`window.say()`形式，此时和函数person没关系了。记住：传参后就改变了this指向。可能写成下面的形式更容易理解。

```js
function say(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'world',
    say: say
}
var name = 'xiaoming';
var Hi = function(fn=person.say){
  console.log(fn)
  fn()
}
Hi.call(person)//Hello xiaoming
```
如果还是想指向person,可以改成：

```js
function say(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'world',
    say: say
}
var name = 'xiaoming';
var Hi = function(fn=person.say){
  fn.call(this)
  // fn.call(person)
}
Hi.call(person)//Hello world
```

### 闭包下的this

```js
<script>
   var name = 'age'
   function fn(){
      var a= 10;
      var name = 'AGE'
      function func(){
         var b=20;
         var name = 'AGES'
         console.log(this.name+':'+(a+b))
      }
      return func();
   }
   fn()//age:30;this指向window
</script>
```

闭包函数不属于任何对象，它不是一个对象的方法（就不能使用点运算符），如果没有指定属于哪个对象，那么它就属于全局window对象。

上段代码中，我们调用fn()方法后，是直接return出了func()函数，相当于直接调用，没有通过哪个对象，因此属于func()函数中的this相当于window对象。

在函数中的函数，通过return或者通过自身调用时或者通过赋值之后再调用。此时this都指向window。因为函数调用是自身调用。

### setTimeout里的this

```js
var name = 'age'
function fn(){
    var a= 10;
    var name = 'AGE'
    setTimeout(function(){
        console.log(this.name+':'+this.a)
    })
}
fn()//age:undefined;this指向window
```
在定时器里面的this指向window。 这是因为从事件循环的角度看，setTimeout最后执行，此时执行上下文就只是window了，所以this指向window。

setTimeout/setInterval/匿名函数执行的时候，this默认指向window对象，除非手动改变this的指向。
在《javascript高级程序设计》当中，写到：“超时调用的代码(setTimeout)都是在全局作用域中执行的，因此函数中的this的值


## 总结

1、箭头函数本身没有this。严格模式下，this是undefined，普通模式下，里面的this指向外层的非箭头函数的

2、new操作符调用之后，this指向创建的对象

3、自身调用，this指向window

4、函数作为方法调用，this指向调用者

5、使用call,apply,bind时，this指向他们的第一个参数

6、闭包，定时器，匿名函数下的this，都指向window

7、改变this指向的方法有：函数内部使用变量存储this，`let _this = this`。

### 一些实际场景下的注意事项
#### DOM 事件处理函数中的 this

一般来讲，当函数使用 addEventListener，被用作事件处理函数时，它的 this 指向触发事件的元素。如下代码所示：

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
    <button id="btn" type="button">click</button>
    <script>
        var btn = document.getElementById("btn");
        btn.addEventListener("click", function(){
            this.style.backgroundColor = "#A5D9F3";
        }, false);
    </script>
</body>
</html>
```
但在 IE 浏览器中，当函数使用 attachEvent ，被用作事件处理函数时，它的 this 却指向 window。如下代码所示：
```html
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="UTF-8">
    <title>test</title>
</head>
<body>
    <button id="btn" type="button">click</button>
    <script>
        var btn = document.getElementById("btn");
        btn.attachEvent("onclick", function(){
            console.log(this === window);  // true
        });
    </script>
</body>
</html>
```
#### 内联事件处理函数中的 this

当代码被内联处理函数调用时，它的 this 指向监听器所在的 DOM 元素。如下代码所示：

```html
<button onclick="alert(this.tagName.toLowerCase());">
  Show this
</button>
```
上面的 alert 会显示 button，注意只有外层代码中的 this 是这样设置的。如果 this 被包含在匿名函数中，则又是另外一种情况了。如下代码所示：

```html
<button onclick="alert((function(){return this})());">
  Show inner this
</button>
```

在这种情况下，this 被包含在匿名函数中，匿名函数，既然没有名字，那就找最外层的window了，相当于处于全局上下文中，所以它指向 window 对象。
#### Eval函数
该函数执行的时候，this绑定到当前作用域的对象上

```js
var name="ABC";
    var person={
        name:"abc",
        showName:function(){
            eval("console.log(this.name)");
        }
    }
    
    person.showName();  //输出  "abc"
    
    var a=person.showName;
    a();  //输出  "ABC"
```

