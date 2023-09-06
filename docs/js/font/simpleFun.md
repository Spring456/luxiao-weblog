## JS进阶之纯函数

### 什么是纯函数？

> 函数的执行结果只依赖于它的参数，并且在执行过程中没有副作用

1、函数执行只依赖它的参数

示例一：

```js
let a = 1
function fn(b){
  console.log(a+b)
}
fn(2)//3
```

上面函数fn就不是一个纯函数，因为在执行结果里依赖了外部变量a,如果变量a改变了，那么函数执行结果也会相应改变。

示例二：

```js
function fn(x,y){
  console.log(x*y)
}
fn(2,3)//6
```
上面的例子函数fn执行结果只依赖自身的两个参数x,y，只要fn代码不改变，里面的参数不改变，那么输出结果就是确定的。所以这是一个纯函数。

2、执行过程中没有副作用

首先搞清楚副作用的定义：就是函数在执行过程中，对外部产生了可观察的变化

下面的操作可以被视为有副作用：

1、发起HTTP请求

2、操作DOM

3、修改外部数据

4、控制台打印

5、调用Date.now()或Math.random()


示例三：

```js
function fn(obj,y){
  console.log(obj.x+y)
}
let cur = {x:10}
fn(cur,10)//20
```

我们改造一下函数fn,将传入的值改为对象形式。执行结果也只是依赖自身参数。这也是一个纯函数。但当我们在函数体内改变对象cur时，这就不是个纯函数了。

```js
function fn(obj,y){
  obj.x=20
  console.log(obj.x+y)
}
let cur = {x:10}
fn(cur,10)//30
console.log(cur)//20
```
上面的例子中，在函数体内改变了cur对象，最后执行结果后，对象cur也被改变了。这种函数执行修改了外部数据，这就不是一个纯函数。如果将对象写在函数体内，就可以了。

```js
function fn(y){
  let cur = {x:10}
  cur.x=20
  console.log(cur.x+y)
}
fn(10)//30
```

将对象写在函数体内，在函数体内修改对象cur，不会影响外部数据。因此这是一个纯函数。

### 纯函数的优点

1、更容易调用。函数不会改变外部数据，调用时不用担心副作用

2、更容易测试和维护。结果只依赖参数输出，测试更容易更稳定

3、更容易做缓存。同样的输入同样的输出

### 纯函数的运用

1、原生数组方法：forEach,map,filter,reduce

2、插件Loadsh

3、redux中的reducer

4、使用纯函数编写公共方法

示例：将后台返回的下拉框数据，显示label，取值value

```js
getDict(list,value){
  let label=''
  list.forEach(el=>{
    if(el.value==value){
      label=el.label
    }
  })
  return label
}
```



