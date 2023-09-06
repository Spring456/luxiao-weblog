## vue原理(十)之vue编译过程

### vue编译主要流程

获取HTML字符串---转化成ast---生成render函数---生成虚拟dom---生成真实dom

### 获取HTML字符串

获取模板的HTML，使用getOuterHTML函数获取整个标签的字符串

### 转成ast抽象语法树

获取HTML内容后，将HTML转成ast，然后将ast生成render函数。在vue里主要通过正则匹配出来

转成ast语法树，有两个重要函数

parseHTML函数

通过正则和栈数据对开始标签，结束标签，文本，注释等分别进行不同的处理，给不同元素添加不同的type，用来标记不同的节点类型。

optimize函数

添加标记时，还判断是否是静态节点和静态根节点。主要有话patch性能。如果是静态的，就可以直接跳过比对直接复制。

### 生成render函数

生成ast语法树后，通过generate函数生成render函数。render函数的目的是为了生成虚拟dom

render函数其实是一个带有with语法的字符串

有了字符串，通过`new Function`执行，变成render函数

在生成render函数时，使用genElement函数对template，slot，compontent，element进行判断做不同处理

### 生成虚拟dom

生成虚拟dom时，用到mountComponent函数，函数里面就是一些vue生命周期的挂载，核心是_update方法

```js
vm._update(vm._render(), hydrating);
```

生成虚拟dom是使用了_render方法，`Vue.prototype._render`,_render其实就是调用render，然后生成虚拟dom：

```js
vnode = render.call(vm._renderProxy, vm.$createElement);
```

### 生成真实dom

生成真实dom是使用`Vue.prototype._update`，

```js
  var prevVnode = vm._vnode;//prevVnode,就是oldVnode。
  var restoreActiveInstance = setActiveInstance(vm);
  vm._vnode = vnode;//vnode是最新的虚拟dom。vm._vnode = vnode;把新的缓存，下次更新就是oldVnode
  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {//!prevVnode如果没有旧的，相当于是第一次渲染，直接更新，不用比对(initial render)
    // initial render
    //__patch__其实就是patch函数Vue.prototype.patch = inBrowser ? patch : noop;
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
```

延伸：

patch函数--







