## JS进阶之函数柯里化

### 什么是函数柯里化？

函数柯里化又叫做部分求值，维基百科对其的定义是：

> 柯里化是一种将使用多个参数的函数转换成一系列使用一个参数的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

简单来说就是，对于函数调用，我们只传给函数一部分参数，然后返回一个新函数处理剩下的参数。

我们先来看看下面这个简单例子：

需求：调用add函数，得到1+2+3

一般做法：

```js
function add(a,b,c){
  let str = a+b+c
  console.log(str)
  return str
}
add(1,2,3)//6
```

采用函数柯里化实现

```js
function add(a){
  return function(b){
    return function(c){
      let str = a+b+c
      console.log(str)
      return str
    }
  }
}
add(1)(2)(3)//6
```

上面就是一个简单的函数柯里化应用。通过对比这两个函数执行的不同，可以发现，函数柯里化就是将函数里面的参数拆分成若干个单个参数传值，然后里面使用了闭包的方法，函数调用之后返回的还是一个函数。

### 函数柯里化的实现

像上面的例子中，函数柯里化其实就是传入一个参数，然后返回的是一个函数，再传入一个参数，又返回一个函数，直到最后传值，返回最终结果。那么在调用最后一个参数之前，那必然返回的是一个函数，是不是有点递归的意思？

来简单实现一下

```js
function curry(fn,currArgs){
  let args = [].slice.call(arguments)
  // 首次使用，如果没有提供currArgs，那么就不做拼接

  if(currArgs!=undefined){
    args = args.concat(currArgs);
  }
  // 递归调用
  if(args.length!=fn.length){
    return curry(fn,args)
  }
  return fn.apply(null,args)
}
```





