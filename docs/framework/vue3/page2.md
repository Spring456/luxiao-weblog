### vue3写法上的一些变化

### 定义变量

在vue3中，定义变量有两种方法，通过`ref`，`reactive`

ref---主要是针对基本数据类型

reactive---主要是针对对象类型

ref如果传入的是引用类型，内部源码也是调用reactive来实现的

```js
<template>
  <div></div>
  <script setup>
    import {ref} from 'vue'
    let count = ref(0)
    let str = ref('admin')
    let flag = ref(false)
    let obj = reactive({name:'admin'})
  </script>
</template>
```

如果想对上面的诸如count,str,flag进行操作，需要使用其value属性。

```js
<template>
  <div @click='add'></div>
  <script setup>
    import {ref} from 'vue'
    let count = ref(0)
    let str = ref('admin')
    let flag = ref(false)
    let obj = reactive({name:'admin'})
    function add(){
      count.value++
    }
  </script>
</template>
```
这是因为，通过ref定义的数据，其实将定义的数据放到一个对象的value属性上，然后通过对象本身的gethe set方法拦截value属性。所以通过ref定义的数据，赋值和取值的时候都要通过xxx.value来操作。

通过reactive定义的数据，可以直接使用，因为其使用的就是proxy代理方法来实现的。

### creatApp的变更

在vue2中，全局公用一个vue根实例，所有的全局操作都是在这个vue实例上进行，最后将根实例渲染到帮到你的页面DOM上。像我们使用的全局指令，全局配置都会被共享。全局对象被共享是一件非常危险的事情，很容易与其他模块定义的全局变量产生冲突。

在vue3中增加了一个新的全局Api---createApp

```js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app');
```

现在我们想要在一个App上引入store，就可以使用下面的写法

```js
import store from "./store";

createApp(App).use(store).mount('#app');
createApp(App2).mount('#app2');
```

这样就达到了只在App实例上添加了store，而不会影响App2。

### vue3中的import导入

在vue2中，有些常用的api会被直接挂载到vue对象上，方便我们使用，比如：$set,$delete,$nextTick,watch等等。现在这些在vue3中都被废弃了，如果想使用这些api,需要通过import方式引入使用。比如

```js
import {ref,reactive,nextTick,watchEffect} from 'vue'
```

这样做的好处就是按需加载，在Vue2的Api中，都是挂载在Vue下面，那么在打包的时候，会不管你有没有使用到这个Api，都会一起打包进去，如果都是这样，随着Vue的全局Api越来越多，冗余的代码也就越多，打包的耗时、体积或者说代价也就越大。

在Vue3中，通过import导入Api来使用，那我们在打包的时候，则只会将对应的模块打包进去，做到真正的用了多少就打包多少，就算Vue中再增加多少代码，也不会影响我们打包的项目

### 获取this

在vue2中，在每个组件里都可以使用this，指向的是当前组件的实例，this上还可以挂载全局的东西，比如路由，状态管理，自定义的一些东西。

在vue3中，没有this，如果想使用类似的，有两种办法：一是获取当前组件实例；二是获取全局实例

```js
<script setup>
import { getCurrentInstance } from 'vue'

 {/* proxy 就是当前组件实例，可以理解为组件级别的 this，没有全局的、路由、状态管理之类的 */}
const { proxy, appContext } = getCurrentInstance()

 {/* 这个 global 就是全局实例 */}
const global = appContext.config.globalProperties
</script>
```

### 全局注册的属性或方法

在vue2中，我们可以往全局上挂载东西，然后在所有组件中都可以使用this.xxx的方法获取。比如我们将插件qs挂载到全局,在其他组件中，我们可以使用`this.$qs`

```js
import Vue form 'vue'
import QS from 'qs'
Vue.prototype.$qs=QS
```

在vue3中，就没有这样的用法了，换成了一个能被所有组件访问到的全局对象，就是上面说的全局实例的对象。

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

app.config.globalProperties.name = 'admin'
```

这样在全局实例上添加了一个name属性，叫admin，在其他组件中使用，

```js
<script setup>
import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance()

const global = appContext.config.globalProperties
console.log(global.name) // admin
</script>
```

### 获取DOM

在vue2中，我们可以在html上使用ref关键字，然后在js部分使用`this.$refs`来获取DOM结构。

在vue3中，获取DOM实例有两个办法

```js
<template>
    <el-form ref="formRef"></el-form>
    <child-component />
</template>
<script setup lang="ts">
import ChildComponent from './child.vue'
import { getCurrentInstance } from 'vue'

 {/* 方法一，这个变量名和 DOM 上的 ref 属性必须同名，会自动形成绑定 */}
const formRef = ref(null)
console.log(formRef.value) // 获取 DOM 

{/* // 方法二 */}
{/* 先获取到组件实例，然后通过组件实例的$refs，去获取对应的DOM */}
const { proxy } = getCurrentInstance()
proxy.$refs.formRef.validate((valid) => { ... })
</script>
```

### 解除绑定

清除定时器，监听的操作，在vue2中可以使用$once和BeforeDestroy使用，或者在钩子函数beforeDestroy / deactivated中操作。vue3中也是在钩子函数中操作，只不过换了名字

```js
<script setup>
import { onBeforeUnmount, onDeactivated } from 'vue'

 {/* 组件卸载前，对应 Vue2 的 beforeDestroy */}
onBeforeUnmount(() => {
    clearTimeout(timer)
    window.removeAddEventListener('...')
})

{/* 退出缓存组件，对应 Vue2 的 deactivated */}
onDeactivated(() => {
    clearTimeout(timer)
    window.removeAddEventListener('...')
})
</script>
```

### toRef 和 toRefs

这两共同点就是用来创建响应式的引用的，主要用来取出响应式对象里的属性，或者解构响应式对象，解构出来的属性值依然是响应式属性，如果不用这两直接解构的话是会丢失响应式效果的

主要就是方便我们使用直接变量 xxx，而不需要 data.xxx。并且我们修改 xxx 的时候也是直接修改源对象属性的

区别就是，取一个和取多个

```js
<script setup>
import { reactive, toRef, toRefs } from 'vue'

const data = reactive({
    name: 'admin',
    age: 18
})

 {/* 这样虽然能拿到 name / age，但是会变成普通变量，没有响应式效果 */}
const { name, age } = data

 {/* 取出来一个响应式属性 */}
const name = toRef(data, 'name')

 {/* 这样解构出来的所有属性都是有响应式的 */}
const { name, age } = toRefs(data)
{/* 这样修改，会修改data里的name值，实现响应式 */}
name.value = 'adminadmin'
</script>
```

### watch的用法

在vue2中，watch是用来监听一个已有属性，发生变化的时候做某些操作。有3种写法：

```js
watch: {
    userId: 'getData',
    userName (newName, oldName) {
        this.getData()
    },
    userInfo: {
        handler (newVal, newVal) { this.getData() },
        immediate: true,
        deep: true
    }
}
```

在vue3中，watch是一个函数，而且可以有多个同时存在。能接受3个参数，第一个参数是监听的属性，第二个是接收新值和老值的回调函数，第三个参数是配置项.

```js
<script setup>
import { watch, ref, reactive } from 'vue'

const name = ref('admin')
const data = reactive({
    age: 18,
    sex: '男',
    children: []
})

 {/* 监听 ref 属性 */}
watch(name, (newName, oldName) => { ... })

 {/* 监听其他属性、路由或者状态管理的都这样 */}
watch(
    () => data.age, 
    (newAge, oldAge) => { ... }
)

 {/* 监听多个属性，数组放多个值，返回的新值和老值也是数组形式 */}
watch([data.age, data.sex], ([newAge, newSex], [oldAge, oldSex]) => { ... })

 {/* 第三个参数是一个对象，为可配置项，有5个可配置属性 */}
watch(data.children, (newList, oldList) => { ... }, {
    immediate: true,
    deep: true,
    // 回调函数的执行时机，默认在组件更新之前调用。更新后调用改成post
    flush: 'pre', // 默认值是 pre，可改成 post 或 sync
    // 下面两个是调试用的
    onTrack (e) { debugger }
    onTrigger (e) { debugger }
})
</script>
```

### watchEffect

vue3中新增了一个方法---watchEffect，与watch的区别是

watch 是对传入的一个或多个值进行监听，触发时会返回新值和老值，且默认第一次不会执行

watchEffect 是传入一个立即执行函数，所以默认第一次就会执行，且不需要传入监听内容，会自动收集函数内的数据源作为依赖，当依赖发生变化时会重新执行函数(有点像computed的味道)，而且不会返回新值和老值

清除副作用和副作用的刷新时机是一样的，区别是 watch 中会作为回调的第三个参数传入，watchEffect 中是回调函数的第一个参数

正常情况下组件销毁/卸载后这两都会自动停止监听，但也有例外，比如异步的方式，在 setTimeout 里创建的监听就都需要手动停止监听

watchEffect的用法

```js
<script setup>
import { watchEffect } from 'vue'

 {/* 正常使用 */}
watchEffect(() => {
    // 会自动收集这个函数使用到的属性作为依赖，进行监听
    // 监听的是 userInfo.name 属性，不会监听 userInfo
    console.log(userInfo.name)
})

{/* 有两个参数，参数一是触发监听回调函数，参数二是可选配置项 */}
watchEffect(() => {...}, {
    // 这里是可配置项，意思和 watch 是一样的，不过这只有3个可配置的
    flush: 'pre',
    onTrack (e) { debugger }
    onTrigger (e) { debugger }
})

 {/* 回调函数接收一个参数，为清除副作用的函数，和 watch 的同理 */}
watchEffect(onInvalidate => {
    onInvalidate(() => {
        console.log(2222)
    })
})
</script>
```

在setTimeout创建的监听手动停止监听的用法

```js
// 监听方法赋值
const unwatch = watch('key', callback)
const unwatchEffect = watchEffect(() => {})
// 需要停止监听的时候，手动调用停止监听
unwatch()
unwatchEffect()
```

watchEffect 如果需要修改配置项 flush 为 post 或 sync 时，可以直接使用别名

```js
watchEffect(() => {...}, {
    flush: 'post',
})
// 和下面这个是一样的
watchPostEffect(() => {})
-----------------------------
watchEffect(() => {...}, {
    flush: 'sync',
})
// 和下面这个是一样的
watchSyncEffect(() => {})
```

### computed的用法

vue2中，computed使用场景一般有： mapGetters/mapState 获取状态管理的属性、 获取 url 上的属性、条件判断、类型转换之类的，支持函数和对象两种写法

Vue3 中 computed 不再是一个对象，而是一个函数，用法其实基本差不多，函数第一个参数是侦听器源，用于返回计算的新值，也支持对象写法，第二个参数可用于调试

```vue
<script setup>
import { computed } from 'vue'
const props = defineProps(['visible', 'type'])
const emit = defineEmits(["myClick"])

 {/* 函数写法，计算类型 */}
const isFirst = computed(() => props.type === 1)

 {/* 对象写法 */}
const status = computed({
    get () { return props.visible }, // 相当于 Vue2中的 this.visible
    set (val) { emit('myClick', val) } // 相当于 Vue2中的 this.$emit('input', val)
})

 {/* computed 第二个参数也是一个对象，可以进行调试 */}
const hehe = computed(isFirst, {
    onTrack (e) { ... }
    onTrigger (e) { ... }
})
</script>
```

### nextTick的用法

vue3中的nextTick和vue2中的用法一样，除了不能使用this

```js
<script setup>
import { nextTick} from 'vue'

// 方式 一
const handleClick = async () => {
  await nextTick()
  console.log('admin')
}

// 方式二
nextTick(() => {
    console.log('admin')
})

// 方式三
nextTick().then(() => {
    console.log('admin')
  })
</script>
```

### 多个v-model的使用

vue2中，每个组件只能写一个v-model，vue3中每个组件上可以写多个 v-model，没有了 .sync 和 model 重命名的操作，也不需要了，写v-model 的时候就需要把命名一起写上去了

```js
// 父组件写法
<template>
    <child v-model:name="name" v-model:age="age" />
</template>
<script setup>
import { ref } from "vue"
const name = ref('admin')
const age = ref(18)
</script>

// 子组件
<script setup>
const emit = defineEmits(['update:name', 'update:age'])

const handleClick = () => {
    emit('update:name', '改变了')
}
</script>
```

### 路由的写法

使用vue-router 4,主要就是使用useRoute, useRouter这两个函数

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
const app = createApp(App)
app.use(Router)
...

// router/index.js
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// 这个 routes 数组里面就和 vue2 一样写
const routes = [  // ts版这行就是 const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: { name: 'login' } }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // 项目没用这个就不传
  routes
})
export default router

// 需要用到路由的 .vue 文件里
<script setup>
import { useRoute, useRouter } from "vue-router"
 {/* route 对应 Vue2 里的 this.$route */}
const route = useRoute()
 {/* router 对应 Vue2 里的 this.$router */}
const router = useRouter()
</script>
```

### vue3中使用css绑定js变量

在vue3中，可以使用`v-bind`来绑定js的变量

```js
<template>
    <div class="name">沐华</div>
</template>
<script setup>
import { ref } from "vue"
const str = ref('#f00') // 红色
</script>
<style scoped lang="scss">
.name {
    background-color: v-bind(str); // JS 中的色值变量 #f00 就赋值到这来了
}
</style>
```

