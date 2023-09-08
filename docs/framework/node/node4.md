## node中文件的读写操作

### 读取文件

我们在data文件夹下新建一个hello.txt，并且在里面写入：hello， node.js!! ，如图：

我们在hello.txt同级目录下创建一个hello.js文件，我们在这个js文件中利用Node提供的文件操作API, 读取hello.txt文件中的内容。
node中对文件相关的操作需要依赖fs模块，这个是node中内置模块之一，我们需要引入`fs模块`，使用fs模块中`readFile方法`

`readFile函数`接受两个参数：读取文件路径，回调函数（error，data两个参数），
读取文件成功：data为文件内容，error为null，读取失败：error为错误对象，data为undefined。 

```js
let fs = require('fs')
fs.readFile('./hello.txt', (error, data) => {
  console.log(data.toString())
})
```

### 写入文件

写入文件。使用fs模块中`writeFile`方法，接受三个参数：写入文件路径，写入内容，回调函数。

写入成功时候：error为null，写入失败时候：error为错误对象

### 删除文件

> fs.unlink(path, callback)

其中path - 文件路径。callback - 回调函数，没有参数。

```js
var fs = require("fs");
console.log("准备删除文件！");
fs.unlink('input.txt', function(err) {
   if (err) {
       return console.error(err);
   }
   console.log("文件删除成功！");
});
```

```js
$ node file.js 
准备删除文件！
文件删除成功！
```

### 创建目录

> fs.mkdir(path[, options], callback)

参数说明：

path - 文件路径。

options 参数可以是：recursive - 是否以递归的方式创建目录，默认为 false。mode - 设置目录权限，默认为 0777。

callback - 回调函数，没有参数。

```js
var fs = require("fs");
// tmp 目录必须存在
console.log("创建目录 /tmp/test/");
fs.mkdir("/tmp/test/",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("目录创建成功。");
});
```

```js
$ node file.js 
创建目录 /tmp/test/
目录创建成功。
```

可以添加 recursive: true 参数，不管创建的目录 /tmp 和 /tmp/a 是否存在：

```js
fs.mkdir('/tmp/a/apple', { recursive: true }, (err) => {
  if (err) throw err;
});
```

### 读取目录

> fs.readdir(path, callback)

path - 文件路径。

callback - 回调函数，回调函数带有两个参数err, files，err 为错误信息，files 为 目录下的文件数组列表。

```js
var fs = require("fs");
​
console.log("查看 /tmp 目录");
fs.readdir("/tmp/",function(err, files){
   if (err) {
       return console.error(err);
   }
   files.forEach( function (file){
       console.log( file );
   });
});
```

### 删除目录

> fs.rmdir(path, callback)

path - 文件路径。

callback - 回调函数，没有参数。

```js
var fs = require("fs");
// 执行前创建一个空的 /tmp/test 目录
console.log("准备删除目录 /tmp/test");
fs.rmdir("/tmp/test",function(err){
   if (err) {
       return console.error(err);
   }
   console.log("读取 /tmp 目录");
   fs.readdir("/tmp/",function(err, files){
      if (err) {
          return console.error(err);
      }
      files.forEach( function (file){
          console.log( file );
      });
   });
});
```