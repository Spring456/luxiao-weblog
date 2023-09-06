## react配置别名

### react配置

使用`create-react-app`脚手架搭建的react项目，工程化的配置都隐藏在了`react-scripts`包中了，在项目里是看不到相关配置的，如果要修改默认配置，有两种方案：

1、使用`yarn eject`命令，释放`react-scripts`中的所有配置到项目中。

2、通过第三方库来修改，比如`@craco/craco`.(推荐)

如果使用`yarn eject`来实现，这是不可逆的操作，也就是如果释放了`react-scripts`的配置，是不可以再包装起来的。因此不推荐，推荐使用第三方库`@craco/craco`来实现,如果以后有一些项目配置，也可以在这个js里面实现。

### 使用`@craco/craco`

使用步骤：

1、安装`@craco/craco`包。执行`yarn add -D @craco/craco`

2、在项目根目录中创建 craco 的配置文件：craco.config.js，并在配置文件中配置路径别名

3、修改 `package.json `中的脚本命令--主要修改`script`对象的执行命令

4、在代码中使用`@`来表示src的绝对路径

5、重启项目，让配置生效

实现：

**craco.config.js**

```js
const path = require('path')

module.exports = {
  // webpack 配置
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src')
    }
  }
}
```

package.json配置修改

```js
// 将 start/build/test 三个命令修改为 craco 方式
"scripts": {
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
  "eject": "react-scripts eject"
}
```

### 安装不生效的原因

有时安装了`@craco/craco`，但不生效。这是因为版本问题。需要降低react-scripts 依赖包至4.0.0版本然后再执行`yarn add -D @craco/craco`

### @别名提示问题

使用vscode开发时，在代码里使用`@`符号，但编辑器没有提示，需要配置vscode提示

1、在项目根目录新建`jsconfig.js`配置文件

2、添加配置

```js
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

vscode会自动读取jsconfig.json 中的配置，让vscode知道@就是src目录