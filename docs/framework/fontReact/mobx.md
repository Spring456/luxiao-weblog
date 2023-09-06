## Mobx基础使用

### 什么是mobx

> 一个可以和react配合使用的集中状态管理工具

mobx是一个独立的响应式的库，可以独立于任何UI框架而存在。但是通常人们把它和react配合使用。

类似的还有redux，dva，recoil。但mobx有自己独有的优势

1、简单

可以编写无模板的极简代码(原生js)来实现业务逻辑

2、轻松实现最优渲染

以来自动追踪最小渲染优化代码

3、架构自由

mobx可移植，可测试。可以单独使用，也可以配合其他框架使用。

### mobx环境配置

1、使用create-reac-app创建项目

> npx create-react-app

2、安装mobx和mobx-react-lite

> yarn add mobx mobx-react-lite

### mobx如何配合react使用？

实现步骤：

1、定义一个类，定义数据状态(state)

2、数据响应式处理(makeAutoObservable)

3、定义action函数(定义函数修改数据)

4、实例化并导出实例

新建一个count.js文件，编写mobx store

```js
import { makeAutoObservable } from "mobx"
// 定义一个类
class CounterStor{
  // 定义数据
  count=0
  constructor(){
    // 引用makeAutoObservable，把数据弄成响应式的
    makeAutoObservable(this)
  }
  // 定义action函数，修改数据
  addCount=()=>{
    this.count++
  }
}
// 实例化，然后导出给react用
const counterStore = new CounterStor()
export {counterStore}
```

在业务代码中使用

```js
// 导入中间件observer，连接mobx，react完成响应式
import {observer} from 'mobx-react-lite'
import { counterStore } from './store/count.Store'
import { Button } from "antd"
function About(){
  return(
    <div>
      {/* count.Store中的函数和变量 */}
      {counterStore.count}
      <Button onClick={counterStore.addCount}>+</Button>
    </div>
  )
}
// 使用observer包裹这个组件
export default observer(About)
```

### mobx--computed的实现

1、声明一个存在的数据

2、定义get计算属性

3、在makeAutoObservable方法中标记

```js
import { makeAutoObservable } from "mobx"
class CounterStor{
  // 定义数据
  count=0
  list=[1,2,3,4]
  constructor(){
    // 引用makeAutoObservable，把数据弄成响应式的
    makeAutoObservable(this)
  }
  // 使用mobx的computed
  get filtList(){
    return this.list.filter(item=>item>2)
  }
  addList=()=>{
    this.list.push(7,8,9)
  }
  // 定义action函数，修改数据
  addCount=()=>{
    this.count++
  }
}
// 实例化，然后导出给react用
let CounterStore = new CounterStor()
export {CounterStore}
```

在业务代码中使用

```js

// 导入中间件，连接mobx，react完成响应式
import {observer} from 'mobx-react-lite'
import { CounterStore } from './store/count.Store'
import { Button } from "antd"
function About(){
  return(
    <div>
      {CounterStore.count}
      {/* 使用计算属性 */}
      {CounterStore.filtList.join('-')}
      <Button onClick={CounterStore.addCount}>+</Button>
      <Button onClick={CounterStore.addList}>修改数组</Button>
    </div>
  )
}
// 使用observer包裹这个组件
export default observer(About)
```

### 如何实现mobx的模块化

按照功能拆分store模块，根据模块中组合子模块，利用context机制依赖注入

让业务组件可以通过统一一样的方法获取store中的数据，方便调试

使用方法：

1、拆分模块，每个模块定义自己独立state和actions

2、在store/index.js中导入拆分之后的模块，进行模块组合

3、使用`React.createContext`和`React.useContext`机制，导出useStore方法，供业务组件统一使用

使用：

1、创建count.Store.js

```js
import { makeAutoObservable } from "mobx"
class CounterStor{
  // 定义数据
  count=0
  list=[1,2,3,4]
  constructor(){
    // 引用makeAutoObservable，把数据弄成响应式的
    makeAutoObservable(this)
  }
  // computed
  get filtList(){
    return this.list.filter(item=>item>2)
  }
  addList=()=>{
    this.list.push(7,8,9)
  }
  // 定义action函数，修改数据
  addCount=()=>{
    this.count++
  }
}
// 导出
export {CounterStor}
```

2、创建List.Store.js文件

```js
import { makeAutoObservable } from "mobx"
class ListStore{
  list=['vue','react']
  constructor(){
    makeAutoObservable(this)
  }
  addList=()=>{
    this.list.push('angular')
  }
}
export {ListStore}
```

3、创建index.js文件

```js
import React from "react";
// 引入js文件
import { ListStore } from "./list.Store";
import {CounterStor} from './count.Store'
// 声明一个rootStore
class RootStore{
  constructor(){
    // 对子模块进行实例化操作
    this.counterStore = new CounterStor()
    this.listStore = new ListStore()
  }
}
// 实例化操作,这样rootStore里面就有counterStore，listStore这两个对象
const rootStore = new RootStore()
// 使用context机制，实现统一封装
// 查找机制，使用useContext，优先从Provider value找，如果找不到，就会从creatContext方法传递过来的默认参数
const context = React.createContext(rootStore)
// 通过useContext拿到rootStore实例对象，然后返回
// 只要在业务组件中，调用useStore()---就能获取到rootStore
const useStore = ()=>React.useContext(context)

export {useStore}
```

业务代码使用

```js
// 导入中间件，连接mobx，react完成响应式
import {observer} from 'mobx-react-lite'
// 引入useStore
import { useStore } from './store'
import { Button } from "antd"
function About(){
  const rootStore = useStore()
  return(
    <div>
      {rootStore.counterStore.count}
      <Button onClick={rootStore.counterStore.addCount}>+</Button>
    </div>
  )
}
// 使用observer包裹这个组件
export default observer(About)
```