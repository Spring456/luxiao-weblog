## Dart中的泛型

### Dart中的泛型是什么？

通俗理解：泛型就是解决类，接口，方法的复用性，以及对不特定数据类型的支持。

它允许变量、方法、类等可以使用任意类型，而不限制于特定的类型。通过使用泛型，我们可以编写更加灵活、通用和可重用的代码

比如，如果我想定义个函数，当传入字符串，返回字符串类型，当传入数字类型，返回数字类型。

```dart
String getStr(String value){
  return value;
}
int getNum(int value){
  return value;
}
```

上面的代码定义了两个函数，当输入字符串时使用getStr方法返回字符串，当输入数字时调用getNum方法返回数字类型。但是这样的代码很冗余，能否做到一个函数即可以返回字符串类型又可以返回数字类型呢？

### 如何使用泛型

在 Dart 中，泛型使用尖括号 <T> 来表示，其中 T 可以是任何标识符。泛型可以应用于函数、方法、类等

```dart
T getData<T>(T value){
  return value;
}
```

上面的代码，也就是定义了一个泛型，对传入的值和返回的值都做了数据限制。

```dart
T getData<T>(T value){
  return value;
}
main(){
  print(getData<String>('123'));//输出:123
  print(getData<int>(456));//输出:456
}
```

当我们我们还可以限制传入的参数类型，而对返回的数据类型不做限制。

```dart
getData<T>(T value){
  return value;
}
```

### 泛型应用于类和接口

定义一个泛型类

```dart
// 定义一个泛型类
class Box<T> {
  T value;

  Box(this.value);

  void setValue(T newValue) {
    value = newValue;
  }

  T getValue() {
    return value;
  }
}

void main() {
  // 在创建对象时指定类型参数
  var numberBox = Box<int>(1);
  var stringValue = Box<String>('hello');
  print(numberBox.getValue()); // 输出：1
  print(stringValue.getValue()); // 输出：hello
}
```

在上面的示例中，定义了一个名为 Box 的泛型类，它包含一个值属性和两个方法。在创建 Box 类型的对象时，我们需要通过尖括号来指定类型参数。

```dart
class MyList<T>{
  List list=<T>[];
  void add(T value){
    this.list.add(value);
  }
  List getList(){
    return list;
  }
}
main(){
  MyList myList = new MyList();//可以传入任何类型
  //MyList myList = new MyList<String>();//这样，就必须传入字符串类型的数据
  myList.add('123');
  myList.add(456);
  myList.add(true);
  print(myList.getList());//['123',456,true]
}
```


### 泛型应用于接口

需求：实现数据缓存的功能，有文件缓存，内存缓存，内存缓存和文件缓存按照接口约束实现

1、定义一个泛型接口，约束实现它的子类必须有getByKey(key)和setByKey(key,value)

2、要求setByKey的时候value的类型和实例化子类的时候指定的类型一致

```dart
abstract class Cache<T>{
  getByKey(String key);
  void setByKey(String key,T value);
}
class FlieCache<T> implements Cache<T>{
  @override
  getByKey(String key){
    return null
  }
  @override
  void setByKey(String key,T value){}
}
class MemoryCache<T> implements Cache<T>{
  @override
  getByKey(String key){}
  @override
  setByKey(String key,T value){ }
}
main(){
  MemoryCache m = new MemoryCache<String>();
  m.setByKey('index','name')
}
```

泛型接口可以子类必须按照规范来。泛型可以解决代码冗余的问题，还会对不特定数据进行校验。