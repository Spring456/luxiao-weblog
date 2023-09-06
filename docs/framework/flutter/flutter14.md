## Flutter中toast用法

### fluttertoasst使用步骤

1、在pubspec.yaml中加入依赖

> fluttertoast: ^8.1.1

2、导入依赖

> import 'package:fluttertoast/fluttertoast.dart';

3、使用

```dart
showCorrectToast(String msg){
  Fluttertoast.showToast(
    msg:msg,              //提示文本
    toastLength: Toast.LENGTH_SHORT,   //提示框大小
    gravity: ToastGravity.CENTER,    //显示位置
    backgroundColor: Colors.green,  //背景颜色
    textColor: Colors.white,          //文本颜色
    fontSize: 16.0                    //文本大小
  );
}
```

### ftoast的用法

1、在pubspec.yaml中加入依赖

> toast: ^2.0.0

2、导入依赖

> import 'package:ftoast/ftoast.dart';

3、使用

```dart
FToast.toast(
  context,
  msg: "This is Msg",
  subMsg: "Welcome to use FToast. This is subMsg!",
  subMsgStyle: const TextStyle(color: Colors.white, fontSize: 13),
 );
```