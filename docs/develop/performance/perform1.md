## webpack 性能调优与 Gzip 原理

### 网络层面的优化对象

从输入 URL 到显示页面这个过程中，涉及到网络层面的，有三个主要过程：DNS解析、TCP连接、HTTP请求/响应

对于 DNS 解析和 TCP 连接两个步骤，我们前端可以做的努力非常有限。相比之下，HTTP 连接这一层面的优化才是我们网络优化的核心。

HTTP 优化有两个大的方向：减少请求次数、减少单次请求花费的时间

这两个优化点指向开发中非常常见的操作---资源的压缩和合并

### webpack优化方案

webpack的优化思路是：webpack的构建过程太花时间、webpack打包的结果体积太大

1、构建过程提速策略

不要让loader做太多事情 --- 比如babel-loader

最常见的优化方式是，用 include 或 exclude 来帮我们避免不必要的转译，

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```
上面是通过限定文件范围的方法来进行性能提升。除此之外，如果我们选择开启缓存将转译结果缓存至文件系统，我们只需要为 loader 增加相应的参数设定：

```js
loader: 'babel-loader?cacheDirectory=true'
```

2、不要放过第三方库

第三方库以 node_modules 为代表，它们庞大得可怕，却又不可或缺。其中，Externals 不够聪明，一些情况下会引发重复打包的问题；而 CommonsChunkPlugin 每次构建时都会重新构建一次 vendor；出于对效率的考虑，这里为大家推荐 DllPlugin。

DllPlugin 是基于 Windows 动态链接库（dll）的思想被创作出来的。这个插件会把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。`这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包。`

用 DllPlugin 处理文件，要分两步走：

a、基于 dll 专属的配置文件，打包 dll 库

b、基于 webpack.config.js 文件，打包业务代码

参考文章:[DllPlugin](https://webpack.html.cn/plugins/dll-plugin.html)

3、Happypack——将 loader 由单进程转为多进程

webpack 是单线程的，就算此刻存在多个任务，你也只能排队一个接一个地等待处理,Happypack 会充分释放 CPU 在多核并发方面的优势，帮我们把任务分解给多个子进程去并发执行，大大提升打包效率。

HappyPack 的使用方法也非常简单，只需要我们把对 loader 的配置转移到 HappyPack 中去就好，我们可以手动告诉 HappyPack 我们需要多少个并发的进程：

```js
const HappyPack = require('happypack')
// 手动创建进程池
const happyThreadPool =  HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.js$/,
        // 问号后面的查询参数指定了处理这类文件的HappyPack实例的名字
        loader: 'happypack/loader?id=happyBabel',
        ...
      },
    ],
  },
  plugins: [
    ...
    new HappyPack({
      // 这个HappyPack的“名字”就叫做happyBabel，和楼上的查询参数遥相呼应
      id: 'happyBabel',
      // 指定进程池
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']
    })
  ],
}
```

4、构建结果体积压缩--文件结构可视化，找出导致体积过大的原因

使用插件--`webpack-bundle-analyzer`

在使用时，我们只需要将其以插件的形式引入：

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

5、删除冗余代码---Tree-Shaking

webpack 原生支持了 ES6 的模块系统，并基于此推出了 Tree-Shaking

基于 import/export 语法，Tree-Shaking 可以在编译的过程中获悉哪些模块并没有真正被使用，这些没用的代码，在最后打包的时候会被去除。

6、按需加载

路由、组件的按需加载

7、Gzip压缩

具体的做法非常简单，只需要你在你的 request headers 中加上这么一句：

```
accept-encoding:gzip
```

Gzip 的内核就是 Deflate，目前我们压缩文件用得最多的就是 Gzip。可以说，Gzip 就是 HTTP 压缩的经典例题。

Gzip 压缩背后的原理，是在一个文本文件中找出一些重复出现的字符串、临时替换它们，从而使整个文件变小。根据这个原理，文件中代码的重复率越高，那么压缩的效率就越高，使用 Gzip 的收益也就越大。反之亦然。



