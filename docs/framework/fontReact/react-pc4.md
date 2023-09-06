## react实现后台管理系统--项目打包

### 一、项目打包

1、在终端中输入`yarn build`命令

2、等待打包完成，打包生成的文件放在根目录下的build文件中

3、在build文件夹中，index.html就是项目的入口文件

### 二、项目预览

1、全局安装本地服务包`npm i -g serve`该包提供了serve命令，用来启动本地服务

2、在项目根目录中执行命令 `serve -s ./build`  在build目录中开启服务器

3、 在浏览器中访问：`http://localhost:3000/` 预览项目

### 三、打包体积分析

1、 安装分析打包体积的包：`yarn add source-map-explorer`

2、在 package.json 中的 scripts 标签中，添加分析打包体积的命令

```js
"scripts": {
  "analyze": "source-map-explorer 'build/static/js/*.js'",
}
```

3、对项目打包：`yarn build`（如果已经打过包，可省略这一步）

4、运行分析命令：`yarn analyze`

5、通过浏览器打开的页面，分析图表中的包体积

### 四、优化配置CDN

修改crcao.config.js代码

```js
// 添加自定义对于webpack的配置

const path = require('path')
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    },
    // 配置webpack
    // 配置CDN
    configure: (webpackConfig) => {
      // webpackConfig自动注入的webpack配置对象
      // 可以在这个函数中对它进行详细的自定义配置
      // 只要最后return出去就行
      let cdn = {
        js: [],
        css: []
      }
      // 只有生产环境才配置
      whenProd(() => {
        // key:需要不参与打包的具体的包
        // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
        // 通过import 导入的 react / react-dom
        webpackConfig.externals = {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
        // 配置现成的cdn 资源数组 现在是公共为了测试
        // 实际开发的时候 用公司自己花钱买的cdn服务器
        cdn = {
          js: [
            'https://cdnjs.cloudflare.com/ajax/libs/react/18.1.0/umd/react.production.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.1.0/umd/react-dom.production.min.js',
          ],
          css: []
        }
      })

      // 都是为了将来配置 htmlWebpackPlugin插件 将来在public/index.html注入
      // cdn资源数组时 准备好的一些现成的资源
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )

      if (isFound) {
        // 找到了HtmlWebpackPlugin的插件
        match.userOptions.cdn = cdn
      }

      return webpackConfig
    }
  }
}
```
**public/index.html**

```js
<body>
  <div id="root"></div>
  <!-- 加载第三发包的 CDN 链接 -->
  <% htmlWebpackPlugin.options.cdn.js.forEach(cdnURL => { %>
    <script src="<%= cdnURL %>"></script>
  <% }) %>
</body>
```

### 优化-路由懒加载

1、 在App组件中，导入 `Suspense 组件`

2、 在路由Router内部，使用 Suspense 组件包裹组件内容

3、 为Suspense组件提供 `fallback` 属性，指定 loading 占位内容

4、 导入 lazy 函数，并修改为懒加载方式导入路由组件

```js
import { Routes, Route } from 'react-router-dom'
import { HistoryRouter, history } from './utils/history'
import { AuthRoute } from './components/AuthRoute'

// 导入必要组件
import { lazy, Suspense } from 'react'
// 按需导入路由组件
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App () {
  return (
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}
          >
            loading...
          </div>
        }
      >
        <Routes>
          {/* 需要鉴权的路由 */}
          <Route path="/" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          }>
            {/* 二级路由默认页面 */}
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          {/* 不需要鉴权的路由 */}
          <Route path='/login' element={<Login />} />
        </Routes>
      </Suspense>
    </HistoryRouter>
  )
}

export default App
```