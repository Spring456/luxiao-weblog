## vue原理(十)之keep-alive

### keep-alive的概念和用法

关于`keep-alive`组件的概念和用法请参考官网：[keep-alive](https://cn.vuejs.org/v2/api/#keep-alive)

总结下来就是：

3个属性：

* include - 字符串或正则表达式或数组。只有名称匹配的组件会被缓存。值是组件注册名称

* exclude - 字符串或正则表达式或数组。任何名称匹配的组件都不会被缓存。值是组件注册名称

* max - 数字。最多可以缓存多少组件实例。超过这个值，已缓存组件中最久没有被访问的实例会被销毁掉

两个生命周期:

* activated 

* deactivated 

**作用**:就是缓存组件。保留组件状态或避免重新渲染

**特点**：`<keep-alive>` 是一个抽象组件，它自身不会渲染一个DOM元素，也不会出现在父组件链中。

### 开发中使用<keep-alive>

`需求一：需要缓存的组件和不需要缓存的组件分开`

解决：在组件的路由配置的元信息中，meta中定义哪些需要缓存哪些不需要缓存。然后在<router-view>中判断

router中定义

```js
new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('./views/keep-alive/index.vue')
        },
        {
            path: '/list',
            name: 'list',
            component: () => import('./views/keep-alive/list.vue'),
            meta: {
                keepAlive: true //需要被缓存
            }
        },
        {
            path: '/detail',
            name: 'detail',
            component: () => import('./views/keep-alive/detail.vue')
        }
    ]
})
```

<router-view>中判断

```html
<keep-alive>
    <!-- 需要缓存的视图组件 -->
  <router-view v-if="$route.meta.keepAlive">
  </router-view>
</keep-alive>
​
<!-- 不需要缓存的视图组件 -->
<router-view v-if="!$route.meta.keepAlive">
</router-view>
```

**需求二：在缓存的组件中根据需要缓存特定的组件**

解决：使用include,动态修改include数组实现按需缓存组件

```js
export default {
  name: "app",
  data(){
    return:{
      include:[]
    }
  },
  watch: {
    $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
    }
  }
};
```
**需求三：在动态组件中使用**

```vue
<keep-alive :include="whiteList">
     <component :is="currentComponent"></component>
</keep-alive>
```
**需求四：根据不同页面入口来缓存组件**

假设现在A页面跳转到B页面，B页面跳转到C页面。数据需要缓存。从C页面跳转到A页面时，数据不需要缓存。使用`beforeRouteLeave钩子函数`动态设置`to.meta.keepAlive`

```js
export default {
    data() {
        return {};
    },
    methods: {},
    beforeRouteLeave(to, from, next) {
        // 设置下一个路由的 meta
        if(to.path=='A'&&from.path=='C'){
          to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
        }else if(to.path=='C'&&from.path=='B'){
          to.meta.keepAlive = true
        }
        next();
    }
};
```

**需求五：记录页面滚动位置**

<keep-alive>组件只会缓存数据，但并不会缓存页面滚动位置

所以我们在跳转时需要记录当前的滚动位置，在触发activated钩子时重新定位到原有位置。 具体设计思路：

在deactivated钩子中记录当前滚动位置，使用localStorage：
```js
deactivated () {
 window.localStorage.setItem(this.key, JSON.stringify({
 listScrollTop: this.scrollTop
 }))
}
```
在activated钩子中滚动：

```js
this.cacheData = window.localStorage.getItem(this.key) ？JSON.parse(window.localStorage.getItem(this.key)) : null
$('.box').scrollTop(this.cacheData.listScrollTop)
```

### 源码看<keep-alive>是如何缓存组件

源码地址：src/core/components/keep-alive.js

```js
const patternTypes: Array<Function> = [String, RegExp, Array]
export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,//只有匹配到的组件会被缓存
    exclude: patternTypes,//匹配到的组件都不会被缓存
    max: [String, Number]//组件的数量
  },

  methods: {
    // 缓存节点
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this
      // 判断有没有缓存节点
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        cache[keyToCache] = {
          name: getComponentName(componentOptions),
          tag,
          componentInstance,
        }
        // 将缓存的节点push到keys里
        keys.push(keyToCache)
        // prune oldest entry
        // 判断有没有超过缓存数量的最大值。有就清除掉最前面的那个
        if (this.max && keys.length > parseInt(this.max)) {
          //执行 pruneCacheEntry 对最少访问数据（数组的第一项）进行删除
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    }
  },

  created () {
    this.cache = Object.create(null)//初始化，cache用来缓存组件
    this.keys = []//初始化，缓存组件的key值，也就是cache里的key
  },

  // 组件退出时，调用pruneCacheEntry方法，清除所有的缓存组件
  // 在cacheVNode()函数中，超出最大数量，也会清除，使用的就是keys[0]
  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    // 初始化缓存节点
    this.cacheVNode()
    // 监听include和exclude的变化，执行pruneCache函数。
    // pruneCache函数对this.cache对象进行遍历，取出每一项的name值，用其与新的缓存规则进行匹配
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  updated () {
    this.cacheVNode()
  },
  // 实现缓存
  render () {
    // ...
  }
}
```

**1、函数式组件**

keep-alive.js最后就是export default一个对象，对象里面类似我们平时写的vue模板。生成template模板主要依靠的是render函数

**2、首先定义abstract，忽略某个组件**

在keep-alive中设置了`abstract:true`。Vue在初始化生命周期的时候，为组件实例建立父子关系会根据abstract属性决定是否忽略某个组件。`abstract`为true，表示忽略此组件实例，就不会创建真正的DOM节点了。

在组件初始化时判断了`abstract`。地址：src/core/instance/lifecycle.js

```js
export function initLifecycle (vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }
  // ...
```

**3、render函数**

从函数名和变量名来解析render函数到底做了什么事

```js
render () {
  // 首先拿到插槽下默认值
    const slot = this.$slots.default
    // 使用getFirstComponentChild获取第一个组件节点
    // <keep-alive>的vnode会被视为组件vnode 
    const vnode: VNode = getFirstComponentChild(slot)
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      // 使用getComponentName获取节点名称
      const name: ?string = getComponentName(componentOptions)
      const { include, exclude } = this
      // 将组件名称和include和exclude中的值匹配
      // 如果组件名称与 include 规则不匹配或者与 exclude 规则匹配，则表示不缓存该组件，直接返回这个组件的 vnode
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      // 获取组件的key值
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)//删除命中已存在的组件
        keys.push(key)//将当前组件名重新存入数组末端
      } else {
        // delay setting the cache until update
        this.vnodeToCache = vnode
        this.keyToCache = key
      }
    // 设置缓存的组件keepAlive为true，打上标记
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
  ```
  以上就是render函数的整个流程。render函数主要做了两件事：`缓存vnode和组件名称`。

  首先判断是否存在缓存，如果存在缓存，则直接从缓存中获取组件实例，

  如果不存在缓存，会将vnode作为值存入cache对象，并且将组件名称存入keys数组。

  ### 缓存优化---LRU策略

**LRU的核心思想是如果数据最近被访问过，那么将来被访问的几率也更高**

  ```js
  // make current key freshest
    remove(keys, key)//删除命中已存在的组件
    keys.push(key)//将当前组件名重新存入数组末端
  ```
  在render函数处理缓存组件的时候，先删除命中的组件，然后将组件push到keys末尾。如果组件数量超过存储的最大值max，则从头部删除。这执行的就是LRU缓存淘汰策略。

这样一来，keys数组的第一项永远就是最久没有访问过的组件实例。

### keep-alive的组件生命周期只执行一次

通常，组件被加载时，他的生命周期都会被加载一遍。但keep-alive包裹的组件为什么在第二次加载的时候mounted之前的生命周期就不会执行了呢？

这是因为：第一次加载的时候，将组件缓存下来并打上了标记:`vnode.data.keepAlive = true`

第二次加载组件的时候在初始化组件钩子函数中做了判断：初始化组件源码：src/core/vdom/create-component.js

```js
// src/core/vdom/create-component.js
const componentVNodeHooks = {
    init (vnode: VNodeWithData, hydrating: boolean): ?boolean{
        if (
         vnode.componentInstance &&       
         !vnode.componentInstance._isDestroyed &&
         vnode.data.keepAlive
        ) {
          // keep-alive components, treat as a patch
          const mountedNode:any = vnode
          componentVNodeHooks.prepatch(mountedNode, mountedNode)
        } else {
          const child = vnode.componentInstance = createComponentInstanceForVnode (vnode, activeInstance)
           
        }
    }
}
```

### activated和deactivated钩子函数

activated表示组件激活时调用

deactivated表示组件停用时调用

组件一旦被缓存，当再次进入时，就不会再执行mounted之前的所有钩子函数了（beforeCreate、created、mounted）

实际开发中，我们可以将一些状态值诸如滚动距离等在deactivated里保存，然后当再次进入时在activeated函数里再执行。

### 总结

1、<keep-alive>组件是vue的内置组件，组件是函数式形式，有自己的组件选项data,methods,mounted,prop,render等

2、<keep-alive>组件有3个属性，include，exclude，max；分别表示匹配的组件被缓存，匹配到的组件不被缓存，缓存组件的数量。2个生命周期：activated、deactivated分别表示组件激活时调用，组件停用时调用.如果include和exclude一起使用，exclude权限更高

3、<keep-alive>缓存组件，只是停用，并不是销毁。

4、<keep-aive>源码中有abstract属性，在组件初始化时判断可以跳过组件加载。

5、<keep-alive>源码中主要依靠render函数来缓存组件以及组件的key值。在组件初始化和调用组件实例时依靠有无这个key值来跳过mounted之前的生命周期

6、<keep-alive>依靠LRU缓存策略实现缓存最久的实例被最先删除。

### <keep-alive>原理总结

1、获取 keep-alive 包裹着的第一个子组件对象及其组件名

2、根据设定的 include/exclude（如果有）进行条件匹配,决定是否缓存。不匹配,直接返回组件实例

3、根据组件 ID 和 tag 生成缓存 Key,并在缓存对象中查找是否已缓存过该组件实例。如果存在,直接取出缓存值并更新该 key 在 this.keys 中的位置(更新 key 的位置是实现 LRU 置换策略的关键)

4、在 this.cache 对象中存储该组件实例并保存 key 值,之后检查缓存的实例数量是否超过 max 的设置值,超过则根据 LRU 置换策略删除最近最久未使用的实例（即是下标为 0 的那个 key）

5、最后组件实例的 keepAlive 属性设置为 true,这个在渲染和执行被包裹组件的钩子函数会用到



