### $set()使用原因

受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 无法检测到对象属性的添加或删除。

由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以`属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的`。

对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。

所以需要使用到$set()方法向嵌套对象添加响应式的属性
### $set()原理解析

在上一篇文章中，我们知道了vue监听数据变化的原理，监听导致数组改变的方法，但某些方法能监听到但视图并不能更新。需要使用vue提供的$set()方法(官网用法：![$set](https://cn.vuejs.org/v2/api/#Vue-set))。今天来看看$set()方法的原理

### $set()原理

直接来看$set()这一块的源码吧,然后对照注释分析

源码位置: vue/src/core/observer/index.js

```js
export function set (target: Array<any> | Object, key: any, val: any): any {
  // 如果 set 函数的第一个参数是 undefined 或 null 或者是原始类型值，那么在非生产环境下会打印警告信息
  // 这个api本来就是给对象与数组使用的
  if (process.env.NODE_ENV !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(`Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`)
  }
  //判断target是不是数组，并且判断key值是否是有效的
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 对比数组的长度和key值，取最大值为数组的长度。 避免索引>数组长度导致splcie()执行有误
    target.length = Math.max(target.length, key)
    // 利用数组的splice方法替换目标值, 
    target.splice(key, 1, val)
    return val
  }
  //如果目标值是对象，key值存在于目标值上，并且不是原型上的key值，可以直接赋值
  //有兴趣可以看issue: https://github.com/vuejs/vue/issues/6845
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  // 以上都不成立, 即给目标值添加一个__ob__属性
  //__ob__ 会指向一个Observer对象，每个被双向绑定的对象元素（数组也是对象）都会有一个__ob__ ，而且是单例的
  // Observer实例中有vmCount属性，指向$data
  const ob = (target: any).__ob__
  // Vue 实例对象拥有 _isVue 属性, 即不允许给Vue 实例对象添加属性
  if (target._isVue || (ob && ob.vmCount)) { // 如果是vue根实例，就警告
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  // 如果目标值不是响应式的，直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  //目标值是响应式的，就通过Object.defineProperty进行数据监听
  defineReactive(ob.value, key, val)//defineReactive方法就是调用Object.defineProperty进行数据监听
  //通知更新dom操作
  ob.dep.notify()
  return val
}
```
通过stateMixin()方法注入到vue实例上

stateMixin()源码位置：vue/src/core/instance/state.js

```js
Vue.prototype.$set = set
Vue.prototype.$delete = del
```
$set()大致的流程就是：

1、判断是不是数组或对象，如果不是，则报错

2、判断是否为数组，并且key值是否是有效的key值

  (a)、如果是数组，就选择数组的长度和key值较大的为数组的长度

  (b)、使用splice方法重写数组并返回新数组，因此数据可以双向绑定

  (c)、如果是对象并且key值存在于目标值上，并且不是原型上的key值，可以直接赋值

3、如果以上都不是，就添加新属性_ob_

  (a)、如果是vue实例，则报错

  (b)、如果不是响应式的，则直接操作

  (c)、响应式数据，通过defineReactive方法调用Object.defineProperty进行数据劫持

4、订阅，通知dom更新

