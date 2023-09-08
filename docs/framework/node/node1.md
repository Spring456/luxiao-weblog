## node的安装和介绍

Node.js 不是一门语言也不是框架，它只是基于 Google V8 引擎的 JavaScript 运行时环境，同时结合 Libuv 扩展了 JavaScript 功能，使之支持 io、fs 等只有语言才有的特性，使得 JavaScript 能够同时具有 DOM 操作(浏览器)和 I/O、文件读写、操作数据库(服务器端)等能力，是目前最简单的全栈式语言。

可以简单理解Node.js是一个内置有chrome V8引擎的JavaScript运行环境，他可以使原本在浏览器中运行的JavaScript有能力跑后端，从而操作我们数据库，进行文件读写等。

### Node.js特点

事件驱动

非阻塞IO模型（异步）

轻量和高效 

### 安装方法

简单的安装方式是直接官网下载，然后本地安装即可。官网地址：[nodejs.org](nodejs.org)

2、测试是否安装成功

打开终端，键入命令node，如果进入命令行式js交互环境，即安装成功

3、注意

Node.js使得JavaScript可以脱离浏览器的窗口，独立运行在Node.js提供的环境中，所以Node.js中没有BOM，DOM这些概念。Node.js中根本没有页面，主要是进行一些服务器上的操作（比如：读写文件，网络通信...）