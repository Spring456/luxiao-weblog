## react中的router使用

### 使用步骤

1、下载`react-router-dom`

2、引用`BrowserRouter,Link,Routes,Route`

3、引用组件，使用`react-router-dom`中的函数进行包裹组件

```js

import React from "react";
import { BrowserRouter,Link,Routes,Route } from "react-router-dom";
// 引入组件
import About from "./about";
import Mine from './mine'
import Login from './login'
// 进行路由配置
function App(){
  return (
    <div>
      {/* 声明当前要用一个非hash模式的路由 */}
      <BrowserRouter>
      {/*  指定跳转的组件，to用来配置路由地址 */}
        <Link to='/mine'>首页</Link>
        <Link to='/about'>关于</Link>
        {/* 路由出口，路由对应的组件会在这里进行渲染 */}
        <Routes>
          {/* 指定路径和组件的对应关系，path代表路径，element代表组件，成对出现 */}
          <Route path='/about' element={<About />}></Route>
          <Route path='/mine' element={<Mine />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
```

### router中函数讲解

`BrowserRouter`

BrowserRouter：包裹整个应用，一个react应用只需要使用一次

在react中有两种常用router，HashRouter和BrowserRouter

HashRouter,---使用URL的哈希值实现，URL上有个井号

BrowserRouter，使用H5的history-pushState api实现的，没有井号

`Link`

Link---用于指定跳转链接，最终渲染为a标签

`Routes`

Routes---路由出口，路由对应的组件会在这里进行渲染。

`Route`

指定路径和组件的对应关系，path代表路径，element代表组件，成对出现 

### router嵌套路由

步骤：

1、在APP.js定义嵌套路由声明

2、在一级路由中使用`<Outlet />`指定二级路由出口

比如现在有两个一级路由，一个Login，一个Layout；其中Layout中有两个二级路由

Layout组件

```js
import { Outlet } from "react-router-dom"
function Layout(){
  return (
    <div>
      <div className="outlettt">
        <Outlet></Outlet>
      </div>
    </div>
  )
}
export default Layout
```

App.js组件

```js

import React from "react";
import { BrowserRouter,Link,Routes,Route } from "react-router-dom";
// 引入组件
import About from "./about";
import Mine from './mine'
import Login from './login'
import Layout from './layout'
function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
          {/* Layout组件下有两个子组件 */}
          {/* 下面这两个路由，就会在outlet里面渲染出来，通过导航切换 */}
            <Route path='/' element={<About />}></Route>
            <Route path='/mine' element={<Mine />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App
```

2、默认路由

在默认二级路由上，把path去掉，然后加上`index`属性即可。

```js
<Route index element={<Home />} />
```

3、404页面

放在路由最后面，这样写：

`<Route path='*' element={<NotFound />}></Route>`

其中path定义为星号，element使用项目的404页面

### router路由传值

路由传值有两种形式，一种是使用searchParams方式传值，另一种是使用useParams传值

**1、searchParams传参--带有问号的形式传参**`/about?id=100`

传参---`navigate('/about?id=100')`

取参---`let [params] = useSearchParams()  let id = params.get('id')`

**2、使用params传参---没有问号的形式传参**`/about/100`

使用这种方式传参，必须使用动态路由方式，也就是在定义路由的地方使用动态路由，也就是使用冒号的方式后面接参数

1、传参----`navigate('/about/100')`

2、取参---`let params = useParams()   let id = params.id`

执行useNavigate.如果不需要回退，加上replace为true
