## react实现后台管理系统--项目准备

### 创建项目

1、使用`create-ract-app`生成项目。

> npx create-react-app react-pc

2、进入根目录，启动项目

> yarn start

3、调整项目目录结构，只保留核心代码，新建其他诸如组件，图片，插件等文件夹


如果使用`vite`(node版本需提高到14.8以上)来创建项目，可以执行下面命令：

1、执行命令，`npm init @vitejs/app react-pc`

2、根据提示选择react

3、提示完成，在根目录执行`npm install`

4、使用`yarn dev`或`npm run dev`启动项目

### 使用scss预处理器

1、安装解析css的包,`yarn add scss -D`

2、创建全局index.scss,之后再每个组件中都要新建index.scss，然后在组件中引入

### 配置基础路由

1、安装路由，`yarn add react-router-dom`

2、在 pages 目录中创建两个文件夹：Login、Layout

3、分别在两个目录中创建 index.js 文件，并创建一个简单的组件后导出

4、在 App 组件中，导入路由组件以及两个页面组件  

5、配置 Login 和 Layout 的路由规则

代码实现：

page/Login/index.js

```js
const Login = () => {
  return <div>login</div>
}
export default Login
```

page/Layout/index.js

```js
const Layout = () => {
  return <div>layout</div>
}
export default Layout
```

app.js

```js
// 导入路由
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// 导入页面组件
import Login from './pages/Login'
import Layout from './pages/Layout'

// 配置路由规则
function App() {
  return (
    <BrowserRouter>
      <div className="App">
       <Routes>
            <Route path="/" element={<Layout/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}
export default App
```

### 配置别名，craco插件配置

配置别名，参考：[react配置别名,craco插件配置](Component/react/alias.md)

### antdesign 安装使用
antdesign 网址：[antdesign](https://ant.design/)

步骤：
1、安装antd，`yarn add antd`(最新版的antd已经不需要在app.js中再次引入antd的js文件了)

2、在需要使用组件的页面导入antd组件

3、在页面中测试组件

### 配置jsconfig.json文件

这个文件是让vscode识别我们的@符号并给出路径提示

实现步骤：

1、在项目根目录创建 jsconfig.json 配置文件

2、在配置文件中添加以下配置

```js
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
vscode会自动读取jsconfig.json 中的配置，让vscode知道@就是src目录
### dev-tools调试工具安装

主要就是安装dev-tools.crx


到此，react项目的前期搭建工作就已经完成了，页面也能够访问到，接下来实现项目的登录模块