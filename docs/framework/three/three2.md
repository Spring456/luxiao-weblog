## 创建物体，材质，网格

### 创建几何体

常见的几何体，在后续文章会再详细介绍。这里只展示一个长方体

```js
const geometry = new THREE.BoxGeometry(1, 1, 1)//参数表示长宽高
```

### 创建材质

threejs中有多种材质，这里我们创建一个不受光源影响的材质

```js
//MeshBasicMaterial不受光照影响
const material = new THREE.MeshBasicMaterial(); 
```

### 创建网格模型

通过网格模型Mesh渲染几何体。网格模型Mesh其实就一个一个三角形(面)拼接构成。使用网格模型Mesh渲染几何体geometry，就是几何体所有顶点坐标三个为一组，构成一个三角形，多组顶点构成多个三角形，就可以用来模拟表示物体的表面。

```js
const cube = new THREE.Mesh(geometry, material)
```

### 实现第一个3D场景

根据上文场景，相机，渲染器，几何体，我们就可以实现一个3D场景

```js
import * as THREE from 'three'
// 创建场景
const screen = new THREE.Scene()
// 创建相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
// 创建渲染器
const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1)
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

const cube = new THREE.Mesh(geometry, material)
// 将网格添加到场景中
cube.position.set(3, 0, 0)
cube.scale.set(2, 2, 2)
cube.rotation.x = Math.PI / 4
// 设置相机位置
camera.position.set(0, 10, 10)
camera.lookAt(0, 1, 0)
screen.add(cube)

renderer.render(screen, camera)
```



