## react处理token失效--history包

### react中token失效

在项目中，如果token失效，后端返回的是401，在vue中，可以直接使用`this.$router.push`这种方法跳转回登录页面；但是在react中，是不能直接这么使用的。因为react中，没有组件实例，不能全局使用router

### 解决跳转

方案：需要安装一个history包，能够在非组件环境下拿到路由信息。

可见官方回答：https://github.com/remix-run/react-router/issues/8264[https://github.com/remix-run/react-router/issues/8264]

1、安装history包，`yarn add history`

2、创建history文件，并导出

3、在app.js中使用我们新建的路由并配置history参数

4、通过响应拦截器处理 token 失效，如果发现是401调回到登录页

代码实现：

创建history.js

```js

import { createBrowserHistory } from 'history'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
const history = createBrowserHistory()

export {
  HistoryRouter,
  history
}
```

修改app.js中路由跳转

原本app.js路由最外层的标签是`BrowserRouter`进行包裹，现在使用history就需要替换成`HistoryRouter`,并且给history属性

```js
function App() {
  return (
    <HistoryRouter history={history}>
    <div className="App">
      <Routes>
        {/* Layout 需要鉴权处理 */}
        {/* 这里的layout不能写死，要根据是否登录进行判断 */}
        <Route path='/' element={<AuthComponent>
          <Layout />
        </AuthComponent>}>
        {/* 二级路由默认页面 */}
          <Route index element={<Home />} />
          <Route path="article" element={<Article />} />
          <Route path="publish" element={<Publish />} />
        </Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
    </HistoryRouter>
    
  );
}
```

在axios.js拦截器中，就可以使用history了

```js
import { history } from './history'

http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      // 跳转到登录页
      history.push('/login')
    }
    return Promise.reject(error)
  }
)
```
