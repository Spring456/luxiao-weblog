## Vue2和Vue3的区别

### 语法上的区别

Vue2采用的是Options Api语法；Vue3推出新的Composition Api语法

**Options Api的选项式语法**

```js
export default {
    data () {
        return {
            // 定义响应式数据的选项
        }
    },
    methods: {
        // 定义相关方法的选项
    },
    computed: {
        // 计算属性的选项
    },
    watch: {
        // 监听数据的选项
    }
    ...
}
```

Options Api 是一种选项式的语法，可以理解为组件的各个选项。在vue2组件中，data,mounted,methods,watch等等就像是组件的选项，在每个选项中做对应的事情。

Options Api的设计已经给你规定好了一个个的框框。如果想随意写，是不被允许的。

OPtions Api这种设计，有如下不好的几点：

1、分割了代码逻辑，对于代码量大的组件来说，不好定位，后期维护修改难度大

2、数据都挂载在this下，对于typescript的支持不友好，类型推断很麻烦

3、代码复用能力很差

**Composition Api的组合式语法**

Composition Api是一种组合式语法，在Compostion Api的写法中，没有选项的概念了，设计指向的是组合，各种功能模块的组合。

Composition Api支持将相同的功能模块代码写在一起，甚至可以将某个功能单独的封装成函数，随意导入引用；也可以将任意的数据定义成响应式，再也不用局限于data中，我们只需要将每个实现的功能组合起来就可以了。

```js
<template>
    <div @click='add'>{{count}}</div>
</template>
<script setup>
    import { ref } from "vue";
    let count = ref(0);
    function add(){
      count.value++
    }
</script>
```
就像上面的代码，使用ref就可以定义一个响应式的数据count，通过add方法就可以实现count的增加。

还可以将这个方法封装成一个js文件，引入过来使用。类似react的hooks

特点：

1、代码定义自由，可以将相同功能代码整合到一起，查找修改方便

2、公共代码复用简单，不同功能的代码自由组合

3、Vue的api都是通过import导入，打包的时候友好


**总结**

1、Options Api语法更关注组件；Composition Api语法更关注数据的组合

2、Vue3中也是支持Options Api的写法，写法上更自由，和以前在script中写js类似

### 响应式的区别

**Vue2.x的响应式——Object.defineProperty**

vue2是通过Object.defineProperty循环遍历拦截data中的数据来实现响应式的。这方面的知识可以查看这篇文章：[vue2的响应式原理]()

Object.defineProperty其实不是真正的代理，而是拦截，当我们读取或者修改对象的某个属性时，Object.defineProperty可以拦截下相关的用户操作，我们可以在其中执行一些我们自己定义的方法，比如通知监听改变等等，然后再执行读取修改操作，并且添加拦截只有在初始化的时候才会进行。

Object.defineProperty的局限性，`并不是对整个对象进行拦截，而是拦截对象的具体的某个属性`。

1、无法监听整个对象，只能对每个属性单独监听

2、无法监听对象属性的新增，删除

3、无法监听数组的变化

这就是为什么vue2中提供了$set这个方法来添加响应式数据，通过$delete方法来删除属性。

**Vue3.0的响应式——proxy**

在vue3中，使用proxy替换了Object.defineProperty来实现响应式。

`proxy是真正地对整个对象进行代理，因为proxy可以劫持整个对象`

```js
const person = {
    name: '小明',
    age: 18
};
const personProxy = new Proxy(person, {
    get: function(target, prop) {
        console.log(`获取了${prop}:`, target[prop]);
        return target[prop];
    },
    set: function(target, prop, value) {
        console.log(`修改了${prop}:`, value);
        target[prop] = value;
    }
});

console.log('name:', personProxy.name); // 获取了name:小明
personProxy.age = 20; // 修改了age:20
```
proxy是真的对整个对象进行拦截的，我们如果有新增或删除的属性，也不需要单独去添加处理，可以直接被检测代理。

```js
person.sex = 'male';

console.log('sex:', personProxy.sex); // 获取了sex:male
personProxy.sex = 'female'; // 修改了sex:female
```
上面就是新增了sex属性，proxy依然可以对新增的属性进行代理。不需要调用额外的api了

关于proxy的拦截可以查看这篇文章：[MDN Proxy]()

vue3中实现响应式代理除了proxy，就是对象本身的get，set方法

```js
const count = {
    _value: 0,
    set value(num) {
        console.log('修改了count:', num);
        this._value = num;
    },
    get value() {
        console.log('获取了count');
        return this._value
    }
}

console.log(count.value); // 获取了count
count.value = 1; // 修改了count: 1
```
如上所示，count对象本身定义了value的get和set方法，对value属性进行拦截，Vue3中的ref就是通过对象本身的get，set方法来拦截代理的。

### Template中的v-model指令在Vue3中要用“modelValue”替代“value”。

### Vue3中取消了过滤器（filters）这个特性，可以使用普通函数或计算属性来进行数据处理


