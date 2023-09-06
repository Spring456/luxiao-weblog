## HTTP初了解

HTTP相关知识更加详细的了解请参考这里：

[HTTP相关知识](https://spring456.github.io/web_docs.github.io/#/Tools/GoodArticle/?id=http%e7%9b%b8%e5%85%b3)

这篇文章只是对HTTP做简单的了解。

### TCP/IP协议族

TCP/IP 协议族是Internet最基本的协议，HTTP协议是它的一个子集。按层次可以分为四层：`应用层、传输层、网络层、链路层`。

**1、应用层**

> 应用层规定了向用户提供应用服务时通信的协议

FTP（File Transfer Protocol，文件传输协议）、DNS（Domain Name System，域名系统，提供域名）以及HTTP协议

**2、传输层**

> 传输层对接上层应用层，提供处于网络连接中两台计算机之间的数据传输所使用的协议。

在传输层有两个性质不同的协议：TCP（Transmission Control Protocol，传输控制协议）和UDP（User Data Protocol，用户数据报协议）。

**3、网络层**

网络层规定了数据通过怎样的传输路线到达对方计算机传送给对方（IP协议等）。

**4、链路层(连接层)**

用来处理连接网络的硬件部分，包括控制操作系统、硬件的设备驱动、NIC（Network Interface Card，网络适配器，即网卡），及光纤等物理可见部分（还包括连接器等一切传输媒介）。硬件上的范畴均在链路层的作用范围之内

### HTTP概念

> HTTP —— 超文本传输协议。web通信从客户端到服务器一系列运作流程是以HTTP协议作为规范。

HTTP协议定义了Web客户端如何从Web服务器请求Web页面，以及服务器如何把Web页面传送给客户端。


参考文章：


















