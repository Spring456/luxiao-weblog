## Dart新特性

### 空安全---? 可空类型

Null safety翻译成中文的意思是空安全。

null safety 可以帮助开发者避免一些日常开发中很难被发现的错误，并且额外的好处是可以改善性能。

Flutter2.2.0（2021年5月19日发布） 之后的版本都要求使用null safety。

在最新版本的Dart中，下面的代码会警告。

```dart
main(){
  String str='zhangsan';
  str=null;//在最新版本dart下，会报错，提示不能将str设置为空
}
```

解决这个问题，需要用到`?`,在声明变量的时候，需要使用`?`

```dart
main(){
  String? str='张三';
  str=null;//这样就不会报错了
}
```

### !---类型断言

```dart
void printLength(String? str){
  print(str!.length);//如果str不为空，就打印str的长度，如果str为空，则会打印报错信息
}
//实际工作中，一般是使用try...catch

void printLen(String? str){
  try{
    print(str!.length)
  }catch(){
    print('str为空')
  }
}
```

### late---用于延迟初始化

当声明变量时，没有初始值的时候，需要使用late

之前的写法
```dart
class Person {
  String name;
  int age;
  void setName(String name, int age) {
    this.name = name;
    this.age = age;
  }
  String getName() {
    return "${this.name}---${this.age}";
  }
}

void main(args) {
  Person p = new Person();
  p.setName("张三", 20);
  print(p.getName());
}
```

在最新版本的Dart中，上面的name和age都没有初始值，会提示警告。需要在前面加上late关键字

```dart
class Person {
  late String name;
  late int age;
  void setName(String name, int age) {
    this.name = name;
    this.age = age;
  }
  String getName() {
    return "${this.name}---${this.age}";
  }
}

void main(args) {
  Person p = new Person();
  p.setName("张三", 20);
  print(p.getName());
}
```

### required关键词

最开始 @required 是注解,现在它已经作为内置修饰符。

主要用于允许根据需要标记任何命名参数（函数或类），使得它们不为空。因为可选参数中必须有个 required 参数或者该参数有个默认值。

也就是规范形参不能为空的情况。如果有值就默认值，如果没有初始值就需要加上required关键词

```dart
String printUserInfo(String username, {int age=10, String sex="男"}) {//行参    
  return "姓名:$username---性别:$sex--年龄:$age";
}

String printInfo(String username, {required int age, required String sex}) {//行参    
  return "姓名:$username---性别:$sex--年龄:$age";
}


void main(args) {
    print(printUserInfo('张三'));

    print(printUserInfo('张三',age: 20,sex: "女"));
    
    //age 和 sex必须传入
    print(printInfo('张三',age: 22,sex: "女"));
}
```

实现一个类，name可选，age必选

```dart
class Person{
  late String? name;
  late int age;
  Person(this.name,required this.age);
  void getInfo(){
    print('${this.name}--${this.age}');
  }
}
main(){
  Person p = new Person(20);
  p.getInfo();//null-20
}
```

上面的例子说明了，如果声明变量时，没有初始值，变量必须加上required，如果变量是可有可无的，那么在声明变量时，使用?来约束
