## 数组的高级方法

### map()方法

> 创建一个新的数组，不改变原数组，其结果为该数组中的每个元素都调用一个提供的函数后返回的结果

特点：

map()的作用就是'映射'，也就是原数组被'映射'成对应新数组。

map() 方法返回一个新数组

map() 不会对空数组进行检测。

map() 不会改变原始数组。

```js
var a = [1,2,3,4,5];
let b=a.map(item=>item*3)
console.log(b)//3,6,9,12,15
```
map可以接收3个参数，分别表示数组`元素，索引，数组本身`

```js
var arr = ["a","b","c","d","e"];
arr.map(function(currentValue,index,arr){
    console.log("当前元素"+currentValue)
　　 console.log("当前索引"+index)
    console.log("数组对象"+arr)
})
```

**map()方法的使用**

`1、基本使用——数值简单求平方`

```js
// 例子数值项求平方
let data = [1,2,3,4,5];
let newData = data.map(function (item){
    return item * item;

});
console.log(newData);
//箭头函数的写法
let newData2 = data.map(item => item *item);
console.log(newData2);
```

`2、用map()调用一个方法的使用`

```js
// 调用一个方法：把字符串转数字类型
let arr1 = ["1", "2", "3"];

function returnInt (element){
    return parseInt(element, 10);
}
let newArr1 = arr1.map(returnInt);
console.log(newArr1);//[1,2,3]
```

`3、map()方法用箭头函数容易出现的错误`

```js
var array1 = [1,4,9,16];
const map1 = array1.map(x => x *2);
console.log(map1);
// 结果为 [2,8,18,32]
```
而我这样写时：有多条语句时

```js
var array1 = [1, 4, 9, 16];
 
const map1 = array1.map(x => {
    if (x == 4) {
        return x * 2;
    }
});
 
console.log(map1);
// 打印结果为 [undefined, 8, undefined, undefined]
```
为什么会出现三个undefined呢？而不是我预期的[1,8,9,16]。

这样写只是增加了一个条件，即x的值为4时才乘以2，之所以会出现undefined，是因为map()方法创建了一个新数组，但新数组并不是在遍历完array1后才被赋值的，而是每遍历一次就得到一个值。所以，下面这样修改后就正确了：

```js
var array1 = [1, 4, 9, 16];
 
const map1 = array1.map(x => {
    if (x == 4) {
        return x * 2;
    }
    return x;
});
console.log(map1)//[1,8,9,16]
```

这里注意箭头函数有两种格式：

1.只包含一个表达式，这时花括号和return都省略了。

2.包含多条语句，这时花括号和return都不能省略。


`4、map()参数为关键字时的情况`

一个很常见的面试题：

```js
["1", "2", "3"].map(parseInt);
```

结果是什么呢？返回的是[1,2,3]吗？其实返回的是[1,NaN,NaN]，这是为什么呢？

通常使用 parseInt 时，只需要传递一个参数.但实际上，parseInt 可以有两个参数，第二个参数是进制数.

map 方法在调用 callback 函数时，会给它传递三个参数：当前正在遍历的元素，元素索引，原数组本身.

第三个参数 parseInt 会忽略，但第二个参数不会，也就是说：

parseInt 把传过来的索引值当成进制数来使用

第一步：parseInt('1',0)//进制为0时，且参数不以'0x'和'0'开头，按照十进制来处理，返回1

第二步：parseInt('2',1)//进制为1，表示的数中，最大值小于2，无法解析，返回NaN

第三步：parseInt('3',2)//进制为2，最大值小于3，无法解析，返回NaN

将其变成Number关键字，就能得到想要的

```js
['1', '2', '3'].map(Number);  // [1, 2, 3]
```

### reduce()方法

语法：

> arr.reduce(callback,[initialValue])

reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。

`**不改变原数组，生成新的值**`

```js
//callback （执行数组中每个值的函数，包含四个参数）

//     1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue），其数据类型取决于初始值）
//     2、currentValue （数组中当前被处理的元素）
//     3、index （当前元素在数组中的索引）
//     4、array （调用 reduce 的数组）

// initialValue——初始值 （作为第一次调用 callback 的第一个参数。）
```

看第一个例子

```js
var arr = [1, 2, 3, 4];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
})
console.log(arr, sum);
// > 打印结果：
// > 1 2 1
// > 3 3 2
// > 6 4 3
// > [1, 2, 3, 4] 10
```

上面的例子中有这几点需要注意的：

1、没有设置初始值，那么第一次返回的就是数组的第一项，然后才是当前被处理的元素，索引也从1开始，数组的长度是4，循环了3次。

2、为什么prev依次输出的是1,3,6呢？这是因为，prev表示的是上次调用回调返回的值。所以在最开始，prev的初始值为数组的第一项1，当前执行的项是2，第一次循环之后，执行了prev+cur运算之后，此时prev变为1+2=3；,在第二次循环之后，prev就变为3+3=6；第三次循环变为6+4=10，所以最后结果为10

如果为上例加个初始值0，看怎么样
```js
var arr = [1, 2, 3, 4];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
}，0)
console.log(arr, sum);
// > 打印结果：
// > 0 1 0
// > 1 2 1
// > 3 3 2
// > 6 4 3
// > [1, 2, 3, 4] 10
```

这个例子index是从0开始的，第一次的prev的值是我们设置的初始值0，数组长度是4，reduce函数循环4次。接着，我们设置初始值为空数组时

```js
var arr = [1, 2, 3, 4];
var sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prev, cur, index);
    return prev + cur;
},[])
console.log(arr, sum);
// > [] 1 0
// > 1 2 1
// > 12 3 2
// > 123 4 3
// > [1,2,3,4] '1234'
```


从上面例子可以看出，最后执行的结果是字符串1234，因为为prev定义初始值为空数组，所在函数执行时，[]+1='1'(字符串),然后字符串依次和后面数字相加。

设置初始值是有必要的，可以避免计算错误，计算更加安全。尤其是对于空数组来说

```js
var arr = [];

var sum1 = arr.reduce(function(prev, cur, index, arr) {
    return prev + cur;
},0)
console.log(arr, sum1);// [] 0

var sum = arr.reduce(function(prev, cur, index, arr) {
    return prev + cur;
})
console.log(arr, sum);// Reduce of empty array with no initial value
```

由于reduce方法中参数prev和cur的特性，我们可以利用这个特性来实现很多高级用法。

### reduce的高级用法

var arr = [1,2,3,4,5,3,2,6]

**1、数组项之和**

```js
var sum = arr.reduce((prev,cur)=>prev+cur)
console.log(sum)//26
```

**2、求数组里的最大值**
```js
var maxNum = arr.reduce((prev,cur)=>Math.max(prev,cur))
console.log(maxNum)//6
```

**3、数组去重**

```js
let newArr = arr.reduce((pre,cur)=>{
    if(!pre.includes(cur)){
        return pre.concat(cur)
    }else{
        return pre
    }
},[])
console.log(newArr);// [1,2,3,4,5,6]
```
打印如下：

>> [] "1"
>> [1] 2
>> [1, 2] 3
>> [1, 2, 3] 4
>> [1, 2, 3, 4] 5
>> [1, 2, 3, 4, 5] 3
>> [1, 2, 3, 4, 5] 2
>> [1, 2, 3, 4, 5] 6
>> [1, 2, 3, 4, 5, 6]

每次pre得到的上一次返回的值。在添加新值到数组中时，为什么使用concat而不是push呢？因为pre.push(cur)这个返回值并不是数组，而是数组的长度。使用concat的返回值就是数组pre

**4、计算数组中每个元素出现的次数**
```js
let nameNum = arr.reduce((pre,cur)=>{
  if(cur in pre){
    pre[cur]++
  }else{
    pre[cur] = 1 
  }
  return pre
},{})
console.log(nameNum); //{1: 1, 2: 2, 3: 2, 4: 1, 5: 1, 6: 1}
```

**5、将二维数组转化为一维数组**(可以使用es6的flat()数组方法)

```js
let arr = [[0, 1], [2, 3], [4, 5]]
let newArr = arr.reduce((pre,cur)=>{
    return pre.concat(cur)
},[])
console.log(newArr); // [0, 1, 2, 3, 4, 5]
```





