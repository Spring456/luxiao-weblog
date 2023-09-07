(window.webpackJsonp=window.webpackJsonp||[]).push([[180],{704:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"事件循环机制-js渲染机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#事件循环机制-js渲染机制"}},[t._v("#")]),t._v(" 事件循环机制（JS渲染机制）")]),t._v(" "),s("h3",{attrs:{id:"先来个面试题吧"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#先来个面试题吧"}},[t._v("#")]),t._v(" 先来个面试题吧")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n            console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("这是一个很老套但很经典的面试题。上面运行结果是什么呢？结果为5个5；这是为什么呢？想了解这其中的原理，我们就要了解JS渲染的机制问题。")]),t._v(" "),s("h3",{attrs:{id:"_1-js单线程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-js单线程"}},[t._v("#")]),t._v(" 1.JS单线程")]),t._v(" "),s("p",[t._v("JavaScript是单线程的，也就是说，同一时间只能做一件事。")]),t._v(" "),s("p",[t._v("举个例子，如果是多线程的，那有一个元素，我正在输入，另一个人正在删除。浏览器就不知道如何渲染了。所以规定JS是单线程的。")]),t._v(" "),s("p",[t._v("单线程就意味着：所有任务需要排队执行，前一个任务执行完毕，才会执行下一个任务。遵守先进先出。")]),t._v(" "),s("p",[t._v("主线程从'任务队列'中读取执行事件，不断循环重复的过程，就叫做'事件循环'。如果一个任务耗时太长，后面的事件就不得不一直等着，那么我们肯定就要对这种情况进行处理。")]),t._v(" "),s("p",[t._v("为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质。")]),t._v(" "),s("h3",{attrs:{id:"任务队列"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#任务队列"}},[t._v("#")]),t._v(" 任务队列")]),t._v(" "),s("p",[t._v("单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。")]),t._v(" "),s("p",[t._v("如果前一个任务耗时很长，后一个任务就不得不一直等着。所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。")]),t._v(" "),s("p",[s("strong",[t._v("同步任务")]),t._v(":在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；")]),t._v(" "),s("p",[s("strong",[t._v("异步任务")]),t._v(':不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。具体来说，异步执行的运行机制如下:（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）')]),t._v(" "),s("blockquote",[s("p",[t._v("(1) 遇到同步代码直接执行")])]),t._v(" "),s("blockquote",[s("p",[t._v("(2) 遇到异步代码先放一边，并且将他的回调函数存起来，存的地方叫'事件队列'")])]),t._v(" "),s("blockquote",[s("p",[t._v("(3) 等所有的同步任务执行完毕，再从事件队列中把所有的异步回调函数拿出来按顺序执行。")])]),t._v(" "),s("p",[t._v('只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。这个过程会不断重复。')]),t._v(" "),s("h3",{attrs:{id:"哪些是异步任务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#哪些是异步任务"}},[t._v("#")]),t._v(" 哪些是异步任务？")]),t._v(" "),s("p",[t._v("1.setTimeout 和 setInterval")]),t._v(" "),s("p",[t._v("2.DOM 事件")]),t._v(" "),s("p",[t._v("3.Promise")]),t._v(" "),s("p",[t._v("4.网络请求")]),t._v(" "),s("p",[t._v("5.I/O")]),t._v(" "),s("p",[t._v("6、requestAnimationFrame")]),t._v(" "),s("p",[t._v("前面说了，当同步任务执行完毕之后，再执行事件队列里的异步回调函数。但异步任务也有类型之分，分为"),s("strong",[t._v("宏任务")]),t._v("和"),s("strong",[t._v("微任务")]),t._v("。并且"),s("strong",[t._v("微任务执行时机先于宏任务")])]),t._v(" "),s("h3",{attrs:{id:"宏任务-微任务"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#宏任务-微任务"}},[t._v("#")]),t._v(" 宏任务 & 微任务")]),t._v(" "),s("p",[t._v("为什么有了宏任务，又需要微任务呢？")]),t._v(" "),s("p",[t._v("在异步队列里，任务是排队执行，但如果又需要某个任务能优先执行，所以就加入了微任务，给任务一个插队的机会，微任务比宏任务有更高优先级。")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("宏任务(macro-task)：DOM 渲染后触发，如 setTimeout 、setInterval 、DOM 事件 、script")])]),t._v(" "),s("li",[s("p",[t._v("微任务(mincro-task)：DOM 渲染前触发，如 Promise.then 、MutationObserver 、Node 环境下的 process.nextTick 。")])])]),t._v(" "),s("p",[t._v("这里需要注意的是new Promise是会进入到主线程中立刻执行属于同步任务，而promise.then则属于微任务")]),t._v(" "),s("p",[t._v("还需要注意：setTimeout的回调不一定在指定时间后就能执行。而是在指定时间后，将回调函数放入事件循环的队列中。如果时间到了，JS引擎还在执行同步任务，这个回调函数需要等待，如果当前事件循环的队列里还有其他回调，需要等其他回调执行完。")]),t._v(" "),s("p",[t._v("setTimeout 的时间设置为0也不是立刻执行的，有一个默认最小时间是4ms.")]),t._v(" "),s("h3",{attrs:{id:"同步异步执行过程-eventloop-事件循环"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#同步异步执行过程-eventloop-事件循环"}},[t._v("#")]),t._v(" （同步异步执行过程）EventLoop 事件循环")]),t._v(" "),s("p",[t._v('主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。')]),t._v(" "),s("p",[s("img",{attrs:{src:"https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e14aff1f40684c48b93ea48cdb4661f4~tplv-k3u1fbpfcp-zoom-1.image",alt:"alt 事件循环图"}})]),t._v(" "),s("p",[t._v("1.整体的script(作为第一个宏任务)开始执行的时候，会把所有代码分为两部分：“同步任务”、“异步任务”；")]),t._v(" "),s("p",[t._v("2.同步任务会直接进入主线程依次执行；形成一个'执行栈'")]),t._v(" "),s("p",[t._v("3.主线程之外，存在一个'任务队列',在走主流程的时候，如果碰到异步任务，那么就在'任务队列'中放置这个异步任务。")]),t._v(" "),s("p",[t._v("4.当'执行栈'中的同步任务都执行完毕后，系统就会读取'任务队列',看看里面存在哪些事件，哪些对应异步任务，然后依次进入执行栈，开始执行。")]),t._v(" "),s("p",[t._v("3.异步任务会再分为宏任务和微任务；")]),t._v(" "),s("p",[t._v("4.宏任务进入到Event Table中，并在里面注册回调函数，每当指定的事件完成时，Event Table会将这个函数移到Event Queue中；")]),t._v(" "),s("p",[t._v("5.微任务也会进入到另一个Event Table中，并在里面注册回调函数，每当指定的事件完成时，Event Table会将这个函数移到Event Queue中；")]),t._v(" "),s("p",[t._v("6.当主线程内的任务执行完毕，主线程为空时，会检查微任务的Event Queue，如果有任务，就全部执行，如果没有就执行下一个宏任务；也就是先执行微任务，再执行宏任务")]),t._v(" "),s("p",[t._v("7.上述过程会不断重复，这就是Event Loop事件循环；")]),t._v(" "),s("ul",[s("li",[t._v("`总结：")])]),t._v(" "),s("p",[t._v("1、浏览器事件循环机制，就是每次执行宏任务之后，先将宏任务里的微任务执行完毕，再执行下一个宏任务。宏任务队列只有一个，每一个宏任务都有自己的微任务队列，每轮循环都是由一个宏任务和多个微任务组成")]),t._v(" "),s("p",[t._v("1、在分析执行顺序时，可参考："),s("code",[t._v("先同步再异步，异步中先微任务再宏任务")])]),t._v(" "),s("h3",{attrs:{id:"案例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#案例"}},[t._v("#")]),t._v(" 案例")]),t._v(" "),s("p",[t._v("其实分析这类题目的顺序就是：")]),t._v(" "),s("blockquote",[s("p",[t._v("1、标记区分同步任务和异步任务")])]),t._v(" "),s("blockquote",[s("p",[t._v("2、异步任务中，标记微任务和宏任务")])]),t._v(" "),s("blockquote",[s("p",[t._v("3、区分完之后，一轮一轮走流程")])]),t._v(" "),s("p",[t._v("好，回到我们开始的那个面试题，首先setTimeout定时器属于异步任务，并不会马上把这个异步任务放到任务队列中，而是等时间到了之后才放入，然后等执行栈中的同步任务执行完毕之后，再从任务队列中取出任务执行。")]),t._v(" "),s("p",[t._v("for循环属于同步任务，会先执行完循环，此时i的值是5，同步任务执行完毕之后，才开始来执行异步任务，console.log(i)被依次放入任务队列中，所以打印出来5个5")]),t._v(" "),s("p",[t._v("如何解决呢？最简单的方法就是将其中的var改为let即可，这是为什么呢？")]),t._v(" "),s("p",[t._v("因为let在for循环中，会形成独特的作用域块，当前的i只在本轮循环中有效，然后在setTimeout会找到本轮循环的i值，从而依次输出1-5")]),t._v(" "),s("p",[t._v("使用var会污染全局变量，所以在for循环外我们还可以看到i值。")]),t._v(" "),s("p",[t._v("1>第一题")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[t._v("答案：1，3，2")]),t._v(" "),s("p",[t._v("解析： console.log()是同步任务， setTimeout是异步任务。异步任务会等同步任务执行完再执行。虽然setTimeout设置的延迟是 0，但浏览器规定延迟最小为 4ms，所以 console.log(2)在 4ms 后被放入任务队列。当同步任务执行完，即打印完 1，3 之后，主线程再从任务队列中取任务，打印 2。")]),t._v(" "),s("p",[t._v("2> 第二题")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'A'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("while")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'B'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n")])])]),s("p",[t._v("答案：A")]),t._v(" "),s("p",[t._v("解析：代码从上往下执行，先打印 A，然后 while 循环，因为条件一直是 true，所以会进入死循环。while 不执行完就不会执行到第三行。")]),t._v(" "),s("p",[t._v("3> 第三题")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("10000")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" i"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("++")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        i "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("9999")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 结果： 2， 4， 3， 1")]),t._v("\n")])])]),s("p",[t._v("分析：")]),t._v(" "),s("p",[t._v("1.setTimeout是异步，且是宏任务，放到宏任务队列中；")]),t._v(" "),s("p",[t._v("2.new Promise是同步任务，直接执行，打印2，并执行for循环；")]),t._v(" "),s("p",[t._v("3.promise.then是微任务，放到微任务队列中；")]),t._v(" "),s("p",[t._v("4.console.log(4)同步任务，直接执行，打印4；")]),t._v(" "),s("p",[t._v("5.此时主线程任务执行完毕，检查微任务队列中，有promise.then，执行微任务，打印3；")]),t._v(" "),s("p",[t._v("6.微任务执行完毕，第一次循环结束；从宏任务队列中取出第一个宏任务到主线程执行，打印1；")]),t._v(" "),s("p",[t._v("7.结果：2，4，3，1")]),t._v(" "),s("p",[t._v("4> 第四题")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  Promise"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("reject")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("7")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("8")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("p",[s("strong",[t._v("1、标记——标记同步任务和异步任务")])]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("console.log(1) // 同步\nsetTimeout(() => {\n  console.log(2) // 异步：宏任务 setTimeout1\n  Promise.resolve().then(() => { // 异步：微任务 then1\n    console.log(3)\n  })\n});\nconsole.log(4) // 同步\nnew Promise((resolve,reject) => {\n  console.log(5) // 同步\n  resolve()\n}).then(() => { // 异步：微任务 then2\n  console.log(6)\n  setTimeout(() => {\n    console.log(7) // 异步：宏任务 setTimeout2\n  })\n})\nconsole.log(8) // 同步\n")])])]),s("p",[s("strong",[t._v("2、先同步再异步，异步中先微后宏")])]),t._v(" "),s("p",[t._v("1、先执行同步任务。依次打印出：1,4,5,8")]),t._v(" "),s("p",[t._v("2、再执行异步任务，先微后宏。 第一个setTimeout是宏任务最后执行，那么先执行promise.then里的微任务，先打印出6。剩下两个setTimeout按顺序执行")]),t._v(" "),s("p",[t._v("3、执行第一个setTimeout，打印出2，剩下了promise.then和最后一个setTimeout，那么执行promise里的代码打印出3，最后执行最后一个setTimeout，打印7")]),t._v(" "),s("p",[t._v("4、结果为1、4、5、8、6、2、3、7")]),t._v(" "),s("h2",{attrs:{id:"如果有async-await时"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如果有async-await时"}},[t._v("#")]),t._v(" 如果有async/await时")]),t._v(" "),s("p",[t._v("其实async/await的内部实现原理，是依赖于Promise.prototype.then的不断嵌套，是可以转化的。")]),t._v(" "),s("h3",{attrs:{id:"node中的事件循环机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#node中的事件循环机制"}},[t._v("#")]),t._v(" node中的事件循环机制")]),t._v(" "),s("p",[t._v("node中的事件循环机制分版本的。在node 10版本之后，事件循环机制就和浏览器事件循环机制保持一致了。但在10版本之前是有差别的。")]),t._v(" "),s("p",[t._v("浏览器环境下：每个宏任务执行，先执行里面的微任务，执行完毕之后再去执行下一个宏任务")]),t._v(" "),s("p",[t._v("Node.js：microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。")]),t._v(" "),s("p",[t._v("node中的事件循环由"),s("code",[t._v("6个宏任务队列和2个微任务队列")]),t._v("组成。")]),t._v(" "),s("p",[t._v("宏任务按照优先级从高到低依次是：")]),t._v(" "),s("p",[s("code",[t._v("Times(执行setTimeout/setInterval回调)--I/O callbacks--ldle,prepare--Poll(获取新的IO事件，例如操作读取文件)--Check(执行setImmediate的回调)--Close callback")])]),t._v(" "),s("p",[s("code",[t._v("执行规律")]),t._v("：在一个宏任务队列全部执行完毕后，去清空一次微任务队列，然后到下一个等级的宏任务队列，以此往复。")]),t._v(" "),s("p",[t._v("一个宏任务队列搭配一个微任务队列。六个等级的宏任务全部执行完成，才是一轮循环。")]),t._v(" "),s("p",[t._v("node微任务主要有process.nextTick、promise.then。")]),t._v(" "),s("p",[t._v("node中事件循环特点：")]),t._v(" "),s("p",[t._v("1、微任务队列中 process.nextTick 都有更高优先级，即使它后进入微任务队列，也会先打印微任务nextTick再微任务promise1;")]),t._v(" "),s("p",[t._v("2、宏任务 setTimeout 比 setImmediate 优先级更高；")]),t._v(" "),s("p",[t._v("3、在 node11.x 之前，微任务队列要等当前优先级的所有宏任务先执行完，在两个 setTimeout 之后才打印微任务promise2；在 node11.x 之后，微任务队列只用等当前这一个宏任务先执行完。")]),t._v(" "),s("h3",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),s("p",[t._v("浏览器事件循环和node环境事件循环")]),t._v(" "),s("p",[t._v("浏览器事件循环：执行宏任务，先执行宏任务中的微任务队列，再执行下一个宏任务。一个单独的宏任务搭配一个微任务队列")]),t._v(" "),s("p",[t._v("node事件循环：宏任务分为六个优先级，微任务分为两个优先级；执行规律是一个宏任务队列搭配一个微任务队列。node11 之后，node 和浏览器的规律趋同。")]),t._v(" "),s("p",[t._v("推荐文章：\n"),s("a",{attrs:{href:"https://juejin.cn/post/6844903764202094606",target:"_blank",rel:"noopener noreferrer"}},[t._v("一次弄懂 Event Loop"),s("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=e.exports}}]);