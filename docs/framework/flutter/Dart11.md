## Dart类的继承

### Dart中的类的继承

1、子类使用extends关键词来继承父类

2、子类会继承父类里面课可见的属性和方法，但是不会继承构造函数

3、子类能复写父类的方法 getter和setter

 ```dart
 class Person{
  String name='admin';
  int age = 20;
  void userInfo(){
    print('${this.name}--${this.age}');
  }
 }
 class OnePerson extends Person{}
 main(){
  OnePerson p = new OnePerson();
  print(p.name);//admin
  p.userInfo();//admin--20
 }
 ```

子类OnePerson使用extends继承父类Person，可以使用父类的属性和方法。

### super关键字

super关键字可以引用父类可见的内容

有下面的父类，在执行时就可以初始化，并为其传值

```dart
class Person{
  String name='admin';
  int age = 20;
  Person(this.name,this.age);
  void getInfo(){
    print('${this.name}--${this.age}');
  }
}
class Man extends Person{
  Man(String name,int age):super(name,age){

  }
}
main(){
  Man m = new Man('张三',20);
  m.getInfo();//张三---20
}
```

super关键字在这里是什么作用呢？

可以通过super继承父类的普通构造函数

子类可以扩展自己的属性和方法,并且可以使用

```dart
class Person {
  String name = 'admin';
  int age = 20;
  Person(this.name, this.age);
  void getInfo() {
    print('${this.name}--${this.age}');
  }
}

class Man extends Person {
  late String sex = '';
  Man(String name, int age, String sex) : super(name, age) {
    this.sex = sex;
  }
  void getManInfo() {
    print('${this.name}--${this.age}--${this.sex}');
  }
}
main() {
  Man m = new Man('张三', 20, '男');
  m.getInfo(); //张三---20
  m.getManInfo();//张三--20--男
}
```

通过上面的代码可以看出，在子类定义的属性sex，在使用时，需要将其在定义在子类构造函数上。


### 子类复写父类方法

子类复写父类的方法，加上` @override`，然后在子类中使用父类中相同的方法名，这样就可以复写父类方法.

```dart
class Person{
  late String name;
  late String age;
  Person(this.name,this.age)
  void getInfo(){
    print('姓名：${this.name}，年龄：${this.age}');
  }
}
class User extends Person{
  User(String name,String age):super(name,age);
  @override
  void getInfo(){
    print('${this.name}---${this.age}');
  }
}
main(){
  User m = new User('张三'，'20');
  m.getInfo();//张三---20
}
```

### 子类调用父类的方法

在子类中，可以使用super关键字来调用父类的方法。

```dart
class Person {
  String name;
  num age; 
  Person(this.name,this.age);
  void printInfo() {
    print("${this.name}---${this.age}");  
  }
  work(){
    print("${this.name}在工作...");
  }
}

class Web extends Person{
  Web(String name, num age) : super(name, age);
  run(){
    super.work();  //子类调用父类的方法
  }
  //覆写父类的方法
  @override      
  void printInfo(){
     print("姓名：${this.name}---年龄：${this.age}"); 
  }
}


main(){
  Web w=new Web('李四',20);
  w.run(); 
}
```




