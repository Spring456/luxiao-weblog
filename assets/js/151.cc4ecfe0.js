(window.webpackJsonp=window.webpackJsonp||[]).push([[151],{643:function(t,a,s){"use strict";s.r(a);var n=s(2),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"vue原理-十-之vue编译过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue原理-十-之vue编译过程"}},[t._v("#")]),t._v(" vue原理(十)之vue编译过程")]),t._v(" "),a("h3",{attrs:{id:"vue编译主要流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vue编译主要流程"}},[t._v("#")]),t._v(" vue编译主要流程")]),t._v(" "),a("p",[t._v("获取HTML字符串---转化成ast---生成render函数---生成虚拟dom---生成真实dom")]),t._v(" "),a("h3",{attrs:{id:"获取html字符串"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#获取html字符串"}},[t._v("#")]),t._v(" 获取HTML字符串")]),t._v(" "),a("p",[t._v("获取模板的HTML，使用getOuterHTML函数获取整个标签的字符串")]),t._v(" "),a("h3",{attrs:{id:"转成ast抽象语法树"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#转成ast抽象语法树"}},[t._v("#")]),t._v(" 转成ast抽象语法树")]),t._v(" "),a("p",[t._v("获取HTML内容后，将HTML转成ast，然后将ast生成render函数。在vue里主要通过正则匹配出来")]),t._v(" "),a("p",[t._v("转成ast语法树，有两个重要函数")]),t._v(" "),a("p",[t._v("parseHTML函数")]),t._v(" "),a("p",[t._v("通过正则和栈数据对开始标签，结束标签，文本，注释等分别进行不同的处理，给不同元素添加不同的type，用来标记不同的节点类型。")]),t._v(" "),a("p",[t._v("optimize函数")]),t._v(" "),a("p",[t._v("添加标记时，还判断是否是静态节点和静态根节点。主要有话patch性能。如果是静态的，就可以直接跳过比对直接复制。")]),t._v(" "),a("h3",{attrs:{id:"生成render函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成render函数"}},[t._v("#")]),t._v(" 生成render函数")]),t._v(" "),a("p",[t._v("生成ast语法树后，通过generate函数生成render函数。render函数的目的是为了生成虚拟dom")]),t._v(" "),a("p",[t._v("render函数其实是一个带有with语法的字符串")]),t._v(" "),a("p",[t._v("有了字符串，通过"),a("code",[t._v("new Function")]),t._v("执行，变成render函数")]),t._v(" "),a("p",[t._v("在生成render函数时，使用genElement函数对template，slot，compontent，element进行判断做不同处理")]),t._v(" "),a("h3",{attrs:{id:"生成虚拟dom"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成虚拟dom"}},[t._v("#")]),t._v(" 生成虚拟dom")]),t._v(" "),a("p",[t._v("生成虚拟dom时，用到mountComponent函数，函数里面就是一些vue生命周期的挂载，核心是_update方法")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_update")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("_render")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" hydrating"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("p",[t._v("生成虚拟dom是使用了_render方法，"),a("code",[t._v("Vue.prototype._render")]),t._v(",_render其实就是调用render，然后生成虚拟dom：")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("vnode "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("render")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("call")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_renderProxy"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$createElement"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h3",{attrs:{id:"生成真实dom"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成真实dom"}},[t._v("#")]),t._v(" 生成真实dom")]),t._v(" "),a("p",[t._v("生成真实dom是使用"),a("code",[t._v("Vue.prototype._update")]),t._v("，")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" prevVnode "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_vnode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//prevVnode,就是oldVnode。")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" restoreActiveInstance "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setActiveInstance")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("_vnode "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" vnode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//vnode是最新的虚拟dom。vm._vnode = vnode;把新的缓存，下次更新就是oldVnode")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Vue.prototype.__patch__ is injected in entry points")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// based on the rendering backend used.")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("prevVnode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//!prevVnode如果没有旧的，相当于是第一次渲染，直接更新，不用比对(initial render)")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// initial render")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//__patch__其实就是patch函数Vue.prototype.patch = inBrowser ? patch : noop;")]),t._v("\n    vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$el "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__patch__")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$el"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" vnode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" hydrating"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* removeOnly */")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// updates")]),t._v("\n    vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("$el "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" vm"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("__patch__")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("prevVnode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" vnode"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("延伸：")]),t._v(" "),a("p",[t._v("patch函数--")])])}),[],!1,null,null,null);a.default=e.exports}}]);