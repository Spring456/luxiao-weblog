## 详解promise

### 1、什么是promise

>Promise是一个对象，是目前比较流行Javascript异步编程解决方案之一

promise能解决异步问题，但本身不能说promise是异步的。在promise的第一层时还是同步的，只是在then后面是异步的

### 2、promise解决了什么问题

要想知道promise解决了什么问题，我们首先来看下，如果不使用promise，我们在处理请求，浏览器事件时，是如何操作的。

了解浏览器事件执行，我们需要知道JS中的同步任务和异步任务。

同步任务：在主线程上排队执行的任务，只有当前一个任务执行完毕，才能执行下一个任务。

异步任务：事件不用进入主线程，而是进入'任务队列'，只有'任务队列'通知主线程，某个异步任务可以执行了，该任务才可以进入主线程执行。

更具体的可以看看事件循环机制：[事件循环机制](FrontEnd/Advanced/closure.md)

js中最常见的异步处理事件，就是定时器和ajax

```js
function callback() {
    console.log('定时器');
}
console.log('开始执行');
setTimeout(callback, 1000); // 1秒钟后调用callback函数
console.log('结束执行');
// 开始执行-->结束执行(等待1秒后)-->定时器
```

可以看到，setTimeout是异步执行，改变了事件执行顺序。ajax默认的就是异步操作

```js
request.onreadystatechange = function () {
    if (request.readyState === 4) {
        if (request.status === 200) {
            return success(request.responseText);
        } else {
            return fail(request.status);
        }
    }
}
```
当请求较多或者下一个请求是依赖上一个请求的返回值的时候，这个时候就需要嵌套使用ajax，陷入'回调地域'的地步，实现起来并不友好也不方便。

比如在使用jquery的ajax获取数据时，都是以回调函数方式获取的数据.

```js
$.get(url, (data) => {
    console.log(data)
)
```

当我们需要发送多个异步请求 并且每个请求之间需要相互依赖 那这时 我们只能 以嵌套方式来解决 形成 "回调地狱"

```js
$.get(url, data1 => {
    console.log(data1)
    $.get(data1.url, data2 => {
        console.log(data1)
    })
})
```
这就会带来一些问题：

a、代码逻辑书写顺序与执行顺序不一致，不利于阅读与维护。

b、异步操作的顺序变更时，需要大规模的代码重构。

c、回调函数基本都是匿名函数，bug 追踪困难。

promise对象就是为了解决这个问题。

总结：`promise有以下优点`

a、异步操作，解决回调地狱的问题

b、异步操作队列化，按照期望的顺序执行，返回期望的结果

c、在对象之间传递和操作promise，帮助我们更好的处理队列问题，接口数据传递问题
### promise对象，ajax和axios

理清三者之间的关系:

ajax是客户端向服务端通信方式；

promise是为了解决异步编程的；

axios是根据promise对象封装的http库，是对ajax的封装。
### 3、promise

**`promise的创建`**

```js
var promise = new Promise(function(resolve, reject) {
    // 异步处理
    // 处理结束后、调用resolve 或 reject
});
console.log(promise)//打印出的promise也是一个promise对象
// 想获取promise的返回值,还需要then操作
promise.then(res=>{console.log(res)})
```

从上面的构造函数可以看出：

promise构造函数必须接受一个函数作为参数，包含resolve和reject两个参数，他们是两个函数。

`resolve()`——解析成功的回调，将Promise对象的状态从 Pending(进行中) 变为 Fulfilled(已成功)；

`reject()`——解析失败的回调，将Promise对象的状态从 Pending(进行中) 变为 Rejected(已失败)，并抛出错误。

reject 方法的参数通常是 Error 对象的实例，而 resolve 方法的参数除了正常的值以外，还可能是另一个 Promise实例

```js
const request = url => { 
    return new Promise((resolve, reject) => {//创建promise
        $.get((url, data)) => {
            if(data.status==200){
                resolve(data)//请求成功后调用resolve
            }else{
                reject(data)//请求失败调用reject
            }
            
        });
    })
};

// 使用实例调用then()和catch()方法
request(url).then(data1 => {
    return request(data1.url);   
}).then(data2 => {
    return request(data2.url);
}).then(data3 => {
    console.log(data3);
}).catch(err => throw new Error(err));
```

promise的实例可以调用then()和catch()方法，传递的是resolve()和reject()方法的值。

**`promise的状态`**

promise的三种状态:`pending、fullfilled、rejected`

1、promise对象初始化状态为 pending

2、当调用resolve(成功)，会由pending => fullfilled。

3、当调用reject(失败)，会由pending => rejected

promise对象的状态只能由pending变为fulfilled或rejected，`单向改变，不可逆`。

```js
new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1)
    })
    resolve(2)
})
// 上面的setTimeout不会执行，因为resolve(2)优先执行，执行完成之后，promise状态就是fullfilled，不可逆。不会再执行setTimeout了
```

如果在promise内部不写resolve或reject，相当于没有回调函数，则promise就不会执行then方法，其状态就会一直是pending状态。

```js
const b = new Promise((resolve, reject) => {
  console.log('promise1');//能打印出来promise1
  // resolve();
}).then(() => {
  console.log('promise2');//上面注释了resolve，相当于没有回调返回，这个不打印
});
```

### 4、promise的方法

**`1、then()方法`**

**a、promise的then()方法返回的是是一个新的promise对象，因此可以使用链式调用。**

```js
request(url).then(data1 => {
    return request(data1.url);   
}).then(data2 => {
    return request(data2.url);
}).then(data3 => {
    console.log(data3);
}).catch(err => throw new Error(err));
```

**b、then()既然返回的是promise对象，那就是异步的操作**

```js
let promise = new Promise((resolve,reject)=>{
    console.log('我是同步的')//率先执行
    resolve()
}).then(()=>{
    console.log('我是异步的')//最后执行
})
console.log('我也是同步的')//第二步就执行
```

`**2、catch()方法**`

catch()方法用于指定发生错误时的回调函数。

Promise 对象的错误具有"冒泡"性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 catch 语句捕获。

`**3、Promise.all方法，Promise.race方法**`

`Promise.all()` 方法可以并行执行多个异步操作，并且在所有异步操作都执行完毕后才执行回调。

```js
var p = Promise.all([p1,p2,p3]);
p.then(()=>{

})
```

`Promise.all()`方法接受一个`数组作为参数`，但数组里不一定都是promise对象，也可以是常规数组。返回的都是Promise的实例。

返回状态由其参数决定，

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。

（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

`Promise`有了all()这个方法，就可以执行多个异步操作，并在一个回调里再进行处理数据。

`promise.all()`最后的状态根据：`也就是数组内哪个运行的最慢，以哪个为准执行回调。`

`promise.all()`的数组参数，如果其中有一个promise失败了，另外的参数会执行吗？

会，因为promise执行在创建实例之前就执行了。

`Promise.race()`的用法和`all()`方法类似，也是可以异步请求多个操作，并且在所有请求都完成的情况下再执行回调。

```js
var p = Promise.race([p1,p2,p3]);
p.then(()=>{})
```

上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的Promise实例的返回值，就传递给p的返回值。

如果Promise.all方法和Promise.race方法的参数，不是Promise实例，就会先调用下面讲到的Promise.resolve方法，将参数转为Promise实例，再进一步处理。

`race方法，数组内哪个运行的最快，就以哪个为准执行回调。`

`**4、Promise.resolve 方法，Promise.reject 方法**`

Promise.resolve方法,将现有对象转为Promise对象

如果 Promise.resolve 方法的参数，不是具有 then 方法的对象（又称 thenable 对象），则返回一个新的 Promise 对象，且它的状态为fulfilled。

```js
var p = Promise.resolve('Hello');
p.then(function (s){
  console.log(s)//Hello
});
// Hello
```

上面代码生成一个新的Promise对象的实例p，它的状态为fulfilled，所以回调函数会立即执行，Promise.resolve方法的参数就是回调函数的参数。

如果Promise.resolve方法的参数是一个Promise对象的实例，则会被原封不动地返回。

Promise.reject(reason)方法也会返回一个新的Promise实例，该实例的状态为rejected。Promise.reject方法的参数reason，会被传递给实例的回调函数。

```js
var p = Promise.reject('出错了');
 
p.then(null, function (s){
  console.log(s)
});
// 出错了
```
上面代码生成一个Promise对象的实例，状态为rejected，回调函数会立即执行。

### 4、promise的参数，运行等的理解

**1、promise是同步任务，但promise的回调函数（then()方法里）是异步任务，而且是微任务**

详细请看事件循环机制：[事件循环机制](FrontEnd/Advanced/closure.md)

```js
console.log(1);
setTimeout(() => {
    console.log(2);
}, 10);

new Promise(function(resolve,reject){
    console.log(3);
    resolve('');
    console.log(4);
}).then(res=>{
    console.log(5);
})
console.log(6);
})

//执行顺序：1 3 4 6 5 2
  
```
执行顺序：1 3 4 6 5 2 ,先执行同步任务，再执行异步任务，先执行异步任务里面的微任务，最后执行异步任务里的宏任务。

**2、then 和 catch 期望接收函数做参数，如果非函数就会发生 Promise 穿透现象，打印的是上一个 Promise 的返回。**

```js
var promise = new Promise(function(resolve, reject){
  setTimeout(function() {
    resolve(1);
  })
})

promise.then(2).then((n) => {
  console.log(n)//1
});
```

**3、then()返回的回调函数会作为下一个then()事件的形参**

```js
var promise = new Promise(function(resolve, reject){
  setTimeout(function() {
    resolve(1);
  })
})

promise.then(() => {
  return 2
}).then((n) => {
  console.log(n)//2
});
```

**4、Promise.resolve()返回的是新的promise对象，然后执行异步事件**

```js
var promise = new Promise(function(resolve, reject){
  setTimeout(function() {
    resolve(1);
  })
})

promise.then(() => {
  return Promise.resolve(3);
}).then((n) => {
  console.log(n)//3
});
```

**5、promise里嵌套promise，需等待里面的promise全部执行完毕且resolve()或reject()完毕之后才执行**

```js
let a;
const b = new Promise((resolve, reject) => {
    console.log('promise1');
    resolve();
}).then(() => {
    console.log('promise2');
})

a = new Promise(async (resolve, reject) => {
    console.log(a);//undefined,原因是a只是定义但未赋值
    await b;
    console.log(12);
});
// 结果为promise1、undefined、promise2、12 
```

**6、Promise 对象的状态只能被转移一次，只能从pending变成fullfiled或rejected,不可逆**

```js
const promise = new Promise((resolve, reject) => {
  resolve('success1');
  reject('error');
  resolve('success2');
});

promise
  .then((res) => {
    console.log(res);//只打印success1，后面的都不执行
  })
  .catch((err) => {
    console.log(err);
  });
```

**7、promise的缺陷在于不能取消，只能等resolve或reject执行或抛错。**


## 总结

1、promise是一个对象，是为了解决异步调用问题的。和ajax有本质区别。

2、promise接受两个参数，这两个参数都是函数。分别表示请求成功的回调和请求失败的回调。

3、promise有3个状态，分别是pending(等待)/fullfilled(完成)/rejected(失败)。状态只能由pending-->fulfilled或pending-->rejected，单向改变

4、promise每次请求之后返回的是一个新的promise，因此可以链式调用，继续使用then方法

5、promise.then是一个异步调用，是一个微任务。使用then方法，无论成功或失败都将返回到下一次的状态中。

6、promise.all和promise.race接受一个数组，数组内可以有多个promise任务。统一执行，执行完毕之后再进行回调。

## 手写实现promise.all()

```js
function promiseAll(args){
  if(Array.isArray(args)){
    retrun new Promise((resolve,reject)=>{
    // 返回的最终结果
    let resultPromise=[]
    // 执行顺序的个数
    let interIndex=0
    // promise完成的个数
    let promiseFullIndex=0
    // 使用for...of循环可迭代数据
    for(let i of args){
      let resultIndex = interIndex
      // 循环数组，执行的个数累加
      interIndex+=1
      // 使用promise.resolve执行，避免判断是否是promise对象形式
      Promise.resolve(i).then(res=>{
        resultPromise[interIndex] = res
        // 事件执行成功的个数累加
        promiseFullIndex+=1
        // 如果执行个数和promise顺序相同，则全部执行成功
        if(interIndex==promiseFullIndex){
          resolve(resultPromise)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  })
  }else{
    console.log('请传入一个数组')
  }
}
let p1 = new Promise(resolve=>{
  resolve(1)
})
let p2 = new Promise(resolve=>{
  resolve(2)
})
let p3 = promiseAll([p1,p2])
p3.then(res=>{
  console.log(res)//[1,2]
})
```

参考文章：

[ECMAScript 6 入门 - Promise 对象](https://es6.ruanyifeng.com/#docs/promise)

[从一道让我失眠的 Promise 面试题开始，深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469#heading-0)

[要就来45道Promise面试题一次爽到底(1.1w字用心整理)](https://juejin.cn/post/6844904077537574919)
