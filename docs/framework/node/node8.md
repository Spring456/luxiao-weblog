## 静态服务器定义

能够根据需要请求的文件，原封不动的将服务器磁盘中的数据直接返回给到浏览器。

1、根据设定的目录，判断用户是否请求的文件时静态文件

```js
//解析路径
let urlObj = path.parse(req.url)
//判断是否请求静态文件
urlObj.dir=='/static'
```

2、从磁盘读取静态文件并返回

```js
//根据请求的后缀名，返回文件的类型
res.setHeader("content-type",getContentType(urlObj.ext))
//从服务器磁盘中读取文件，并输出到响应对象中
let rs = fs.createReadStream('./static/'+urlObj.base)
rs.pipe(res)
```

3、如何根据后缀名返回文件类型

```js
function getContentType(extName){
    switch(extName){
        case ".jpg":
            return "image/jpeg";
        case ".html":
            return "text/html;charset=utf-8";
        case ".js":
            return "text/javascript;charset=utf-8";
        case ".json":
            return "text/json;charset=utf-8";
        case ".gif":
            return "image/gif";
        case ".css":
            return "text/css"
    }
}
```

完整案例

```js
//引入http模块
let http = require('http');
//创建server对象
let server = http.createServer()
//引入path模块
let path = require('path')
//引入文件模块
let fs = require('fs')
//监听客户端发送过来的请求
//req请求对象包含了请求的相关的信息
//res对象用于响应内容，可以通过这个对象帮助我们快速实现HTTP响应
server.on('request',function(req,res){
    //解析路径
    let urlObj = path.parse(req.url)
    //识别请求的路径
    //console.log(urlObj)
    //进入首页，返回首页的内容
    if(req.url=="/"){
        res.setHeader("content-type","text/html;charset=utf-8")
        res.end(`<link rel="stylesheet" href="./static/style.css"><h1>首页</h1><img src='./static/cxk.jpg'>`)
    }else if(urlObj.dir=='/static'){
        res.setHeader("content-type",getContentType(urlObj.ext))
        let rs = fs.createReadStream('./static/'+urlObj.base)
        rs.pipe(res)
    }else{
        
        res.setHeader("content-type","text/html;charset=utf-8")
        res.end("<h1>404页面找不到</h1>")
    }
    
})
​
​
function getContentType(extName){
    switch(extName){
        case ".jpg":
            return "image/jpeg";
        case ".html":
            return "text/html;charset=utf-8";
        case ".js":
            return "text/javascript;charset=utf-8";
        case ".json":
            return "text/json;charset=utf-8";
        case ".gif":
            return "image/gif";
        case ".css":
            return "text/css"
    }
}
​
​
​
//启动服务器，监听服务端口
server.listen(80,function(){
    console.log("服务已启动：http:127.0.0.1")
})
```

### 根据规则去解析链接，并且获取ID或者时索引值

1、根据规则去解析链接，并且获取ID或者时索引值

```js
//请求路径：http://127.0.0.1/movies/0
let index = req.pathObj.base;
```

2、根据索引获取数据

```js
let movies = [
         {
            name:"雪暴",
            brief:"电影《雪暴》讲述了在一座极北的边陲小镇，一伙穷凶极恶、作案手法老到的悍匪为抢夺黄金，打劫运金车，并借助大雪掩盖了所有犯罪痕迹。为了探求真相，警察王康浩暗地里搜集证据，熟悉地形，终于在一场灾难级的暴雪降临时，与谋财害命的悍匪发生了惊心动魄的正面对决……",
            author:"张震"
         },{
             name:"少年的你",
             brief:"陈念（周冬雨 饰）是一名即将参加高考的高三学生，同校女生胡晓蝶（张艺凡 饰）的跳楼自杀让她的生活陷入了困顿之中。胡晓蝶死后，陈念遭到了以魏莱（周也 饰）为首的三人组的霸凌，魏莱虽然表面上看来是乖巧的优等生，实际上却心思毒辣，胡晓蝶的死和她有着千丝万缕的联系。",
             author:"周冬雨 "
         }
     ]
let pageData = movies[index]
```

3、根据模板渲染页面

```js
res.render(movies[index],'./template/index.html')
```

4、底层需要实现渲染函数，通过正则匹配，找到需要修改的地方进行一一的修改。

```js
function render(options,path){
    fs.readFile(path,{encoding:"utf-8",flag:"r"},(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(data)
            let reg = /\{\{(.*?)\}\}/igs
            let result;
            while(result = reg.exec(data)){
                //去除2边的空白
                let strKey = result[1].trim()
                let strValue = options[strKey]
                data = data.replace(result[0],strValue)
            }
​
            this.end(data)
        }
    })
}
```

