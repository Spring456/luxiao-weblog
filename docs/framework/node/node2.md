## node模块的导入导出

在编写每个模块时，都有require、exports、module三个预先定义好的变量可供使用。

### Node.js中模块的分类：

1、Node.js中模块的分类：

2、自己定义的模块；

3、第三方的模块（npm下载下来的）； 

### require

require函数用来在一个模块中引入另外一个模块。传入一个模块名，返回一个模块导出对象。

通过npm下载的第三方包，我们在项目中引入第三方包都是：let xx = require('第三方包名')



作用;

1、执行导入的模块中的代码；

2、返回导入模块中的接口对象； 

用法：

```js
let cc = require("模块名.js") 
```

其中模块名可以用绝对路径也可以用相对路径,模块的后缀名.js可以省略。

require方法加载第三方包的原理机制是什么

1、require('第三方包名')优先在加载该包的模块的同级目录node_modules中查找第三方包。

> let template = require('art-template') //加载第三方包

2、找到该第三方包中的package.json文件，并且找到里面的main属性对应的入口模块，该入口模块即为加载的第三方模块。

3、如果在要加载的第三方包中没有找到package.json文件或者是package.json文件中没有main属性，则默认加载第三方包中的index.js文件。

4、如果在加载第三方模块的文件的同级目录没有找到node_modules文件夹，或者以上所有情况都没有找到，则会向上一级父级目录下查找node_modules文件夹，查找规则如上一致。

5、如果一直找到该模块的磁盘根路径都没有找到，则会报错：can not find module xxx。

### exports

exports类似于ES6中的export的用法，用来导出一个指定名字的对象。

exports对象用来导出当前模块的`公共方法或属性`，别的模块通过require函数使用当前模块时得到的就是当前模块的exports对象

用法：

```js
function add(){
  let i =0;
  console.log(i)
}
exports.add=add
```

Node中，每个模块都有一个exports接口对象，我们需要把公共的方法或者字符串挂载在这个接口对象中，其他的模块才可以使用。

Node.js中只有模块作用域，默认两个模块之间的变量，方法互不冲突，互不影响，这样就导致一个问题，我们怎样使用加载进来的模块中的方法呢？这就需要在另外一个模块exports接口对象中挂载模块中公共的方法。

### module.exports

module.exports用来导出一个默认对象，没有指定对象名，常见于修改模块的原始导出对象。

```js
module.exports = function () {
  console.log('hello world！')
}
```

对于上面的例子，我们同样可以利用module.exports来写，最终得到的效果是一样的,只需把暴露的方式改成如下：

```js
module.exports.add = add  
```

### 主模块

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，main.js就是主模块。

比如我们有一个hello.js文件

```js
var a = 1;
​
function add () {
  return ++a;
}
exports.add = add
```

我们在主模块main.js中引入hello.js

```js
let add1 = require('./hello.js')
console.log(add1.add())//2
```

在命令行执行该文件`node main.js`