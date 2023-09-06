## Flutter列表组件

### 主要组件

使用`ListView`，然后在他的内部children中，使用了`widget数组`，因为是一个列表，所以它接受一个数组，然后有使用了`listTile`组件

也就是实现一个列表，有3层。分别是最外层使用`ListView`,然后children下使用`widget`数组，数组中使用`ListTile`来接收每个列表内容.

```dart
body: new ListView(
  children:<Widget>[
    new ListTile(
      leading:new Icon(Icons.access_time),
      title:new Text('access_time')
    )
  ]
),
```

对于`ListView`组件，有以下几个常用属性：

`1、scrollDirection`

Axis.horizontal 水平列列表

Axis.vertical 垂直列表(默认)

`2、padding`---内边距

`3、resolve`---组件反向排序

`4、children`---列表元素


其中对于`ListTile`组件，有这几个常用的属性：

1、leading----表示放在列表左边的图片

2、title----列表的标题

3、subtitle----列表的副标题

4、trailing----表示放在列表右边的图片

```dart
import 'package:flutter/material.dart';
import 'package:myflutter/Font.dart';
void main() {
  runApp(MaterialApp(
    home:Scaffold(
      appBar: AppBar(title: const Text('你好Flutter'),),
      body: const MyApp(),
    )
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key?key}):super(key:key);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: <Widget>[
         ListTile(
            leading: Icon(WxchatPay.weixin, size: 40, color: Colors.red),
            title: const Text('测试一',style:TextStyle(fontSize: 24.0,color: Colors.blue),),
            subtitle: const Text('测试副标题',style: TextStyle(fontSize: 18.0),),
            trailing:Image.asset('assets/images/11.jpg')
        ),
        const Divider(),
         ListTile(
          leading: Icon(WxchatPay.weixin, size: 40, color: Colors.red),
          title: const Text('测试二',style:TextStyle(fontSize: 24.0,color: Colors.red),),
          subtitle: const Text('测试副标题二',style: TextStyle(fontSize: 18.0),),
          trailing: Image.asset('assets/images/12.jpg'),
        ),
        const Divider(),
      ],
    );
  }
}
```

### 水平列表

设置`scrollDirection: Axis.horizontal`就可以实现水平列表。设置方向为水平方向时，列表中的高度属性就会失效，默认对齐父组件。因此在ListView外部增加一个Container，指定高度，这样ListView的高度就有了。

```dart
import 'package:flutter/material.dart';
import 'package:myflutter/Font.dart';
void main() {
  runApp(MaterialApp(
    home:Scaffold(
      appBar: AppBar(title: const Text('你好Flutter'),),
      body: const MyApp(),
    )
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key?key}):super(key:key);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200.0,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: <Widget>[
          Container(
            width: 200,
            child: ListView(
              children: <Widget>[
                ListTile(
                    leading: Icon(WxchatPay.weixin, size: 40, color: Colors.red),
                    title: const Text('测试一',style:TextStyle(fontSize: 24.0,color: Colors.blue),),
                    subtitle: const Text('测试副标题',style: TextStyle(fontSize: 18.0),),
                    trailing:Image.asset('assets/images/11.jpg',width: 60.0,height: 60.0,)
                ),
              ],
            ),
          ),
          Container(
                width: 200,
                child: ListView(
                  children: <Widget>[
                    ListTile(
                      leading: Icon(WxchatPay.weixin, size: 40, color: Colors.red),
                      title: const Text('测试二',style:TextStyle(fontSize: 24.0,color: Colors.red),),
                      subtitle: const Text('测试副标题二',style: TextStyle(fontSize: 18.0),),
                      trailing: Image.asset('assets/images/12.jpg',width: 60.0,height: 60.0,),
                    ),
                  ],
                ),
              )
        ],
      ),
    );
  }
}
```

实现水平列表，并且列表可以左右滑动

```dart
import 'package:flutter/material.dart';
import 'package:myflutter/Font.dart';
void main() {
  runApp(MaterialApp(
    home:Scaffold(
      appBar: AppBar(title: const Text('你好Flutter'),),
      body: const MyApp(),
    )
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key?key}):super(key:key);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 180,
      child: ListView(
        scrollDirection: Axis.horizontal,
        children: <Widget>[
          Container(
            width: 180.0,
            color: Colors.red,
          ),
          Container(
            width: 180,
            color: Colors.blue,
          ),
          Container(
            width: 180,
            color: Colors.orange,
          ),
          Container(
            width: 180,
            color: Colors.pink,
          )
        ],
      ),
    );
  }
}
```

### 动态列表，循环动态数据

1、使用for/map循环生成列表数据

```dart
import 'package:flutter/material.dart';
import 'myList.dart';
void main() {
  runApp(MaterialApp(
    home:Scaffold(
      appBar: AppBar(title: const Text('你好Flutter'),),
      body: const MyApp(),
    )
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({Key?key}):super(key:key);
  List<Widget> _getData(){
    List<Widget> list=[];
    for(int i=0;i<myList.length;i++){
      list.add(
         ListTile(
          leading: Icon(myList[i]['leadings'],size: 40, color: Colors.red),
          title:Text(myList[i]['title']),
          subtitle:Text(myList[i]['subTitle']),
        )
      );
    }
    return list;
  }
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: _getData()
    );
  }
}
```

其中myList的数据来源于myList.dart文件

```dart
import 'package:myflutter/Font.dart';
List myList=[
  {
    'leadings':WxchatPay.weixin,
    'title':'测试一',
    'subTitle':"测试一标题"
  },
  {
    'leadings':WxchatPay.weixin,
    'title':'测试二',
    'subTitle':"测试二标题"
  }
];
```

2、使用`ListView.builder`实现动态列表

使用`ListView.builder`实现动态列表就简单很多，不需要循环再将新数组抛出。直接可以使用索引。然后使用`ListView.builder`时，想让列表显示几个就可以显示几个，而且在屏幕之外的数据还可以自动不显示，减少内存消耗。

```dart

import 'package:flutter/material.dart';
import 'myList.dart';
void main() {
  runApp(MaterialApp(
    home:Scaffold(
      appBar: AppBar(title: const Text('你好Flutter'),),
      body: const MyApp(),
    )
  ));
}

class MyApp extends StatelessWidget {

  const MyApp({Key?key}):super(key:key);

  Widget _getData(context,index){
    return ListTile(
      leading: Icon(myList[index]['leadings'],size: 40, color: Colors.red),
      title: Text(myList[index]['title']),
      subtitle: Text(myList[index]['subTitle'])
    );
  }
  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: myList.length,
      itemBuilder: _getData,//这里是赋值，不是调用方法
    );
  }
}
```





