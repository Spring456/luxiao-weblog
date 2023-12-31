## webpack打包过后文件依然很大怎么办？

`1、去除不必要的插件`

可以去除为了方便开发而下载的插件，比如HotModuleReplacementPlugin、NoErrorsPlugin

`2、配置全局变量`

告诉 webpack 我要发布 production 了,按照 production 方式去打包

```
   new webpack.DefinePlugin({
        'process.env': {
            //注意一个单引号一个双引号…… 这里是要将 "production" 替换到文件里面
            NODE_ENV: '"production"'
        }
    })
```

`3、设置devtool 中的 source-map。`

在production环境打包的时候关闭 devtool.

如果在线上使用 source-map, 可以配置为

devtool: "#source-map",

这样只会在文件后面跟一个 url,这样对源文件影响就很小了


`4、使 css 剥离 js 文件, 将 css 单独打包。`

依赖插件 npm install --save-dev extract-text-webpack-plugin 先安装再使用

```js
    var ExtractTextPlugin = require('extract-text-webpack-plugin');
    
    //在 plugins 中配置
    plugins: [ new ExtractTextPlugin('[name].[contenthash].css') ]
```
把 css 单独打包出来，免得以后只修改 css 导致 浏览器端 js 的缓存也失效了。
这里使用了 contenthash, webpack 会按照内容去生成 hash 值。

`5、压缩, 去除注释`

```js
    //在 plugins 中添加
    new webpack.optimize.UglifyJsPlugin({
        comments: false,        //去掉注释
        compress: {
            warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
        }
    })
```

`6、开启 gzip 压缩`

依赖插件 npm install --save-dev compression-webpack-plugin

git 地址：compression-webpack-plugin

```js
    var CompressionWebpackPlugin = require('compression-webpack-plugin');

    //在 plugin 中添加
    new CompressionWebpackPlugin({ //gzip 压缩
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
            '\\.(js|css)$'    //压缩 js 与 css
        ),
        threshold: 10240,
        minRatio: 0.8
    })
```

实际工作中，使用gzip压缩时，会碰到打包不成功的情况，报错如下：

```js
 throw new _ValidationError.default(errors, schema, configuration);
    ^

ValidationError: Invalid options object. Compression Plugin has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'asset'. These properties are valid:
```

解决如下：

1、修改config/index.js
```js
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

```

1、productionGzip默认为false，将它设置为true

2、安装compression-webpack-plugin插件

3、npm install --save-dev compression-webpack-plugin安装成功后，执行npm run build却出现报错

4、根据报错信息，修改webpack.prod.conf.js中的配置（asset 改为 filename）

5、再次执行npm run build，仍然有出现报错

可能与插件的版本有关

先卸载高版本，再安装指定版本

```js
npm uninstall --save-dev compression-webpack-plugin
npm install --save-dev compression-webpack-plugin@1.1.12
```
打包成功

如果打包后js、css文件生成hash串的后缀，则test: new RegExp( '\\.(' + config.build.productionGzipExtensions.join('|') + ')$' ) 匹配不到任何文件，导致不能压缩任何文件。此时应去掉正则表达式的$

使用gzip打包后，服务器也要相应的配置gzip，


`7、压缩 html, 自动添加上面生成的静态资源。`

依赖插件 npm install --save-dev html-webpack-plugin

```js
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    
    new HtmlWebpackPlugin({
        filename: 'react.html',    //生成的文件，从 output.path 开始 output.path + "/react.html"
        template: '../client/react.html',  //读取的模板文件,这个路径是相对于当前这个配置文件的
        inject: true, // 自动注入
        minify: {
            removeComments: true,        //去注释
            collapseWhitespace: true,    //压缩空格
            removeAttributeQuotes: true  //去除属性引用
            // more options:
            // https://github.com/kangax/html-minifier#options-quick-reference
        },
        //必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
        chunksSortMode: 'dependency'
    })
```

### 8、使用tree-shaking

> 别名叫树摇，作用是删除无用的代码优化代码体积

> 更关注于无用模块的消除，引用了但那些没有被使用的模块会被消除

比如说我们引入了插件库loadsh,使用了其中的10个方法，其他的方法并没有使用。没有使用tree-shaking时，打包的时候就会所有方法都打包，这样体积过大。如果使用了tree-shaking，就可以只打包那10个方法，其他无用代码就不会打包，减少体积。

如果是webpack 5，mode为production时，这个会自动生效。

tree-shaking的基础是ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析。所以在commonJS是不支持的，因为require是动态的。

`原理：`

tree-shaking 的实现一是先标记出模块导出值中哪些没有被用过，二是使用Terser插件 提供的 DCE 功能删掉这些没被用到的导出语句


### 9、图片压缩

使用`image-webpack-loader`,文档地址

> https://www.npmjs.com/package/image-webpack-loader

```js
module: {
    rules: [
                { 
                    {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    use:[
                        {
                        loader: 'url-loader',
                        options: {
                          limit: 10000,//设置为0的话，就不会转为base64
                          name: utils.assetsPath('img/[name].[hash:7].[ext]')
                          }
                        },
                        {
                          loader: 'image-webpack-loader',// 压缩图片
                          options: {
                            mozjpeg:{
                                quality:50//1-100
                            },
                            pngquant:{
                                speed:2//1-11 值越大，越小
                            }
                        }
                    }
                ]
            }
        },
    ]
}

```

