## 实际开发之数据操作-数组去重

### 一、数组去重

对下面这个数组进行去重：

```js
let arr = [1,2,1,'1','1','a','a',NaN,NaN,undefined,undefined,true,true,false,false,null,null]
```

### 1、Array.from+new Set()

```js
let result = Array.from(new Set(arr))	
console.log(result)
```

使用`new Set()`去重，得到的是Set数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值。可以使用循环枚举但不具备数组的方法。需要使用Array.from转换为数组形式。`这种方法最简单`

### 2、两层循环+数组的splice方法

> 通过两层循环对数组元素进行逐一比较，然后通过splice方法来删除重复的元素。此方法对NaN是无法进行去重的，因为进行比较时NaN !== NaN

```js
function removeDuplicate(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        len-- // 减少循环次数提高性能
        j-- // 保证j的值自加后不变
      }
    }
  }
  return arr
}
const result = removeDuplicate(arr)
console.log(result) 
```

### 3、利用数组的indexOf方法

> 新建一个空数组，遍历需要去重的数组，将数组元素存入新数组中，存放前判断数组中是否已经含有当前元素，没有则存入。此方法也无法对NaN去重。

```js
function removeDuplicate(arr) {
  const newArr = []
  arr.forEach(item => {
    if (newArr.indexOf(item) === -1) {
      newArr.push(item)
    }
  })
  return newArr // 返回一个新数组
}

const result = removeDuplicate(arr)
console.log(result) 
```

### 4、利用数组的includes方法

> 此方法逻辑与indexOf方法去重异曲同工，只是用includes方法来判断是否包含重复元素。

```js
function removeDuplicate(arr) {
  const newArr = []
  arr.forEach(item => {
    if (!newArr.includes(item)) {
      newArr.push(item)
    }
  })
  return newArr
}

const result = removeDuplicate(arr)
console.log(result) 
```

### 5、利用数组的filter()+indexOf()

filter方法会对满足条件的元素存放到一个新数组中，结合indexOf方法进行判断。

```js
function removeDuplicate(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
}

const result = removeDuplicate(arr)
console.log(result) 
```

注意：这里的输出结果中不包含NaN，是因为indexOf()无法对NaN进行判断，即arr.indexOf(item) === index返回结果为false

### 6、利用Map()

> Map对象是JavaScript提供的一种数据结构，结构为键值对形式，将数组元素作为map的键存入，然后结合has()和set()方法判断键是否重复。

Map 对象：用于保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为一个键或一个值。

```js
function removeDuplicate(arr) {
  const map = new Map()
  const newArr = []

  arr.forEach(item => {
    if (!map.has(item)) { // has()用于判断map是否包为item的属性值
      map.set(item, true) // 使用set()将item设置到map中，并设置其属性值为true
      newArr.push(item)
    }
  })
  return newArr
}

const result = removeDuplicate(arr)
console.log(result) 
```
注意：使用Map()也可对NaN去重，原因是Map进行判断时认为NaN是与NaN相等的，剩下所有其它的值是根据 === 运算符的结果判断是否相等。

### 7、利用对象

其实现思想和Map()是差不多的，主要是利用了对象的属性名不可重复这一特性。

```js
function removeDuplicate(arr) {
  const newArr = []
  const obj = {}

  arr.forEach(item => {
    if (!obj[item]) {
      newArr.push(item)
      obj[item] = true
    }
  })

  return newArr
}

const result = removeDuplicate(arr)
console.log(result) 
```
还可以使用Object.keys()少写变量

```js
function removeDuplicate(arr) {
	  const obj = {}
	  arr.forEach(item => {
	    if (!obj[item]) {
	      obj[item] = true
	    }
	  })
	  return obj
	}
	const result = Object.keys(removeDuplicate(arr))
	console.log(result) 
```