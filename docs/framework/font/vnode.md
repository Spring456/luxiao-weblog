## vue原理之虚拟DOM

### 什么是虚拟DOM

虚拟DOM，没有找到官方定义，但可以从实现角度来描述什么是虚拟DOM

> 用JS对象来描述DOM节点，就是虚拟DOM

这是一个普通的标签：

```html
<div class="div">虚拟DOM</div>
```
使用js动态生成上面的标签

```js
window.onload = function(){
  var oDiv = document.createElement('div')
  oDiv.setAttribute('class', 'div')
  oDiv.innerText = '虚拟DOM'
  document.body.appendChild(oDiv)
}
```
如果使用JS对象来描述，使用别人封装的功能来实现。

```js
var oDiv = React.createElement('div', {
    className: 'div',
}, '虚拟DOM')
```

所有的html结构，都可以使用js-dom实现。将构造的过程封装起来，实现数据-dom数据的映射。就像上面的`React.createElement`就是封装了一种数据结构。最后将虚拟DOM生成真实DOM就可以被浏览器解析到了。

最后的本质依然使用的是`document.createElement()`这种原生JS方法来创建、修改、删除DOM的操作。

至于最后还是要使用`document.createElement()`,为什么不直接在页面上写，最后再来看这个问题。

### 为什么要使用虚拟DOM

先来看看一个普通的div上有哪些属性？

```js
window.onload = function(){
  var oDiv = document.getElementById('div')
  console.dir(oDiv)
}
```
使用`console.dir()`方法打印这个div,在控制台可以发现div上内容多且复杂，开发时只会用到其中某些方法。操作DOM就会导致回流重绘，影响性能。以前的JQ就是操作DOM来实现交互的。对于简单页面，简单数据结构来说，还可以。但是对于复杂系统，庞大数据，操作DOM就是一种繁琐且极影响性能的了。所以在性能优化上有一条就是避免频繁操作DOM，是有道理的。

为了解决这个问题，就产生了虚拟DOM。

### 虚拟DOM步骤

相对于操作DOM对象，使用原生的JS对象来处理就快的多，而且只操作数据，会更简单。

当状态变更的时候，也就是JS对象的数据变更了，重新渲染JS对象即可。但重新渲染了JS对象，照样还是会重新渲染一遍DOM结构。这只是改变了DOM节点生成的方式而已，本质上并没有两样。和虚拟DOM什么关系？

既然能使用JS对象来表现一个DOM节点，那么我们如果改变其中的某些值，我又生成一份JS对象，将这两份JS对象对比，查看数据变化前后的状态，看新的JS对象和旧的对象差别在哪里，哪些地方不需要更改，哪些地方需要增删改。找到这样的节点，只改变变化的节点，这样是不是就可以了呢。

通过JS对象模拟出的DOM节点，就是虚拟DOM。当数据发生改变时，我们对比前后两份虚拟DOM节点，更改其中的节点，更新改变的地方的视图。

虚拟DOM包括以下几个步骤：

1、首先用JS对象构建一个DOM树的结构(VNode)，然后用这个DOM树生成真正的DOM结构，生成文档。缓存这个VNode

2、当数据变更的时候，重新用一个新的JS对象构建新的DOM树(新的VNode)。

3、将新的DOM树和旧的DOM树(其实是两个JS对象)进行对比，记录差异

4、把差异应用到旧的DOM树上。更新视图

如何生成JS对象构建的DOM树，如何对比，如何将差异更新是下面要说的重点了。

### vue中的虚拟DOM —————— VNode类

VNode类，源码地址：src/core/vdom/index.js

```js
/* @flow */
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: ?Array<VNode>;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ?ComponentOptions; // for SSR caching
  devtoolsMeta: ?Object; // used to store functional render context for devtools
  fnScopeId: ?string; // functional scope id support

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag//当前节点的标签名
    this.data = data//当前节点的数据对象，具体包含哪些字段可以参考vue源码types/vnode.d.ts中对VNodeData的定义
    this.children = children//数组类型，包含了当前节点的子节点
    this.text = text// 当前节点的文本，一般文本节点或注释节点会有该属性
    this.elm = elm//当前虚拟节点对应的真实的dom节点
    this.ns = undefined//节点的namespace
    this.context = context// 编译作用域
    this.fnContext = undefined//函数式组件对应的Vue实例
    this.fnOptions = undefined//组件的option选项
    this.fnScopeId = undefined
    this.key = data && data.key//节点的key属性，用于作为节点的标识，有利于patch的优化
    this.componentOptions = componentOptions//创建组件实例时会用到的选项信息
    this.componentInstance = undefined//当前节点对应的组件的实例
    this.parent = undefined//当前节点的父节点
    this.raw = false//是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false
    this.isStatic = false//静态节点标志
    this.isRootInsert = true//是否作为根节点插入，被<transition>包裹的节点，该属性的值为false
    this.isComment = false//是当前节点是否是注释节点
    this.isCloned = false//当前节点是否为克隆节点
    this.isOnce = false//当前节点是否有v-once指令
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }
```
通过注释整理一下,VNode这个类上的属性。

VNode这个类是所有虚拟DOM的基类，通过new实例化的VNode有以下几种。

* 注释节点
* 文本节点
* 元素节点
* 组件节点
* 克隆节点

vue源码里列出了几个实例化的节点，下面有一些函数表示节点的类型

```js
// 创建注释节点
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
// 创建文本节点
export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}
// 优化浅拷贝
// optimized shallow clone
// 用于静态节点和插槽节点，因为它们可以跨多个应用程序重用
// used for static nodes and slot nodes because they may be reused across
// 在多个渲染中，克隆它们可以避免DOM操作时出现错误
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
// 克隆节点
export function cloneVNode (vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  cloned.isCloned = true
  return cloned
}
```
在vnode/index里只列出了3种节点的实例。还有元素节点，组件节点以及函数式组件节点没有用实例表现。因为这3类组件的形式不能固定，里面嵌套的属性未知，所以没有列出。只是在不同类型节点上有不同的属性。

* 组件节点

组件节点除了有元素节点的属性外，还有两个特有属性。

```js
componentOptions//组件的option选项，如组件的props等
componentInstance//当前组件节点对应的Vue实例
```

**VNode类的作用**

VNode类的作用就是用来对比前后两个VNode的差异。第一次渲染DOM时，缓存一份。等数据改变时，再缓存一份，然后对比这两份VNode，其中有差异的VNode对应真实的VNode节点就是需要重新渲染的节点。最后根据有差异的VNode创建出真实的DOM节点插入视图中，视图更新，就只需要更新有差异的地方。


### patch原理

上面说了虚拟DOM其实就是对比新旧VNode，有差异的地方就是需要更改的地方。那么，对比新旧VNode并找出差异的地方就是vue里的DOM-diff的过程。技术上，DOM-diff算法是虚拟DOM的核心。

在vue中，DOM-diff过程也叫作patch过程。在对比新旧VNode并找出差异的过程中，以新的VNode为准，改造旧的VNode和新的VNode保持一致。patch过程主要就是做这3件事：

1、创建节点：如果`oldVnode`不存在，但`vnode`存在，就创建节点

2、删除节点：如果`vnode`不存在，但`oldVnode`存在，就销毁`oldVnode`中的节点。

3、更改节点：如果`vnode`和`oldVnode`节点都存在，以新的`vnode`为准，改造`oldVode`


### 源码分析

源码地址：src/core/vdom/patch.js

首先来看看patch函数。patch函数接收4个参数。

* `oldVode`:旧的虚拟节点

* `vnode`:新的虚拟节点

* `hydrating`:是否需要和真的DOM合并

* `removeOnly`: 特殊flag，用于`<transition-group>`组件

函数里面其实就是各种判断，然后调用不同的函数。函数有：

`invokeDestroyHook(oldVnode)`:如果新节点不存在，但旧节点存在，就销毁旧的节点。

`createElm(vnode, insertedVnodeQueue)`：如果新节点存在，但旧节点不存在，就创建节点

`sameVnode`:对比两个节点是否是同一个节点。对比的项有key,tag,是否是注释，input框等

`patchVnode`:如果是同一个节点，就调用

`removeVnodes`:删除旧的节点

`invokeInsertHook`:组件完成调用该方法，循环通过insert方法依次调用收集的hook，在insert方法中就会触发mounted

依照顺序对各类函数进行分析

**invokeDestroyHook---销毁旧节点**

```js
function invokeDestroyHook (vnode) {
  let i, j
  const data = vnode.data
  if (isDef(data)) {
    if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode)
    for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode)
  }
  if (isDef(i = vnode.children)) {
    for (j = 0; j < vnode.children.length; ++j) {
      invokeDestroyHook(vnode.children[j])
    }
  }
}
```
当`vnode`没有节点，但`oldVnode`有这个节点，就调用该方法。通过递归调用删除节点及节点。

**createElm---新建节点**









