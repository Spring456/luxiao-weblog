## 高德地图判断多边形不能相交，不能有交点（转）

其实这段代码也是转载别人的，出处已经找不到了。直接将代码复制过来吧。

```js
// 1.0.1 版本算法实现(判断有无交点，其实更符合业务)
    antonio(pointers){
      const p = pointers.slice()
      const l = p.length
      let victors = [], j, k
      if(l < 3){
        this.$Message.warning('要求是多边形')
        return
      }
      // 获取向量
      for(let i = 0; i < l; i++){
        j = (i + 1) % l
        k = (i + 2) % l
        victors.push([p[j], p[k]])
      }
      // 遍历
      let temp_victors = victors.slice()
      bk:while(temp_victors.length){
        const v = temp_victors.pop()
        for(let j = 0, len = temp_victors.length; j<len; j++){
          if(!this.cross_area(v, temp_victors[j])) return true 
        }
      }      
    },

    // 判断两个线段是否相交
    cross_area(v1, v2){
      const [a, b] = v1
      const [c, d] = v2
      var area_abc = (a[1] - c[1]) * (b[0] - c[0]) - (a[0] - c[0]) * (b[1] - c[1]);  
      var area_abd = (a[1] - d[1]) * (b[0] - d[0]) - (a[0] - d[0]) * (b[1] - d[1]);   
      var area_cda = (c[1] - a[1]) * (d[0] - a[0]) - (c[0] - a[0]) * (d[1] - a[1]);  
      var area_cdb = area_cda + area_abc - area_abd; 
      if(area_abc * area_abd < 0 && area_cda * area_cdb < 0){
        this.$Message.warning('图形不能相交，请重新绘制！')
        return false
      }
      return true
    }
```

使用

```js
antonio(pointers){}//这里的pointers，是一个二维数组，数组里面的元素是每个点的经纬度组成的一个小数组。
```