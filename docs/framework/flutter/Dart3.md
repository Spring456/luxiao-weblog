## Dart数据类型详解

### Dart中的数据类型

常用数据类型：

Number(数值型):int,double

```dart
int num = 123;
double num1 = 123.123
```

String(字符串型):String

```dart
String str='123'
```

Boolean(布尔型):bool
```dart
bool flag = false
bool flag1 = true
```

List(数组):数组是列表对象

Maps(字典型):Map是一个键值对相关的对象，键和值可以是任何类型的对象。

不常用的数据类型:

Runes:Rune是UTF-32编码的字符串，它可以通过文字转换成符号表情或者代表特定的文字

Symbols：symbols对象表示在Dart程序中声明的运算符或标识符

### Dart字符串类型

1、定义字符串类型的几种方式

可以使用var或者String来定义。可以使用单引号或双引号或者是三个引点

```dart
var str = '123';
String str1 = '456';
String str2 = '''this is string
this is string
'''
```
可以使用三个单引号或者三个双引号可以定义多行的字符串。否则定义多行字符串会报错

字符串拼接:可以使用`$str`或字符串相加

```dart
main(){
  String str = '你好';
  String str1 = 'Dart'
  print('$str $str1')//你好D art
  print(str+' '+str1)//你好 Dart
}
```

### Dart数值类型

数值类型有两种：int和double

int类型只能声明整型；double可以声明整型和浮点型

如果修改变量，int类型声明的变量就只能被修改为整型，修改为浮点型就会报错。

```dart
main(){
  int num = 123;
  num = 456;
  print(num)//456
  double num1 = 1.23
  print(num1)//1.23
  num1 = 111
  print(num1)//111
}
```

数值类型也可以进行加减乘除等计算操作

### Dart布尔类型

布尔类型只有两个值：true和false

```dart
main(){
  bool flag  = true
  bool flag1 = false
  print(flag);//true
  print(flag1);//false
}
```

### Dart List集合类型

类似JS中的数组，可以放置任何数据类型。

**1、第一种定义List的方式**

```dart
var l1 = ['123',456,false];
```
**2、第二种定义List的方式**

创建一个类型并指定类型

```dart
var l2 = <String>['123','aaa','bbb']//集合里面必须是字符串类型，否则会报错
var l3 = <int>[123,456]
<!-- 定义混合类型数组 -->
var l4 = <dynamic>[1,2,3.4,'str',false]
```
**3、第三种创建List的方式---List.filled()**
```dart
main(){
  <!-- 创建一个固定长度的集合，不能修改集合的长度 -->
  var l5 = List.filled(length,fill)//有两个参数，一个表示数组的长度，一个表示插入的内容，后面的参数是什么类型，就需要插入什么类型的数据
  var l6 = List.filled(2,'')//表示字符串数组
  l6[0]='123'
  l6[1]='str'
  print(l6)//['123','str']
  <!-- 创建指定类型的集合 -->
  var l7 = List<String>.filled(1,'')//指定数据必须是字符串形式
  l7[0]='admin'
}
```
### Dart Map类型

注意事项：

1、Maps类型的键必须加引号

2、获取Maps类型的数据，使用`xx['yy']`

**1、第一种定义Maps的方式**

```dart
var person={
  "name":'张三',
  "age":20
}
<!-- 获取数据 -->
print(person['name'])//张三
```

**2、第二种定义Maps方式**

```dart
main(){
  var p = new Map();
  p['name'] = '张三';
  p['age'] = 20;
  print(p);//{name:'张三',age:20}
}
```

### Dart 类型判断

通过is关键词来判断类型

```dart
main(){
  var str = '123';
  if(str is String){
    pring('str是字符串')
  }
}
```