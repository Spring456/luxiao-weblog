(window.webpackJsonp=window.webpackJsonp||[]).push([[137],{623:function(t,a,s){"use strict";s.r(a);var e=s(2),r=Object(e.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"vue原理-二-之computed的原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue原理-二-之computed的原理"}},[t._v("#")]),t._v(" vue原理(二)之computed的原理")]),t._v(" "),a("h3",{attrs:{id:"computed的作用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#computed的作用"}},[t._v("#")]),t._v(" computed的作用")]),t._v(" "),a("p",[t._v("computed--计算属性。可以缓存结果，当他依赖的数据发生改变时，才会重新计算。否则就会沿用之前的数据。")]),t._v(" "),a("p",[t._v("computed关注的是数据的变化。")]),t._v(" "),a("h3",{attrs:{id:"用法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#用法"}},[t._v("#")]),t._v(" 用法")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("template"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"home"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("msg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("reverMsg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("template"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("msg")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'hello world'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("computed")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("reverMsg")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("msg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("split")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("' '")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("reverse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("join")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("','")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("p",[t._v("以上面代码为例，使用computed时，需要注意以下几个要点：")]),t._v(" "),a("p",[t._v("1、computed监听定义的变量，该变量不用在data里面声明，直接在computed里面定义即可。")]),t._v(" "),a("p",[t._v("2、该变量是通过函数的形式执行。最后将结果值通过retrun的方式暴露出去使用。")]),t._v(" "),a("p",[t._v("3、监听的变量如果没有在data里面定义，是监听不到的。比如上面的msg如果没有在data上定义，是监听不到的。")]),t._v(" "),a("h3",{attrs:{id:"computed的特点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#computed的特点"}},[t._v("#")]),t._v(" computed的特点")]),t._v(" "),a("p",[t._v("1、computed支持缓存，只有当它依赖的响应式数据更新，才会重新计算")]),t._v(" "),a("p",[t._v("2、computed不支持异步，当computed里面有异步操作时，无效，无法监听数据的变化。如果要异步操作，使用watch")]),t._v(" "),a("h3",{attrs:{id:"computed缓存原理"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#computed缓存原理"}},[t._v("#")]),t._v(" computed缓存原理")]),t._v(" "),a("p",[t._v("computed的实现是通过computed watcher。这个watcher不会立刻求值，而是通过"),a("code",[t._v("this.dirty")]),t._v("属性标记计算属性是否需要重新求值。通过"),a("code",[t._v("this.dep.subs.length")]),t._v("判断有没有订阅者。")]),t._v(" "),a("p",[t._v("如果有改变，就重新计算，比对新旧值，如果变化了，就重新渲染。vue中，不仅仅是计算属性依赖值发生改变，而是看最终的结果有没有发生改变，发生改变才触发watcher改变。这一步其实本质上也是一种优化")]),t._v(" "),a("p",[t._v("如果没有改变，就执行"),a("code",[t._v("this.dirty=true")]),t._v("。当计算属性依赖于其他数据时，属性并不会立即计算，只有其他地方需要读取属性的时候才会真正计算。")]),t._v(" "),a("p",[t._v("相比较watch的原理")]),t._v(" "),a("p",[t._v("watcher内部会收集data中属性对应的Dep（Dep中记录了哪些watcher访问了该变量），同时Dep也会收集该watcher，只要其中任意一个发生改变,watcher都会收到通知。而当我们在watcher中记录了自己订阅了哪些Dep之后，可以在teardown中通知这些Dep，让他们把wather从当前列表删除。")]),t._v(" "),a("h3",{attrs:{id:"computed和watch的区别和使用场景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#computed和watch的区别和使用场景"}},[t._v("#")]),t._v(" computed和watch的区别和使用场景")]),t._v(" "),a("p",[a("strong",[t._v("区别")])]),t._v(" "),a("p",[t._v("computed关注的是值的变化；watch关注的是值变化之后的操作。")]),t._v(" "),a("p",[t._v("omputed: 依赖其它属性值,并且 computed 的值有缓存,只有它依赖的属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。")]),t._v(" "),a("p",[t._v("watch: 更多的是观察的作用,无缓存性,类似于某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作")]),t._v(" "),a("p",[a("strong",[t._v("使用场景")])]),t._v(" "),a("p",[t._v("当我们需要进行数值计算,并且依赖于其它数据时,应该使用 computed,因为可以利用 computed 的缓存特性,避免每次获取值时,都要重新计算。")]),t._v(" "),a("p",[t._v("当我们需要在数据变化时执行异步或开销较大的操作时,应该使用 watch,使用 watch 选项允许我们执行异步操作 ( 访问一个 API ),限制我们执行该操作的频率,并在我们得到最终结果前,设置中间状态。这些都是计算属性无法做到的。")])])}),[],!1,null,null,null);a.default=r.exports}}]);