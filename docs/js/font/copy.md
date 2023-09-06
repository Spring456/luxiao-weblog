## 深浅拷贝

实际工作中，有这样的需求：对列表某一条数据进行编辑。

点击编辑按钮，弹出模态框，直接将列表的那一条对象数据回显到模态框上，修改其中一条数据，如果不保存直接关闭模态框，此时bug产生了。因为只是修改数据但并未保存，但列表上对应的数据已经改变了。

原因：列表上的对象和模态框上的数据是同一个。修改模态框上的数据也修改了列表上的数据了

解决：需要将列表上的那条数据复制一份出来，再在模态框上回显。

### 数据类型的复制

`基本数据类型`

```js
let a = 1
let b = a
a=2
console.log(a,b)//2,1

// 字符串
let str1 = '1'
let str2 = str1
str1 = '2'
console.log(str1,str2)//'2','1'
```

基本数据类型的复制，修改其中一项，另外一项不会发生改变。

`引用数据类型`

```js
let a = {num:1}
let b = a
a.num=2
console.log(a,b)//2,2
```

引用数据类型的复制，修改某一个对象中的属性值，另一个对象的属性值也会相应变化。

原因：基本数据类型和引用数据类型在计算机存储的位置不同导致的。

### 基本数据类型和引用数据类型的存储方式

基本数据类型保存在`栈内存`，栈内存中分别存储着变量的标识符以及变量的值。当复制基本数据类型，会重新开辟一个内存地址。

引用数据类型`名存在栈内存中，值存在于堆内存`中，

但是栈内存会提供一个引用的地址指向堆内存中的值。赋的其实是该对象的在栈中的地址，而不是堆中的数据。也就是两个对象指向的还是同一个地址，改变某个对象，另一个对象也会发生改变。

### 引用数据类型的拷贝

引用数据类型的拷贝分为：浅拷贝和深拷贝

浅拷贝：拷贝后的基本数据类型互不影响，但对象类型因为还是指向同一个地址，会相互影响。

深拷贝：拷贝后两个对象互不影响。两个对象值相同，但指向的地址不同。

### 浅拷贝的方法

`1、数组浅拷贝：Array.prototype.slice()`

```js
let a = [1, 2, 3, 4];
let b = a.slice();
console.log(a === b); // -> false

a[0] = 5;
console.log(a); // -> [5, 2, 3, 4]
console.log(b); // -> [1, 2, 3, 4]
```

`2、数组浅拷贝：Array.prototype.concat()`

```js
let a = [1, 2, 3, 4];
let b = a.concat();
console.log(a === b); // -> false

a[0] = 5;
console.log(a); // -> [5, 2, 3, 4]
console.log(b); // -> [1, 2, 3, 4]
```

对于上面的例子，slice和concat方法好像是深拷贝。用下面的例子来验证一下：

```js
let a = [[1, 2], 3, 4];
let b = a.concat();
console.log(a === b); // -> false

a[0][0] = 0;
console.log(a); // -> [[0, 2], 3, 4]
console.log(b); // -> [[0, 2], 3, 4]
```
可以看出，如果是对象中有对象，使用slice或concat方法都只能拷贝第一层数据，对于更深层次的数据并不能做到拷贝。所以这两个方法都是浅拷贝的方法。

`3、对象的浅拷贝：Object.assign()`

```js
let obj = {a:1,b:1}
let obj1=  Object.assign({},obj)
obj.a=2
console.log(obj)//{a:2,b:1}
console.log(obj1)//{a:1,b:1}
```

`4、对象的浅拷贝：扩展运算符(...)`

```js
let obj = {a:1,b:1}
let obj1 = {...obj}
obj.a=2
console.log(obj)//{a:1,b:1}
console.log(obj1)//{a:1,b:1}
```

验证Object.assign()和扩展运算符是否是浅拷贝,依然对对象中的对象进行拷贝

```js
let obj = {a:1,b:{c:1}}
let obj1 = Object.assign({},obj)
obj.a=2
obj.b.c=2
console.log(obj)//{a:2,b:{c:2}}
console.log(obj1)//{a:1,b:{c:2}}

let obj2 = {...obj}
obj.a=2
obj.b.c=3
console.log(obj)//{a:2,b:{c:3}}
console.log(obj1)//{a:1,b:{c:3}}
// 如果对b整体进行修改
let obj3 = {...obj}
obj.a=3
obj.b={c:4}
console.log(obj)//{a:3,b:{c:4}}
console.log(obj3)//{a:1,b:{c:1}}
```

通过上面的例子，可以看到Object.assign和扩展运算符只拷贝第一层数据。并不会对里面的对象进行拷贝。所以是浅拷贝

`5、自定义函数方式`

```js
function shallowClone(source) {
    var target = {};
    for(var i in source) {
        if (source.hasOwnProperty(i)) {
            target[i] = source[i];
        }
    }
    return target;
}
```
## 深拷贝的方式

### 1.JSON.parse(JSON.stringify())

用JSON.stringify将对象转成JSON字符串，再用JSON.parse()把字符串解析成对象，新的对象产生了，而且对象会开辟新的栈，实现深拷贝。

```js
let a=[1,2,3,4,{age: 1}];
let b=JSON.parse(JSON.stringify(a));
a[0]=2;
a[4].age=2;
console.log(a,b);

// (5) [2, 2, 3, 4, {…}]
// 0: 2
// 1: 2
// 2: 3
// 3: 4
// 4: {age: 2}
// length: 5
// __proto__: Array(0)
 
// (5) [1, 2, 3, 4, {…}]
// 0: 1
// 1: 2
// 2: 3
// 3: 4
// 4: {age: 1}
// length: 5
// __proto__: Array(0)

```
该方法有几个缺陷

1、会忽略undefined、symbol和函数，通过拷贝后，这些键值就会消失。例：

```js
let obj = {
    name: 'A',
    name1: undefined,
    name3: function() {},
    name4:  Symbol('A')
}
let obj2 = JSON.parse(JSON.stringify(obj));
console.log(obj2); // {name: "A"}

```
2、对象循环引用时，会报错。例：

```js
  let obj = {
      name1: 'A',
      name2: {
          name3: 'B'
      },
  }
  obj.name1 = obj.name2;
  obj.name2.name3 = obj.name1;
  let obj2 = JSON.parse(JSON.stringify(obj));
  console.log(obj2); // Converting circular structure to JSON

```
3、拷贝Date引用类型会变成字符串

4、拷贝RegExp引用类型会变成空对象

5、对象中含有NaN、Infinity和-Infinity，则序列化的结果会变成null 

### 递归函数

```js
function deepClone(obj){
    let objClone = Array.isArray(obj)?[]:{};
    if(obj && typeof obj==="object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断obj子元素是否为对象，如果是，递归复制
                if(obj[key]&&typeof obj[key] ==="object"){
                    objClone[key] = deepClone(obj[key]);
                }else{
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}    

```
### 使用Object.create()方法

直接使用var newObj = Object.create(oldObj)，可以达到深拷贝的效果。

```js
function deepClone(initalObj, finalObj) {
    var obj = finalObj || {};
    for (var i in initalObj) {
        var prop = initalObj[i];
        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
        if(prop === obj) {
            continue;
        }
        if (typeof prop === 'object') {
            obj[i] = (prop.constructor === Array) ? [] : Object.create(prop);
        } else {
            obj[i] = prop;
        }
    }
    return obj;
}
```

### lodash.js的_.cloneDeep方法

[_.cloneDeep](https://www.lodashjs.com/docs/lodash.cloneDeep#_clonedeepvalue)

### JQ的jQuery.extend方法

[jQuery.extend](https://www.jquery123.com/jQuery.extend/)