## vue组件递归

### 简单写法

核心思想：递归组件需要循环自身，其中要先定一个name属性，这个属性和组件里面遍历的组件名称保持一致。使用判断，判断组件循环的条件。一般是判断有没有children

子组件中还需要通过props接收父组件传过来的值，一般是一个数组形式。

**子组件的写法**

```vue
<template>
  <ul>
    <li v-for="item in data" :key="item.id">
      {{ item.name }}
      <DefaultTree v-if="item.children" :data="item.children"></DefaultTree>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DefaultTree',
  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
```

比如上面就是一个简单的子组件，重要的就是子组件的name值和上面template中循环的组件名称是一致的。

**父组件的写法**

```vue
<template>
  <div id="app">
    <DefaultTreeVue :data="data"></DefaultTreeVue>
  </div>
</template>

<script>
import DefaultTreeVue from './components/defaultTree.vue'
export default {
  name: 'App',
  components: {
    DefaultTreeVue,
  },
  data() {
    return {
      data: [
        {
          name: 1,
          id: 1,
          children: [
            {
              name: 11,
              id: '1-1',
            },
          ],
        },
        {
          name: 2,
          id: 2,
        },
        {
          name: 3,
          id: 3,
        },
      ],
    }
  },
}
</script>
```

父组件的写法就相对简单多了，就是传值即可。

如果想做的更加复杂点，就需要在子组件中添加事件，折叠树形。

### 渲染函数的写法

