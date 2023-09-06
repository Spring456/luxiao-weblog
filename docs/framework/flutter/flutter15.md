## Flutter中的Dialog组件

### 自带Dialog用法

```dart
const AlertDialog({
  Key? key,
  this.title, //对话框标题组件
  this.titlePadding, // 标题填充
  this.titleTextStyle, //标题文本样式
  this.content, // 对话框内容组件
  this.contentPadding = const EdgeInsets.fromLTRB(24.0, 20.0, 24.0, 24.0), //内容的填充
  this.contentTextStyle,// 内容文本样式
  this.actions, // 对话框操作按钮组
  this.backgroundColor, // 对话框背景色
  this.elevation,// 对话框的阴影
  this.semanticLabel, //对话框语义化标签(用于读屏软件)
  this.shape, // 对话框外形
})
```

### AlertDialog

在Flutter中，AlertDialog是一个常用的弹窗组件，用于向用户显示一些重要的消息、警告或者请求确认操作。

下面是一个使用AlertDialog的demo

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('AlertDialog 示例'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: (){
           showDialog(context: context, 
               builder: (BuildContext context){
                  return AlertDialog(
                    title: Text('提示'),
                    content: Text('这是一个示例'),
                    actions: [
                      ElevatedButton(onPressed: (){
                        Navigator.of(context).pop();//关闭弹窗
                      }, child: Text('确认')),
                      ElevatedButton(onPressed: (){
                        Navigator.of(context).pop();
                      }, child: Text('取消'))
                    ],
                  );
               });
          },
          child: Text('按钮提示'),
        ),
      ),
    );
  }
}
```

要使用弹窗组件，首先是需要`showDialog`来触发弹窗组件，然后在其返回值里使用AlertDialog组件。其中弹窗的按钮写在actions数组中

### SimpleDialog、SimpleDialogOption

SimpleDialog它们是另一种常用的弹窗组件，与AlertDialog类似，但是提供了更多的定义选项的功能。

其使用方法和AlertDialog类似

```dart
class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title:  Text(widget.arguments['title']),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: (){
           showDialog(context: context, 
               builder: (BuildContext context){
                  return SimpleDialog(
                    title: Text('提示'),
                    children: [
                      SimpleDialogOption(
                        child: Text('a'),
                        onPressed: (){},
                      ),
                      SimpleDialogOption(
                        child: Text('b'),
                        onPressed: (){},
                      ),
                      SimpleDialogOption(
                        child: Text('c'),
                        onPressed: (){},
                      )
                    ],
                  );
               });
          },
          child: Text('按钮提示'),
        ),
      ),
    );
  }
}
```

### showModalBottomSheet底部弹出的对话框

```dart
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
      body: Center(
        child: ElevatedButton(
          onPressed: (){
            showModalBottomSheet(context: context, builder: (BuildContext context){
              return Container(
                child: Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      ListTile(
                        leading: Icon(Icons.share),
                        title: Text('分享'),
                        onTap: (){},
                      ),
                      ListTile(
                        leading: Icon(Icons.delete),
                        title: Text('删除'),
                        onTap: (){},
                      )
                    ],
                  ),
                ),
              );
            });
          },
          child: Text('按钮提示'),
        ),
      ),
    );
  }
}
```

### 写一个自定义的Dialog

实现自定义的Dialog组件，可以使用Flutter的弹窗组件的基础类，在组件的build方法中返回一个Dialog组件。也可以创建新的Widget，继承自Dialog类，并在其中构建自定义的弹窗内容

新建自定义的Dialog组件----CustomDialog


```dart
import 'package:flutter/material.dart';
class CustomDialog extends StatelessWidget {
  final String title;
  final String content;
  final VoidCallback onConfirm;

   CustomDialog({
    required this.title,
    required this.content,
    required this.onConfirm,
  }) ;

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16.0),
      ),
      child: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text(
              title,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 18.0,
              ),
            ),
            SizedBox(height: 16.0),
            Text(content),
            SizedBox(height: 16.0),
            Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: <Widget>[
                ElevatedButton(
                  child: Text('取消'),
                  onPressed: () {
                    Navigator.of(context).pop();
                  },
                ),
                ElevatedButton(
                  child: Text('确认'),
                  onPressed: onConfirm,
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
```

在组件中使用

```dart
import 'package:flutter/material.dart';
import './myDialog.dart';

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
      body: Center(
        child: ElevatedButton(
          onPressed: (){
            showDialog(context: context, builder: (BuildContext contenxt)=>CustomDialog(
                title: '提示',
                content: '这是一个自定义的Dialog',
                onConfirm: (){}
            ));
          },
          child: Text('按钮提示'),
        ),
      ),
    );
  }
}
```

其中重点代码

```dart
onPressed: (){
            showDialog(context: context, builder: (BuildContext contenxt)=>CustomDialog(
                title: '提示',
                content: '这是一个自定义的Dialog',
                onConfirm: (){}
            ));
          },
```

builder中返回CustomDialog类，并传入相应的变量。


