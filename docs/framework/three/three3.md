## 物体位移，缩放与旋转，父子元素

BufferGeometry通过.scale()、.translate()、.rotateX()、.rotateY()等方法可以对几何体本身进行缩放、平移、旋转,这些方法本质上都是改变几何体的顶点数据。

```js
// 几何体xyz三个方向都放大2倍
geometry.scale.set(2, 2, 2);
// 几何体沿着x轴平移50
geometry.translate.set(50, 0, 0);
// 几何体绕着x轴旋转45度
geometry.rotateX.set(Math.PI / 4);
```

### 缩放---scale()

```js
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 创建网格
const cube = new THREE.Mesh(geometry, material)
// 几何体xyz三个方向都放大2倍
cube.scale(2, 2, 2);
```

### 平移---translate()

```js
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 创建网格
const cube = new THREE.Mesh(geometry, material)
// 几何体沿着x轴平移50
cube.translate(100, 0, 0);
```

### 旋转---.rotateX()、.rotateY()、.rotateZ()

```js
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 创建网格
const cube = new THREE.Mesh(geometry, material)
//几何体绕着x轴旋转45度
cube.rotateX(Math.PI/4);
```

### 居中---center()

```js
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// 创建网格
const cube = new THREE.Mesh(geometry, material)
//几何体向x轴偏移50
cube.translate(50, 0, 0);//偏移
// 居中：已经偏移的几何体居中，执行.center()，几何体重新与坐标原点重合
cube.center();
```

### 父子元素

物体可以相互包裹，形成父子元素，物体的位移是相对于其父级来进行位移

```js
// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// 创建网格
const parentCube = new THREE.Mesh(geometry, parentMaterial)
const cube = new THREE.Mesh(geometry, material)
parentCube.add(cube)

parentCube.position.set(-3, 0, 0)
cube.position.set(3, 0, 0)//子元素cube就相对于其父级parentCube，在x轴3
```

