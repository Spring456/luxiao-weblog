## Dart中的函数

### 函数的定义

```dart
String test(String params){}

void test(String params){}

test(params){}
```

在Dart中，函数的定义有以上三种方式。

函数前面的`String`表示函数的返回值必须是字符串类型；

`test(String params)`，这里面的String表示函数的参数必须是字符串。

`void`关键字表示该函数没有返回值，可以省略不写。

函数的入参也可以忽略参数类型，这样函数默认接受`dynamic`类型的参数，也就是任何类型都可以传递。如果省略了返回值的类型，就默认返回`dynamic`类型。但不推荐这样做，否则有可能会带来异常。

### 函数的传参

1、一般传参

```dart
String userInfo(String name,int age){
  return '姓名：$name---年龄:$age'
};
print(userInfo('admin',20))//姓名：admin---年龄：20
```

2、可选位置参数

一个函数可以拥有可选参数和必选参数，但必选参数必须在最前面。

可选参数，也就是函数声明时，定义的形参，在函数调用的时候可以不传.可选参数使用中括号包裹起来.

```dart
String userInfo(String name,[int age]){
  if(age){
    return '姓名：$name--年龄：$age';
  }else{
    return '姓名：$name--年龄：无'
  }
};
print(userInfo('admin'))//姓名：admin--年龄：无
```

3、带默认参数的函数

可以使用=来定义可选参数的默认值。默认值只能是编译时常量。如果没有提供默认值，则默认值为null。
调用函数时，如果传入了可选参数，则它的值就是传入的参数。如果没有传入，就按照声明时的默认值
```dart

String userInfo(String name,[String age=20]){
  return '姓名：$name--年龄：$age'
};
print(userInfo('admin'))//姓名：admin--年龄：20
print(userInfo('admin',30))//姓名：admin--年龄：30
```

4、定义一个命名参数的方法---使用{}

使用`{}`来声明命名参数，写法上和上面类似，在调用传参时，需要使用对象的写法

```dart
String userInfo(String name,{int age,String sex='男'}){
  return '姓名：$name--年龄：$age--性别：$sex'
};
print(userInfo('admin,age:20'));//姓名：admin--年龄：20--性别：男
print(userInfo('admin,age:30,sex:"女"'));//姓名：admin--年龄：30--性别：女
```

### 箭头函数

箭头函数如果不使用大括号形式，只能写成一行；如果使用大括号形式，就可以写成两行

```dart
List list =[1,2,3];
list.forEach((el)=>print(el));//1,2,3
list.forEach((el)=>{
  print(el)//1,2,3
});
```

使用箭头函数时，首先上面循环的`el`必须使用括号包裹起来；其次在循环体内打印的值不用使用分号。否则就会报错。

```dart
List list=[1,2,3,4];
var newList = list.map((el)=>{
  if(el>2){
    return el*2
  }
  return el
});
print(newList.toList())//[1,2,6,8]
```

### 匿名方法

匿名方法就是没有名字的函数.

```dart
var printNum = (int n){
  print(n+2)
};
printNum(2)//4
```

### 自执行方法

```dart
((){
  print('自执行方法')//自执行方法
})();

```

### 方法的递归

```dart
var sum=1;
fn(n){
  sum*=n;
  if(n==1){
    return;
  }
  fn(n-1)
};
fn(5)//120
```








