## new Set()和new Map()数据结构

### new Set()

> Set()用来存储键值，是键的集合。里面的元素都是唯一的。是按照数据类型来判断唯一的。

`1、创建Set()`

```js
var set = new Set()
console.log(set)////Set(0)
console.log(Object.prototype.toString.call(set))//[object Set]

// set可以被循环

var set1 = new Set([1,2,3])
set1.forEach(el=>{
  console.log(el)//1,2,3
})
```

上面是创建一个空的Set()数据结构，可以看到数据类型是[object Set]格式。那可以接收哪些数据类型呢？

```js
var set1 = new Set(1)
console.log(set1)//Uncaught TypeError: number 1 is not iterable (cannot read property Symbol(Symbol.iterator))
var set2 = new Set([1,2,3])
console.log(set2)//Set(3) {1, 2, 3}
var set3 = new Set('1')
 console.log(set3)//Set(1) {'1'}
var set4 = new Set(true)
console.log(set4)//index21.html:15 Uncaught TypeError: boolean true is not iterable (cannot read property Symbol(Symbol.iterator))
var set5 = new Set({a:1})
console.log(set5)//index21.html:15 Uncaught TypeError: object is not iterable (cannot read property Symbol(Symbol.iterator))
```

可以看到，`new Set()`本身能接收的数据类型，只有两种，`字符串和数组类型`。其他数据类型都会报错，提示不是一个迭代器。但可以使用其他方法添加不同的数据类型。

`2、add()方法`

```js
var set = new Set()
set.add(1)
set.add('2')
set.add(true)
set.add([1,2,3])
set.add({a:1})
console.log(set)//Set(5) {1, '2', true, Array(3), {…}}
```

`new Set()`里面不能接收诸如数字类型，布尔类型，对象类型。但可以使用add()方法给其添加各种数据类型。

`3、has()方法--查看是否存在该值，返回true或false`

```js
var set = new Set()
set.add(1)
set.add('1')
console.log(set.has(1))//true
```

`4、delete()方法`

```js
var set = new Set()
set.add(1)
set.add('1')
set.delete(1)
console.log(set)//Set(1) {'1'}
```

`5、size属性--获取其长度`

```js
var set = new Set()
set.add('1')
set.add(1)
console.log(set.size)//2

var set1 = new Set([1,2,3])
console.log(set1.size)//3
```

+ new Set()的用法

`Set()`生成的数据格式有以上3个方法。`new Set()`里面只能接收字符串和数组类型，但最后的数据格式是Set格式，如果我们需要使用最后的结果，我们需要对数据进行处理。通常`使用new Set()进行数组的去重`

由于new Set()得到的数据结构是Set格式，需要解构然后通过中括号变成数组形式，就具备数组的方法和属性了。

```js
var set = new Set([1,2,3,1])
var arr = [...set]
console.log(arr)//[1,2,3]
```

### new Map()

> new Map()用来存储键值对，是键值对的集合，用来管理键值对

new Map()是以[键，值]的形式存储的。接收一个数组形式

new Map()的方法---set,get,has,clear,size,values

```js
// 新建Map集合
var map1=new Map()
// 添加键值对
map1.set("name","xiaoxiao")
// 添加键值对
map1.set(5,"number")
// 获取指定键的值
map1.get(5)
map1.get("name")
// 判断是否有指定键
map1.has(5)

// 获取所有键值对象
map1.values()//xiaoxiao，number
// 删除指定键
map1.delete(5)
// 再判断是否存在某指定键
map1.has(5)
// 清空map集合
map1.clear()
// 获取集合大小
map1.size()
```

可以看到，new Map()对键名的类型不做要求，所有数据类型都可以作为键名。

2、遍历Map()数据--keys(),values(),entries(),forEach()

遍历Map()数据，需要使用for...of方式。

```js
// keys()：返回键名的遍历器
// values()：返回键值的遍历器
// entries()：返回所有成员的遍历器
// forEach()：遍历 Map 的所有成员

let m = new Map([['name','xiaoxiao'],['age',18]])
// keys()
for(let i of m.keys()){
  console.log(i)//name,age
}
// values()
for(let k of m.values()){
  console.log(k)
}
// entries
for(let n of m.entries()){
  console.log(n)//Map(2) {'name' => 'xiaoxiao', 'age' => '18'}
  console.log(n[0],n[1])//name  xiaoxiao   age  18
}
// forEach
m.forEach((el,index)=>{
  console.log(el,index)//xiaoxiao  name,  18  age
})
```

### Set()和Map()使用场景

1、Set()---数组去重的时候，管理一组不重复的数据时

2、Map()---要求键名类型不限于字符串，那么可以选择Map();