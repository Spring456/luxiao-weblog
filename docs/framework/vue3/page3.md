## Vue3中8种组件通信方法

### Props方式

props通信方式也是最常见的一种父传子的一种方式。子组件通过`defineProps`来接收父组件传过来的值。父组件通过`:`来给子组件传值。

下面是一个demo

```js
// 父组件
<template>
  <!-- 子组件 -->
  <child-components :list="list"></child-components>
  <!-- 父组件 -->
  <div class="child-wrap input-group">
    <input
      v-model="value"
      type="text"
      placeholder="请输入"
    />
    <button @click="handleAdd" type="button">添加</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'
{/* 引入子组件 */}
import ChildComponents from './child.vue'
{/* 传给子组件的值 list */}
const list = ref(['JavaScript', 'HTML', 'CSS'])
 {/* 事件触发，子组件更新*/}
const handleAdd = () => {
  list.value.push(value.value)
}
</script>
```

子组件接收父组件传过来的值进行渲染。在vue3中使用`defineProps`方法接收父组件传过来的值

```js
<template>
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in props.list" :key="i">{{ i }}</li>
  </ul>
</template>
<script setup>
import { defineProps } from 'vue'
{/* 使用 defineProps 接收传过来的值，使用props.list获取到值*/}
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})
</script>
```

### emit 方式

edit方式，是子组件通过`defineEmits`事件的方式将值传给父组件，父组件渲染数据即可。

子组件：

```js
<template>
  <div>
    <input
      v-model="value"
      type="text"
      placeholder="请输入"
    />
    <div class="input-group-append">
      <button @click="handleSubmit" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
const value = ref('')
{/* 使用defineEmit，参数是数组形式，可以使用多个 */}
const emits = defineEmits(['add'])
{/* 子组件事件函数*/}
const handleSubmit = () => {
  {/* add是事件函数名 */}
  emits('add', value.value)
  value.value = ''
}
</script>
```

父组件通过事件接收

```js
<template>
  <!-- 父组件 -->
  <ul>
    <li v-for="i in list" :key="i">{{ i }}</li>
  </ul>
  <!-- 子组件 -->
  <child-components @add="handleAdd"></child-components>
</template>
<script setup>
import { ref } from 'vue'
import ChildComponents from './child.vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
{/* 通过事件接收父组件传过来的值value */}
const handleAdd = value => {
  list.value.push(value)
}
</script>
```

### v-model方式

v-model是Vue中一个比较出色的语法糖，就比如下面这段代码
```js
<Child-Component v-model:title="pageTitle"></Child-Component>
```
就是下面这段代码的简写形式

```js
<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

使用`v-model`，在父组件上能简写不少

子组件

```js
<template>
  <div>
    <input
      v-model="value"
      type="text"
    />
    <div>
      <button @click="handleAdd" type="button">添加</button>
    </div>
  </div>
</template>
<script setup>
import { ref, defineEmits } from 'vue'
const value = ref('')
const emits = defineEmits(['update:list'])
// 添加操作
const handleAdd = () => {
  let arr=[]
  arr.push(value.value)
  emits('update:list', arr)
  value.value = ''
}
</script>
```

在子组件中我们首先定义props和emits，然后添加完成之后emit指定事件。

`注：update:*是Vue中的固定写法，*表示props中的某个属性名。`

父组件

```js
<template>
  <!-- 父组件 -->
  <ul>
    <li v-for="i in list" :key="i">{{ i }}</li>
  </ul>
  <!-- 子组件 -->
  <child-components v-model:list="list"></child-components>
</template>
<script setup>
import { ref } from 'vue'
import ChildComponents from './child.vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
</script>
```

### refs方式

组合式API中就无法使用哪种方式获取。如果我们想要通过ref的方式获取组件或者元素，需要定义一个同名的Ref对象，在组件挂载后就可以访问了。

父组件

```js
<template>
  <ul>
    <li v-for="i in childRefs?.list" :key="i">
      {{ i }}
    </li>
  </ul>
   {/* 子组件 ref的值与<script>中的保持一致 */}
  <child-components ref="childRefs"></child-components>
  <!-- 父组件 -->
</template>
<script setup>
import { ref } from 'vue'
import ChildComponents from './child.vue'
const childRefs = ref(null)
</script>
```

子组件

```js
<template>
  <div>
    <input
      v-model="value"
      type="text"
    />
    <div>
      <button @click="handleAdd" type="button">添加</button>
    </div>
  </div>
</template>
<script setup>
import { ref,reactive, defineExpose } from 'vue'
const list = reactive([])
const value = ref('')
const handleAdd = () => {
  list.value.push(value.value)
  value.value = ''
}
defineExpose({ list })
</script>
```

### provide/inject方式

provide和inject是Vue中提供的一对API，该API可以实现父组件向子组件传递数据，无论层级有多深，都可以通过这对API实现。比较适合祖孙组件之间的传值

父组件

```js
<template>
  <!-- 子组件 -->
  <child-components></child-components>
  <!-- 父组件 -->
  <div>
    <input
      v-model="value"
      type="text"
    />
    <div>
      <button @click="handleAdd" type="button">
        添加
      </button>
    </div>
  </div>
</template>
<script setup>
import { ref, provide } from 'vue'
import ChildComponents from './child.vue'
const list = ref(['JavaScript', 'HTML', 'CSS'])
const value = ref('')
{/* 给子组件，孙组件传递数据,list1为事件名，在子组件，孙组件通过这个事件名接收*/}
provide('list1', list.value)
// add 触发后的事件处理函数
const handleAdd = () => {
  list.value.push(value.value)
  value.value = ''
}
</script>
```

子组件

```js
<template>
  <ul class="parent list-group">
    <li class="list-group-item" v-for="i in list" :key="i">{{ i }}</li>
  </ul>
</template>
<script setup>
import { inject } from 'vue'
{/*  通过list1事件名接收，接受父组件提供的数据 */}
const list = inject('list1')
</script>
```

`使用provide进行数据传递时，尽量readonly进行数据的包装，避免子组件修改父级传递过去的数据。`

### 事件总线方式

Vue3中移除了事件总线，但是可以借助于第三方工具来完成，Vue官方推荐mitt或tiny-emitter；

在大多数情况下不推荐使用全局事件总线的方式来实现组件通信，虽然比较简单粗暴，但是长久来说维护事件总线是一个大难题，所以这里就不展开讲解了，具体可以阅读具体工具的文档

### 状态管理工具

可以使用Vuex或Pinia这两个工具来实现组件通信
