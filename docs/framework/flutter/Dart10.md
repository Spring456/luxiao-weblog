## Dart类的静态成员，操作符和类的继承

### Dart中的静态成员

1、使用static关键字来实现类级别的变量和函数



使用了static，就不能使用构造函数来访问类的属性和方法了，可以直接使用类来访问。

```dart
class Person{
  static String name='张三';
  static void show(){
    print(name);
  }
}
main(){
  //使用了静态方法，就不能使用构造函数方式获取
  //直接使用类去获取属性或方法
 // var p = new Person();
  //p.show();
  print(Person.name);
  print(Person.show());
}
```

2、静态方法不能访问非静态成员，非静态方法可以访问静态成员

在非静态方法里面，可以直接访问静态属性。而不用加this

静态方法里面不能访问非静态属性，也不能访问非静态方法

```dart
class Person{
  static String name='张三';
  int age=20
  static void show(){
    print(name);
  }
  void userInfo(){
    print(name)//在非静态方法里，可以直接访问类的属性name
    print(this.age)//访问非静态属性，建议加上this
  }
  static void getUserInfo(){
    print(name)//静态方法可以访问静态属性
    //print(this.age)//静态方法不可以访问非静态属性
    //print(this.userInfo)//静态方法不可以访问非静态方法
  }
}
main(){
  //使用了静态方法，就不能使用构造函数方式获取
  //直接使用类去获取属性或方法
 // var p = new Person();
  //p.show();
  print(Person.name);
  print(Person.show());
}
```

### Dart中的对象操作符

1、?---条件运算符

2、as---类型转换

3、is---类型判断

4、..---级联操作

**(1)、? 条件运算符。当不存在的时候就不会调用，当存在的时候就可以调用。**

```dart
class Person{
  int name='admin';
}
main(){
  Person p1 = new Person();
  print(p1?.name);//admin
}
```

**(2)、is---类型判断，是否是属于这个类**

```dart
class Person{
  String name = 'admin';
  void userInfo(){
    print(this.name)
  }
}
Person p=new Person('张三', 20);
if(p is Person){
    p.name="李四";
}
print(p.userInfo());//李四
print(p is Object);//true
```
```dart
if (student is Person) {
  // Type check
  student.firstName = 'Bob';
}
```

**(3)、as---类型转换**

as 操作符把对象转换为特定的类型，但是如果无法完成转换则会抛出一个异常

```dart
(student as Student).firstName = 'Bob';
```

使用as进行类型转换和使用is操作符有什么不同呢？使用as操作符时，如果student是空，或者不是Student的实例，则会报错，而使用is操作符则不会

**(4)、..---级联操作。**

用来在同一对象上进行序列操作，级联操作可以让我们少写很多代码，可以在创建一个对象的同时，给对象赋值

比如下面的代码，假设有一个类Paint，有下面的属性

```dart
var paint = new Paint();
paint.color = Colors.black;
paint.strokeCap = StrokeCap.round;
paint.strokeWidth = 5.0;
```

使用级联操作符改写上面的代码

```dart
var paint = Paint()
  ..color = Colors.black
  ..strokeCap = StrokeCap.round
  ..strokeWidth = 5.0;
```

如果对象为空，则可以在第一个级联操作符之前加上?，这样如果对象为空的话，后续的级联操作都不会执行。

```dart
var paint = Paint()
  ?..color = Colors.bla
  ..strokeCap = Stroke
  ..strokeWidth = 5.0;
```
