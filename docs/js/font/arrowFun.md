## 箭头函数和普通函数的区别

### 写法上的不同：箭头函数的写法

**1、箭头函数是匿名函数，所以不用写function**

```js
setTime(()=>{console.log()})
```

**2、只有一个参数可以省略括号**
```js
var fn=a=>a//表示传入参数a,返回a
```

**3、简化回调函数，只用写一行**

```js
var fn = (a,b)=>a+b//传入a，b，返回a+b

[1,2,3].map(function(x){
  return x*x
})
[1,2,3].map(x=>x*x)//相比上面的代码，一行代码更简单
```

### this指向规则不同

**1、箭头函数不绑定this，里面的this指向定义时外层第一个普通函数的this**

箭头函数没有this，它的this是继承过来的，默认指向它定义它的时候的对象。而不是执行它的对象。

```js
var name='xiaoming'
var obj = {
  name:'xiaohong',
  fn:function(){
    console.log(this)//指向obj
    console.log(this.name)
  },
  fn1:()=>{
    console.log(this)//指向window
    console.log(this.name)
  },
  fn2:function(){
    console.log(this)//指向obj
    return ()=>{
      console.log(this.name)
    }
  }
}
obj.fn()//xiaohong
obj.fn1()//xiaoming
obj.fn2()()//xiaohong，箭头函数在普通函数之下，所以this指向了obj
```

定时器里的this

```js
var a=10
var obj = {
  a:1,
  fn:function(){
    setTimeout(function(){
      console.log(this.a)//10
    })
  },
  fn1:function(){
    setTimeout(()=>{
      console.log(this.a)//1
    })
  }
}
obj.fn()//10
obj.fn1()//1
```
setTimeout中的function没有被任何对象调用过，它的this默认指向window.当使用箭头函数的时候指向了定义它的对象obj。所以输出1。

**2、外层没有普通函数，箭头函数中的this指向window**

参考上面的例子

**3、箭头函数通过 call()  或   apply() 方法调用一个函数时，只传入了一个参数，对 this 并没有影响。**

```js
let obj = {
    a: 10,
    b: function(n) {
        let f = (n) => n + this.a;
        return f(n);
    },
    c: function(n) {
        let f = (n) => n + this.a;
        let m = {
            a: 20
        };
        return f.call(m,n);
    }
};
console.log(obj.b(1));  // 11
console.log(obj.c(1)); // 11
```

### 箭头函数没有原型属性

```js
var a =()=>{}
console.log(a.prototype)//undefined
```

### 箭头函数是匿名函数，不能作为构造函数，不能使用new

```js
var obj = ()=>{console.log(1)}
var objFn = new obj()//报错
```

### 箭头函数里的arguments对象

1、当箭头函数中的this指向window时，没有arguments对象会报错
```js
function fn(){
  console.log(arguments)//[1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
}
fn(1,2,3)

var fn1 = (a,b,c)=>{
  console.log(arguments)//arguments is not defined
}
fn1(1,2,3)
```
2、当箭头函数里的this指向普通函数，arguments对象继承该普通函数

```js
var obj = {
  a:1,
  fn:function(){
    return ()=>{
      console.log(arguments)
    }
  }
}
obj.fn(1,2,3)()//[1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

3、可以使用rest参数来获取不定参数

既然arguments只能在有普通函数的情况下才能获取到。那么在箭头函数里怎么获取不定数量的参数呢。使用rest参数

rest参数使用扩展符表示，是一个真正的数组
```js
let a = (first, ...abc) => {
  console.log(first, abc); // 1 [2, 3, 4]
};
a(1, 2, 3, 4);
```

### 箭头函数不支持重命名函数参数,普通函数的函数参数支持重命名

普通函数的函数参数支持重命名，后面出现的会覆盖前面的，箭头函数会抛出错误：

```js
function fn1(a, a) {
  console.log(a, arguments); // 2 [1,2]
}

var fn2 = (a,a) => {
  console.log(a); // 报错：在此上下文中不允许重复参数名称
};
fn1(1, 2); fn2(1, 2);
```

### 箭头函数使用场景

通过上面的介绍，箭头函数适用于大部分场合。但如果涉及到this指向的问题，就需要看上面有没有指向普通函数，否则就指向了window了，会造成错误。