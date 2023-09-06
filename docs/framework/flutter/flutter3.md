## Container容器组件

### 组件属性

1、alignment---居中

> 用法：alignment:Alignment.center

属性介绍：

topCenter---顶部居中对齐

topLeft---顶部左对齐

topRight---顶部右对齐

center---水平垂直居中对齐

centerLeft---垂直居中水平居左对齐

centerRight---垂直居中水平右对齐

bottomCenter---底部居中对齐

bottomLeft---底部居左对齐

bottomRight---底部居右对齐

2、decoration

> 用法:decoration:BoxDecoration(color:Color.bule)

decoration---装饰，具体写法参考下面的代码

```dart
decoration: BoxDecoration(
          color: Colors.orange,
          gradient: const LinearGradient(colors: [Colors.red,Colors.orange]),
          boxShadow: const [
            BoxShadow(
              offset: Offset(2.0,2.0),
              color: Colors.blue,
              blurRadius: 10.0
            )
          ],
          border: Border.all(
            color: Colors.brown,
            width: 1
          )
        ),
```

3、margin---Container与外部组件距离.`EdgeInsets.all(20.0)`

4、padding---padding是Container的内边距，指Container边缘与Child之间的距离.`EdgeInsets.all(20.0)`

5、transform---让Container进行一些旋转之类的。`transform: Matrix4.rotationZ(.2)`

6、height---Container的高度

7、width---Container的宽度

8、child---Container子元素

### 实现一个渐变的按钮

```dart
class HomeWidget extends StatelessWidget{
  const HomeWidget({Key?key}):super(key:key);
  @override
  Widget build(BuildContext context){
    return  Center(
      child: Container(
        alignment: Alignment.center,
        height: 40,
        width: 200,
        decoration: BoxDecoration(
          color: Colors.orange,
          gradient: const LinearGradient(colors: [Colors.red,Colors.orange]),
          boxShadow: const [
            BoxShadow(
              offset: Offset(2.0,2.0),
              color: Colors.blue,
              blurRadius: 10.0
            )
          ],
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: Colors.brown,
            width: 2
          )
        ),
        child: const Text('按钮',style: TextStyle(fontSize: 20),),
      ),
    );
  }
}
```



