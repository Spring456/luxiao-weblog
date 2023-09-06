## react组件通信

### 组件通信的意义

在项目开发中，组件化思想深入人心。项目中完整的功能会拆分为多个组件，在这个过程中，不可避免的需要数据的传递。为了能让各组件之间可以进行互相沟通，数据传递，这个过程就是组件通信。

### react组件通信的类型

1、父子通信--最重要的

2、兄弟关系--自定义事件模式产生方法events或者通过共同的父组件通信

3、其他关系。使用mobx/redux基于hook的方案

### 父传子通信实现

实现步骤：

1、父组件提供要传递的数据--使用state

2、子组件标签添加属性值为state中的数据

3、子组件通过props接收父组件中传过来的数据
(1)、类组件使用this.props获取props对象
(2)、函数式组件直接通过参数获取props对象

准备父组件和子组件

```js
// App  父组件，Son子组件
import React from "react"

// 函数式组件
function SonA(){
  return (
    <div>函数式组件</div>
  )
}
// 类组件
class SonB extends React.Component{
  render(){
    return (
      <div>这是类子组件</div>
    )
  }
}
class App extends React.Component{
  render(){
    return(
      <div>
        <SonA />
        <SonB />
      </div>
    )
  }
}
export default App
```

接下来进行传值

父组件：

```js
 class App extends React.Component{
  // 准备初始数据
  state={
    message:'从父组件传值到子组件'
  }
  render(){
    return(
      <div>
        {/* 给子组件绑定属性，属性名自定义 */}
        <SonA msg={this.state.message}/>
        <SonB msg={this.state.message}/>
      </div>
    )
  }
}
```

子组件的写法：
```js
// 函数式组件
function SonA(props){
  // 函数式组件传入props，props里面是父组件传入的所有树
  return (
    <div>函数式组件:{props.msg}</div>
  )
}
// 类组件
class SonB extends React.Component{
  // 类组件，比如通过this.props来获取对象
  render(){
    return (
      <div>这是类子组件:{this.props.msg}</div>
    )
  }
}
```
这样就将父组件中的值传递给了子组件。props有以下几个特点：

**1、props是只读的**

单向数据流的要求，子组件只能读取props中的数据，不能进行修改。

不能在子组件中使用`this.props.msg='msg'`这种方式修改传过来的值。和vue类似，子组件不能直接修改父组件传过来的值

**2、props可以传递任意数据**

props可以是数字，字符串，布尔值，数组，对象，函数，jsx(类似插槽)

props是一个简单的对象，在子组件接收对象时，可以使用解构赋值的方法更加方便的取值

父组件：

```r
class App extends React.Component{
  // 准备初始数据
  state={
    message:'从父组件传值到子组件',
    list:[1,2,3],
    user:{name:'admin'},
    childNode:<span style={{color:'red'}}>这是jsx</span>
  }
  getData=()=>{
    console.log('这是父组件中的函数');
  }
  render(){
    return(
      <div>
        {/* 给子组件绑定属性，属性名自定义 */}
        <SonA msg={this.state.message} list={this.state.list} user={this.state.user} getData={this.getData} child={this.state.childNode}/>
        <SonB msg={this.state.message}/>
      </div>
    )
  }
}
```

函数式子组件的用法：

```js
// 函数式组件
function SonA(props){
  // 函数式组件传入props，props是个对象，里面是父组件传入的所有树
  return (
    <div>
      <h3>函数是组件</h3>
      <div>字符串：{props.msg}</div>
      <div>数组:{props.list.map(item=><span key={item}>{item}</span>)}</div>
      <div>函数:<button onClick={props.getData}>触发父组件传过来的值</button></div>
      <div>jsx:{props.child}</div>
    </div>
  )
}
```

### 子组件向父组件传值

1、父组件准备事件

2、在子组件上标签上添加属性，属性值就是父组件事件

3、在子组件上使用事件传递形参

4、在父组件的事件上接收到传递过来的参数。

具体实现：

父组件写法：

```js
class App extends React.Component{
  // 准备初始数据
  state={
    value:''
  }
  // 父组件事件，并且改变state中的值
  getSonMsg=(msg)=>{
    this.setState({
      value:msg
    })
  }
  render(){
    return(
      <div>
        {/* 给子组件绑定属性，属性名自定义 */}
        <SonA getSonMsg={this.getSonMsg} />
        <input type="text" value={this.state.value}/>
      </div>
    )
  }
}
export default App
```
子组件写法：

```js
// 函数式组件
function SonA(props){
  // 函数式组件传入props，props是个对象，里面是父组件传入的所有值
  const {getSonMsg} =props
  // 接收来自父组件的函数方法，然后将子组件的值通过形参的方式传给父组件
  return (
    <div>
      <h3>函数式组件</h3>
      <button onClick={()=>getSonMsg('子组件向父组件传值')}>向父组件传值</button>
    </div>
  )
}
```

### 兄弟组件传值

1、B子组件传值给父组件

2、父组件使用事件将值给A子组件

3、A子组件使用props接收来自父组件的值

```js

import React from "react"
function SonA(props){
  return (
    <div>
      <h3>函数式组件--A组件</h3>
      <div>{props.setMsg}</div>
    </div>
  )
}
function SonB(props){
  return (
    <div>
      <h3>函数式组件--B组件</h3>
      <button onClick={()=>props.getMsgB('这是B组件数据')}>向App组件发送</button>
    </div>
  )
}
class App extends React.Component{
  state={
    message:'测试父传子'
  }
  getMsgB =(msg)=>{
    console.log(msg,1);
    this.setState({
      message:msg
    })
  }
  render(){
    return(
      <div>
        <SonA setMsg={this.state.message}/>
        <SonB getMsgB={this.getMsgB}/> 
      </div>
    )
  }
}
export default App
```

### 跨组件通信Context

步骤：

1、创建Context对象，导出Provider和Consumer对象

> const {Provider,Consumer} = createContext()

2、使用Provider包裹根组件提供数据

Provider是固定写法，value就是将父组件传给子组件

> <Provider value={this.state.message}>{/*根组件*/}</Provider>

3、需要用到数据的组件使用Consumer包裹获取数据

Consumer也是固定写法，value就是接收来自父组件的值

> <Consumer>{value=>/基于context值进行渲染/}</Consumer>

代码实现：

```js
import React,{createContext} from "react"
// 创建Context对象
const {Provider,Consumer} = createContext()
function SonA(props){
  return (
    <div>
      <h3>函数式组件--A组件</h3>
       <SonB />
    </div>
  )
}
function SonB(props){
  return (
    <div>
      <h3>函数式组件--B组件</h3>
      {/* 通过Consumer使用数据 */}
      {/* {value=>}是固定写法，后面使用value的数据是自定义的 */}
      <Consumer>
        {value=><span>{value}</span>}
      </Consumer>
    </div>
  )
}
class App extends React.Component{
  state={
    message:'父组件传给B子组件'
  }
  getMsgB= ()=>{
    // 父组件事件改变message的值，也是通过Provider传给B组件
    this.setState({
      message:'父组件事件改变B组件的值'
    })
  }
  render(){
    return(
      // 使用Provider包裹根组件
      <Provider value={this.state.message} >
         <div>
          <button onClick={this.getMsgB}>btn</button>
          <SonA />
        </div>
      </Provider>
    )
  }
}
export default App
```


