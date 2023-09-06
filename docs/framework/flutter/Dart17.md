## Dart性能优化之常量，identical函数,常量构造函数

### Dart中声明常量的修饰符

Dart中声明常量可以使用const和final这两个修饰符

**const**

const 声明的常量是在编译时确定的，永远不会改变

**final**

final 声明的常量是在运行时确定的，允许声明后再赋值，赋值后不可改变，final 声明的变量是在运行时确定的;

**区别：**

final不仅有const的编译时常量的特性，最重要的它是运行时常量，并且final是惰性初始化，即在运行时第一次使用前才初始化

const变量在每个使用它的地方都会被视为同一个对象，这意味着如果两个const变量具有相同的值，则它们将指向相同的内存地址；而final变量则没有这个限制，每个final变量都可以具有自己独立的值和内存地址。

```dart
void main(){
  const PI = 3.1415;//使用const声明的常量必须在开始就声明，并且不能修改

  final p;
  p=3.14;
  print(p);//3.14   使用final声明的常量可以先声明，然后再赋值，但只能赋值一次

  final date = new DateTime.now();
  print(date);//可以使用final声明上述代码， 但这时候不能使用const声明
}
```

### core 库中identical 函数

用法:

>bool identical(Object? a,Object? b)

作用：检查两个引用是否指向同一个对象。

```dart
var o = new Object();
var isIdentical = identical(o, new Object()); 
print(isIdentical);// false, different objects.

isIdentical = identical(o, o); 
print(isIdentical);// true, same object

isIdentical = identical(const Object(), const Object()); 
print(isIdentical);// true, const canonicalizes

isIdentical = identical([1], [1]); 
print(isIdentical);// false

isIdentical = identical(const [1], const [1]);
print(isIdentical); // true

isIdentical = identical(const [1], const [2]); 
print(isIdentical);// false

isIdentical = identical(2, 1 + 1); 
print(isIdentical);// true, integers canonicalizes
```

检测实例化常量

```dart
const a=[2];
const b=[2];
print(identical(a,b)); //true 共享存储空间

const c=[2];
const d=[3];
print(identical(c,d)); //false  不共享存储空间
```

发现：const关键词在多个地方创建相同的对象的时候，内存中只保留了一个对象


### Dart普通构造函数

对类进行实例化，比较两个实例化函数是否共享存储空间。

```dart
class Container{
  final int width;
  final int height;
  Container({required this.width,required this.height});
}

void main(){
  //实例化时，没有通过const，因此还是不同的
  var c1=new Container(width: 100,height: 100);

  var c2=new Container(width: 100,height: 100);

  print( identical(c1, c2));  //false   c1和c2在内存中存储了2份

  var c3=const new Container(width: 100,height: 100);//构造函数必须使用final类来定义

  var c4= const new Container(width: 100,height: 100);

  print( identical(c3, c4));  //true   c1和c2在内存中存储了1份
}
```

总结：
1、常量构造函数需以const关键字修饰

2、const构造函数必须用于成员变量都是final的类

3、如果实例化时不加const修饰符，即使调用的是常量构造函数，实例化的对象也不是常量实例

4、实例化常量构造函数的时候，多个地方创建这个对象，如果传入的值相同，只会保留一个对象。

5、Flutter中const 修饰不仅仅是节省组件构建时的内存开销，Flutter 在需要重新构建组件的时候，由于这个组件是不应该改变的，重新构建没有任何意义，因此 Flutter 不会重建构建 const 组件 




