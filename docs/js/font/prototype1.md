## JS进阶之深入原型和原型链

在前面的文章里，介绍了原型和原型链，__proto__和prototype两者之间的关系。

这篇文章继续讲讲原型和原型链相关知识

### 构造函数

通过new操作符调用函数，这个函数就称为构造函数；返回的值就是实例对象。

```js
function Person(){
  this.name = name
}
var person = new Person()
```
上面代码中，Person()就是构造函数，变量person就是实例对象。里面的name值，只能通过实例对象来访问。

**1、构造函数中直接定义的属性或方法，实例对象共享吗？**

```js
function Person(name){
  this.name = name
  this.say = function(){
    console.log(this.name)
  }
}
var person1 = new Person('admin')
var person2 = new Person('admin')
console.log(person1 == person2)//false
person1.say()
person2.say()
console.log(person1.say()==person2.say())//false
```

在构造函数里面创建的属性或方法，他们的实例对象是不一样的。

**2、通过原型创建的属性和方法，实例对象共享吗？**

```js
function Person(){}
Person.prototype.name='admin'
Person.prototype.say=function(){
  console.log(this.name)
}
var person1 = new Person()
var person2 = new Person()
console.log(person1.say() == person2.say())//true
```

构造函数通过原型创建的属性和方法是所有实例对象共享的。

**3、实例对象上的__proto__原型构造器指向构造函数；构造函数原型的构造器指向自身**

```js
function Person(){}
var person = new Person()
console.log(person.__proto__.constructor === Person)//true
console.log(Person.prototype.constructor === Person)//true
```

**4、直接给构造函数的原型赋值，constructor会丢失，需要手动定义指向构造函数。**

constructor丢失会造成构造函数上的一些方法属性不能被实例对象使用。

```js
function Person(name){
  this.name = name
}
Person.prototype={
  say:function(){

  }
}
var person = new Person()
// 直接赋值，constructor会丢失
console.log(person.__proto__.constructor)//f Object(){[native object]}
console.log(person.toString())
// 需要重新赋值
Person.prototype.constructor = Person
```

**5、内置函数修改prototype，会造成原生的方法丢失。所以禁止修改，否则报错**

```js
Array.prototype={
  getArr:function(){
    console.log(this.join(','))
  }
}
var arr = [1,2]
arr.getArr()//报错
```

属性和方法必须挂载在原型上才可以
```js
Array.prototype.getArr = function(){
  console.log(this.join(','))
}
var arr = [1,2]
arr.getArr()//1，2
```

### 原型的查找方法

实例对象访问属性或方法会随着:自身--> 构造函数原型对象 -->Object原型对象的顺序查找

这种一层一层往上查找的过程就是原型链

```js
function Person(name){
  this.name = name
  this.say = function(){
    // 构造函数里有没有，如果有，就执行，没有就找Person.prototype
    console.log(this.name)
  }
}
// 构造函数的原型对象上有没有这个方法，如果有，就执行，没有就继续找Object.prototype
Person.prototype.say = function(){
  console.log(this.name)
}
// 构造函数上没有，就往Object的原型对象上找，如果有就执行，没有就返回null
Object.prototype.say = function(){
  consnole.log(this.name)
}
var person = new Person('admin')
person.say()//调用的是构造函数里的方法
person.lean()//没有这个方法，报错person.lean is not a function
```

还来看个例子：

```js
var obj = {
  a:1,
  b:2
}
var objArr=[]
var objArr1 = []
Object.prototype.getName = 'admin'

for(var i in obj){
  if(obj.hasOwnProperty(i)){
    objArr.push(obj[i])
  }
  objArr1.push(obj[i])
}
console.log(objArr)//[1,2]
console.log(objArr1)//[1,2,'admin']
```

对象身上本来没有hasOwnProperty这个方法，这个方法是Object()上的，实例对象也可以直接使用。就是因为顺着原型链向上找到Object()上的方法。

## 总结

1、构造函数里面创建的方法，实例对象不会共享。也就是不相等

2、构造函数的原型上创建的方法，实例对象是共享的，两者是相等的。

3、实例对象和构造函数都有constructor这个属性

4、构造函数的原型对象prototype上的constructor指向构造函数本身

5、实例对象上的__proto__原型的constructor指向构造函数本身

6、实例对象上的属性和方法继承于它的构造函数上的原型上的属性或方法，如果构造函数上没有，则继承Object.prototype上的属性或方法。


