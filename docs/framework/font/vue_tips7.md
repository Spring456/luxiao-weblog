### Vue.use()

在工作中，当我们elementUI,vue-router等vue插件时，我们会在main.js引入使用诸如：
```js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
```

然后我们在页面上就可以直接使用elementUI组件了，同时我们也可以直接使用组件里的`this.$message`，这时我们就要问了：为什么可以直接使用`this.$message`方法，这个this表示vue啊，但是在页面上也没看到挂载啊；

但是当我们使用axios时，我们要么在每个组件上都使用`import axios from axios`，要么在将axios挂载在vue实例上`vue.prototype.$axios=axios`，这样才行。这是为什么呢？

先来看看官网对Vue.use()的定义：

> 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。

> 该方法需要在调用 new Vue() 之前被调用。

> 当 install 方法被同一个插件多次调用，插件将只会被安装一次。

总结就是：Vue.use()就是用来注册安装类似于vue-router,elementUI插件的。这个插件要么是一个对象包含install方法，要么本身就是一个install方法。

所以Vue-router，elementUI,Vuex三者都具有install方法，并且插件的运行依赖于install方法里的一些操作，而axios没有install方法也能运行。

install方法到底做了什么事情呢？先来看看`Vue.use()`的源码

源码地址：  src/core/global-api/user.js

```javaScript
/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {//参数是函数或者对象
  // installedPlugins，获取已经安装的插件
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    // 如果已经安装，则返回.这就是多次调用同一个插件，插件只会注册一次
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // toArray方法在src/shared/util.js
    // 主要作用将类数组变成数组
    const args = toArray(arguments, 1)
    // 将vue添加到数组的第一位，保证第一个参数是vue实例
    args.unshift(this)
    // 如果插件是对象，对象包含install方法
    if (typeof plugin.install === 'function') {
      // 调用插件install方法，并传入vue实例
      plugin.install.apply(plugin, args)
      // 如果插件是函数，那走这里
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 将插件push到已经安装的插件中
    installedPlugins.push(plugin)
    // 返回vue实例
    return this
  }
}
```

看了上面的源码，`Vue.use()`其实就是做了两件事：

1、判断是否已经安装了插件，如果安装了就不再安装

2、如果没有安装，判断是函数还是对象，`对象调用install方法，函数直接使用并传入vue实例`。

所以我们可以得出结论：

elemnentUI、vue-router插件返回的是对象，里面有install方法；axios返回的函数，里面没有install方法。

来看看elementUI里面的install方法：

```javaScript
const install = function(Vue, opts = {}) {
  locale.use(opts.locale);
  locale.i18n(opts.i18n);
  //components是elementUI所有组件的数组
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.use(InfiniteScroll);
  Vue.use(Loading.directive);

  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  };
  // 将部分组件挂载在vue原型上，这就是我们可以直接使用this.$message的原因
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
};
```

上面的代码就很容易理解了。同时我们还发现，在install方法里，我们可以使用Vue.component同时加载多个组件。这样代码更简洁

axios是不需要`Vue.use()`就可以直接使用的，再来看看axios发送请求的源码：

在浏览器上发送请求的源码地址：Aixios/lib/adapters/xhr.js

源码太长，就不复制了。不过从源码上可以看出一个完整的Ajax库封装流程，只不过axios暴露了一个Promise出去，所以axios在浏览器端和Ajax底层的原理是一样的，都是通过浏览器的XMLhttpRequest这个底层接口进行的一次封装。返回的是一个函数，没有install方法。所以axios在vue上可以直接使用。

### 怎么编写一个插件？

**1、新建一个plugins文件夹,文件夹下新建index.js和index.vue两个文件**

index.vue

```Html
<template>
  <div>这是loading的页面</div>
</template>
```

index.js文件

```javaScript
import LoadingComponent from './index.vue'
const Loading = {
  install (Vue) {
    Vue.component('Loading', LoadingComponent)
    Vue.prototype.createSpan = (option) => {
      const parentDom = document.getElementById(option)
      const oSpan = document.createElement('span')
      oSpan.innerHTML = '这是用方法添加的span标签'
      oSpan.style.color = 'red'
      parentDom.appendChild(oSpan)
    }
  }
}
export default Loading
```
在这个js文件里，有一个install方法，引入index.vue组件，同时在vue原型上挂载了一个createSpan方法，用来添加一个span标签。

**2、在main.js中引入这个js文件**

```
import Loading from './plugins'
Vue.use(Loading)
```

**3、直接用在页面上使用**

```vue
<template>
  <div>
    <Loading></Loading>
    <div id="loading"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
    }
  },
  mounted () {
    this.loading('loading')
  }
}
</script>
```











