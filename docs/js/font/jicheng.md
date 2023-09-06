## ES6的class用法

### ES6类的概念--class

ES6引入了类(class)的概念，为了让ES5原型写法更加清晰。

ES5是通过构造函数生成实例对象。比如：

```js
function Person(name){
  this.name = name
}
Person.prototype.say = function(){
  console.log('姓名:'+this.name)
}
var p1 = new Person('小明')
```

上面是使用ES5构造函数，定义了一个name属性和一个say方法。如果使用ES6类的方法来实现。

```js
class Person{
  constructor(name){
    this.name = name
  }
  say(){
    console.log('姓名：'+this.name)
  }
}
var p1 = new Person('小明')
console.log(p1.say())
```

ES6定义一个类和ES5的构造函数的区别在于：

1、constructor--构造方法。里面的this表示实例对象，这个和ES5的构造函数类似。

constructor方法是类的默认方法，通过new调用，自动生成该方法，一个类必须有constructor方法，如果没有显示定义，一个空的constructor方法会被默认添加。

constructor方法默认返回实例对象，也就是this，当然也可以在里面返回其他对象。

2、在ES5中定义在构造函数的prototype属性上的方法，在ES6中直接在class内部实现即可；前面不用加function，以及和constructor方法之间不用加逗号。

3、类的使用和构造函数一样，都是通过new操作符调用。类不能直接像函数那样使用，比如通过new调用，否则会报错。

### 类的特点

ES6里的类，其实就是构造函数的另一种写法。很多地方都有相似之处。

1、class类的数据类型是函数，class类指向构造函数

```js
class Person {

}
console.log(typeof Person)//function
console.log(Person===Person.prototype.constructor)//true
```

2、class类的所有方法都是定义在类的prototype属性上

```js
class Person{
  constructor(){

  }
  say(){}
}
// 相当于下面的代码
Person.prototype = {
  constructor(){},
  say(){}
}
```

3、由第二点得出，class类上面调用方法其实就是调用构造函数原型上面的方法

```js
class Person{
  constructor(){}
  say(){}
}
let p1 = new Person()
p1.say==Person.prototpe.say//true
```

4、class类内部定义的方法都是不可枚举的，这点和ES5不一样，ES5的方法是可以枚举的。

```js
// ES6 class类
class Person{
  say()
}
console.log(Object.keys(Person.prototype))//[]
console.log(Object.getOwnPropertyNames(Person.prototype))//['constructor','say']
```

```js
function Person(){

}
Person.prototype.say = function(){

}
console.log(Object.keys(Person.prototype))//['say']
console.log(Object.getOwnPropertyNames(Person.prototype))//['constructor','say']
```

5、class类的使用必须通过new操作符调用，直接使用会报错

```js
class Person{

}
let p1 = Person()//报错
let p2 = new Person()//正确 
```

6、class类内部定义的显式属性都是定义在this上，其他都定义在原型上(class上)

```js
class Person{
  constructor(x){
    this.x = x
  }
  say(){}
}
let p1 = new Person('1')
console.log(p1.hasOwnProperty('x'))//true
console.log(p1.hasOwnProperty('say'))// false
console.log(p1._proto_hasOwnProperty('say'))//true
```

### class类的注意点

1、class类不存在变量提升。和ES5完全不一样

class类要先定义，然后再通过new调用。顺序不能反。

```js
let p1 = new Person()//ReferenceError
class Person{

}
```

2、name属性

本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性

```js
class Person{}
consol.log(Person.name)//'Person'
```

3、Generator方法

在某个方法之前加上星号(*),表示该方法是一个Generator函数

4、class里面的this

类方法内部的this,默认指向类的实例。如果将方法单独提取出来使用，由于在严格模式下，this指向的是undefined，从而会报错。可以通过bind绑定this方法或者通过箭头函数的形式

5、静态属性

在class类里，如果给方法添加static 表示这是一个静态方法，不能被实例对象访问，只能由类访问

```js
class Person{
  static say(){
    console.log('静态方法')
  }
}
let p1 = new Person()
console.log(p1.say())//报错，提示找不到say方法
Person.say()//静态方法
```







