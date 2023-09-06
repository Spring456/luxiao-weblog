## JS循环的方法总结

### for循环

基本语法：

```js
for(var i=0,i<data.length;i++){}
```

1、for循环基本可以遍历所有数据,包括数组，字符串，对象等

```js
// 遍历数组
var arr=[1,2,3]
for(let i=0;i<arr.length;i++){
    console.log(arr[i],i)
}

// 遍历字符串
var str = 'abcdefg'
for(let j=0;j<str.length;j++){
    console.log(i,str[j])
}
// 遍历对象
var obj = {a:1,b:2}
var keys = Object.keys(obj)//数组
for(let m=0;m<keys.length;m++){
    console.log(obj[keys[m]])
}
```

for循环里面可以使用break/continue中断循环；并且在里面可以改变数据的值。

### forEach()方法

foreach循环，参数有3个值，分别表示数组的每一项，数组索引和数组本身

```
var a = [1, 2, 3, 4, 5]
    a.forEach((v,i,t) => {
        console.log(v)//1,2,3,4,5
        console.log(i)//0,1,2,3,4
        console.log(t)//[1,2,3,4,5]
    })
```
foreach循环有以下特点：

**一、没有返回值**

```
var a = [1, 2, 3, 4, 5]

var b = a.forEach((v,i,t) => {
  console.log(v)
})

console.log(b)	// undefined
```

**二、无法中止跳出循环**

1、在循环内部使用break会报错

```js
var a = [1, 2, 3, 4, 5]
a.forEach((v,i,t) => {
    if(v==3){
        break //报错，Uncaught SyntaxError: Illegal break statementat Array.forEach (<anonymous>)
    }
})
```

2、使用return false无效

```js
var a = [1, 2, 3, 4, 5]
a.forEach((v,i,t) => {
    if(v==3){
        console.log(11)
        return false
    }
    console.log(v)//1,2,4,5
})
```
使用retrun false可以禁止当前此项的输出，但不能中止循环，不改变原数组。

forEach()循环不能中断，因此想通过forEach循环来对表单项进行判断时，可以通过计数的方法。

```js
var a = [1,2,3,4,5]
var count=0
a.forEach(el=>{
  // 判断条件
  count++
})
if(count==a.length){
  // 触发条件的事件
}else{

}
```

**三、跳过空位但不会跳过undefined和null**

forEach()方法也会跳过数组的空位。

```js
var a = [null, , undefined]
for (let i = 0; i < a.length; i++) {
    console.log('a', a[i]) // null undefined undefined
}
a.forEach(item => {
    console.log('item', item) // null undefined
});
```
for循环不会跳过空位，会认为是undefined，forEach会跳过空位。


**四、forEach()不会在循环之前创建数组的副本 如果数组在循环时被修改了，则其他元素会被跳过**

```js
var a = [1,2,3,4,5];
a.forEach(function(el) {
  console.log(el);//1,2,4,5
  if (el === 2) {
    a.shift();
  }
});
console.log(a)//2,3,4,5
```

当到达包含值 "2" 的项时，整个数组的第一个项被移除了，这导致所有剩下的项上移一个位置。因为元素 "4" 现在在数组更前的位置，"3" 会被跳过。 forEach() 不会在迭代之前创建数组的副本。

**五、改变原数组**

* 1、单纯修改基本数据类型无效

如果想更改数组元素，可以使用原数组索引的方法更改

```js
var a = [1,2,3,4,5];
a.forEach(item=>{
    item=2
})
console.log(a)//1,2,3,4,5
```

下面这种方法就可以改变数组内元素

```js
var a = [1,2,3,4,5];
a.forEach((item,index)=>{
    a[index]=2
})
console.log(a)//2,2,2,2,2
```

* 2、对对象形式可以更改

```js
var a = [1,2,3,4,5,{num:1}];
a.forEach(item=>{
    item.num=2
})
console.log(a)//1,2,3,4,5,{num:2}
```

原因是栈内存和堆内存的问题。字符串是基本数据类型，存放在栈内存中，循环出来的item相当于在栈中新建了一个变量，与原来的数据已经没有关系了，所以最后不会生效。引用数据类型复制过来的是引用地址，也就是堆内存的地址，就可以改变数组本身。

### for...in

for...in可以任意顺序遍历一个对象的除Symbol以外的可枚举属性，也可以遍历数组。

for...in遍历对象时，可以遍历出原型对象上的属性。如果不需要，可以使用hasOwnProperty()方法

```js
// 遍历对象
var obj = {a:1,b:2}
for(let i in obj){
    console.log(obj[i])//对象的键值1,2
    console.log(i)//对象的键名a,b
}
// 遍历数组
var arr=[1,2,3]
for(let j in arr){
    console.log(j)//数组索引
    console.log(arr[j])//数组元素
}
// 对象原型上添加属性，可遍历对象原型属性
var obj1 = {a:1,b:2}
Object.prototype.say = '可枚举的'
for(let i in obj1){
    console.log(obj1[i])//对象的键值1,2,可枚举的
    console.log(i)//对象的键名a,b，say
}
```
### for...of

for...of可以遍历数组，字符串，Map，Set,类数组。但不能用来遍历普通对象。因为普通对象没有迭代器对象。

for...of可以正确响应break，continue和return语句

```js
let mapObj = new Map([["a", 1], ["b", 2], ["c", 3]])
for (let i of mapObj){
    console.log(i)//可以获取Map的数据
}
```



