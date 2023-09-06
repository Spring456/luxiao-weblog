## vue如何监测数据变化

问题：

在实际开发中，我们往往会发生这样问题：在已经生成了vue实例的情况下，当我们给数组或数组对象添加新的属性时，如果直接使用等于号(=)直接赋值，值更新了，但视图并没有更新。也就是在实例创建之后，给对象添加新的属性是不会更新到视图上的。接下来就来看看在vue的数据变化监听实现机制

### vue2.xx版本中监测数据变化

我们从基本数据类型到数组，数组对象来看看，vue中监测数据变化是怎样的？Object.defineProperty()能不能监测到数据变化？

```html
<div id="app">
  <el-input v-model="input" placeholder="请输入内容"></el-input>
  <div>{{input}}</div>
  <el-button type='primary' @click='btn'>按钮</el-button>
</div>
```

**1、当监测值是基本数据类型时**

```js
<script type="text/javascript">
  var vm = new Vue({
    el:'#app',
    data:{
      input:0
    },
    methods:{
      btn(){
        this.input++
        console.log(this.input)//时时变化
      }
    }
  })
</script>
```
我们看到，如果值是基本数据类型，会时时更新的。如果将值换成数组类型或对象呢？

**2、当监测值是数组类型**

```js
<script type="text/javascript">
  var vm = new Vue({
    el:'#app',
    data:{
      input:[]
    },
    methods:{
      btn(){
        this.input[0] = 1
        console.log(this.input)
      }
    }
  })
</script>
```
可以看到，当我们直接给数组添加属性值或者直接设置数组长度并赋值时，数据更新了，但视图并没有更新。

**3、当监测值是数组类型**

```js
<script type="text/javascript">
  var vm = new Vue({
    el:'#app',
    data:{
      input:{}
    },
    methods:{
      btn(){
        this.input.name = 1
        console.log(this.input)
      }
    }
  })
</script>
```
当为对象时，使用直接赋值时，数据改变了，但页面上并没有更新。

我们知道vue的双向数据绑定是使用了`Object.defineProperty()`方法来实现的。我们使用它对数组对象数据的改变，能不能监听到数组内数据的变化。

```js
<script type="text/javascript">
  var vm = new Vue({
    el:'#app',
    data:{
      myData:[1,2,3]
    },
    methods:{
      btn(){
        this.myData.forEach((el,index)=>{
          Object.defineProperty(this.myData,index,{
            get(){
              return el
            },
            set(newEl){
              console.log(`从${el}到${newEl}的变化`)
              el=newEl
            }
          })
        })
        // this.myData.push(5)//不会触发set，但页面更新
        // this.myData.shift()//从1到2的变化,从2到3的变化。页面更新
        // this.myData.pop()//不会触发set，但页面更新
        // this.myData.unshift(2)//从3到2的变化,从2到1的变化,从1到2的变化。页面更新
        // this.myData[0]=4//从1到4的变化,数组改变，但页面无更新
        // this.myData.length=5
        // this.myData[4] = 6//数据改变，页面无更新
        console.log(this.myData)//
      }
    }
  })
</script>
```
从上面的代码里，可以得到几个结论：

1、直接修改数组中已有的数据或修改数组长度，可以被监测到，但页面无更新

2、改变超过数组长度的下标的值时，值变化是不能监听到的。

3、push、length、pop一些特殊的方法确实不能触发setter

4、没有监听数组本身，而是监听造成数组变化的方法。
综上：

(1)、原本不存在的数据是不能监听到，因为绑定监听操作在之前就已经执行了，后添加的元素在绑定上还不存在，没有办法监听。

(2)、Object.defineProperty()能监听到数组的变化，但不能监听原本不存在的数据；有一些数组方法造成数组改变的也不能监听到。


### vue2.xx源码是如何监听数据变化的

源码里监听数组变化主要这几块代码：

```js
var Observer = function Observer (value) {//监听器
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {//是否有原型存在, hasProto的赋值-- var hasProto = '__proto__' in {};
      protoAugment(value, arrayMethods);//如果有，则修改其原型上的方法
    } else {
      copyAugment(value, arrayMethods, arrayKeys);//如果没有，则为其添加新的属性
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
```
这段代码的意思是：先判断是不是数组，如果是数组，看是否有原型存在；如果有，则使用protoAugment()方法修改数组原型上的方法push，pop，shift，unshift，splice, sort，reverse；否则使用copyAugment()去新增这7个属性后赋值7个方法。

`protoAugment`的方法

```js
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
```
`protoAugment`方法是修改数组原型上的方法，主要参数是arrayMethods方法，这个方法就是重写数组方法。

```js
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
  * Intercept mutating methods and emit events
  */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change//触发订阅，页面数据更新在这里触发
    ob.dep.notify();
    return result
  });
});
```
重写之后的数组会在每次在执行数组的原始方法之后手动触发响应页面的效果。

最后就是observeArray方法

```js
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};
```

这个方法对数组元素进行了监听，数组内的值是对象类型的，修改它依旧能得到监听响应。没有对数组本身进行监听。

稍作总结一下vue对数组数据变化的监听流程：

1、首先判断是不是数组，如果是数组，看是否有原型存在

2、如果原型存在，则修改原型上的`push，pop，shift，unshift，splice, sort，reverse`七个方法。原型不存在，则在原型上添加这7个方法

3、修改其原型的方法，如果是插入的数据则再次监听数组，否则就触发这个方法，同时去调用挂载好的响应页面方法，达到页面响应式的效果。

原理：

简单来说,Vue 通过原型拦截的方式重写了数组的 7 个方法,首先获取到这个数组的ob,也就是它的 Observer 对象,如果有新的值,就调用 observeArray 对新的值进行监听,然后手动调用 notify,通知 render watcher,执行 update

## 为什么是这7个方法，而不是所有的或者使用Object.defineProperty去监听数组中已存在的元素变化呢？

作者尤雨溪的考虑是因为性能原因，给每一个数组元素绑定上监听，实际消耗很大，而受益并不大。

参考：issue地址：https://github.com/vuejs/vue/issues/8562

也就是说，在vue2.xx中，为了性能和收益，作者放弃了监听数组最后的结果，而是监听其导致结果的方法上。

如何解决这个问题？使用$set()方法

## vue3如何监听数据变化

vue3采用的是ES6新的构造方法Proxy来代理原对象做变化检测。而Proxy作为代理的存在，当异步触发Model里的数据变化时，必须经过Proxy这一层，在这一层则可以监听数组以及各种数据类型的变化

利用Proxy和Reflect实现后，不用再考虑数组的操作是否触发setter，只要操作经过Proxy代理层，各种操作都可以捕获到，从而达到页面响应式的要求。


延伸阅读：[图解vue响应式原理](https://juejin.cn/post/6857669921166491662#heading-3)





