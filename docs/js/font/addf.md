## 算术运算符

#### 一、算术运算符有哪些

JS中总共提供了10个算术运算符。分别是：

* 加法：x+y

* 减法 x-y

* 乘法 x*y

* 除法 x/y

* 指数运算 x**y

* 取余运算 x%y

* 自增运算 x++/++x

* 自减运算 x--/--x

* 数值运算 +x

* 负数运算 -x

其中减法、乘法、除法、指数比较简单。其中加法、取余、自增自减、数值运算需要理解

#### 二、加法运算

1、允许两个非数值相加

```js
true+true//2

2+false//2
```
如果是布尔值相加，将布尔值自动转换为数值。true等于1，false等于0

2、字符串相加

两个字符串相加或者一个字符串和一个数值相加，都会拼接成一个新的字符串

```js
'hello'+' world'//hello world
'hello'+123//hello123
```

3、非字符串和字符串相加，会将非字符串转换为字符串再相加

```js
true+'2'//true2
false+'a'//falsea
```

4、如果是对象相加

规则：对象先调用valueof()方法返回对象自身，如果返回的是基本数据类型就执行相加，否则会调用toString()将其转换为字符串再相加

```js
var obj ={}
console.log(obj+1)//[object Object]1
// 相当于
console.log(obj.valueOf().toString()+1)////[object Object]1
// 执行的流程
var obj1 = obj.valueOf()
console.log(obj1)//{}
var obj2 = obj1.toString()
console.log(obj2)//字符串：[object Object]
```

直接给对象设置valueOf键值，并返回基本数据类型时

```js
var obj = {
    valueOf:function(){
      return '对象添加了valueOf方法'
    }
  }
  console.log(obj+'返回了字符串')//对象添加了valueOf方法返回了字符串
```

5、如果对象是日期格式，优先执行toString()方法

```js
var obj = new Date();
obj.valueOf = function () { return 1 };
obj.toString = function () { return 'hello' };

obj + 2 // "hello2"
```

### 自增和自减运算

自增运算符首先将数据转换为数值，然后再加1或减1

自增运算有两种，一种是加号放在数值前面；一种是加号放在数值后面。加号的位置不同，得到的结果也不同

首先来看加号放在数值后面的情况

```js
var x=1
x++
console.log(x)//2
```
```js
var x=1
var y = x++
console.log(x,y)//2,1 
```
上面的两块代码得到的结果却不一样。原因是:

加号放在变量后面时，是先返回变量操作前的值，然后再相加相减。第二处的代码`var y=x++`,此时是直接赋值，先把x的原始值赋值给y，然后x自身再加1。打印的是最后的值。所以`x=2,y=1`

再来看加号放在前面的情况

```js
var x = 1;
++x
console.log(x)//2
```
```js
var x = 1;
var y = ++x
console.log(x,y)//2 2
```
当加号放在变量前面时，变量先自增自减，再返回变量操作后的值。所以`var y=++x`，x先自增，等2，然后再赋值给y

### 取余运算

取余运算返回的是余数，运算结果的正负号取决于第一个运算子的正负号

```js
console.log(-5%2)//-2
			
console.log(5%2)//2

console.log(5%-2)//2

console.log(-5%-2)//-2
```

如果想得到正确的余数，可以先用`Map.abs()`绝对值的方法

### 数值运算和负数运算

数值运算的作用是，将任何值转换为数值。与Number()作用相同

```js
console.log(+true)//1
			
console.log(+[])//0

console.log(Number([]))//0

console.log(+null)//0

console.log(Number(null))//0

console.log(+undefined)//NaN

console.log(+{})//NaN

console.log(Number({}))//NaN

console.log(+1)//1
```
```js
console.log(-true)//-1
						
console.log(-[])//-0

console.log(Number(-[]))//-0

console.log(-null)//-0

console.log(Number(-null))//-0

console.log(-undefined)//NaN

console.log(-{})//NaN

console.log(Number({}))//NaN

console.log(-1)//1
```
使用负数运算，等于0的情况下，那个负号不会消失

不管使用数值运算还是负数运算，都是返回新的数值，不会改变原有的数值

