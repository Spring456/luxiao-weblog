## Flutter中的生命周期

以下是常见的小部件生命周期方法：

**1、createState()**: 在StatefulWidget被插入到控件树时调用，用于创建与该小部件关联的状态对象。

**2、initState()**: 在createState()之后立即调用，用于初始化状态。通常用于进行一次性的设置，例如订阅流、初始化变量等。

**3、didChangeDependencies()**: 在initState()之后被调用，以及每次父级小部件的依赖关系发生更改时被调用。可以用于获取最新的数据、订阅流等操作。

**4、build()**: 用于构建小部件的UI表示。在每次需要更新UI时都会被调用。

**5、didUpdateWidget()**: 在小部件配置发生更改时（例如父级小部件重新构建）被调用。可以用于响应小部件配置的更改，比如更新状态。

**6、setState()**: 用于通知框架状态发生了改变，并触发重建。当需要修改小部件的可变状态时，必须在setState()方法中进行，以便框架能够正确地更新UI。

**7、deactivate()**: 在小部件被移除或不再显示时调用。可以用于释放资源、取消订阅等清理操作。

**8、dispose()**: 在小部件即将从树中永久移除时调用。用于释放资源、取消订阅等最终的清理操作。

对于整个应用程序，以下是常见的生命周期方法：

**1、main()**: 应用程序入口点，用于运行Flutter应用。

**2、runApp()**: 启动Flutter应用程序，并将根小部件作为参数传递给它。

**3、onCreate()**: 仅在Android平台上可用，表示应用程序的创建过程。

**4、didChangeAppLifecycleState()**: 当应用程序的生命周期状态发生变化（如进入后台、返回前台）时调用。

这些生命周期方法使开发者能够在不同的阶段执行必要的操作，以实现初始化、状态管理、事件处理、资源释放等功能。了解和正确使用这些生命周期方法有助于编写更可靠、高效的Flutter应用程序。

下面是一个简单的demo

```dart
import 'package:flutter/material.dart';

class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  int counter = 0;

  @override
  void initState() {
    super.initState();
    print('initState');
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print('didChangeDependencies');
  }

  @override
  Widget build(BuildContext context) {
    print('build');
    return Scaffold(
      appBar: AppBar(
        title: Text('Lifecycle Example'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Counter: $counter'),
            RaisedButton(
              onPressed: () {
                setState(() {
                  counter++;
                });
              },
              child: Text('Increment'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void didUpdateWidget(MyWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    print('didUpdateWidget');
  }

  @override
  void deactivate() {
    super.deactivate();
    print('deactivate');
  }

  @override
  void dispose() {
    super.dispose();
    print('dispose');
  }
}
```