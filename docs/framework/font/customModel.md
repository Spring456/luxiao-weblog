## vue自定义指令详解

### 什么是自定义指令

vue中我们通常使用的诸如：v-model/v-if/v-for等都是指令，这些指令是vue内置的。我们还可以通过directive方法来自定义指令。比如根据后台返回的数据结构做一个按钮级别的权限控制。原理就是利用自定义指令，根据后台返回的数据有没有这个id值来进行按钮的显示隐藏

```js
<div v-div>这里使用了自定义指令</div>
```

上面的`v-div`就是一个自定义指令。我们在写一个自定义指令时，只需要写后面的`div`即可，使用时，加上`v-`

### 自定义指令语法

语法：

1、全局自定义指令——使用`Vue.directive`注册

```js
Vue.directive(自定义指令名称,{
  // 钩子函数执行操作
})
```

2、组件内部注册局部指令——`directives`

```js
directives:{
  自定义指令名称:{
    // 钩子函数中执行操作
  }
}
```

注意：全局注册指令使用的是directive，局部注册指令使用的是directives，很好理解，局部指令一次性注意注册很多个，全局指令依次只能注册一个。

### 自定义指令钩子函数介绍

`1、bind`

只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

`2、inserted`

被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。

`3、update`

所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新

`4、componentUpdated`

指令所在组件的 VNode 及其子 VNode 全部更新后调用。

`5、unbind`

只调用一次，指令与元素解绑时调用。

这些钩子函数都是可选的。对于钩子函数可以简单理解为：

`bind:`指令绑定到元素上

`inserted:`元素插入时

`update：`组件更新时

`componentUpdated:`组件更新后

`unbind:`指令和元素解绑时

### 自定义指令钩子函数的参数(来源官网)

这些钩子函数的参数可以在每个钩子函数上使用

`1、el`

指令所绑定的元素，可以用来直接操作 DOM。使用el，我们可以获取绑定的DOM元素，也可以调用相应方法获取其他节点等操作。

`2、binding`

name：指令名，不包括 v- 前缀。

value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。value的值可以是字符串形式也可以对象形式

oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。

expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。

arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。//指令的参数可以是动态的。使用`v-myDirective:[direction]`，其中`direction`可以是动态的。

modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。

`3、vnode`

Vue 编译生成的虚拟节点

`4、oldVnode`

上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

> 除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过元素的 dataset 来进行。

```js
// 创建一个自定义指令p，打印其各个参数
Vue.directive('p',{
  bind:function(el,binding,vnode){
    console.log(el);
    console.log(binding);
    console.log(vnode);
  }
})
// binding打印的值
// def: {bind: ƒ}
// expression: "colorStr"
// modifiers:{color: true}
// name: "p"
// rawName: "v-p.color"
// value: "red"
```
```vue
<template>
  <div class="hello">
    <h1 v-p.color="colorStr"></h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data(){
    return{
      colorStr:'red'
    }
  }
}
</script>
```





