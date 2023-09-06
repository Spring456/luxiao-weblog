## 聊一聊$nextTick()的原理

### 遇到的问题

实现一个评价列表，从后台获取到评价字段之后，将其展现在页面上，通过获取其高度或行数显示'查看更多'按钮，但不管怎么获取，都是获取不到文字的高度，文字高度都是0。但在页面控制台打印还是可以获取到的。

### vue的响应式

在前面的文章中，我们讨论过了vue双向数据绑定的原理。虽然说数据更新，视图也会更新；视图更新，数据也会更新。但这是最后的结果。实际工作中，vue的响应式并不是数据改变后，DOM就立刻发生变化，而是按照一定策略进行DOM的更新。这样的好处是可以避免一些对DOM不必要的操作，提高渲染性能。这就带来了上面的问题。`DOM不能立刻更新，而是有一定策略后更新`

### vue的DOM异步更新

vue官方文档[深入响应式原理/异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)

>可能你还没有注意到，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。

想理解这句话，就必须先了解[JS事件循环](../../FrontEnd/Advanced/closure.md)。了解宏任务，微任务，事件循环顺序之后，对上面的话简单理解就是：

1、vue的数据每一次变化，都会做一次渲染

2、每一次渲染，都会被加入到异步队列中，并缓冲在同一事件循环中发生的所有数据变更。

3、在这个队列会进行去重操作。同一个 watcher 被多次触发，只会被推入到队列中一次，保留最后一次的操作。避免不必要的计算和 DOM 操作

4、这些变化都通过队列的形式保存起来，在执行的时候，按照队列先后执行。

既然知道了vue中DOM是异步更新的，那在事件循环的哪一个阶段去更新DOM呢？Vue有两种选择，一个是在本次事件循环的最后进行一次DOM更新，另一种是把DOM更新放在下一轮的事件循环当中。但因为本轮事件循环最后执行会比放在下一轮事件循环要快很多，所以Vue优先选择第一种，只有当环境不支持的时候才触发第二种机制。

DOM异步更新，组件不会立即渲染，但我们获取元素DOM的时候却是同步的，这样就会导致文章开头的那个问题。数据修改了，但DOM还没来得及改，因此获取不到值。这如何解决呢？vue提供了一个api——Vue.$nextTick()

### Vue.$nextTick()的原理

> 将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

所以我们在$nextTick里的获取DOM元素等操作，是不会立即执行的，而是等数据更新，DOM更新完成之后才执行。这样我们就可以拿到最新的DOM了。

异步队列执行原理,官网对其是这样说的：

> Vue在内部对异步队列尝试使用原生的Promise.then、MutationObserver和setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0)代替。

还是利用JS的事件循环机制。

### Vue.$nextTick()的用法

**1、created/mounted渲染DOM**

在 created 和 mounted 阶段，如果需要操作渲染后的试图，也要使用 nextTick 方法。官方文档说明：

>注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted

**2、数据更新，获取元素宽高点击按钮显示原本以 v-show = false 隐藏起来元素，并获取宽高**

```html
<div id='app'>
  <div v-show='inpShow' id='oDiv' style="width: 100px;">
    这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字这是一段文字
  </div>
  <button type="button" @click="btn">按钮</button>
</div>
<script type="text/javascript">
  var vm = new Vue({
    el:"#app",
    data:{
      inpShow:false
    },
    methods:{
      btn(){
        this.inpShow = true
        const oHeight1 = document.getElementById('oDiv').offsetHeight
        console.log(oHeight1)//0
        this.$nextTick(()=>{
          const oHeight = document.getElementById('oDiv').offsetHeight
          console.log(oHeight,'文字高度')//374	
        })
        
      }
    }
  })
</script>
```

3、还有比如使用 swiper 插件通过 ajax 请求图片后的滑动问题。

### Vue.$nextTick()源码解析

源码地址：src/core/util/next-tick.js

```js
/* @flow */
/* globals MutationObserver */

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false

const callbacks = []
let pending = false

// flushCallbacks的作用就是将获取到的回调函数队列浅拷贝后循环依次执行每个函数
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)//浅拷贝
  callbacks.length = 0//置空
  // 循环copies数组，得到的是一个函数，然后依次执行一遍
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
// timerFunc 作用是创建异步方法，将flushCallbacks返回的值放到宏任务或微任务中
let timerFunc
// 判断浏览器是否支持promise,isNative表示所传参数，原生是否支持
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
  //判断原生是否支持MutationObserver
  // MutationObserver是Html5的一个新特性，用来监听目标DOM结构是否改变，也就是代码中新建的textNode
  // MutationObserver在微任务中执行
  //https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)//传入 flushCallbacks 到 MutationObserver 实例
  const textNode = document.createTextNode(String(counter))//创建一个 text 元素并监听
  observer.observe(textNode, {
    characterData: true
  })
  //调用timerFunc时，更新textNode，触发flushCallbacks
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
  // 判断原生是否支持setImmediate，该方法存在一些 IE 浏览器中
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // 如果都不支持，使用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
// nextTick的作用，每次调用都会向callbacks里面添加回调函数
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {//标识符，每次都只执行一次
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve//不断回调返回
    })
  }
}
```

依照上面的注释分析，可以对$nextTick梳理一下流程：

1、回调函数依次放入到callbacks队列里

2、执行timerFunc(),将回调函数放到异步队列中，宏任务或微任务

3、在执行任务时，调用flushCallbacks()函数，将callbacks中的回调依次执行

通过分析源码总结，$nextTick就是通过`promise,setImmediate,setTimeout,MutationObserver`做了异步处理。

### 为什么需要使用$nextTick才能获取到最新的DOM

上面我们已经了解了nextTick是通过建立异步任务获取最新DOM。那么是如何监听到最新的DOM的呢？其实在渲染的时候，是将需要更新的Watcher加入到queueWatcher队列里，然后把具体的更新方法flushSchedulerQueue传给nexTick 进行调用。

源码地址：src/core/observer/watcher.js和src/core/observer/scheduler.js

可以参考：[vue异步队列更新原理](https://zhuanlan.zhihu.com/p/364479245)



