## 比较运算符

### 8种比较运算符

* 大于运算符 >

* 小于运算符 <

* 小于或等于运算符 <=

* 大于或等于运算符 >=

* 相等运算符 ==

* 严格相等运算符 ===

* 不相等运算符 !=

* 严格不相等运算符 !==

### 大于小于的比较

#### 字符串的比较

如果符号两边都是字符串时，比较的是Unicode编码，如果第一位相等，就接着比较第二个字符的Unicode码。所以汉字也是可以比较的

```js
console.log('2'>'11')//true '2'的Unicode是50，'11'的Unicode是49

console.log('hello'>'hello world')//false

console.log('hello'>'world')//fasle'

console.log('高'>'低')//true 高的Unicode是30640，低的Unicode是20302

```

#### 非字符串的比较

1、基本数据类型的比较

(1)、数字和数字的比较

按照正常的数字运算的比较规则

(2)、数字和数字类型字符串的比较，数字和布尔值的比较

先将数字类型的字符串或布尔值转换为数值再比较

```js
console.log(10>6)//true

console.log(10>'11')//false

console.log(true>false)//true

console.log(true>10)//false
```
(3)、与NaN的比较

任何数据和NaN比较都是false

```js
console.log(1>NaN)//false

console.log(1<NaN)//false

console.log(NaN>NaN)//false

console.log('1'>NaN)//false
```

2、对象的比较

如果其中一方是对象形式，

(1)、先调用对象的valueOf()方法转换为基本数据类型，然后按照基本数据类型来比较。最后还是数字，数字或字符串，字符串之间的比较

(2)、如果返回的还是对象，再调用对象的toString()方法转换,再进行比较

```js
var x = [2]
var y='11'
var m={x:2}
var n={x:1}
console.log(x>11) // true,'2'>11字符串和数字之间的比较
// 相当于：[2].valueOf='2'
console.log(x>y)//'2'>'11'，字符串之间的比较
// 相当于[2].valueOf='2','2'>'11',Unicode的比较
console.log(m>n)//false m>=n就是true

// {x:2}.valueOf.toString = '[object,object]'
// {x:1}.valueOf.toString = '[object,object]'
// 然后就是字符串相比较了。
```


#### 相等和绝对相等的比较

相等：按照常规的比较，比较的是值。

绝对相等：比较的是他们引用的地址是否是同一个内存地址。

(1)、不同数据类型比较

```js
// 不同数据类型比较的是两个值的内存地址
console.log(1==='1')//false
console.log(true==='1')//false
```

(2)、同一类型的基本数据比较

```js
// 同类型的基本数据比较的就是两者的值,值相同返回true，否则返回false
console.log('1'==='1')//true
console.log(+0===-0)//true
// NaN和所有的都不相等
console.log(NaN===NaN)//false
```
(3)、对象比较

对象之间，比较的是是否指向的同一个地址

```js
// 
console.log([]===[])//false
console.log({}==={})//false
var obj={}
var obj1= obj
consolog.log(obj===obj1)//true
```

(4)、undefined和null的比较

绝对相等比较时，自身与自身或者两个相互比较返回的都是true

与其他类型比较，返回的都是fasle

相等时，

```js
console.log(undefined===undefined)//true

console.log(null===null)//true

console.log(null==null)//true

console.log(undefined===null)//false

console.log(0==null)//false

console.log(0==undefined)//false
```

### 与0的比较

在实际开发中，很多时候都需要和0进行比较

思路：0是数字类型，所以和0的比较就是和数字类型进行比较，需要将不是数字类型的转换为数字类型再进行比较。而且是相等的比较，不是绝对相等的比较

接下来展示几个比较典型。

```js
console.log(0==0)//true

console.log(''==0)//true,等同于Number('')==0,Number('')=0

console.log([]==0)//true,等同于[].valueOf().toString()=''；比较的还是''==0

console.log({}==0)//false,等同于{}.valueOf().toString()='[object Object]',是字符串形式，并且转换不成为数值

console.log({}=='[object Object]')//true，最后是字符串之间的比较。注意第二个object的o是大写

// null,undefined和0的比较都是fasle
console.log(null==0)//false

console.log(undefined==0)//false
```