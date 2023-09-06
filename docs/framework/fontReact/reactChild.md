## react组件进阶

### children属性

表示该组件的子节点，只要在子组件内部写任何元素，就会出现在props对象的children上。是默认的，不用绑定。类似于vue中的插槽

children可以是普通文本，普通标签，jsx，函数

```js
import React from "react"
function SonA({children}){
  return (
    <div>
      <h3>函数式组件--A组件</h3>
      {children[0]}
      {children[1]}
      {children[2]()}
    </div>
  )
}
class App extends React.Component{
  getData = () =>{
    console.log('这是函数');
  }
  render(){
    return(
      <div>
        <SonA>
          {<div><span style={{color:"red"}}>这是children</span></div>}
          {'这是children数据'}
          {this.getData}
        </SonA>
      </div>
    )
  }
}
export default App
```
如果children的个数超过2个，那children的数据类型就是数组类型，可以使用数组索引获取数据。

### props校验

步骤;

1、安装属性校验包：`yarn add prop-types`

2、导入prop-types

3、使用`组件名.propTypes={}`给组件添加校验规则

```js

import React from "react"
// 引入prop-types
import PropTypes from 'prop-types'
function SonA({list}){
  return (
    <div>
      <h3>函数式组件--A组件</h3>
      {/* 如果传入的不是数组，就会报错 */}
      {list.map(item=><span key={item}>{item}</span>)}
    </div>
  )
}
// 给组件SonA添加一个propTypes属性，注意这里的p是小写
SonA.propTypes={
  list:PropTypes.array//需要校验的属性。这里才是使用PropTypes
}
class App extends React.Component{
  render(){
    return(
      <div>
        <SonA list={[1,2,3]}></SonA>
      </div>
    )
  }
}
export default App
```
### props校验说明

使用prop-types时，常见的有四种

1. 常见类型：array、bool、func、number、object、string

2. React元素类型：element

3. 必填项：isRequired

4. 特定的结构对象：shape({})

官网：[prop-types](https://reactjs.org/docs/typechecking-with-proptypes.html)

### props校验--默认值

> 通过defaultProps 可以给组件的props设置默认值，在未传入prop的时候生效

**1、使用defaultProps**

如果组件中传入了，则使用组件中的值，如果组件中没有传入，则使用默认值

**函数组件**
```js
import React from "react"
function SonA({list}){
  return (
    <div>
      <h3>函数式组件--A组件</h3>
      {/* 4,5,6 */}
      {list.map(item=><span key={item}>{item}</span>)}
    </div>
  )
}
// 使用defaultProps设置默认值
// 如果组件中没有传，那就采用默认值，如果组件中传了，那使用组件上的值
SonA.defaultProps={
  list:[4,5,6]
}
class App extends React.Component{
  render(){
    return(
      <div>
        <SonA></SonA>
      </div>
    )
  }
}
export default App
```

**类组件**

```js

import React from "react"
class SonA extends React.Component{
  render(){
    return(
      <div>
        {this.props.list}
      </div>
    )
  }
}
SonA.defaultProps={
  list:[1,2,3]
}
class App extends React.Component{
  render(){
    return(
      <div>
        <SonA></SonA>
      </div>
    )
  }
}
export default App
```

**2、使用函数参数默认值**

直接在组件上传参即可。更加推崇这种写法

**函数式组件**
```js
import React from "react"
function SonA({list=[1,2,3]}){
  return (
    <div>
      <h3>函数式组件--A组件</h3>
      {/* 1,2,3*/}
      {list.map(item=><span key={item}>{item}</span>)}
    </div>
  )
}
class App extends React.Component{
  render(){
    return(
      <div>
        <SonA></SonA>
      </div>
    )
  }
}
export default App
```

**3、类组件使用类静态属性声明**(更推荐)

```js

import React from "react"
class SonA extends React.Component{
  static defaultProps={
    list:[1,2,3]
  }
  render(){
    return(
      <div>
        {this.props.list}
      </div>
    )
  }
}
class App extends React.Component{
  render(){
    return(
      <div>
        <SonA></SonA>
      </div>
    )
  }
}
export default App
```

两个方案的区别：

1、第一种在用的时候，组件内部已经有了这个prop

2、第二种只有传递的时候组件内部才有这个prop



