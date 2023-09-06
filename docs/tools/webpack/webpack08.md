## webpack的loader手动实现

### loader理解

Loader：对于某种文件(html，css,js，img等)进行统一处理。

webpack本身是为打包js的，识别不了html，css等非js文件，loader相当于文件加载器，加载资源文件，并对这些文件进行处理，将webpack不认识的内容转为认识的内容

### **loader的写法**

loader有其固定的写法，写在module对象的rules数组中，以对象的形式存在。

```javascript
module: {
    rules: [
      {
          test: /\.(jpg|png|gif)$/,//正则匹配图片文件。test表示让loader是用来处理哪种文件
          use:{
            loader:'url-loader',//loader名称，
            options:{}//loader的配置。比如说图片限制大小，limit,
          },
          exclude:'./node_modules',//指定不处理的文件.如果文件在node_modules里，就不处理
          include: './src/',//指定处理的文件夹
      }
    ]
  },
```
上面就是一个简单的loader写法


### **loader的特点**
1、处理一个文件可以使用多个loader，loader的执行顺序是和本身的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行

2、第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数。最后执行的loader会返回此模块的JavaScript源码

```js
rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
    ]
```

比如上面处理css的loader，其中`css-loader`接收源文件内容作为参数，它的返回值会给到`style-loader`，因为`style-loader`是最后一个loader，因此会返回处理css后的js代码。

### **loader的本质**

loader的本质就是一个函数。这个函数用来实现内容转换。

函数的参数接收上一个代码产生的结果或资源文件。

每个loader最后的结果要么是String类型要么是Buffer类型

因为，最后经过loader处理的结果要被解析为ast语法树，所以loader返回的是String类型或Buffer类型。

loader的写法，一个简单的loader

```js
function myLoader = function(source,map,meta){
  // 处理内容
  return xxx
}
module.exports = myLoader
```

上面就是一个简单的loader的写法，各个参数表示：

* source，({string|Buffer})，源文件的内容。

* map。{object}，可选。可以被 https://github.com/mozilla/source-map 使用的 SourceMap 数据

* meta,模块的元数据，可选.

需要注意的是，`该导出函数必须使用function`，不能使用箭头函数，因为loader编写过程中会经常使用到this访问选项和其他方法。

用图例来表示就是：

![loader](../media/webapck_loader.png)

### 创建一个loader

创建一个loader，让字符串反转

步骤：

`1、新建webpack-demo文件夹`

```js
mkdir webpack-loader-demo
```

`2、进入目录，执行`npm init -y`命令，进行初始化,生成package.json文件`

```js
{
  "name": "wepack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "webpack": "^5.72.0"
  },
  "devDependencies": {
    "webpack-cli": "^4.9.2"
  }
}
```

`3、安装webpack和webpack-cli`

> $ npm i webpack webpack-cli -D

`4、安装完成，新建dist文件夹，入口js文件,webpack.config.js文件,my.txt等`,目录结构如下：

```js
├─ dist
│  └─ index.html//入口html文件
├─ loaders
│  └─ myLoader.js//loader处理逻辑
├─ package-lock.json
├─ package.json
├─ src
│  ├─ my.txt//需要处理的txt文件
│  └─ index.js//入口js文件
└─ webpack.config.js//webpack配置文件
```
`5、先配置webpack.config.js文件`

```js
const path = require("path");

module.exports = {
  entry: "./src/index.js",//入口文件
  output: {
    filename: "bundle.js",//输出文件
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: ["myLoader"],//loader文件名字
      },
    ],
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, "node_modules"),//这是默认的解析路径
      path.resolve(__dirname, "loaders"),//指定本地loader的解析路径
    ],
  },
};
```

`6、分别在入口js文件和入口html文件,写上对应的逻辑`

dist/index.html

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Webpack Loader</title>
</head>
<body>
    <p id="box"></p>
    <script src="./bundle.js"></script>
</body>
</html>
```

从刚才的webpack.config.js里，设置了最后打包的js文件为bundle.js，最后将txt内容展现在p标签上。

src/index.js

```js
import Data from "./data.txt"//引入txt文件
const msgElement = document.getElementById("#box");//获取box的dom结构
msgElement.innerText = Data;//展示文件内容
```

src/my.txt

> 你好,世界

`7、在loader文件夹下的myLoader.js实现loader代码`

```js
function myLoader(content, map, meta) {
  if(content){
    content = content.split(',').reverse().join(',')
  }
  return `module.exports = '${content}'`;
}

module.exports = myLoader;
```

这里要特别注意：

如果这个loader是最后执行的loader，那么最后返回的是`module.exports = '${content}'`这种字符串形式。因为直接写字符串会报语法错误。这样写，能够被import引用后转换成可以使用的字符串。

`8、控制台运行`npx webpack`
`
最后控制台打印：

```js
asset bundle.js 4.52 KiB [compared for emit] (name: main)
runtime modules 937 bytes 4 modules
cacheable modules 171 bytes
  ./src/index.js 139 bytes [built] [code generated]
  ./src/data.txt 32 bytes [built] [code generated]
webpack 5.72.0 compiled successfully in 115 ms
```

我们打开dist/index.html，就可以看到  '世界,你好'


### loader调用顺序--从右到左调用

我们新增一个loader--myLoader2

```js
function myLoader2(content, map, meta) {
  console.log(content);
  if(content){
    content = `${content},myLoader2`
  }
  return content;
}
module.exports = myLoader2;
```

然后在webpack.config.js里添加myLoader

```js
rules: [
      {
        test: /\.txt$/,
        use: [
          'myLoader.js',
          'myLoader2.js'
        ]
      },
    ],
```

最后的运行结果是：`myLoader2,世界,你好`。从结果可以看到，多个loader的执行顺序是从右到左或从下往上执行。最后的最先执行。


### loader的特点

1、单一原则：每个loader只做一件事。如果实现一个效果有两个步骤，那需要两个loader。

2、链式调用: Webpack 会按顺序链式调用每个 Loader；

3、统一原则: 输入与输出均为字符串，各个 Loader 完全独立，即插即用；

4、运行在Node.js中，可以调用任意Node.js自带的API,或者安装第三方模块进行调用

5、loader有同步和异步之分

同步loader，可以通过retrun或this.callback()方式同步地返回转换后的结果；

异步loader，需要调用this.async()方法来获取callback函数。

this.callback()方法

```js
module.exports = function (source, map, meta) {
  this.callback(null, source + "-simple", map, meta);
  return; // 当调用 callback() 函数时，总是返回 undefined
};
```

this.callback()接收4个参数：

```js
this.callback(
  err: Error | null,    // 错误信息
  content: string | Buffer,    // content信息
  sourceMap?: SourceMap,    // sourceMap
  meta?: any    // 会被 webpack 忽略，可以是任何东西
);
```

异步loader---this.async()

```js
module.exports = function(source) {
   var callback = this.async();
   setTimeout(function() {
     callback(null, source + "-async-simple");
   }, 50);
};
```

### loader的运行时机

> 在webpack开始正式编译的时候，会找到入口文件，然后调用loader对文件进行处理，处理的时候会按照一定顺序对loader进行组合，然后一个个执行loader。执行完后会返回处理完的代码，是Buffer或String类型。然后webpack才开始真正的ast语法树解析。

这个一定顺序，就是loader的执行顺序，要么从下到上，要么从右到左

### 常见的loader

以下常见loader的原理摘抄自：[https://blog.csdn.net/qq_17175013/article/details/119425847](https://blog.csdn.net/qq_17175013/article/details/119425847)

1、babel-loader

主要原理：

> babel-loader的主要原理(面试点)就是：调动@babel/core这个包下面的transform方法，将源码通过presets预设来进行转换，然后生成新的代码、map和ast语法树传给下一个loader。这里的presets，比如@babel/preset-env这个预设其实就是各类插件的集合，基本上一个插件转换一个语法，比如箭头函数转换，有箭头函数转换的插件，这些插件集合就组成了预设。

2、file-loader

> file-loader的原理(面试点)就是通过laoder的参数拿到文件的内容，然后解析出file-loader配置中的名字，解析名字其实就是替换[hash]、[ext]等，然后向输出目录里输出一个文件，这个文件的内容就是loader的参数，名字就是刚刚说的解析出的名字。但是，实际上，并不是在loader里输出文件的，loader只是向webpack的complication的assets中，添加的文件id和内容，最终还是webpack将文件写进硬盘的。

3、url-loader

> url-loader是file-loader的升级版，内部包含了file-loader。url-loader配置的时候回配置一个limit，这个配置的值代表小于limit的值的时候，转成base64，大于的时候还是文件，比如说原本是图片，那大于limit就还是图片。

所以，url-loader主要就是先判断大小(内容的buffer的lenth)是否大于limit，大于就走file-loader，否则就用toStrng('base64')转成base64。

4、style-loader、css-loader、less-loader、sass-loader

less-loader的原理

> 主要是借助less模块的render方法，将less语法进行转换成css语法，然后返回或者额调用this.callback()传递给下一个loader。但是由于less-loader原本设计的时候，是想让less-loader可以作为最后一个loader使用的，所谓的最后一个loader，也就是说最后的返回值是一个js模块，也就是说module.exports = xxx这种，所以less-loader在返回结果的时候，将转换后的内容，外面套了一层module.exports = 转换后的内容。

那么这里变成了module.exports导出后，给到css-loader，css-loader只是处理了import、url等语法，将内容给到了style-loader，style-loader也就要跟着改变，因为style-loader的作用是创建一个style脚本，将css内容包裹在style标签中去，然后把style插入到document.head中。那么这里的关键就是拿到样式内容，这个内容刚才说了，被module.exports包裹了，那怎么拿到？直接require就可以了，因为module.exports本来就是js模块的导出格式，所以直接require就可以了。

实际上，在真正的style-loader、css-loader和less-loader的执行过程是这样的(面试点)：

​ 先执行loader的pitch函数，pitch函数是从左往右的，从上到下的，也就是先执行style-loader的pitch，这个函数主要是创建一个script脚本，这个脚本主要是创建一个style标签，style标签的innerHTML就是css样式，然后将style标签插入document.head中，然后将这个script脚本返回。注意，这边是有返回值的。pitch-loader一旦有返回值，那么后面的css-loader和less-loader都将不会直接，也不会执行当前loader的normal-loader，既然都不会执行了，那么style标签的css内容哪里来呢？其实，他在创建style标签后，它又require了css-loader和less-loader这两个内联loader，是走了内联loader才获取到的。内联loader从右往左，从下往上，也就是先执行less-loader，然后执行css-loader，最后将内容返给stylel-loader，这样才得到了css内容，赋值给style标签的innerHTML，然后插入到document.head中，这样才完成了整个样式的loader处理。

css-loader

> 其实less-loader已经转成css了，但是有些语法比如import、url还尚未处理，所以这个css-loader就是用来处理import、url等语法的，功能比较单一。

### 问题：安装sass-loader为什么要安装node-loader

sass-loader 是封装给 Webpack 用的，底层具体的编译器实现还是要靠 ruby-sass（已废弃） / node-sass（目前默认） / dart-sass（官方推荐） 这些。通俗来说就是前者依赖后者。