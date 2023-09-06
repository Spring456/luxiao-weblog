## vue中的插槽(slot)介绍

### 什么是slot

vue中的slot其实就是父组件给子组件提供的一段HTML模板。相当于子组件暴露的一个让父组件传入自定义内容的接口。

### slot的作用

slot的作用就是可以对组件进行扩展，做定制化处理。通用组件，但是可以根据需求不同，可以设置不同的HTML来做定制化处理。

### slot的分类

vue中对slot有三种分类：(根据版本不同有不同的写法)

`vue 2.6版本之前`

1、默认插槽：使用<slot></slot>标签来确定渲染的位置

2、具名插槽：使用<slot name=''></slot>，使用name属性来表示插槽的名字。

3、作用域插槽：在子组件上绑定属性将子组件的信息传给父组件，这些属性会被挂载父组件slot-scope接收的对象上。

实例操作：

子组件：

```vue
<template>
  <div class="hello">
    <!-- 默认插槽 -->
    <div class="default-slot">
      <slot></slot>
    </div>
    <!-- 具名插槽 -->
    <div class="name-slot">
      <slot name="name"></slot>
      <slot name="age"></slot>
    </div>
    <!-- 作用域插槽 -->
    <div class="zy-slot">
      <slot name="zy" testData="这是作用域插槽"></slot>
    </div>
  </div>
</template>
```

父组件：

1、默认插槽：直接在子组件里写入html

2、具名插槽：需要在子组件上使用`slot='名字'`

3、作用域插槽：使用`slot-scope='slotProps'`获取子组件信息，使用双括号解构语法获取想要的属性.

```vue
<template>
  <div id="app">
    <!-- 默认插槽 -->
    <HelloWorld>
      <div>默认插槽</div>
    </HelloWorld>
    <!-- 具名插槽 -->
    <HelloWorld>
      <div slot="name">这是具名插槽的名字</div>
      <div slot="age" style="color:blue">这是另一个名字</div>
    </HelloWorld>
    <!-- 作用域插槽 -->
    <HelloWorld>
      <div slot="zy" slot-scope="slotProps">{{slotProps.testData}}</div>
    </HelloWorld>
  </div>
</template>
```

以上是vue 2.6版本之前的slot的语法，在2.6版本之后，采用了v-slot方式。子组件用法保持不变，但父组件改变了使用方法。

`vue 2.6版本之后`

1、使用`v-slot`形式，如果是具名插槽，使用`v-slot:插槽名`形式，可以简写为`#插槽名`

2、`slot-scope`属性被废弃，使用`v-slot:插槽名='slotProps'`或者`#插槽名='slotProps'`，通过slotProps来获取子组件传过来的属性。

3、使用<template>取代<slot>标签。v-slot属性只在template上使用。

```vue
<template>
  <div id="app">
    <!-- 默认插槽 -->
    <HelloWorld>
      <template v-slot>
        <div>这是默认插槽</div>
      </template>
    </HelloWorld>
    <!-- 具名插槽 -->
    <HelloWorld>
      <template #name>
        <div>这是vue2.6后的具名插槽</div>
      </template>
      <template #age>
        <div>这是vue2.6后的具名插槽-age</div>
      </template>
    </HelloWorld>
    <!-- 作用域插槽 -->
    <HelloWorld>
      <template #zy="slotProps">
        <div>{{slotProps.testData}}</div>
      </template>
    </HelloWorld>
  </div>
</template>
```

vue2.6之后，插槽可以有多种用法：

插槽名可以是动态的，比如`v-slot:[插槽名]`

可以通过解构获取:`v-slot={obj}`，还可以重命名`v-slot='{obj:1}'`或者定义默认值:`v-slot='{obj=1}'`

注意：

1、默认插槽名为default，可以省略default直接写v-slot，缩写为#时不能不写参数，写成#default

2、多个插槽混用时，v-slot不能省略default

### 理解slot

slot的本质其实就是将html从父组件传给子组件。作用域插槽就是将子组件的数据传给父组件。

从源码上看slot

slot就是一个返回VNode的函数。 

对于一个vue组件来说，核心就是渲染函数。组件挂载的本质就是执行渲染函数得到VNode，至于data/props/computed这些属性都是给VNode提供数据来源服务的。

在vue2.6之前，普通插槽就直接是VNode的形式了，而如果是作用域插槽，由于子组件需要在父组件访问子组件的数据，所以父组件下是一个未执行的函数`(slotScope) => return h('div', slotScope.msg)`，接受子组件的slotProps参数，在子组件渲染实例时会调用该函数传入数据。
在2.6之后，两者合并，普通插槽也变成一个函数，只是不接受参数了。




