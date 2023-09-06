## vue中的组件

![vue组件](../../media/Vue%E7%BB%84%E4%BB%B6.png)

### 组件注册方式

**一、全局注册---一次注册，全局使用。单个文件不用再次引入**

全局注册可以有这几种形式：作为插件注册、作为单文件注册、作为扩展注册

语法：

```js
Vue.component(组件名称, {
    data: 组件数据,
    template: 组件模板内容
})
```

新建一个`c-button`组件

```vue
<template>
  <div class="c-button">
    <el-button :type="type">{{ btnName }}</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'primary',
      btnName: '提交'
    }
  }
}
</script>
```

**1、作为单文件注册**

直接在main.js中引入使用即可

```js
import cBtns from "@/components/c-button";
Vue.component("cBtn", cBtns);
```

在其他上使用<cBtn></cBtn>直接使用即可。

**2、作为插件注册**

作为插件，需要用到Vue.use()注册

在util文件夹下新建cBtn.js文件

```js
import CBtns from "@/components/c-button";
const cBtn = {
  install(Vue) {
    Vue.component("cBtn", CBtns);
  }
};
export default cBtn;
```

在main.js里引入：

```js
import cBtn from "./utils/cBtn.js";
Vue.use(cBtn);
```

**3、作为扩展引入---使用Vue.extend()方法**

Vue.extend()方法可以将任何组件挂载到某一个元素下。

将上面的c-button组件插入到某个元素下。

```vue
<script>
import Vue from 'vue'
import cButton from '@/components/c-button.vue'
export default {
  data() {
    return {}
  },
  mounted() {
    this.showDialog({
      type: 'success',
    })
  },
  methods: {
    showDialog(options) {
      const cBtn = Vue.extend(cButton)
      // 创建一个子类
      const app = new cBtn().$mount(document.createElement('div'))
      for (let key in options) {
        app[key] = options[key]
      }
      // 将组件插入到id为home的元素下
      var OHome = document.getElementById('home')
      OHome.appendChild(app.$el)
    },
  },
}
</script>
```

使用Vue.extend()方法可以将任何组件插入到想要挂载到的任何元素下。非常灵活.

**二、局部注册**

局部注册的组件，需要对子组件进行修改，修改成可以和父组件相互传值的形式。而且只能在当前页面上使用，需要`引入，注册，使用步`骤。

子组件--c-button

```vue
<template>
  <div class="c-button">
    <el-button :type="type">按钮</el-button>
  </div>
</template>

<script>
export default {
  props:{
    type:{
      type:String,
      default:'primary'
    }
  },
  data(){
    return{
    }
  }
}
</script>

<style>
</style>
```

父组件：子组件局部引入

```vue
<template>
  <div class="home">
    <cButton :type="type"></cButton>
  </div>
</template>

<script>
// 注册
import cButton from '@/components/c-button.vue'
export default {
  components: { cButton },//局部引入
  data() {
    return {
      type: 'success',
    }
  },
  mounted() {},
  methods: {},
}
</script>
```

### 组件的传值方法

组件的传值方法，有7种之多。分为父子组件传值、兄弟组件传值。

**1、父子组件传值————props和$emit**

还是上面的例子。局部注册组件后，父组件组件向子组件传值`type:'success'`,子组件在props里接收这个值。

父组件对这个变量进行赋值，子组件通过props的方式接收这个值；子组件通过$emit方法向父组件传值，父组件通过`@事件名`接收子组件传过来的值。

子组件：

```vue
<template>
  <div class="c-button">
    <el-button :type="type" @click="btn">{{name}}</el-button>
  </div>
</template>

<script>
export default {
  props:{
    // 从父组件传过来的值
    type:{
      type:String,
      default:'primary'
    },
  },
  data(){
    return{
      name:'提交'
    }
  },
  methods:{
    btn(){
      this.name='保存'
      this.$emit('oBtn',this.name)//子组件修改了值，用this.$emit传给父组件
    }
  }
}
</script>
<style>
</style>
```

父组件

```vue
<template>
  <div class="home">
    <cButton :type="type" @oBtn='oBtn'></cButton>
    <p>{{msg}}</p>
  </div>
</template>

<script>
import cButton from '@/components/c-button.vue'
export default {
  components: { cButton },//局部引入
  data() {
    return {
      type: 'success',//传给子组件的值
      msg:''
    }
  },
  mounted() {},
  methods: {
    oBtn(e){//接收子组件传过来的值
      this.msg = e
    }
  },
}
</script>

<style>
</style>
```

**2、通过$refs传值**

在父组件可以使用$refs获取到子组件的实例，进而可以获取子组件的属性或调用子组件的方法。

假设子组件上有个child方法，在父组件上通过按钮调用这个方法，改变button的值。

```vue
<template>
  <div class="home">
    <cButton :type="type" @oBtn="oBtn" ref="childBtn"></cButton>
    <el-button @click="btns">按钮</el-button>
  </div>
</template>
<script>
import cButton from '@/components/c-button.vue'
export default {
  components: { cButton }, //局部引入
  data() {
    return {
      type: 'success',
      msg: '',
    }
  },
  mounted() {},
  methods: {
    oBtn(e) {
      this.msg = e
    },
    btns() {
      // this.$refs.childBtn获取子组件的实例，
      // 调用子组件的msg的方法，并向其传值
      this.$refs.childBtn.msg('信息')//
    },
  },
}
</script>
```

**3、vuex传值**

**4、通过事件总线传值---eventBus**

eventBus称为事件总线，可以用做各个组件之间的传值。原理就是创建一个vue实例，通过绑定在实例上的$on,$emit,$off来实现传值，接收，销毁事件。

但如果使用过多的话，会导致维护起来麻烦。

* a、在入口main.js中的vue实例对象上注册

```js
beforCreated(){
  vue.prototype.$bus = this
}
```

* b、通过$emit传值

```js
this.$bus.$emit('事件名',值)
```

* c、通过`this.$bus.$on`接收值，通过`this.$bus.$off`清除事件

```js
mounted(){
  this.$bus.$on('事件名',function(data){
    console.log(data)
  })
}
beforDestory(){
  this.$bus.$off('事件名')
}
```

**5、this.$parent和this.$children传值**

在子组件文件里使用`this.$parent`可以获取到父组件的实例,进而可以调用父组件上的方法或属性；在父组件中使用`this.$children`可以获取到子组件实例。

`this.$children`获取到的是一个数组，使用时需判断是哪个。


**6、provide和inject传值**

上面$parent可以让子组件访问父组件实例，如果一个孙组件访问祖先组件要么就一层一层的挂载相应的事件，比较麻烦，通过provide/inject就可以轻松实现跨级访问祖先组件的数据。

provide和inject需要一起使用，允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深。常用于开发嵌套组件业务或者组件库中使用。

provide 选项是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性

inject选项可以是字符串，数组或对象


### 动态组件

vue提供了一个内置的`<component>`组件，专门用来实现动态组件的渲染，通过`:is`属性动态的来指定需要渲染哪个组件

新建一个父组件：`parent`;两个子组件：`child1`和`child2`。使用`<component>`来动态加载

```vue
<template>
  <div class="parent">
    <component :is="componentName"></component>
    <el-button @click="comBtn">切换</el-button>
  </div>
</template>
<script>
import child1 from './child.vue'
import child2 from './child2.vue'
export default {
  name: '',
  components: { child1, child2 },
  data() {
    return {
      componentName: 'child1',
    }
  },
  mounted() {},
  methods: {
    // 切换两个子组件
    comBtn(){
      this.componentName == 'child2'?this.componentName = 'child1':this.componentName = 'child2'
    }
  },
}
</script>
```

1、动态组件的传值

绑定在`<component>`组件上的动态属性可以被所有子组件共享。

```vue
<template>
  <div class="parent">
    <component :is="componentName" :name='name' @childMsg='childMsg'></component>
    <el-button @click="comBtn">切换</el-button>
  </div>
</template>

<script>
import child1 from './child.vue'
import child2 from './child2.vue'
export default {
  name: '',
  components: { child1, child2 },
  data() {
    return {
      componentName: 'child1',
      name:''
    }
  },
  mounted() {},
  methods: {
    childMsg(n){
      this.name = n
    },
    comBtn(){
      this.name = '小明'
      this.componentName == 'child2'?this.componentName = 'child1':this.componentName = 'child2'
    }
  },
}
</script>
```
还是上面的例子，给`<component>`上绑定了一个name值，这个name值能够被子组件`child1`和`child2`获取到。

同时，在子组件使用`$emit`传值，我们在`<component>`上照样也可以获取到。这里就相当于父子组件传值了


### 内置组件--<keep-alive>

<keep-alive>组件作用就是缓存组件。特别适合在动态组件上。

详情：[keep-alive](../vue/keepalive.md)

### 异步组件

异步组件通过`import()`方法按需加载组件。能大大节省时间。

### 组件的生命周期

1、单文件的生命周期

```js
beforCreate --> created --> beforMount --> mounted --> beforUpdate --> updated --> beforDetory --> detoryed
```

2、有父子组件时

`渲染阶段：`

父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted

`更新阶段:`

父beforeUpdate->子beforeUpdate->子updated->父updated  

`销毁阶段：`

父beforeDestroy->子beforeDestroy->子destroyed->父destroyed








