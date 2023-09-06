## Flutter中的路由

在Flutter中通过Navigator组件管理路由导航。

并提供了管理堆栈的方法。如：Navigator.push和Navigator.pop

Flutter中给我们提供了两种配置路由跳转的方式：1、基本路由 2、命名路由

### Flutter的普通路由

如果想从HomePage组件跳转到searchPage组件。需要执行的步骤如下：

1、需要在HomPage中引入SearchPage.dart

> import '../SearchPage.dart';

2、在HomePage中通过下面方法跳转

```dart
import 'package:flutter/material.dart';
import 'SearchPage.dart';

class HomePage extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
        title: Text('Home Page'),
      ),
      body: Center(
        child: ElevatedButton(
          child: Text('跳转到search'),
          onPressed: (){
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context)=>SearchPage())
            );
          },
        ),
      ),
    );
  }
}
```

3、在SearchPage页面新建代码

```dart
import 'package:flutter/material.dart';

class SearchPage extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
        title: Text('searchForm页面')
      ),
      body: Center(
        child: ElevatedButton(
          child: Text('按钮'),
          onPressed: (){
            Navigator.pop(context);
          },
        ),
      ),
    );
  }
}
```

4、在main.dart将HomePage.dart作为入口文件

```dart
import 'package:flutter/material.dart';
import 'HomePage.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomePage(),
    );
  }
}
```

上面就实现了一个路由跳转功能。首页展示HomePage内容，点击按钮使用`Navigator.push()`方法可以跳转到SearchPage页面。在SearchPage页面使用`Navigator.pop(context)`可以返回到HomePage页面

### 路由传值实现

 1、在HomePage页面中，跳转SearchPage页面时，传入参数。

 >  builder: (context) => SearchPage(title: '搜索',value:'回到HomePage'),

 2、在SearchPage页面，声明变量来接收传过来的值,使用`widget.`方法来获取对应的值

 ```dart
 import 'package:flutter/material.dart';

class SearchPage extends StatefulWidget{
  final String title;
  final String value;
 const SearchPage({Key?key,this.title='title',this.value='22222'}):super(key:key);
  @override
  State<SearchPage> createState()=>_SearchPageState();
}
class _SearchPageState extends State<SearchPage>{
  @override
  Widget build(BuildContext context){

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
        centerTitle: true,
      ),
      body: Center(
        child: ElevatedButton(
          child: Text(widget.value),
          onPressed: (){
            Navigator.pop(context);
          },
        )
      ),
    );
  }
}
 ```
上面代码中，因为是变化的数据，所以使用`StatefulWidget`,在其声明title和value，并声明初始值。然后`createState()`返回`_SearchPageState`类，在需要展示的地方使用`widget.title`，`widget.value`将数据展示出来。

 ### Flutter中的命名路由

 在实际工作中，我们一般更多的是是使用命名路由。

 命名路由可以让我们统一进行路由管理。命名路由，其实就是给路由命名，然后跳转的时候使用这个别名而不使用路由名称。使用` Navigator.pushNamed `跳转

 一、定义全局的命名路由----新建routes.dart文件

 ```dart
import 'package:flutter/material.dart';
import './HomeScreen.dart';
Map<String,WidgetBuilder> routes = {
  '/': (context) => HomeScreen(),
  '/details': (context) => DetailsScreen(),
  '/profile': (context) => ProfileScreen(),
};
 ```

在main.dart中引入routes.dart

```dart
import 'package:flutter/material.dart';
import './routes.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '命名路由示例',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      routes: routes
    );
  }
}
```
三、路由对应的页面----HomeScreen.dart

```dart
import 'package:flutter/material.dart';
class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('首页'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              '这是首页',
              style: TextStyle(fontSize: 24),
            ),
            ElevatedButton(
              child: Text('查看详情'),
              onPressed: () {
                Navigator.pushNamed(context, '/details');
              },
            ),
          ],
        ),
      ),
    );
  }
}

class DetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('详情页'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              '这是详情页',
              style: TextStyle(fontSize: 24),
            ),
            ElevatedButton(
              child: Text('查看个人资料'),
              onPressed: () {
                Navigator.pushNamed(context, '/profile');
              },
            ),
          ],
        ),
      ),
    );
  }
}

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('个人资料页'),
      ),
      body: Center(
        child: Text(
          '这是个人资料页',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
```
在这个例子中，使用`Navigator.pushNamed`方法，点击按钮导航到指定的命名路由。

### 配置onGenerateRoute并使用命名路由进行传参

配置onGenerateRoute。可参考官方文档：https://flutter.dev/docs/cookbook/navigation/navigate-with-arguments

1、修改routes.dart文件，配置onGenerateRoute

```dart
import 'package:flutter/material.dart';
import './HomeScreen.dart';
final Map<String,Function> routes = {
  '/': (context) => HomeScreen(),
  '/details': (context) => DetailsScreen(),
  '/profile': (context, {arguments}) => ProfileScreen(arguments: arguments),
};
var onGenerateRoute = (RouteSettings settings) {
// 统一处理
final String? name = settings.name;
final Function? pageContentBuilder = routes[name];
if (pageContentBuilder != null) {
 if (settings.arguments != null) {
  final Route route = MaterialPageRoute(
    builder: (context) =>
      pageContentBuilder(context, arguments: settings.arguments));
  return route;
 } else {
  final Route route =
    MaterialPageRoute(builder: (context) => pageContentBuilder(context));
  return route;
 }
}
return null;
};
```

2、修改main.dart文件

```dart
import 'package:flutter/material.dart';
import './routes.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '命名路由示例',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      initialRoute: '/',
      onGenerateRoute: onGenerateRoute
    );
  }
}
```

3、修改HomeScreen.dart中ProfileScreen类和DetailsScreen类

```dart
import 'package:flutter/material.dart';
class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('首页'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              '这是首页',
              style: TextStyle(fontSize: 24),
            ),
            ElevatedButton(
              child: Text('查看详情'),
              onPressed: () {
                Navigator.pushNamed(context, '/details');
              },
            ),
          ],
        ),
      ),
    );
  }
}

class DetailsScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('详情页'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              '这是详情页',
              style: TextStyle(fontSize: 24),
            ),
            ElevatedButton(
              child: Text('查看个人资料'),
              onPressed: () {
                Navigator.pushNamed(context, '/profile',arguments: {
                  'title':'跳转过去'
                });
              },
            ),
          ],
        ),
      ),
    );
  }
}

class ProfileScreen extends StatefulWidget {
  final Map arguments;
  const ProfileScreen({super.key,required this.arguments});
  @override
  State<ProfileScreen> createState() => _ProfileScreen();
}
class _ProfileScreen extends State<ProfileScreen> {
  @override
  void initState() {
    print(widget.arguments);
    }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
    appBar: AppBar(
    title:  Text(widget.arguments['title']),
    ),
    );
    }
}
```

### Flutter返回上级路由

```dart
Navigator.of(context).pop();
```

### Flutter 中替换路由

比如我们从用户中心页面跳转到了registerFirst页面，然后从registerFirst页面通过
pushReplacementNamed跳转到了registerSecond页面。这个时候当我们点击registerSecond的返回按钮的时候它会直接返回到用户中心。

```dart
Navigator.of(context).pushReplacementNamed('/registerSecond');
```

### Flutter 返回到根路由

比如我们从用户中心跳转到registerFirst页面，然后从registerFirst页面跳转到registerSecond页面，然后从registerSecond跳转到了registerThird页面。这个时候我们想的是registerThird注册成功后返回到用户中心。 这个时候就用到了返回到根路由的方法

```dart
Navigator.of(context).pushAndRemoveUntil(
           MaterialPageRoute(builder: (BuildContext context) {
          return const Tabs();
}), (route) => false);
```














