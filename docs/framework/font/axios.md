## vue中的axios配置

### axios简介

> Axios 是一个基于 promise 的 HTTP 库

axios最后返回的是一个对象，底层逻辑还是基于ajax的`XMLHttpRequest对象`。只是基于promise封装的库

因为最终返回的是一个对象，所以在vue项目中，下载axios后不需要使用Vue.use()引入.

可以在每个组件里直接引入`import axios from 'axios'`后使用。也可以全局注册挂载到VUE实例上。使用别名调用axios。`Vue.prototype.$axios = axios`。在项目中使用`this.$axios`

[axios中文文档](http://www.axios-js.com/zh-cn/docs/)

### axios原理

createInstance底层根据默认设置 新建一个Axios对象， axios中所有的请求[axios, axios.get, axios.post等...]内部调用的都是Axios.prototype.request,将Axios.prototype.request的内部this绑定到新建的Axios对象上,从而形成一个axios实例。新建一个Axios对象时，会有两个拦截器，request拦截器，response拦截器。

### axios配置要点

axios配置主要是`axios.creat()`、拦截器以及取消请求

`axios.creat()`

```js
// 使用由库提供的配置的默认值来创建实例
// 此时超时配置的默认值是 `0`
var instance = axios.create();

// 覆写库的超时默认值
// 现在，在超时前，所有请求都会等待 2.5 秒
instance.defaults.timeout = 2500;

// 为已知需要花费很长时间的请求覆写超时设置
instance.get('/longRequest', {
  timeout: 5000
});
```

拦截器

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```
拦截器经常用来做导航守卫，权限控制等。在向服务器发送请求之前或响应的时候做的操作。

取消请求

```js
cancelToken: source.token
// 传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token
cancelToken: new CancelToken(function executor(c) {
  // executor 函数接收一个 cancel 函数作为参数
  cancel = c;
})
```

### 简单的axios封装

```js
import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: baseURL, 
  timeout: 30000 
})

// request interceptor
// 请求之前拦截
service.interceptors.request.use(
  config => {
    // 验证token
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// response interceptor
// 响应时拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status === 200) {
      return res
    } else if (res.status === 401) {
      router.push({ path: '/login' })
    } else {
      return Promise.reject(error)
    }
  },
  error => {
    return Promise.reject(error)
  }
)
export default service
```

