## Flutter网格布局组件---GridView

### GridView常用属性

scrollDirection---滚动方式

padding---内边距

resolve---组件反向排序

crossAxisSpacing---水平子Widget之间间距

mainAxisSpacing---垂直子widget之间间距

crossAxisCount---一行的Widget数量

maxCrossAxisExtent---横轴子元素的最大长度

childAspectRatio---子Widget宽高比例

children---

gridDelegate---控制布局主要用在GridView.builder里


### GridView创建网格列表三种方式

**1、可以通过GridView.count 实现网格布局**

GridView.count构造函数内部使用了SliverGridDelegateWithFixedCrossAxisCount，我们通过它可以快速的创建`横轴固定数量`子元素的GridView

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key?key}):super(key:key);
  @override
  Widget build(BuildContext context) {
    return GridView.count(
      crossAxisCount: 3,
      childAspectRatio: 1.0,
      children: const <Widget>[
          Icon(Icons.home),
          Icon(Icons.ac_unit),
          Icon(Icons.search),
          Icon(Icons.settings),
          Icon(Icons.airport_shuttle),
          Icon(Icons.all_inclusive),
          Icon(Icons.beach_access),
          Icon(Icons.cake),
          Icon(Icons.circle),
      ],
    );
  }
}
```

**2、可以通过GridView.extent 实现网格布局**

GridView.extent构造函数内部使用了SliverGridDelegateWithMaxCrossAxisExtent，我们通过它可以快速的创建`横轴子元素为固定`最大长度的的GridView。

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key?key}):super(key:key);
  @override
  Widget build(BuildContext context) {
    return GridView.extent(
      maxCrossAxisExtent: 100.0,
      childAspectRatio: 1.0,
      children: const <Widget>[
          Icon(Icons.home),
          Icon(Icons.ac_unit),
          Icon(Icons.search),
          Icon(Icons.settings),
          Icon(Icons.airport_shuttle),
          Icon(Icons.all_inclusive),
          Icon(Icons.beach_access),
          Icon(Icons.cake),
          Icon(Icons.circle),
      ],
    );
  }
}
```

**3、通过GridView.builder实现动态网格布局**

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
    return Container(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,//元素垂直水平居中
        children: <Widget>[
          Icon(myList[index]['leadings'],),
          Text(myList[index]['title'],
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 20,
                height: 3//行高
                )),
        ],
      ),
      decoration: BoxDecoration(
        border: Border.all(color: Colors.yellow)
      ),
    );
  }
  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,//一行元素个数
          crossAxisSpacing: 10,//每行元素之间的水平距离
          mainAxisSpacing: 10,//垂直元素之间的距离
      ),
      itemCount: myList.length,//显示多少个
      itemBuilder: _getData,//数据
    );
  }
}
```





