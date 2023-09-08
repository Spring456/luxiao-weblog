## 几何体，顶点，索引，面---BufferGeometry

在three.js中的几何体，长方体BoxGeometry、球体SphereGeometry等几何体都是基于BufferGeometry (opens new window)类构建的。

BufferGeometry是一个没有任何形状的空几何体，可以通过BufferGeometry自定义任何几何形状，具体一点说就是定义顶点数据。

```js
//创建一个空的几何体对象
const geometry = new THREE.BufferGeometry(); 
```

### BufferAttribute定义几何体顶点数据

通过javascript类型化数组 (opens new window)`Float32Array`创建一组xyz坐标数据用来表示几何体的顶点坐标。

顶点数据是有序的，每三个为一个顶点，如果三个点的顺序是逆时针，则该面为正面；否则为反面



```js
//类型化数组创建顶点数据
const vertices = new Float32Array([
    -1.0, -1.0, 0.0, //顶点1坐标
    1.0, -1.0, 0.0, //顶点2坐标
    1.0, 1.0, 0, //顶点3坐标
    1.0, 1.0, 0, //顶点4坐标
    -1.0, 1.0, 0.0, //顶点5坐标
    -1.0, -1.0, 0.0, //顶点6坐标
]);
```

通过threejs的属性缓冲区对象BufferAttribute (opens new window)表示threejs几何体顶点数据。创建顶点属性

```js
// 创建属性缓冲区对象
//3个为一组，表示一个顶点的xyz坐标
const attribue = new THREE.BufferAttribute(vertices, 3); 
```

创建材质，双面可见

```js
const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, //材质颜色
    side: THREE.DoubleSide, //两面可见
    wireframe:true//材质属性，为true表示线条模式
});
```

```js
const geometry = new THREE.BufferGeometry(); 
const vertices = new Float32Array([
    -1.0, -1.0, 0.0, //顶点1坐标
    1.0, -1.0, 0.0, //顶点2坐标
    1.0, 1.0, 0, //顶点3坐标
    1.0, 1.0, 0, //顶点4坐标
    -1.0, 1.0, 0.0, //顶点5坐标
    -1.0, -1.0, 0.0, //顶点6坐标
]);
const attribue = new THREE.BufferAttribute(vertices, 3); 
const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, //材质颜色
    side: THREE.DoubleSide, //两面可见
    wireframe:true//材质属性，为true表示线条模式
});
```