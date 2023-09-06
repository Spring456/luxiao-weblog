## webpack代码压缩插件介绍

### 为什么要进行代码压缩

代码压缩的好处有：

1、压缩后的代码体积更小，代码编译速度更快；提升网页性能和网络传输流量

2、混淆代码。压缩后的代码在命名，逻辑上都做了处理，不用担心别人下载代码后反编译。

### JS压缩--UglifyJS

JS压缩工具：`UglifyJS`

作用：分析JS代码语法树，去掉无效代码，去掉日志输出代码，缩短变量名等。

在webpack 4版本中，`uglifyjs-webpack-plugin` 是被默认集成在生产模式中的，所以，默认打包出的 JS 文件就是压缩好的。如果想自定义配置就需要修改`uglifyjs-webpack-plugin`配置了。

1、安装

```js
npm install uglifyjs-webpack-plugin --save-dev
```

2、添加到webpack配置中

```js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
};
```

3、修改配置

UglifyJS还可以配置，实现删除console和注释的目的

```js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,//匹配的文件
        include:'',//要被处理的文件
        exclude:''//不需要处理的文件
        cache:true//启动文件缓存，默认为false
        parallel:true,//是否使用多进程以提高构建速度。默认为false
        sourceMap:false//资源地图，默认为false
        // 删除注释
        output:{
          comments:false
        },
        // 删除console和debugger警告
        compress:{
          warnings:false,
          drop_debugger:true,
          drop_console:true
        }
        chunkFilter: (chunk) => {//判断哪些chunk可以被压缩，默认所有的chunk都会被压缩
          // `vendor` 块不压缩
          if (chunk.name === "vendor") {
            return false;
          }

          return true;
        },
      }),
    ],
  },
};
```





UglifyJS更多配置项可参考：[UglifyJS](https://github.com/mishoo/UglifyJS#minify-options)

### CSS压缩--CssMinimizerWebpackPlugin

使用`CssMinimizerWebpackPlugin`插件，可以优化和压缩CSS，支持缓存和并发模式下运行

1、安装

```js
npm install css-minimizer-webpack-plugin --save-dev
```

2、webpack中使用

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  // ...
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
```

### HTML压缩--HtmlWebpackPlugin

使用`HtmlWebpackPlugin`插件

1、安装

```js
npm install --save-dev html-webpack-plugin
```

2、在webpack中配置

```js
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  plugins: [new HtmlWebpackPlugin()],
};
```

3、自定义配置

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  optimization: {
    minimizer: [
      new HtmlWebpackPlugin({
        template:'',//模板路径，默认会去找src/index.js是否存在
        filename:'',//输出文件的名称，默认为index.html
        inject:true,//是否将资源注入到模板中，默认为true
        minify:''//压缩参数。在生产模式下（production），默认为 true；否则，默认为false。
      }),
    ],
  },
};
```

更多配置项：[html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin#minification)
