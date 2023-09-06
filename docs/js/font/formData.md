## 详解formData对象

有时给后台传递数据需要用到formData格式传递。还需要对formData格式数据进行操作。就有必要了解一下formData格式了。

### 表单提交的四种方式

在向后台提交数据时，我们可以在请求头里看到`content-type`这个参数的值。一般有4种：

1、application/json

这就是常说的json格式提交。这也是post请求最为常见的格式

2、application/x-www-form-urlencoded

这是默认格式，请求格式是键值对形式，但不能用来传递文件类型

3、multipart/form-data

如果是提交文件，则必须使用这个方式提交。

4、text/plain

这表示纯文本格式，就是一串字符串，如果是对象，需要转换为字符串形式提交。

### 什么是formData格式

formData格式是XMLHttpRequest 2 提供的一个接口对象。将对象用键值对的形式展现。可以用来表单提交以及文件上传

创建一个formData对象

```js
var form = new FormData()
```

通过构造函数`new FormData()`可以创建一个空的formData对象，我们把这个对象打印出来。

```js
FormData
[[Prototype]]: FormData
append: ƒ append()
delete: ƒ delete()
entries: ƒ entries()
forEach: ƒ forEach()
get: ƒ ()
getAll: ƒ getAll()
has: ƒ has()
keys: ƒ keys()
set: ƒ ()
values: ƒ values()
constructor: ƒ FormData()
Symbol(Symbol.iterator): ƒ entries()
Symbol(Symbol.toStringTag): "FormData"
[[Prototype]]: Object
```
formData对象自身有一些方法。formData的键值对形式并不能直接打印出来，而是需要通过自身的一些方法才能获取到。

### formData数据类型

```js
var form = new FormData()
console.log(Object.prototype.toString.call(form))//[object FormData]
```

formData有自己的数据格式。就是`FormData`。

### formData的主要作用

> 网络请求中处理表单数据

> 网络请求中处理用来异步的上传文件

### formData的方法

**1、append方法---在原有的formdata对象上添加数据,如果键不存在则会添加该键。**

可以添加同样的键名，可以是同样的值也可以是不同的值。这个特点对于提交多个文件格式很有效。

```js
// formData.append(key,value)
var form = new FormData()
form.append('a',1)
```
**2、get()/getAll()--通过键名获取值**

get()/getAll()通过键名来获取值，如果键名有多个，get()方法获取到的是最后添加的那个，getAll()都能够获取到，返回的是数组形式

```js
var form = new FormData()
form.append('a',1)
form.append('a',2)
form.get('a')//2
form.getAll('a')//[1,2]
```

**3、set()--在原有的formData对象中添加数据，如果已存在，则替换，不存在，则添加**

如果有多个同样键名的值，替换是替换所有。

```js
var form = new FormData()
form.append('a',1)
form.append('a',2)
form.set('a',3)
console.log(form.get('a'))//3
console.log(form.getAll('a'))//['3']
```

**4、delete()---从formData对象上删除，传入键名**

如果有多个同样键名的值，删除其中一个就会全部删除。

```js
var form = new FormData()
form.append('a',1)
form.append('a',2)
form.delete('a')
console.log(form.get('a'))//null
console.log(form.getAll('a'))//[]
```

**5、has()---判断这个formData对象中是否包含该数据.返回true或false**

```js
var form = new FormData()
form.append('a',1)
console.log(form.has('a'))//true
```

**6、entries()--返回一个iterator对象,可以通过`for...of`循环，返回数组形式**

```js
var form = new FormData()
form.append('a',1)
form.append('a',2)
console.log(form.entries())

for(let i of form.entries()){
  console.log(i)//[a:1],[a:2]
}
```

**7、keys()---返回一个iterator对象，输出所有的key.**

如果有同样的key值，返回两次

```js
var form = new FormData()
form.append('a',1)
form.append('a',2)

for(let i of form.keys()){
  console.log(i)//a 打印两次
}
```

**8、values()---返回一个iterator，显示所有的值**

```js
var form = new FormData()
form.append('a',1)
form.append('a',2)
console.log(form.entries())

for(let i of form.values()){
  console.log(i)//1,2
}
```

**9、foreach()方法**

```js
var form = new FormData()
form.append('a',1)
form.append('a',2)
form.foreach((el,index)=>{
  console.log(el,index)//1 a,2 a
})
```

总结：

1、append和set方法都可以新增，区别在于如果有同样的键名，append方法会继续添加，set会替换。

2、keys()、values()和entries()方法使用类似，调用后将得到一个Iterator类型的迭代器对象，该对象能够能够调用next()方法来进行迭代操作，打印结果中的done使用布尔类型的值来进行标记，如果迭代结束那么值为true。

### formData实际运用

**1、get请求——遍历formData数据，再拼接**

```html
<form name='formTest' id='form'>
  <input type="text" name='user' id='name'/>
<input type="text" name='password' id='paw'/>
</form>
<button id='btn'>按钮</button>
```

```js
window.onload=function(){
  // 获取form表单的值
  var nameValue = document.getElementById('name')
  var paw = document.getElementById('paw')
  var oBtn = document.getElementById('btn')
  oBtn.onclick = function(){
    // 表单的值
    var formName = nameValue.value
    var formPaw = paw.value
    // 添加到formData数据
    var form = new FormData()
    form.append('name',formName)
    form.append('paw',formPaw)
    
    // 序列化
    var arr=[]
    form.forEach((el,index)=>{
      arr.push(index+'='+el)
    })
    var params = arr.join('&')
    console.log(params)	//name=&paw=
  }
}
```

get请求就是将值变成字符串形式拼接在接口后面。如果是post请求比较简单，直接将formData数据放在xhr.send()即可。

**2、提交文件**

`(1)、单文件提交`

```js
<form name='formTest' id='form'>
    <input type="file" name='user' id='file'/>
  </form>
<button id='btn'>按钮</button>

<script type="text/javascript">
  window.onload=function(){
    // 获取form表单的值
    var flieList = document.getElementById('file')
    var oBtn = document.getElementById('btn')
    oBtn.onclick = function(){
      var form = new FormData()
      Array.from(flieList.files).forEach((el,index)=>{
        form.append('file',el)
        console.log(form)
      })
      // 将form提交给后台
      console.log(form.get('file'))//File {name...lastModified...}
    }
  }
</script>
```

`2、多文件提交`

有时候后台要求多文件以数组的形式提交。但是如果直接用数组把文件对象包起来，在最后保存的时候，用formData形式传给后台，则会显示为[object FormData]形式。所以我们需要用到同样键名但不同值的方式将数组拆开变成formData形式传递

```js
<form name='formTest' id='form'>
    	<input type="file" name='user' id='file' multiple/>
    </form>
	<button id='btn'>按钮</button>
	
<script type="text/javascript">
  window.onload=function(){
    // 获取form表单的值
    var flieList = document.getElementById('file')
    var oBtn = document.getElementById('btn')
    oBtn.onclick = function(){
      var arr=[]
      Array.from(flieList.files).forEach((el,index)=>{
        arr.push(el)
      })

      // 最后保存阶段将form提交给后台
      var data = new FormData()
      if(arr.length){
        arr.forEach(item=>{
          data.append('file',item)
        })
      }
      for(var i of data.values()){
        console.log(i)//多个值。在控制台打印时，就会出现多个同名的键名，后面是文件格式。
      }
    }
  }
</script>
```








