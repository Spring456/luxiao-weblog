## Text组件详解

### 属性介绍

1、文本对齐方式

> textAlign:TextAlign.center

textAlign:center(居中)/left(左对齐)/right(右对齐)/justfy(两端对齐)

2、文本方向

>

textDirection:ltr(从左至右)、rtl(从右至左)

3、文本超出屏幕之后的处理方式

> overflow:TextOverflow.ellipsis

overflow:clip(裁剪)/fade(渐隐)/ellipsis(省略号)

4、字体显示倍率

> textScaleFactor:2.0
textScaleFactor:1.8

5、文字显示最大行数

> maxLines:2

maxLines:3

6、字体样式设置

> style:TextStyle(fontSieze:20.0.color:Color.red)

7、行高---height

height:3



### 字体样式TextStyle的参数

1、文字装饰线

decoration:none(没有线)、lineThrough(删除线)、overline(上划线)、underline(下划线)

> decoration:TextDecoration.lineThrough

2、文字装饰线颜色

decorationColor:Color.blue

3、文字装饰线风格

decorationStyle:dashed/dotted(虚线)、double(两根线)、solie(一根实线)、wavy(波浪线)

> decorationStyle: TextDecorationStyle.wavy

4、单词间隙(如果是负值，会让单词变得更加紧凑)

wordSpacing:3

5、字母间隙(如果是负值，会让字母变得更紧凑)

letterSpacing:5

6、字体样式---italic(斜体)、normal(正常体)

fontStyle:italic/normal

7、文字大小

fontSize:20.0

8、字体颜色

color:Colors.blue

9、字体粗细---bold(粗体)、normal(正常体)

fontWeight:bold/normal

> fontWeight: FontWeight.w800

### 案例

```dart
import 'package:flutter/material.dart';

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
    return Center(
      child: Container(
        alignment: Alignment.center,
        height: 400,
        width: 400,
        decoration: BoxDecoration(
          color: Colors.black,
          border: Border.all(color: Colors.black,width: 1),
        ),
        transform:Matrix4.rotationX(0.2),
        child:const Text('我是Flutter我是Flutter我是Flutter我是Flutter我是Flutter我是Flutter',
          textAlign: TextAlign.left,
          overflow: TextOverflow.ellipsis,
          maxLines: 2,
          textScaleFactor: 1.8,
          style: TextStyle(
              fontSize: 16.0,
              color:Colors.white,
              fontWeight: FontWeight.bold,
              fontStyle: FontStyle.italic,
              decoration:TextDecoration.lineThrough,
              decorationColor: Colors.white,
              decorationStyle: TextDecorationStyle.wavy,
              letterSpacing: 5.0
          ),
        ),
      ),

    );
  }
}
```


关于flutter文字更多参数，可以查看:[https://docs.flutter.io/flutter/painting/TextStyle-class.html](https://docs.flutter.io/flutter/painting/TextStyle-class.html)


