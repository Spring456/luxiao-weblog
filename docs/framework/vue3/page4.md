## Vue3新的状态管理工具---Pinia

### 有vuex，为什么还要使用Pinia

其实Pinia就是vuex5.和vuex的区别在于：

1、支持options api和composition api两种写法

2、没有嵌套模块

3、支持typescript

4、自动代码分割

5、没有Mutations

 ### Pinia核心特性

 Pinia： State、Gettes、Actions(同步异步都支持)

 1、Pinia 没有 Mutations

 2、Actions 支持同步和异步

 3、没有模块的嵌套结构

 Pinia 通过设计提供扁平结构，就是说每个 store 都是互相独立的，谁也不属于谁，也就是扁平化了，更好的代码分割且没有命名空间。当然你也可以通过在一个模块中导入另一个模块来隐式嵌套 store，甚至可以拥有 store 的循环依赖关系

 4、不需要注入、导入函数、调用它们，享受自动补全，让我们开发更加方便

 5、无需手动添加 store，它的模块默认情况下创建就自动注册的

 6、模块热更新

 7、支持使用插件扩展 Pinia 功能

 8、支持服务端渲染

 ### Pinia使用

 一、安装和使用

 ```js
 npm install pinia
 ```

 2、在main.js中初始化

 ```js
import { createPinia } from 'pinia'
createApp(App).use(createPinia()).mount('#app')
 ```

 3、创建js使用

 在 store 目录下创建一个 user.js 为例，我们先定义并导出一个名为 user 的模块

 ```js
 import { defineStore } from 'pinia'
export const userStore = defineStore('user', {
    state: () => {
        return { 
            count: 1,
            arr: []
        }
    },
    getters: { ... },
    actions: { ... }
})
 ```

在这里，我们使用了`defineStore`函数，接收两个参数。

第一个参数就是模块的名称，必须是唯一的，多个模块不能重名，Pinia 会把所有的模块都挂载到根容器上
第二个参数是一个对象，里面的选项和 Vuex 差不多

其中 state 用来存储全局状态，它必须是箭头函数，为了在服务端渲染的时候避免交叉请求导致的数据状态污染所以只能是函数，而必须用箭头函数则为了更好的 TS 类型推导

getters 就是用来封装计算属性，它有缓存的功能

actions 就是用来封装业务逻辑，修改 state

### 访问state

比如我们要在页面中访问 state 里的属性 count

由于 defineStore 会返回一个函数，所以要先调用拿到数据对象，然后就可以在模板中直接使用了

如下这样通过 store.xxx 使用，是具备响应式的

```js
<template>
    <div>{{ store.count }}</div>
</template>
<script setup>
import { userStore } from '../store'
const store = userStore()
// 解构
// const { count } = userStore()
</script>
```
比如像注释中的解构出来使用，也可以用，只是这样拿到的数据不是响应式的，如果要解构还保持响应式就要用到一个方法 storeToRefs()，示例如下

```js
<template>
    <div>{{ count }}</div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import { userStore } from '../store'
const { count } = storeToRefs(userStore())
</script>
```
原因就是 Pinia 其实是把 state 数据都做了 reactive 处理，和 Vue3 的 reactive 同理，解构出来的也不是响应式，所以需要再做 ref 响应式代理

### getters

这个和 Vuex 的 getters 一样，也有缓存功能。如下在页面中多次使用，第一次会调用 getters，数据没有改变的情况下之后会读取缓存

