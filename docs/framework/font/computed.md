## vue原理(二)之computed的原理

### computed的作用

computed--计算属性。可以缓存结果，当他依赖的数据发生改变时，才会重新计算。否则就会沿用之前的数据。

computed关注的是数据的变化。

### 用法

```js
<template>
  <div class="home">
    <div>{{msg}}</div>
    <div>{{reverMsg}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'hello world',
    }
  },
  computed:{
    reverMsg(){
      return this.msg.split(' ').reverse().join(',')
    }
  }
}
</script>
```

以上面代码为例，使用computed时，需要注意以下几个要点：

1、computed监听定义的变量，该变量不用在data里面声明，直接在computed里面定义即可。

2、该变量是通过函数的形式执行。最后将结果值通过retrun的方式暴露出去使用。

3、监听的变量如果没有在data里面定义，是监听不到的。比如上面的msg如果没有在data上定义，是监听不到的。

### computed的特点

1、computed支持缓存，只有当它依赖的响应式数据更新，才会重新计算

2、computed不支持异步，当computed里面有异步操作时，无效，无法监听数据的变化。如果要异步操作，使用watch

### computed缓存原理

computed的实现是通过computed watcher。这个watcher不会立刻求值，而是通过`this.dirty`属性标记计算属性是否需要重新求值。通过`this.dep.subs.length`判断有没有订阅者。

如果有改变，就重新计算，比对新旧值，如果变化了，就重新渲染。vue中，不仅仅是计算属性依赖值发生改变，而是看最终的结果有没有发生改变，发生改变才触发watcher改变。这一步其实本质上也是一种优化

如果没有改变，就执行`this.dirty=true`。当计算属性依赖于其他数据时，属性并不会立即计算，只有其他地方需要读取属性的时候才会真正计算。

相比较watch的原理

watcher内部会收集data中属性对应的Dep（Dep中记录了哪些watcher访问了该变量），同时Dep也会收集该watcher，只要其中任意一个发生改变,watcher都会收到通知。而当我们在watcher中记录了自己订阅了哪些Dep之后，可以在teardown中通知这些Dep，让他们把wather从当前列表删除。

### computed和watch的区别和使用场景

**区别**

computed关注的是值的变化；watch关注的是值变化之后的操作。

omputed: 依赖其它属性值,并且 computed 的值有缓存,只有它依赖的属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。

watch: 更多的是观察的作用,无缓存性,类似于某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作

**使用场景**

当我们需要进行数值计算,并且依赖于其它数据时,应该使用 computed,因为可以利用 computed 的缓存特性,避免每次获取值时,都要重新计算。

当我们需要在数据变化时执行异步或开销较大的操作时,应该使用 watch,使用 watch 选项允许我们执行异步操作 ( 访问一个 API ),限制我们执行该操作的频率,并在我们得到最终结果前,设置中间状态。这些都是计算属性无法做到的。