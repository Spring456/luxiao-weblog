## react实现后台管理系统--登录模块

### 登录模块需要实现的功能

登录模块需要实现：登录页面、数据缓存、token持久化、路由鉴权功能、http请求封装

### 登录页面

项目的登录界面包括form表单结构，表单校验等，这部分可以参考antdesign的form表单组件。保留必要的结构即可。

### http请求封装--使用axios

1、安装axios

2、创建`utils/axios.js`文件

3、创建axios实例，配置baseURL，配置请求拦截器和响应拦截器

4、在`utils/index.js`中，统一导出http

代码实现：

1、安装axios后，新建utils/axios.js文件

```js
import axios from 'axios'

const http = axios.create({
  baseURL: 'xxxx',//接口请求前缀，有时区分不同环境，是动态获取的，
  timeout: 5000
})
// 添加请求拦截器
http.interceptors.request.use((config)=> {
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export { http }
```
2、新建utils/index.js文件，引入axios.js文件

```js
import { http } from './axios'
export {  http }
```

### 配置登录的Mobx

使用状态管理，目的是缓存用户的登录信息

1、新建`store/login.Store.js`文件

```js
// 登录模块
import { makeAutoObservable } from "mobx"
import { http } from '@/utils'

class LoginStore {
  token = ''
  constructor() {
    makeAutoObservable(this)
  }
  // 登录
  login = async ({ mobile, code }) => {
    const res = await http.post('xxxx', {
      mobile,
      code
    })
    this.token = res.data.token
  }
}
export default LoginStore
```

2、在`store/index.js`引入login.Store.js，组合模块，对外统一出口

```js
import React from "react"
import LoginStore from './login.Store'

class RootStore {
  // 组合模块
  constructor() {
    this.loginStore = new LoginStore()
  }
}
// 导入useStore方法供组件使用数据
const StoresContext = React.createContext(new RootStore())
export const useStore = () => React.useContext(StoresContext)
```
这样的话，在外部使用的时候，使用`useStore`即可

### 登录逻辑实现

1. 使用useStore方法得到loginStore实例对象

2. 在校验通过之后，调用loginStore中的login函数

3. 登录成功之后跳转到首页

```js
import { useStore } from '@/store'
const Login = () => {
  // 获取跳转实例对象
  const navigate = useNavigate()
  const { loginStore } = useStore()
  const onFinish = async values => {
    const { mobile, code } = values
    try {
      await loginStore.login({ mobile, code })
      navigate('/')
    } catch (e) {
      message.error(e.response?.data?.message || '登录失败')
    }
  }
  return (...)
}
```

### token持久化

登录后，在刷新页面时，有时候会碰到token消失的情况，所以需要将token保留一份在本地。当刷新页面时，可以从本地取token使用

一、封装工具函数

实现步骤：
1. 创建 utils/token.js 文件

2. 分别提供 getToken/setToken/clearToken/isAuth 四个工具函数并导出

3. 创建 utils/index.js 文件，统一导出 token.js 中的所有内容，来简化工具函数的导入

4. 将登录操作中用到 token 的地方，替换为该工具函数

utils/token.js文件

```js
const TOKEN_KEY = 'geek_pc'

const getToken = () => localStorage.getItem(TOKEN_KEY)
const setToken = token => localStorage.setItem(TOKEN_KEY, token)
const clearToken = () => localStorage.removeItem(TOKEN_KEY)

export { getToken, setToken, clearToken }
```

二、持久化设置

在登录Mobx文件中，将获取到的token保留一份到本地

修改store/login.Store.js文件

```js
// 登录模块
import { makeAutoObservable } from "mobx"
import { setToken, getToken, clearToken, http } from '@/utils'

class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  login = async ({ mobile, code }) => {
    const res = await http.post('xxxx', {
      mobile,
      code
    })
    this.token = res.data.token
    setToken(res.data.token)
  }
}
export default LoginStore
```

三、在请求拦截器上注入token

也就是在请求拦截上，添加token判断

```js
http.interceptors.request.use(config => {
  // if not login add token
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### 路由鉴权功能实现

路由鉴权，当token过期时，就跳转到登录页面，当token没过期时，返回到子组件。

思路：使用高阶组件将子组件包裹起来，判断token过期与否，过期就跳转到登录页面。

在高阶组件中，将子组件当做参数传入。

实现步骤：

1. 在 components 目录中，创建 AuthRoute/index.js 文件

2. 判断是否登录

3. 登录时，直接渲染相应页面组件

4. 未登录时，重定向到登录页面

5. 将需要鉴权的页面路由配置，替换为 AuthRoute 组件渲染

代码实现：`components/AuthRoute/index.js`

```js
// 高阶组件:把一个组件当成另外一个组件的参数传入 然后通过一定的判断 返回新的组件
import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

function AuthRoute ({ children }) {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace />
  }
}
export { AuthRoute }
```

**2、修改app.js中页面跳转部分**

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