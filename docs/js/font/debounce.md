## 函数防抖和节流

在开发中，我们经常会持续触发一些事件，比如持续点击按钮提交，如窗口的resize、scroll事件，鼠标的mousemove事件等等。这些事件会在连续触发过程中频繁执行，频繁的操作会加大浏览器负担以及接口请求的频次。

所以为了解决这个问题，可以采用防抖节流两种方式解决

### 防抖

概念：

> 所谓防抖，就是指触发事件后 n 秒后才执行函数，如果在 n 秒内又触发了事件，则会清空之前的定时器，重新生成新的定时器，重新计时。
```html
<input type="text" id='input'>
```

1、有参数的情况下：

```js
<script>
  window.onload = function() {
    // 1、获取这个按钮，并绑定事件
    var inputEl = document.getElementById("input");
    let ins = function(e){
      console.log(e)
    }

    // 防抖函数
    function debounce(fn,delay){
      let timer=null
      // 将参数传进来
      let _debounce = function(..args){
        if(timer){
          clearTimeout(timer)
        }
        // 主要执行代码
        timer = setTimeout(()=>{
          fn.apply(this,args)
        },delay)
      }
      return _debounce
    }
    // 使用
    inputEl.oninput = debounce(ins,1000)
  }
</script>
```

2、增加立即执行功能，第一次输入就执行：

```js
// 防抖函数
function debounce(fn,delay){
  let timer=null
  let isFirst=false
  let _debounce = function(...args){
    if(timer){
      clearTimeout(timer)
    }
    if(!isFirst){
      fn.apply(this,args)
      isFirst=true
    }else{
      timer = setTimeout(()=>{
        fn.apply(this,args)
        isFirst = false
      },delay)
    }
  }
  return _debounce
}
```

3、事件有返回值的情况

```js
function debounce(fn,delay,resultCallback){
  let timer=null
  let isFirst=false
  let _debounce = function(...args){
    return new Promise((resolve,reject)=>{
      if(timer){
        clearTimeout(timer)
      }
      if(!isFirst){
        let result = fn.apply(this,args)
        resultCallback(result)
        resolve(result)
        isFirst=true
      }else{
        timer = setTimeout(()=>{
          let result = fn.apply(this,args)
          resultCallback(result)
          resolve(result)
          isFirst = false
        },delay)
      }
    })
  }
  return _debounce
}
let debounceChange = debounce(ins,1000,(res)=>{
  console.log(res,'函数执行返回值')
})
let tempDebounce = (...args)=>{
  debounceChange().then(res=>{
    console.log(res,'promise返回值')
  })
}
inputEl.oninput = tempDebounce
```

结合上面代码，我们可以看到当我们连续点击按钮的时候，并不会一直触发事件，直到指定间隔时间1s后才执行。

### 节流

概念：节流是指定间隔时间只执行一次事件。不管点击多少次，事件总是在相同的间隔时间内执行

```html
<input id='input'/>
 <button id="throttle">点我节流！</button>
```

常规做法：

```js
<script>
let inputChange = function(e){
    console.log(e)
  }
  function throttle(fn,delay){
    let inter = 0
    let throttle = function(...args){
      let nowTime = new Date().getTime()
      if(nowTime-inter>delay){
        fn.apply(this,args)
        inter = nowTime
      }
    }
    return _throttle
  }
  inputEl.oninput = throttle(inputChange,1000)
</script>
```

增加开头和结尾是否执行事件。

```js
function throttle(fn,interval,leading=true,trialing=false){
  // leading--是否立即执行
  // trialing--最后一次是否执行
  //两者不能同为false,否则就会产生bug,会导致触发事件立即执行一次后就失效了!
    let lastTime =0
    let timer=null
    let _throttle = function(...args){
      let nowTime = new Date().getTime()
        const remainTime = interval - (nowTime - lastTime)
      if(!lastTime&&!leading){
        lastTime = nowTime
      }
      if(remainTime<=0){
        if(timer){
          clearTimeout(timer)		
          timer=null
        }
        fn.apply(this,args)
        lastTime = nowTime
        return
      }
      if(trialing&&!timer){
        timer = setTimeout(()=>{
          timer=null
          lastTime = !leading?0:new Date().getTime()
          fn.apply(this,args)
        },remainTime)
      }
    }
    return _throttle
  }
```

事件有无返回值

```js
function throttle(fn, interval, options = { leading: true, trailing: false }) {
  const { leading, trailing, resultCallback } = options
  let lastTime = 0
  let timer = null
  const _throttle = function(...args) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime()
      if (!lastTime && !leading) lastTime = nowTime
      // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
      const remainTime = interval - (nowTime - lastTime)
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer)
          timer = null
        }
        // 2.3.真正触发函数
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        // 2.4.保留上次触发的时间
        lastTime = nowTime
        return
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          timer = null
          lastTime = !leading ? 0: new Date().getTime()
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
        }, remainTime)
      }
    })
  }
  return _throttle
}
```

调用：

```js
const _throttle = throttle(inputChange, 3000, { 
  leading: false, 
  trailing: true,
  resultCallback: function(res) {
    console.log("resultCallback:", res)
  }
  })
const tempCallback = (...args) => {
  _throttle.apply(inputEl, args).then(res => {
    console.log("Promise:", res)
  })
}
inputEl.oninput = tempCallback
```


节流相比较于防抖，节流使用标识来判断事件执行。

### 防抖节流在实际工作中的应用

防抖：

在input框上输入，然后请求接口。实现这个功能可以使用防抖。避免每次输入就请求接口，使用防抖保证在用户输入完毕一段时间后再请求接口。

节流：

可以将一些事件降低触发频率。

1、比如懒加载时要监听计算滚动条的位置，但不必每次滑动都触发，可以降低计算的频率；

2、另外还有做商品预览图的放大镜效果时，不必每次鼠标移动都计算位置


