## webpack打包原理和流程是怎样的？

### webpack构建流程

Webpack 的运行流程是一个串行的过程,从启动到结束会依次执行以下流程 :

`1、初始化参数`：生成options (将webpack.config.js和shell中的参数，合并中options对象)

`2、开始编译`：实例化complier对象 （webpack全局的配置对象，包含entry，output，loader，plugins等所有配置信息）

`3、实例化Compilation对象`：compiler.run方法执行，开始编译过程，生成Compilation对象

`4、编译模块`：分析入口js文件，调用AST引擎(acorn)处理入口文件，生成抽象语法树AST，根据AST构建模块的所有依赖

`5、完成模块编译`：通过loader处理入口文件的所有依赖，转换为js模块，生成AST，继续遍历，构建依赖的依赖，递归，直至所有依赖分析完毕

`6、输出资源`：对生成的所有module进行处理，调用plugins，合并，拆分，生成chunk

`7、输出完成`：将chunk生成为对应bundle文件，输出到目录




