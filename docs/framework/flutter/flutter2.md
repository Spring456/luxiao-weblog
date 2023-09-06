## 第一个Flutter应用

### 命令行生成Flutter应用

> flutter create flutterdemo

执行上面的代码，就可以生成一个Flutter项目


重点关注一下上面的几个文件夹

android---android平台相关代码

ios---ios平台相关代码

linux--- Linux平台相关代码

macos---macos平台相关代码

web---web相关代码

windows---windows相关代码

lib---flutter相关代码，我们编写的代码就在这个文件夹

test---用于存放测试代码

pubspec.yaml---配置文件，一般存放一些第三方的依赖

analysis_options.yaml---分析dart语法的文件，老项目升级成新项目有警告信息可以删除这个文件

### Flutter入口文件

```dart
void main(){
  runApp(MyApp());
}
//可以简写
void main()=>runApp(MyApp());
```
`其中main方法是dart的入口方法，runApp方法是flutter的入口方法。`

MyApp是自定义的一个组件。

我们首先来看一个简单的demo

```dart
import 'package:flutter/material.dart';
void main(){
  runApp(const Center(
    child:Text(
      '这是一个文本',
      textDirection:TextDirection.ltr;
    ),
  ));
}
```

上面就是一个简单的flutter的demo，将会在页面上呈现'这是一个文本'的字样

### 将内容单独抽离成一个组件

上面的代码比较简单，如果内容过多，都在main()里面写，代码将变得不可管理。所以有必要将内容代码抽离出来.

还是以上面的代码为例

```dart
import 'package:flutter/material.flutter';
void main(){
  runApp(const MyApp());
}

class MyApp extends StatelessWidget{
  const MyApp({Key?key}):super(key:key);
  @override
  Widget build(BuildContext context){
    return const Center(
      child:Text(
        '这是一个文本',
        textDirection:TextDirection.ltr;
      ),
    );
  }
}
```

上面的代码就是将内容抽离出来，可以在多个地方使用。分析上面的代码，

1、首先在main()方法里，使用runApp执行一个MyApp方法。

2、MyApp方法是我们自定义的一个类，继承StatelessWidget

在Flutter中，有两个类：StatelessWidget和StatefulWidget

`StatelessWidget` 是无状态组件，状态不可变的widget

`StatefulWidget` 是有状态组件，持有的状态可能在widget生命周期改变

### 使用MaterialApp和Scaffold两个内置组件装饰APP

`1、MaterialApp`

MaterialApp是一个顶级的widget，可以在应用程序中定义全局的主题、语言、路由等属性。通常情况下，我们会将MaterialApp作为整个应用程序的根widget，并将页面内容放置在它的子widget中。

常用的属性有：

title：应用程序名称。

home：应用程序默认显示的首页widget。

theme：应用程序的全局主题，包括颜色、字体、图标等。

initialRoute：应用程序的初始路由。

routes：路由表，用于定义应用程序的不同页面之间的跳转。

navigatorKey：导航器的键值，用于在应用程序中管理路由栈。

onGenerateRoute：用于生成动态路由的回调函数。

onUnknownRoute：路由查找失败时的回调函数。

debugShowCheckedModeBanner：是否在调试模式下显示应用程序名称旁边的“Debug”横幅。

localizationsDelegates：本地化代理，用于在应用程序中实现多语言支持。

supportedLocales：支持的语言列表。

可以参考：[Widget catalog](https://docs.flutter.dev/ui/widgets)

`2、Scaffold`

Scaffold是Material Design布局结构的基本实现。此类提供了用于显示drawer、snackbar和底部sheet
的API。

常用属性有：

appBar：顶部标题栏widget。

body：页面内容widget。

floatingActionButton：浮动操作按钮widget。

persistentFooterButtons：固定在底部的多个操作按钮widget。

drawer：抽屉式侧边栏widget。

endDrawer：右侧抽屉式侧边栏widget。

bottomNavigationBar：底部导航栏widget。

backgroundColor：页面背景色。

resizeToAvoidBottomInset：是否在键盘弹起时自动调整页面布局。
...

可以参考：[Scaffold class](https://api.flutter.dev/flutter/material/Scaffold-class.html)

`MaterialApp提供了全局的应用程序上下文和主题设置，而Scaffold提供了具有标准Material Design布局的页面结构。它们可以一起使用来创建具有标准布局和外观的应用程序。`

`一个应用程序通常只能有一个MaterialApp作为根widget;可以在一个MaterialApp中包含多个Scaffold，每个Scaffold代表一个具有标准Material Design布局结构的页面`

比如下面的代码：

```dart
import 'package:flutter/material:flutter';
void main(){
  runApp(MaterialApp(
    title:'My App',
    theme: ThemeData(primarySwatch: Colors.blue),
    initialRoute: '/',
    routes: {
      '/': (context) => HomePage(),
      '/details': (context) => DetailsPage(),
    },
  ))
}
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pushNamed(context, '/details');
          },
          child: Text('Go to details'),
        ),
      ),
    );
  }
}
class DetailsPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Details')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('Go back'),
        ),
      ),
    );
  }
}
```

上面的示例中，我们在MyApp中定义了MaterialApp的主题、路由和初始路径，然后在其中包含了两个Scaffold：HomePage和DetailsPage。

HomePage中使用了一个ElevatedButton，在按下按钮时通过Navigator.pushNamed跳转到另一个页面。而DetailsPage中同样使用一个ElevatedButton，在按下按钮时通过Navigator.pop返回到上一个页面。