## Flutter中的StatelessWidget和StatefulWidget

### 理解StatelessWidget和StatefulWidget

StatelessWidget和StatefulWidget是Flutter中的两种主要的UI组件类型。

StatelessWidget是一个无状态的组件，它的属性值一旦确定了就不能再改变。意味着它的外观和行为在创建后是固定的，不会改变。通常用于展示静态的UI内容，比如文本、图片等。

StatefulWidget则是一个有状态的组件，它可以在运行时改变其外观和行为。一个StatefulWidget由两个类组成：一个是StatefulWidget类本身，另一个是对应的State类。StatefulWidget用于定义组件的外观，而State类用于存储和管理组件的状态。

总结：
- StatelessWidget是无状态的，它的外观和行为在创建后是固定的；

- StatefulWidget是有状态的，它的外观和行为可以在运行时改变；

- StatefulWidget由StatefulWidget类和State类组成，StatefulWidget类用于定义组件的外观，State类用于存储和管理组件的状态；

- 当应用程序的 UI 不依赖于状态的变化时，使用StatelessWidget；当我们想改变页面中的数据，使用StatefulWidget。

### StatelessWidget实现一个简单demo
下面是StatelessWidget实现一个简单demo

```dart
import 'package:flutter/material.dart';
void main() {
  runApp(MyApp());
}
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      home: Scaffold(
        appBar: AppBar(
          title: Text('My App'),
        ),
        body: MyWidget(),
      ),
    );
  }
}
class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Center(
        child: Text(
          'Hello, World!',
          style: TextStyle(fontSize: 24),
        ),
      ),
    );
  }
}
```

上面的代码将会在页面上显示一个字号为24，颜色为黑色的'Hello World!'.状态不可改变。同时也发现在最顶层，我们使用StatelessWidget来显示页面主体结构。包括appBar,body。其中body内容可以接收一个方法，这个方法可以是动态改变的。

### 使用StatefulWidget实现的demo

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      home: Scaffold(
        appBar: AppBar(
          title: Text('My App'),
        ),
        body: MyWidget(),
      ),
    );
  }
}
class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  String text = 'Hello, World!';

  void changeText() {
    setState(() {
      text = 'Button Clicked!';
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.white,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text(
            text,
            style: TextStyle(fontSize: 24),
          ),
          ElevatedButton(
            child: Text('Change Text'),
            onPressed: changeText,
          ),
        ],
      ),
    );
  }
}
```

上面的代码就是，点击按钮，将text内容由Hello, World!改变成了'Button Clicked!'

如何理解这行代码：`_MyWidgetState createState() => _MyWidgetState();`

这行代码中，_MyWidgetState是一个私有类，它是MyWidget小部件的状态类。当我们在MyWidget类中创建一个新的_MyWidgetState对象时，我们需要实现createState()方法，并返回一个新的_MyWidgetState对象。

这是一个箭头函数的语法，createState()方法的完整写法是：

```dart
_MyWidgetState createState() {
  return _MyWidgetState();
}
```

当调用createState()方法时，它会创建一个新的_MyWidgetState对象并返回。

请注意，createState()方法是一个在StatefulWidget中必须实现的方法，它用于创建与该小部件关联的状态对象。它在StatefulWidget的生命周期中只调用一次。


如何理解这行代码：`void changeText() { setState(() { text = 'Button Clicked!'; }); }`

这行代码定义了一个`changeText()`的函数，没有返回值(使用了void)。当该函数被调用时，将改变改变_MyWidgetState类中的text变量的值。

函数里面使用了`setState()`,如果我们需要对数据状态进行更改，就需要使用这个函数。当这个函数被调用时，Flutter会重新构建，以便更新用户界面。

### 使用StatelessWidget和StatefulWidget需要注意事项

1、不可变性

StatelessWidget是不可变的，它的属性在构建后不会更改。这意味着在构建过程中，您不能直接更改StatelessWidget的属性或状态。相反，每次属性或状态发生更改时，您需要创建一个全新的StatelessWidget实例。

2、可变性

StatefulWidget是可变的，它可以存储和跟踪状态。当状态发生变化时，使用setState()方法告知Flutter框架进行部件重建，以便更新用户界面。

分离关注点：在编写小部件时，应确保将关注点分离。StatelessWidget通常用于静态内容和无状态逻辑，而StatefulWidget适用于需要跟踪和更改状态的情况。

3、最小化状态

为了提高性能和可维护性，应尽量将状态存储在最少的地方。只有当需要跟踪和更改的数据时，才使用StatefulWidget。对于不需要更改的静态内容，优先使用StatelessWidget。

4、避免副作用

在使用StatefulWidget时，应避免在build方法中执行副作用操作，如网络请求、数据库访问等。这可能会导致性能问题或不可预测的结果。应将副作用操作移动到适当的生命周期方法或异步操作中。

5、慎用setState()

setState()方法会触发小部件的重建，因此需要谨慎使用，尽量将其限制在必要的情况下。频繁调用setState()可能会导致性能下降。

组件组合和层次结构：在构建复杂的UI时，通过组件组合和合理的层次结构，将页面划分为可重用的小组件。这样可以提高代码的可读性和可维护性。






