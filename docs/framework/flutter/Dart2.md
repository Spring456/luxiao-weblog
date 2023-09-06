## Dart入口文件，打印及定义变量和变量规则介绍

### Dart入口文件

在Dart中，所有的代码必须在`main(){}`方法里

```dart
main(){
  print('你好Dart');
}
```

还可以使用`void`，表示main方法没有返回值

```dart
void main(){
  print('你好Dart');
}
```

在Dart里，每个代码结束都必须使用分号结尾，否则会报错。

### Dart打印

使用`print()`来打印数据。相当于js里的`consle.log()`

### Dart定义变量，常量

在Dart中定义变量，可以使用var或类型定义

```dart
var str='123';
var num=123;
String str1 = '456';
<!-- 类型不统一会报错 -->
String str2 = 123;//会报错
int num1 = 456;
```

使用关键词`var`可以定义任何数据类型，程序会自动做类型判断；使用类型关键字来定义变量，则要求变量的值和声明变量的类型一致，否则会报错。

在Dart中定义常量，可以使用`const`或`final`

使用const定义常量时，一开始就要赋值。

使用final可以开始不赋值，只能赋值一次，而且final不仅有const的编译时常量的特性，最重要的是它是运行时的常量，并且final是惰性初始化，即在运行时第一次使用前才初始化。比如下面的代码：

```dart
const PI = 3.1415
final a = 123
<!-- 定义日期时，使用final而不使用const -->
final today = new DateTime.now()
const today1 = new DateTime.now()//会报错
```

### Dart变量命名规则

在Dart中，变量的命名规则和JS中差不多,主要有：

1、变量名称必须由数字，字面，下划线和美元符号组成

2、标识符开头不能是数字

3、标识符不能是保留字和关键字

4、变量的名字是区分大小写的

5、标识符要有意义，变量名称建议用名词，方法名称建议用动词


