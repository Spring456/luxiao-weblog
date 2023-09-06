## react路由鉴权功能实现

### 路由鉴权思路

判断本地是否有token，如果有，就返回子组件，如果没有，就退出登录，清空缓存，跳转到登录页

封装Auth路由鉴权高阶组件，实现未登录拦截，并跳转到登录页面

### 组件实现步骤

1、创建Auth组件

2、如果是登录状态，就直接渲染相应的页面

3、如果未登录，重定向到登录页面

4、将需要鉴权的页面路由配置，替换为Auth组件渲染。使用Auth组件包裹需要鉴权的路由组件

### 代码实现

```js
// 高阶组件:把一个组件当成另外一个组件的参数传入 然后通过一定的判断 返回新的组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthRoute ({ children }) {
  const isToken = getToken()//获取token
  // children属性---可以接收组件，直接渲染
  if (isToken) {
    return <>{children}</>
  } else {
    // 如果没有token则使用Navigate组件跳转到登录页
    return <Navigate to="/login" replace />
  }
}
export { AuthRoute }
```

在app.js的路由配置里修改

```js
import { Router, Route } from 'react-router-dom'
import { AuthRoute } from '@/components/AuthRoute'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'

function App() {
  return (
    <Router>
      <Routes>
          {/* 需要鉴权的路由 */}
          <Route path="/*" element={
            <AuthRoute>
              <Layout />
            </AuthRoute>
          } />
          {/* 不需要鉴权的路由 */}
          <Route path='/login' element={<Login />} />
       </Routes>
    </Router>
  )
}
export default App
```