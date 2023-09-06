
## vue最佳实践
### watch的immediate属性有什么用？

>使用watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数(比如在created时请求数据，在搜索词改变也要请求数据时)，则就需要用到immediate属性。 

```
created(){
  this.getList()
},
watch: {
  searchInputValue(){
    this.getList()
  }
}
```
>使用immediate属性，我们可以这样写
```
watch: {
  searchInputValue:{
    handler: 'getList',
    immediate: true
  }
}
```
immediate:true代表如果在 wacth 里声明了 viewDetials之后，就会立即先去执行里面的handler方法，如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行

### vue的hook的使用

### 在同一组件中使用定时器并销毁的时候

我们在组件中使用定时器时，在组件销毁的时需要清除掉定时器，可以这样写

```
export default{
  data(){
    timer:null  
  },
  mounted(){
      this.timer = setInterval(()=>{
      //具体执行内容
      console.log('1');
    },1000);
  }
  beforeDestory(){
    clearInterval(this.timer);
    this.timer = null;
  }
}
```

上面的写法不好的在于要声明一个全局变量timer，如果使用hook可以这样写

```
export default{
  methods:{
    fn(){
      const timer = setInterval(()=>{
        //具体执行代码
        console.log('1');
      },1000);
      this.$once('hook:beforeDestroy',()=>{
        clearInterval(timer);
        timer = null;
      })
    }
  }
}
```

使用this.$once清除定时器就方便多了

### 父子组件使用，子组件调用父组件方面的时候

>如果我们想在子组件初始化的时候就调用父组件方法，通常在子组件的mounted中使用this.$emit

```
//父组件
<child @childMounted="childMountedHandle" />
method () {
  childMountedHandle() {
  // do something...
  }
},

// 子组件
mounted () {
  this.$emit('childMounted')
},
```

>使用hook的话可以更方便：

```
//父组件
<child @hook:mounted="childMountedHandle" />
method () {
  childMountedHandle() {
  // do something...
  }
},
```

### vue动态指令和参数的使用

使用中括号将变量框起来即可

```
<template>
    ...
    <aButton @[someEvent]="handleSomeEvent()" :[someProps]="1000" />...
</template>
<script>
  ...
  data(){
    return{
      ...
      someEvent: someCondition ? "click" : "dbclick",
      someProps: someCondition ? "num" : "price"
    }
  },
  methods: {
    handleSomeEvent(){
      // handle some event
    }
  }  
</script>
```

### vue中相同的路由如何重新渲染

> 在vue中，多个路由解析为同一个Vue组件。问题是，Vue出于性能原因，默认情况下共享组件将不会重新渲染，如果你尝试在使用相同组件的路由之间进行切换，则不会发生任何变化

```
const routes = [
  {
    path: "/a",
    component: MyComponent
  },
  {
    path: "/b",
    component: MyComponent
  },
];
```

>如果依然想重新渲染，怎么办呢？可以使用key

```
<template>
    <router-view :key="$route.path"></router-view>
</template>
```

### props自定义校验

在子组件的props中可以使用validator来进行自定义校验

```js
props: {
    num: {
      default: 1,
      validator: function (value) {
          // 返回值为true则验证不通过，报错
          return [
            1, 2, 3, 4, 5
          ].indexOf(value) !== -1
    }
    }
  }
```

### 缓存架构

缓存--资源缓存，数据缓存

资源文件的缓存---浏览器自身的功能。更多的是在后端进行

数据的缓存--主要由前端缓存。主要是无感缓存

无感缓存思路：先发送请求，检查是否有缓存，如果有缓存就直接从缓存中获取，否则就发送请求，存入缓存。

缓存对象是全局功能对象。比如在vue中vuex，vue-router都是在全局只有一个

1、缓存对象的唯一性(单例模式)
2、存缓存的地方不能直接暴露--闭包
3、缓存的副作用

缓存的更新问题---当使用本地持久化缓存，前端需要处理。对于具有规定时效性的数据，比如token，用户登录信息，才存储到localstorage，cookie里。对于经常变化的数据，不用缓存

缓存的空间占用：只允许存储多大的空间，如果超过这个空间，就删掉一部分。


```js
if(!window.mycache){
    //为什么不能直接使用对象形式，因为直接使用对象形式，那外部很容易就修改了这个对象。使用自执行函数方式，就可以避免外部直接修改对象。
    // 这里，存储的对象不能被外部直接拿到，但外部又能够访问到，所以使用闭包
    window.mycache = (function(){
        var cache={}
        var cacheArr=[]
        return {
            get:function(){
                // 某个操作可能是同步的，有可能是异步的
                return new Promise((resolve,reject)=>{
                     if(cache[api]){
                    resolve(cache[api]) 
                }else{
                    this.set(api).then(res=>{
                        if(cacheArr.length>10){
                            var _api = cacheArr.shift()
                            this.remove()
                        }else{
                            cache[api]=res
                            resolve(res)
                        }
                    })
                }
                })
            },
            set:function(api){
                return axios.get(api)
            },
            remove:function(api){
                delete cache[api]
            }
        }
    })()
}
```


### vue插件

vue.use()---注册某个插件



