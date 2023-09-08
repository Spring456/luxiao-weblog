## 设置响应式,全屏控制,动画循环

### 动画循环

threejs可以借助HTML5的API请求动画帧window.requestAnimationFrame实现动画渲染

```js
// requestAnimationFrame实现周期性循环执行
// requestAnimationFrame默认每秒钟执行60次，但不一定能做到，要看代码的性能
function animate() {
  requestAnimationFrame(animate);//请求再次执行函数render
    // 渲染
  renderer.render(screen, camera)
}
animate();
```

设置了渲染循环,相机控件OrbitControls就不用再通过事件change执行renderer.render(scene, camera);，毕竟渲染循环一直在执行renderer.render(scene, camera);。

### 全屏控制

通过renderer.domElement属性可以访问threejs的渲染结果，也就是HTML的元素canvas画布。

可以把threejs的渲染结果renderer.domElement，插入到web页面上任何一个元素中

使用全局渲染

```js
// width和height用来设置Three.js输出的Canvas画布尺寸(像素px)
const width = window.innerWidth; //窗口文档显示区的宽度作为画布宽度
const height = window.innerHeight; //窗口文档显示区的高度作为画布高度
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
```

### 监听窗口变化设置响应式

```js
window.addEventListener('resize', () => {
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机投影矩阵
  camera.updateProjectionMatrix()
})
```