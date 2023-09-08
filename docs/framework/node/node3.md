## node常见命令

npm英文全称：node package manager，npm 为你和你的团队打开了连接整个 JavaScript 天才世界的一扇大门。它是世界上最大的软件注册表，每星期大约有 30 亿次的下载量，包含超过 600000 个 包（package） （即，代码模块）。来自各大洲的开源软件开发者使用 npm 互相分享和借鉴。包的结构使您能够轻松跟踪依赖项和版本。 我们平时开发项目都是需要使用npm下载依赖，常见的npm命令总结如下：

npm -v：查看npm版本。

npm init：初始化后会出现一个package.json配置文件。可以在后面加上-y ，快速跳过问答式界面。

npm install：会根据项目中的package.json文件自动下载项目所需的全部依赖。

npm install 包名 --save-dev(npm install 包名 -D)：安装的包只用于开发环境，不用于生产环境，会出现在package.json文件中的devDependencies属性中。

npm install 包名 --save(npm install 包名 -S)：安装的包需要发布到生产环境的，会出现在package.json文件中的dependencies属性中。

npm list：查看当前目录下已安装的node包。

npm list -g：查看全局已经安装过的node包。

npm --help：查看npm帮助命令。

npm update 包名：更新指定包。

npm uninstall 包名：卸载指定包。

npm config list：查看配置信息。

npm 指定命令 --help：查看指定命令的帮助。

npm info 指定包名：查看远程npm上指定包的所有版本信息。

npm config set registry https://registry.npm.taobao.org： 修改包下载源，此例修改为了淘宝镜像。

npm root：查看当前包的安装路径。

npm root -g：查看全局的包的安装路径。

npm ls 包名：查看本地安装的指定包及版本信息，没有显示empty。

npm ls 包名 -g：查看全局安装的指定包及版本信息，没有显示empty。