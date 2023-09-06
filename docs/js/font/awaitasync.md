## async/await有什么用？

async/await的用处就是：**用同步方式，执行异步操作**

async是generation和promise的语法糖，async就是将generation的*换成async,将yiled换成await。使用这种方式可以更方便的使用异步调用。


### 用法

```js
async function test(){
  let res = await request()
  console.log(res)
}
test()

// 如果不使用async
function test(){
  request().then(res=>{
    console.log(res)
  })
}
test()
```

用法其实挺简单，就是在函数前面加上async，在方法执行前面加await。

await只能在async函数中使用，不然会报错。

### 为什么要使用async/await

如果有两个接口，第二个接口的参数是从第一个接口的返回值中获取的。那么就需要先请求接口1，在请求接口2

```js
function test(num){
  let p = new Promise((resolve,reject)=>{
    resolve(++num)
  })
  return p
}
test(1).then(res=>{
  test(res).then(res2=>{
    console.log(res2)//3
  })
})
```

如果嵌套过多的话，代码就不优雅了。所以使用语法糖async就方便的多

```js
function test(num){
	  let p = new Promise((resolve,reject)=>{
	    resolve(++num)
	  })
	  return p
	}
async function fn(n){
  let res = await test(n)
  let res2 = await test(res)
  console.log(res2)
}
fn(1)//3
```
使用async/await可以不用写then()方法，代码结构也更加简洁明了，
### async 

async -- 异步的意思。就是`声明一个异步函数。返回一个promise对象`。

可以使用then()方法添加回调函数，函数内部使用retrun返回的值会成为then方法回调函数的参数.

```js
async funtion fn(){
  return 'fn'
}
console.log(fn())//Promise {<fulfilled>: 'fn'}
```

直接使用async后，打印函数出现的是一个状态为fulfilled的promise对象。如果想打印出函数内的值，就需要使用then

```js
async function fn(){
  return 'fn'
}
fn().then(res=>{
  console.log(res)//fn
})
```

如果没有return返回值，async函数返回一个undefined的promise对象

```js
async function fn(){
		console.log('没有返回值')
	}
	console.log(fn())//Promise {<fulfilled>: undefined}
```

可以看到async函数返回值和promise.resolve一样，将返回值包装成promise对象。

### await

1、await 操作符只能在异步函数 async function 内部使用。否则会报错

2、如果一个 Promise 被传递给一个 await 操作符，await 将等待 Promise 正常处理完成并返回其处理结果，也就是说它会阻塞后面的代码，等待 Promise 对象结果。

3、如果等待的不是 Promise 对象，则返回该值本身。

还是上面的例子：

```js
// awit后面不是一个promise对象时
async function fn(){
  let res = await 'fn'
  console.log(res)
}
fn()//fn

// 如果是一个promise对象时

let p1 = new Promise((resolve,reject)=>{
  resolve('fn1')
})
async function fn(){
  let res = await p1
  console.log(res)
}
fn()//fn1
```

可以看到，使用await，获取后面的值，可以不需要then操作，

总结：

1、async/await是一个语法糖，能更方便的使用promise

2、await必须在async函数中使用，否则会报错

3、async返回的是一个promise对象，单独使用，在函数内需要使用retrun将值返回

4、await后面是promise对象时，等待promise执行，返回结果。如果是其他值就直接返回

### async/await如何处理异常

`1、链式调用。后面加上catch方法`

```js
async test() {
  let resp = await httptest().catch(err => console.log(err));
  console.log(resp);
}
```
这种方法可以实现效果，但不优雅。本来使用async就是看中他的简洁，如果后面加上catch，就显得不那么简洁了。

`2、使用try/catch捕获异常`

```js
async test() {
  try{
    let res = await httptest()
    console.log(res)
  }catch{
    console.log('报错了')
  }
}
```

这种写法也可以。但如果有多个请求，但报错信息只有一个，我们并不知道是哪个请求报错了。所以不合理。如果针对每个请求都使用try...catch，那代码量就太多了。也不优雅。

`3、重新封装一个promise执行`

这个方法的思想还是针对每一个请求都使用try...catch。但使用promise封装，不用每个请求都写try...catch

```js
testPromise(fn){
  retrun new Promise(async resolve=>{
    try{
      let res = await fn
      console.log(res)
      resolve(res)
    }catch(err){
      resolve(err)
    }
  })
}
// 使用
async test(){
  let res = await this.testPromise(httptest())
  console.log(res)
}
```

### 事件循环机制下使用async/await

先来看个题

```js
console.log(1)
async function test(){
  console.log(2)
  await console.log(3)
  console.log(4)
}
test()
new Promise((resolve)=>{
  console.log(5)
  resolve()
}).then(()=>{
  console.log(6)
})
console.log(7)

// 执行结果：1,2,3,5,7,4,6
```

难点就是：为什么7会在4之前打印？

这是因为：

* async/await本质上也是Promise，属于微任务。

* 当遇到await的时候，先执行当前的await，这个await后面的代码被阻塞了，然后去外层执行同步任务

* 当外部所有同步任务执行完成，再执行await后面的微任务。

