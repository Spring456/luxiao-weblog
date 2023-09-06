## 建立项目的api层

### 原因

以前将请求地址写在vue页面上，当需要修改某一处api的字段时，需要查找对应的页面，修改那一处的代码。如果api引用过多，用到的每个页面都需要修改，比较麻烦

### 思路

封装axios,建立api文件夹，按照业务分类建立各文件夹。然后在需要的页面上引入。

### 开始实现

`1、封装axios`

封装axios，主要就是利用axios提供的一些api，在请求之前和响应后的实体封装。新建axios.js

```js
import axios from 'axios'
// 初始化，创建axios的实例http，规定
const http = axios.creat({
  baseURL:'',//请求接口之前的地址，在vue.config.js或者webpack.config.js里配置
  timeout: 18000,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
})
// 请求之前
http.interceptors.request.use(
  config=>{
    // config，请求接口之前获取到的字段。通常在这里往请求头里面添加token，记录cookie时间等操作
    ...
    return config

  },
  error=>{
    return Promise.reject(error)
  }
  }
  // 响应的疯转
  http.interceptors.response.use(
    response=>{
      // 从接口获取的数据这里做处理，比如提示语等
      return Promise.resolve(response)
    },
    error=>{
      // 错误处理
      return Promise.reject(error.response.data)
    }
  )

  export default http;
```

`2、建立api`

新建api文件夹，文件夹下按照业务功能建立各个功能的文件夹，在每个功能文件下新建js文件,比如新建了getData文件夹，然后在其文件夹下新建了index.js文件

```js
import  axios  from "scripts/axios";//引入

export function getData(data) {
  return axios({
    url: '',//请求接口地址
    method: "get",//请求方式
  });
}
```

`3、使用`

有两种方式：第一种就是在每个需要使用这个接口的页面上使用import引入,然后在页面上直接使用即可

```js
import {getData} from '@/api/getData/index.js'//引入getData文件夹下的index.js文件
```

第二种方式，就是将再新建一个js文件，然后将所有的api文件全部在这个js文件中引入，最后在main.js中全部引入

