## ES5和ES6中的继承

### ES6中的继承

ES6中的class通过extends关键字实现继承。写法如下：

```js
class Person{}
class p1 extends Person{

}
```

p1是子类，Person是父类，通过extends关键字，p1继承了Person的属性和方法

使用super

```js
class Person{}
class p1 extends Person{
  constructor(name,age){
    super(name)//调用父类的constructor(name)
    this.age = age
  }
  say(){
    console.log(super.say())//调用父类的say方法
  }
}
```

super---表示父类的构造函数，用来创建一个父类的实例对象。

ES6规定，子类必须在constructor方法中调用super方法，否则会报错。

### ES6里面的super

1、为什么要使用super---ES6继承机制问题

与 ES5 完全不同。ES5 的继承机制，是先创造一个独立的子类的实例对象，然后再将父类的方法添加到这个对象上面，即“实例在前，继承在后”。

ES6 的继承机制，则是先将父类的属性和方法，加到一个空的对象上面，然后再将该对象作为子类的实例，即“继承在前，实例在后”。这就是为什么 ES6 的继承必须先调用super()方法，因为这一步会生成一个继承父类的this对象，没有这一步就无法继承父类。




