## Dart中的对象，类

Dart是一门面向对象编程的语言。

有三个基本特征：封装，继承，多态

封装：封装是对象和类概念的主要特性。封装，把客观事物封装成抽象的类，并且把自己的部分属性和方法提供给其他对象调用, 而一部分属性和方法则隐藏。

继承：它可以使用现有类的功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。

多态：允许将子类类型的指针赋值给父类类型的指针, 同一个函数调用会有不同的执行效果 。

Dart所有的东西都是对象，所有的对象都继承自Object类。

所有的对象都是类的实例，并且所有的类都是Object的子类

一个类通常由属性和方法组成。

 
```dart
void main(){
  <!-- 这是一个类，类有属性isEmpty,也有方法add -->
  List list = new List();
  list.isEmpty;
  list.add('123');
}
```

### 自定义一个类

自定义的类需要写在main()函数外面，通过class关键词进行定义，然后类名的首字母需要大写。

```dart
class Person{
  String name = 'admin';
  int age =20;
  void getInfo(){
    print('${this.name}');//admin
  };
  void setInfo(age){
    this.age = age;
  }
}
main(){
  //实例化
  var p1 = new Person();
  print(p1.name);//admin
  print(p1.age);//20 
  //我们还可以规定实例化数据类型,如果是自定义函数，那数据类型就是使用这个类进行规定
  Person p2 = new Person();
  print(p2.name);//admin
  p2.setInfo(30);
  print(p2.age);//30
}
```

### 构造函数

在一个类中，构造函数的名称和类的名称相同，在实例化的时候就会触发这个构造函数。

```dart
class PersonInfo {
  // 类中的属性
  String name = 'admin';
  int age = 30;
  // 构造函数的名称和类型相同
  PersonInfo() {
    print('我是构造函数，在实例化的时候就会被触发');
  }
  // 访问类中的属性
  info() {
    // 直接访问属性
    print('我叫 $name,今年$age');
    // 通过this的来访问属性
    print('我叫 ${this.name},今年${this.age}');
  }
}
main(){
  //实例化，就会打印PersonInfo类中的PersonInfo()函数
  PersonInfo p1 = new PersonInfo();
}
```

如果想输出多个值，我们可以使用构造函数。

```dart
void main() {
  //实例化
  var p = new PersonInfo('李四', 20);
  p.info();//我叫李四，今年20
  // 类是可以被多次实例化的
  var p1 = new PersonInfo('王五', 25);
  p1.info();//我叫王五，今年25
}

class PersonInfo {
  // 类中的属性
  String name;
  int age;

  // 构造函数的名称和类型相同
  PersonInfo(String name, int age) {
    this.name = name;
    this.age = age;
  }

  // 访问类中的属性
  info() {
    // 通过this的来访问属性
    print('我叫 ${this.name},今年${this.age}');
  }
}
```

构造函数也有其简写方式：

```dart
PersonInfo(String name, int age) {
    this.name = name;
    this.age = age;
}
//简写方式
PersonInfo(this.name,this.age);
```

> 注意：最新版本的dart中需要初始化不可为null的实例字段，如果不初始化的话需要在属性前面加上late

```dart
 class Person{
   late String name;
   late int age; 
  //默认构造函数
   Person(this.name,this.age);
   void printInfo(){   
     print("${this.name}----${this.age}");
   }
 }
```

#### 命名的构造函数

命名的构造函数，也就是使用构造函数点方法的操作，实现一个命名的构造函数

```dart
void main(){
  Person p1 = new Person();
}
class Person{
  late String name;
  Person(this.name);
  Person.myFun(){
    print('这是一个命名构造函数');
  }
}
```

实例化的时候会默认触发构造函数，但不会触发命名构造函数，如何去触发命名构造函数呢？

实例化时，点方法的操作就可以触发命名构造函数。

```dart
void main(){
  Person p1 = new Person.myFun();
  print(p1)//这是一个命名构造函数
}
class Person{
  late String name;
  Person(this.name);
  Person.myFun(){
    print('这是一个命名构造函数');
  }
}
```

### 构造函数之前初始化实例变量

初始化实例变量，主要就是使用`fn():xx={}`这种格式

```dart
class Rect{
  int height;
  int width;
  Rect():height=2,width=10{    
    print("${this.height}---${this.width}");
  }
  getArea(){
    return this.height*this.width;
  } 
}

void main(){
  Rect r=new Rect();
  print(r.getArea()); 
   
}
```



#### 命名构造函数的初始化值

```dart
void main() {
  //实例化
  var p = new PersonIno.myFun('admin', 20);
  p.info();//我叫admin，今年20
}

class PersonIno {
  // 类中的属性
  String name;
  int age;
  // 构造函数的简写方式
  PersonIno(this.name, this.age);
  PersonIno.myFun(this.name, this.age);
  // 访问类中的属性
  info() {
    // 通过this的来访问属性
    print('我叫 ${this.name},今年${this.age}');
  }
}
```

### 将类抽离出去

在实际开发中，我们可能有很多类，这样文件会越来越大，维护麻烦。这个时候，我们需要将类抽离出去。

1、在项目的根目录创建一个文件夹lib

2、将类放入这个文件夹下，文件名需要和类名相同

3、在需要用的文件中使用import引入使用

```dart
import 'lib/Person.dart';
void main(){
  Person p1 = new Person();
  p1.info();
}
```

### 私有方法和属性

dart和其他的面向对象的语言不一样，没有public,private,protected这些访问修饰符，但我们可以使用_把一个属性或方法定义成为一个私有的。

需要注意的是：

1、如果在属性或方法前面添加'_',在同一个文件中是可以访问的

2、如果是单独抽离出去的文件，在属性和方法前面添加_就不可以被访问

```dart
void main() {
  var p = new PersonInfo('admin', 20);
  print(p._age); //输出18是可以访问的
}

class PersonInfo {
  String name;
  int _age; //虽然添加了"_"表示私有，但是在同一个文件中仍然可以访问
  PersonInfo(this.name, this._age);
}
```

如果将`PersonInfo`抽离出去，再访问就会出问题。

### 函数中getter和setter的用法

get和set是针对函数而言。

使用get往往是函数返回，类中的方法要去掉括号，set是函数传值。

当不使用get时

```dart
void main() {
  Sun c = new Sun(10, 20);
  print(c.backSum());
}
class Sun {
  num a;
  num b;
  Sun(this.a, this.b);
  backSum() {
    return this.a + this.b;
  }
}
```

使用getter改写上面的代码：

```dart
void main() {
  Sun c = new Sun(10, 20);
  print(c.backSum); //直接访问属性的方式
}

class Sun {
  num a;
  num b;
  Sun(this.a, this.b);
  // 使用getter去掉小括号
  get backSum{
    return this.a + this.b;
  }
}
```

setter方法的使用

```dart
void main() {
  Sun c = new Sun(10, 20);
  c.restateA = 100; //重新设置一个值
  print(c.backSum); //直接访问属性的方式 返回120
}

class Sun {
  num a;
  num b;
  Sun(this.a, this.b);
  // 使用getter去掉小括号
  get backSum {
    return this.a + this.b;
  }
  // setter的使用方法，
  set restateA(value) {
    this.a = value;
  }
}
```



