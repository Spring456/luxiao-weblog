## Dart中的抽象类，多态以及接口

### 什么是Dart中的抽象类

Dart中的抽象类是一种特殊类型的类，`不能被直接实例化`，而是被用作其他类的基类或者说父类。抽象类可以定义抽象方法，这些方法在抽象类中声明但没有实现。子类必须实现这些抽象方法才能被实例化。

### 抽象类有什么作用？

抽象类的作用包括：

1、定义共性的行为和属性，这些行为和属性可以被多个子类继承和使用。

2、强制子类实现特定的方法或属性，确保子类遵循相同的接口规范。

3、限制实例化，从而防止用户误操作。

总之，抽象类是面向对象编程中的一种重要概念，可以提高代码的可读性、可维护性和可扩展性。

### 如何实现抽象类

实现抽象类的步骤：

1、使用abstract关键字声明一个抽象类。

2、在抽象类中定义抽象方法，这些方法没有实际实现，只有方法签名。

3、子类继承抽象类，并必须实现抽象方法,如果抽象类有多个方法，子类必须也要全部实现。

4、实例化子类，并调用其实现的抽象方法。

```dart
// 声明抽象类
abstract class Animal {
  // 声明抽象方法
  void makeSound();
}

// 继承抽象类并实现抽象方法
class Cat extends Animal {
  @override
  void makeSound() {
    print('Meow');
  }
}

// 实例化子类并调用实现的方法
void main() {
  var cat = new Cat();
  cat.makeSound(); // 输出：Meow
}
```

### Dart中的多态是什么意思？

多态是指通过父类引用指向子类对象，并根据实际子类类型调用相应的方法。

简单来说：

多态是父类定义一个方法不去实现它，让继承它的子类去实现，每个子类都要不同的表现。(其实上面的代码就实现了多态)

### Dart中可以通过以下方式来实现多态

1、定义一个抽象类或接口，声明共同的方法；

2、定义一个或多个实现该抽象类或接口的具体类；

3、使用父类引用指向某个子类对象；

4、通过父类引用调用方法。

```dart
abstract class Shape {
  void draw();
}

class Rectangle implements Shape {
  @override
  void draw() {
    print('画矩形');
  }
  write(){
    print('写字')
  }
}

class Circle implements Shape {
  @override
  void draw() {
    print('画圆形');
  }
}

void main() {
  //实例化子类指向父类，是不能调用子类自定义的方法的。比如下面的shape就不能使用其自己的write方法
  Shape shape = new Rectangle(); // 父类引用指向Rectangle对象
  shape.draw(); // 输出：画矩形
  
  Shape shapes = new Circle(); // 父类引用指向Circle对象
  shapes.draw(); // 输出：画圆形
}
```

### Dart中的接口是什么？

在Dart中，接口是一组抽象方法的集合。接口定义了一个类实现的契约，描述了该类应该具有哪些方法，但并不提供这些方法的实现。相当于是一份对其他类要求的规范。

Dart中的接口没有interface关键字定义接口，而是普通类或抽象类都可以作为接口呗实现。

同样使用`implements`关键字进行实现。

在dart中，实现的类是普通类，会将普通类和抽象中的属性方法全部需要覆写一遍。而因为抽象类可以定位抽象方法，普通类不可以，所以一般如果要实现像java接口那样的接口，一般会使用抽象类

建议使用抽象类定义接口

下面是定义一个接口并传值

```dart
// 定义一个接口
abstract class CanTalk {
  void talk();
}

// 实现接口的类
class Person implements CanTalk {
  @override
  void talk() {
    print('Hello, I am a person.');
  }
}

class Dog implements CanTalk {
  @override
  void talk() {
    print('Woof! Woof!');
  }
}

void main() {
  var person = new Person();
  person.talk(); // 输出：Hello, I am a person.

  var dog = new Dog();
  dog.talk(); // 输出：Woof! Woof!
}
```

### extends抽象类 和 implements的区别

extends和implements都可以被用来实现抽象类或接口,它们的区别如下：

1、extends用于继承抽象类，表示子类是基于父类的扩展而来，并且必须实现父类的所有抽象方法。而implements用于实现接口，表示该类遵循了接口所定义的契约，并且必须实现接口中的所有方法。

2、extends可以继承一个类，并且可以通过继承来获取父类中已有的属性和方法。而implements只能实现一个接口，不能从接口中获取属性和方法。

3、一个类可以同时使用extends和implements，但只能先使用extends再使用implements，不能反过来。

```dart
// 定义抽象类
abstract class Animal {
  void eat();
}

// 定义接口
abstract class Flyable {
  void fly();
}

// 继承抽象类和实现接口
class Bird extends Animal implements Flyable {
  @override
  void eat() {
    print('Bird is eating');
  }
  
  @override
  void fly() {
    print('Bird is flying');
  }
}

void main() {
  var bird = new Bird();
  bird.eat(); // 输出：Bird is eating
  bird.fly(); // 输出：Bird is flying
}
```

我们先定义了一个抽象类Animal和一个接口Flyable，然后创建了一个类Bird，该类继承了抽象类并实现了接口。类Bird必须实现Animal中的所有抽象方法，并且必须实现Flyable中的所有方法。

extends和implements都是Dart中实现抽象类或接口的方式，它们的使用取决于具体的需求。建议在继承抽象类时，选择使用extends，在实现接口时，选择使用implements

### 继承抽象类和接口是如何区分呢？

在Dart中，继承抽象类和实现接口都使用extends关键字。因此，在代码中区分继承抽象类和实现接口的方式如下：

1、继承抽象类时，子类使用extends关键字来继承父类，并且必须实现父类的所有抽象方法。

2、实现接口时，子类使用implements关键字来实现接口，并且必须实现接口中的所有方法。

接口也就是定义标准，在抽象类中定义了方法和属性，在子类必须实现抽象类中的属性和方法

```dart
// 抽象类
abstract class Animal {
  void eat();
}

// 接口
abstract class Flyable {
  void fly();
}

// 继承抽象类
class Cat extends Animal {
  @override
  void eat() {
    print('Cat is eating');
  }
}

// 实现接口
class Bird implements Flyable {
  @override
  void fly() {
    print('Bird is flying');
  }
}

void main() {
  var cat = new Cat();
  cat.eat(); // 输出：Cat is eating
  
  var bird = new Bird();
  bird.fly(); // 输出：Bird is flying
}
```

在Dart中，使用extends关键字既可以表示继承抽象类，也可以表示实现接口，具体是哪种方式取决于父类或接口的定义。


