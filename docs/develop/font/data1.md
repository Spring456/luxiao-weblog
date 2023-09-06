## 实际开发之数据操作-数组对象取并集，交集，合并

### 数组取并集，交集，差集

```js
const arr = [1,2,3]
const arr1 = [2,3,4]
```

1、取并集

```js
const union = Array.from(new Set([...arr,...arr1]))
```

2、取交集

```js
const inter = Array.from(new Set([...arr].filter(item=>arr1.has(item))))
```

3、取差集

```js
const differ = Array.from(new Set([...arr].filter(item=>!arr1.has(item))))
```

### 数组对象根据对象中某个相同的值合并数组对象

源数据：
```js
const arr = [
  { id: 1, list: { id: 66 } },
  { id: 1, list: { id: 44 } },
  { id: 2, list: { id: 55 } },
  { id: 2, list: { id: 33 } },
  { id: 3, list: { id: 11 } },
  { id: 3, list: { id: 22 } }
]
```
期望的：

```js
const arr1 = [
  {
    id:1,
    list:[
      {id:66},
      {id:44}
    ]
  }
]
```

