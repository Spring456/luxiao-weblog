## Flutter线性布局

### Row 水平布局组件

属性：

1、mainAxisAlignment---主轴的排序方式(center/start/end/spaceAround/spaceEvenly/spaceBetween)

> mainAxisAlignment:MainAxisAlignment.spaceEvenly

2、crossAxisAlignment---次轴的排序方式(start/stretch/center/end/)

> crossAxisAlignment: CrossAxisAlignment.center

3、children---组件子元素

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key?key}):super(key:key);
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Center(
            child: Icon(Icons.home,color:Colors.red,size: 100,),
          ),
          Center(child: Icon(Icons.send,color: Colors.blue,size: 100,),),
          Center(child: Icon(Icons.search,color: Colors.black,size: 100,),)
        ],
      ),
    );
  }
}
```

### Column垂直布局组件

1、mainAxisAlignment
2、crossAxisAlignment
3、children

```dart
import 'package:flutter/material.dart';
void main() {
runApp(const MyApp());
}
class MyApp extends StatelessWidget {
const MyApp({Key? key}) : super(key: key);
// This widget is the root of your application.
@override
Widget build(BuildContext context) {
 return MaterialApp(
  title: 'Flutter Demo',
  theme: ThemeData(
   primarySwatch: Colors.blue,
  ),
  home: Scaffold(
   appBar: AppBar(title: const Text("Flutter App")),
   body: const HomePage(),
  ),
 );
}
}
class HomePage extends StatelessWidget {
const HomePage({Key? key}) : super(key: key);
@override
Widget build(BuildContext context) {
 return Container(
  height: double.infinity,
  width: double.infinity,
  color: Colors.black26,
  child: Column(
   crossAxisAlignment: CrossAxisAlignment.center,
   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
   children: [
    IconContainer(Icons.home, color: Colors.red),
    IconContainer(Icons.search, color: Colors.blue),
    IconContainer(Icons.send, color: Colors.orange),
   ],
  ),
 );
}
}
class IconContainer extends StatelessWidget {
Color color;
double size;
IconData icon;
IconContainer(this.icon,
  {Key? key, this.color = Colors.red, this.size = 32.0})
: super(key: key);
@override
Widget build(BuildContext context) {
 return Container(
  height: 100.0,
  width: 100.0,
  color: color,
  child: Center(child: Icon(icon, size: size, color: Colors.white)),
 );
}
}
```

### double.infinity 和double.maxFinite

double.infinity 和double.maxFinite可以让当前元素的width或者height达到父元素的尺寸

如下可以让Container铺满整个屏幕

```dart
Widget build(BuildContext context) {
 return Container(
  height: double.infinity,
  width: double.infinity,
  color: Colors.black26,
  child: Column(
   crossAxisAlignment: CrossAxisAlignment.center,
   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
   children: [],
  ),
 );
}
```

让第二个Container的宽高和第一个Container保持一致

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key?key}):super(key:key);
  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 600,
      alignment: Alignment.center,
      child: Container(
        height: double.infinity,//高度和第一个Container一样都是600
        width: double.infinity,//宽度和第一个Container一致，充满屏幕
        color: Colors.black,
      ),
    );
  }
}
```



