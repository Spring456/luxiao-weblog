## Flutter图片组件详解

### 图片组件常用属性

在Flutter中，我们可以通过`Image`组件来加载并显示图片Image的数据源可以是asset，文件，内存以及网络.

**1、图片对齐方式**

alignment:Alignment.left  

**2、设置图片的背景图片**

color和colorBlendMode:设置图片背景颜色，通常和colorBlendMode配合使用，这样可以使图片颜色和背景色混合。

**3、控制图片拉伸和挤压**

fit:BoxFit

fit属性用来控制图片的拉伸和挤压，这都是根据父容器来的。 BoxFit.fill:全图显示，图片会被拉伸，并充满父容器。

BoxFit.contain:全图显示，显示原比例，可能会有空隙。

BoxFit.cover：显示可能拉伸，可能裁切，充满（图片要充满整个容器，还不变形）。 

BoxFit.fitWidth：宽度充满（横向充满），显示可能拉伸，可能裁切。 

BoxFit.fitHeight ：高度充满（竖向充满）,显示可能拉伸，可能裁切。

BoxFit.scaleDown：效果和contain差不多，但是此属性不允许显示超过源图片大小，可小不可大。

**4、图片是否平铺---repeat**

ImageRepeat.repeat : 横向和纵向都进行重复，直到铺满整个画布。

ImageRepeat.repeatX: 横向重复，纵向不重复。

ImageRepeat.repeatY：纵向重复，横向不重复。

**5、width,height**

图片宽度和高度。一般结合ClipOval才能看到效果

更多属性参考：[https://api.flutter.dev/flutter/widgets/Image-class.html](https://api.flutter.dev/flutter/widgets/Image-class.html)

### 创建方式

Image：通过ImageProvider来加载图片

Image.asset：用来加载本地资源图片

Image.file：用来加载本地（File文件）图片

Image.network：用来加载网络图片

Image.memory：用来加载Uint8List资源（byte数组）图片

### 加载远程图片---Image.network

加载远程图片有两种方式，第一种可以使用Image.network,第二种可以使用在decoration中的image属性--DecorationImage

使用`const DecorationImage`。关键代码：

> image: const DecorationImage(image: NetworkImage("图片地址"),fit:BoxFit.cover)

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
        height: 200,
        width: 200,
        decoration: BoxDecoration(
          color: Colors.black,
          border: Border.all(color: Colors.black,width: 1),
          image: const DecorationImage(image: NetworkImage("https://img2.baidu.com/it/u=3359649605,3626874592&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=752"),
              fit:BoxFit.cover
          )
        ),
        transform:Matrix4.rotationX(0.2),
      ),
    );
  }
}
```

**使用Image.network**

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
        height: 200,
        width: 200,
        decoration: const BoxDecoration(
          color: Colors.black,
        ),
        transform:Matrix4.rotationX(0.2),
        child: Image.network(
          'https://img2.baidu.com/it/u=3359649605,3626874592&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=752',
          fit: BoxFit.fitWidth,
        ),
      ),
    );
  }
}
```

### 使用ClipOval实现圆形图片

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
        height: 200,
        width: 200,
        decoration: const BoxDecoration(
          color: Colors.black,
        ),
        transform:Matrix4.rotationX(0.2),
        child: ClipOval(
          child: Image.network(
              'https://img2.baidu.com/it/u=3359649605,3626874592&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=752',
            width: 200.0,
            height: 200.0,
            fit: BoxFit.cover,
          ),
        )
      ),
    );
  }
}
```

### 使用CircleAvatar实现圆形图片

CircleAvatar 不提供设置边框的属性。但是，可以将其包裹在具有更大半径和不同背景颜色的不同 CircleAvatar 中，以创建类似于边框的内容


### 加载本地图片---Image.asset()

步骤：

1、项目根目录新建assets文件夹，assets文件夹下新建images文件夹

2、然后，打开pubspec.yaml 声明一下添加的图片文件， 注意: 空格

 > assets:
  >   - assets/
   >  - assets/images/

3、使用`Image.asset()`加载图片

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
        height: 200,
        width: 200,
        decoration: BoxDecoration(
          color: Colors.blue,
          border: Border.all(color: Colors.black,width: 1),
        ),
        transform:Matrix4.rotationX(0.2),
        child: ClipRRect(
          child: Image.asset('assets/images/11.jpg'),
        ),
        // child: Image.asset('assets/images/11.jpg'),
      ),
    );
  }
}
```

加载本地图片，有以下几点需要注意：

1、在pubspec.yaml文件中添加图片时，由于 yaml 文件对缩进严格，所以必须严格按照每一层两个空格的方式进行缩进，此处 assets 前面应有两个空格。即assets要比flutter缩进两格，与上面默认的uses-material-design对齐

2、assets下的图片不需要严格的按照两格的缩进，但是图片前的间隔符-必须要有，并且图片和间隔符至少要有一个空格，不然也会报错：

3、pubspec.yaml文件assets声明时、代码中使用图片时，要确保图片名称及后缀都与images目录下图片名称及后缀保持一致，由于flutter在引用资源时不会有代码智能提示，资源都得手动写入，比较容易出现文件名书写错误的问题。图片的后缀类型如png也必须加上

4、images目录下可以再创建子目录，子目录里的图片在声明或加载时要写全路径：

yaml文件中声明图片时，可以只声明目录，这样目录下所有的图片都会被声明，不用再麻烦声明每一个图片

只声明目录时，后面的反斜杠/必须带上，否则会报错

```
Error detected in pubspec.yaml:
No file or variants found for asset: images/me.
```

5、加载项目中所有第三方依赖包中的本地图片时，需要在代码中添加包名；而加载项目自身的本地图片时，则不需要添加包名。不按要求都会报错！！！

```
// 加载自身的图片，不需要加package包名
Image.asset('images/icon_settings.png',
  width: 24,
  height: 24,
),
 
// 加载依赖包中的图片，需要加package包名
Image.asset('images/icon_share.png',
  width: 24,
  height: 24,
  package: 'com.xxx.xxx', //正确的依赖包包名
),
```

### 加载本地图片---使用AssetImage()

语法：

```dart
child: Image(
        image: AssetImage('assets/images/11.jpg'),
        fit: BoxFit.cover,
      ),
```
完成代码：

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
        height: 200,
        width: 200,
        decoration: BoxDecoration(
          color: Colors.blue,
          border: Border.all(color: Colors.black,width: 1),
        ),
        transform:Matrix4.rotationX(0.2),
        child: Image(
          image: AssetImage('assets/images/11.jpg'),
          fit: BoxFit.cover,
        ),
        // child: Image.asset('assets/images/11.jpg'),
      ),
    );
  }
}
```

### 使用flutter官方Icons图标

Material Design所有图标可以在其官网查看：[https://material.io/tools/icons/](https://material.io/tools/icons/)

通过Icon类，其中必选参数是icon: IconData，可以用Icons类来选择图标：

> Icon(Icons.xxx)

Icon类的主要参数有：

icon: IconData----必选参数，可以用Icons.xxx来指定图标

size: double----指定图标尺寸

color: Color----指定图标颜色  

比如:

```dart
class MyApp extends StatelessWidget {
  const MyApp({Key?key}):super(key:key);
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        alignment: Alignment.center,
        height: 200,
        width: 200,
        decoration: BoxDecoration(
          color: Colors.blue,
          border: Border.all(color: Colors.black,width: 1),
        ),
        transform:Matrix4.rotationX(0.2),
        child: Column(
          children: const [Icon(Icons.search,color: Colors.red,size: 40)],
        )
      ),
    );
  }
}
```

### 使用自定义图标(iconfont)

步骤：

1、将下载好的字体文件放到项目根目录中，比如路径为`assets/fonts/iconfont.ttf`。在Flutter中，我们使用.ttf格式

2、在pubspec.yaml中添加font选项

```dart
  fonts:
  - family: MyIconFonts
    fonts:
      - asset: assets/fonts/iconfont.ttf
```
其中，family是导入的字体的名称，asset是导入字体的地址

也可以配置多个字体文件

```
fonts:
 - family: myIcon #指定一个字体名
  fonts:
   - asset: fonts/iconfont.ttf
 - family: alipayIcon #指定一个字体名
  fonts:
   - asset: fonts/iconfont2.ttf
```

为了方便，我们编写一个font.dart，自定义图标的文件

```dart
import 'package:flutter/material.dart';

class MyIconFonts {
  static const IconData weixin = IconData(
    0xe69c, // 对应的 code 的值,code值在下载的文件中有一个iconfont.json，里面有个"unicode"参数，是一个4位数的，前面加上0x,后面就是json里unicode的值 
    fontFamily: 'MyIconFonts', // 名称，这个名称必须和pubspec.yaml文件中family 的名称一致
    matchTextDirection: true,
  );
}

```

使用方式，还是使用Icon(xx)方式，

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
    return Center(
      child: Container(
        alignment: Alignment.center,
        height: 200,
        width: 200,
        decoration: BoxDecoration(
          color: Colors.blue,
          border: Border.all(color: Colors.black,width: 1),
        ),
        transform:Matrix4.rotationX(0.2),
        child: Column(
          children: const [Icon(WxchatPay.weixin, size: 100, color: Colors.white)],
        )
      ),
    );
  }
}
```














