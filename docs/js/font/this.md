## call、apply、bind理解

### call、apply、bind是什么

> call(),apply(),bind()方法是指定this指向同时将剩余参数指定的情况下调用某个函数或方法

1、语法：

```js
fun.call(thisArg, param1, param2, ...)
fun.apply(thisArg, [param1,param2,...])
fun.bind(thisArg, param1, param2, ...)
```

注意：

a、调用call，apply，bind必须是一个函数。call、apply和bind是挂载Function对象上的三个方法,只有函数才有这些方法。

b、call，apply第一个参数表示this指向对象。如果什么参数都不传或第一个参数为null或undefined，this指向window。如果传入的参数是数字类型，布尔类型，字符串类型，this会指向改原始值的自动包装对象。也就是Number、Boolean、String

c、call、apply的参数从第二个开始，如果不传或传入的参数是null或undefined，则表示没有参数；

d、apply的参数是一个数组形式。必须用`[]`括起来。

e、call、apply的返回值是函数`fun`的执行结果；bind的返回值是函数fun的拷贝，并指定this和初始参数

e、如果参数不定，最好使用apply

`2、call，apply的使用`

```js
var name ='xiaoming'
function person(name){
    console.log(this,name,this.name)
}
var obj = {
    name:'xiao'
}
// 不使用call时
person('xiaohong')//window,xiaohong，xiaoming
// 使用call，apply传一个参数时，this指向obj
person.call(obj)//函数person的this指向了obj。但没有传入多余的参数，则person里形参为undefined。结果为：{name:xiao},undefined,xiao
person.apply(obj)//{name:xiao},undefined,xiao
// 传入参数时
person.call(obj,'admin')//{name: 'xiao'} 'admin' 'xiao'
person.apply(obj,['admin'])//{name: 'xiao'} 'admin' 'xiao'
// 不传入任何参数时或传入null,undefined
person.call()//window,undefined,xiaoming
person.call(null)//window,undefined,xiaoming
person.call(undefined)//window,undefined,xiaoming
```
`3、作用——改变this指向，但调用的是.call/.apply前面函数的方法`

```js
var obj1={
    num:1,
    fn:function(n){
        console.log(this.num+n)
    }
}
var obj2={
    num:2,
    fn:function(n){
        console.log(this.num-n)
    }
}
// 不使用call时
obj1.fn(1)//2
obj1.fn.call(obj2,3)//5。  
```
这个例子中，`obj1.fn.call(obj2,3)`，call的第一个参数表示`this`指向了`obj2`,但函数执行是`obj1.fn`。所以函数`obj1.fn`执行时，`this.num`的`num`是对象`obj2`中的`num`，等于2，然后传入的参数是3，最后结果就是5

`4、call/apply/bind的核心理念：借用方法。借用本来没有方法或属性`

诸如：`[].shift.call(arguments)`

arguments是一个类数组，并没有shift方法，使用call，其实就是arguments借用了数组原型上的shift方法。上面的代码表示将arguments转换为数组并使用数组的shift方法并返回。其实它是`Array.prototype.shift.call(arguments)`的变形。

### call，apply的应用场景

call，apply最重要就是借用方法，借用其他函数或原型上的方法来实现

`1、判断数据类型`

```js
// 因为 Object.prototype.toString() 方法会返回对象的类型字符串，输出 "[object Object]" 其中第二个 Object 是传入参数的构造函数。所以使用 call 就可以指定任意的值和结合 toString 将组成的构造函数类型返回来判断类型。
// 参数使用对象原型上的toString方法，判断数据类型
Object.prototype.toString.call(params)//判断数据类型
```

`2、类数组arguments借用数组的方法`

```js
[].shift.call(arguments)//借用数组的shift方法并返回
[].prorotype.push.call(arguments)//借用数组的push方法并返回
```

`3、apply获取数组中最大值和最小值`

```js
var arr=[1,22,33,44,55,666]
var arrMax = Math.max.apply(Math,arr)//666
var arrMin = Math.min.apply(Math,arr)//1
// 使用扩展符更简单
var arrMax1 = Math.max(...arr)//666
```
### bind

> 引用MDN：bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

这句话有两个重要的信息：

1、bind()会创建一个新函数

2、这个新函数的this被指定为bind()的第一个参数,其余参数作为新函数的参数

3、bind()绑定的新函数不会直接调用，需要手动调用。

```js
var name = 'xiaoming'
var obj = {
    name:'xiaohong',
    say:function(age){
        console.log(this.name+age+'岁')
    }
}
obj.say(20)//xiaohong20岁
var objBind = obj.say
objBind(10)//xiaoming10岁
// 使用bind指向obj
var objBind1 = obj.say.bind(obj)
objBind1(30)//xiaohong30岁
```
在上面的例子中，使用`obj.say()`直接调用时，this指向的是obj，但如果将`obj.say`赋值给一个变量，再调用的时候，此时新的变量objBind就与对象obj没有关系了，say方法里面的this向上找，找到全局的window上。this就指向了全局window了。如果希望还是指向obj，用bind将this绑定到obj上。

### bind()的参数

1、第一个参数为this指向，第二个参数可选

bind()的第一个参数作为原函数运行的this指向，从第二个开始的参数是可选的。绑定的函数被调用时，这些参数加上绑定函数本身的参数会按照顺序作为原函数运行时的参数。

```js

function fn(a,b){
    console.log(a+b)
}
var fn1 = fn.bind(fn,10)
fn1(20)//30
fn1(30,40)//40
```
上面的例子函数fn可以直接调用。这里为了演示就还是使用bind绑定到fn上，然后当fn1只传一个参数的时候，在fn.bind的第二个参数会成为函数fn1的第一个参数。所以`fn1(20)`结果是30。`fn(30,40)`的结果是10+30=40

由于这个特性，bind()能使新函数拥有一个初始参数，会被插入到目标函数的参数列表的开始位置，调用时，传入的实参会跟在这个参数之后。

2、使用new

> 绑定函数自动适应于使用 new 操作符去构造一个由目标函数创建的新实例。当一个绑定函数是用来构建一个值的，原来提供的 this 就会被忽略。不过提供的参数列表仍然会插入到构造函数调用时的参数列表之前。--MDN

```js
function person(name){
    this.name = name
}
var person1 = person.bind(person,'xiaoming')
var p = new person1('xiaohong')
console.log(p)//person {name: 'xiaoming'}
```
上面的例子中，函数person.bind传入的第一个参数`person`会被忽略，后面的参数'xiaoming'会被加入到new person1中作为第一个参数。而参数`xiaohong`这个参数就被忽略了。 

### bind()使用场景

`1、setTimeout运用时`
 
在循环中使用setTimeout，由于事件循环机制的问题，可以使用bind()解决

```js
for(var i = 0;i<10;i++){
    setTimeout(function()=>{
        console.log(i)//10个10
    })
}
```
最后的结果打印出了10个10。原因就是因为事件循环机制中的异步问题导致的。解决办法有闭包，将var换成let即可。也可以是用bind()。

使用bind()解决如下
```js
for(var i=0;i<10;i++){
    setTimeout(function(i){
        console.log(i)//0-9
    }.bind(null,i))
}
// 还有更简单的方法
for(var i=0;i<10;i++){
    setTimeout(console.log.bind(console,i))//将bind绑定到console.log上，this指向console，每次输出i
}
```
使用bind()返回了一个函数，这个函数也是闭包，保存了函数this的指向和初始参数，每次i变化都会被闭包保存起来。所以最后打印0-9

## 手写call/apply/bind


推荐文章：
  [JS 中的 call、apply、bind 方法详解](https://segmentfault.com/a/1190000018270750)

  [call 和 apply 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)
  
  [bind 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)

