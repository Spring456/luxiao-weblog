### 认识场景，相机，渲染器

创建3D场景，首先需要认识`场景Scene`、`相机Camera`、`渲染器Renderer`

### 场景Scene

三维场景Scene (opens new window)对象理解为虚拟的3D场景，用来表示模拟生活中的真实三维场景,或者说三维世界。

```js
// 创建3D场景对象Scene
const scene = new THREE.Scene();
```

我们会将所建立的物体，光源，坐标系等添加到三维场景scene中，需要使用`add方法`,参数一般是物体实例，坐标系实例等。

```js
scene.add()
```

### 透视相机

想把三维场景Scene渲染到web网页上，还需要定义一个虚拟相机Camera，就像你生活中想获得一张照片，需要一台用来拍照的相机。

Threejs提供了正投影相机OrthographicCamera (opens new window)和透视投影相机PerspectiveCamera。一般我们使用透视相机

```js
// 实例化一个透视投影相机对象
const camera = new THREE.PerspectiveCamera();
```

透视相机`new THREE.PerspectiveCamera()`可以接收4个参数，透视投影相机的四个参数fov, aspect, near, far构成一个四棱台3D空间，被称为视锥体，只有视锥体之内的物体，才会渲染出来，视锥体范围之外的物体不会显示在Canvas画布上。

fov：相机视锥体竖直方向视野角度---默认50

aspect：相机视锥体水平方向和竖直方向长度比，一般设置为Canvas画布宽高比width / height，默认1

near：相机视锥体近裁截面相对相机距离---默认0.1

far：相机视锥体远裁截面相对相机距离，far-near构成了视锥体高度方向---默认2000

相机有以下几个方法：

**1、相机位置---position方法**

相机对象Camera具有位置属性.position，通过位置属性.position可以设置相机的位置。

```js
//相机在Three.js三维坐标系中的位置
// 根据需要设置相机位置具体值
camera.position.set(200, 200, 200); //参数分别对应x,y,z的值
```

**2、相机观察目标---lookAt()**

你用相机拍照你需要控制相机的拍照目标，具体说相机镜头对准哪个物体或说哪个坐标。对于threejs相机而言，就是设置.lookAt()方法的参数，指定一个3D坐标。

```js
//相机观察目标指向Threejs 3D空间中某个位置
camera.lookAt(0, 0, 0); //坐标原点

camera.lookAt(0, 10, 0);  //y轴上位置10

camera.lookAt(mesh.position);//指向mesh对应的位置
```

### 渲染器

有了场景和相机，需要将这个事物渲染出来，就需要渲染器----`WebGL1Renderer()`

通过WebGL渲染器WebGLRenderer (opens new window)可以实例化一个WebGL渲染器对象。

```js
// 创建渲染器对象
const renderer = new THREE.WebGLRenderer();
```

好了，我们有了渲染器，还差最后两个步骤。

1、定义输出到画布的大小

```js
// 定义threejs输出画布的尺寸(单位:像素px)
const width = 800; //宽度
const height = 500; //高度
renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)
// 如果是全屏
renderer.setSize(window.innerWidth, window.innerHeight)
```

2、渲染场景和相机

```js
renderer.render(scene, camera); //执行渲染操作
```

3、渲染Canvas到document中

```js
document.body.appendChild(renderer.domElement);
```

### 根据场景，相机，渲染器，实现渲染

```js
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

renderer.setSize(window.innerWidth, window.innerHeight)//渲染到整个屏幕

document.body.appendChild(renderer.domElement)//渲染到document中
// 渲染场景和相机
renderer.render(screen, camera)
```


