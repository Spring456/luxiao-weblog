## Flutter中的Key详解

在写flutter的widget时，经常会遇到Key的使用，比如下面的代码

> const MyApp({Key? key}) : super(key: key);

那么上面的key到底有什么作用呢？

在Flutter中，Key是一个用来标识Widget的对象。它可以帮助Flutter在进行渲染、布局和状态更新等操作时，准确找到对应的Widget。当一个Widget在树中被替换或移动时，如果新Widget具有相同的Key，Flutter会尝试重新利用相同Key的Widget，而不是重新创建一个新的Widget。

### Key的作用

**帮助Flutter识别并管理Widget的状态：**

当一个Widget拥有一个Key时，Flutter会将其视为一个唯一的标识符。这意味着，即使两个Widget的属性相同，但如果它们的Key不同，Flutter也会将它们视为完全不同的Widget，并分别处理它们的状态。

在Widget树变化时准确找到对应的Widget：当Widget树中的某个节点被移动、替换或重建时，Flutter通过Key来确定具体是哪个Widget发生了变化。这对于实现一些比较复杂的UI布局和动画效果至关重要。

**优化Widget的刷新：**

当一个Widget的Key保持不变时（比如在列表中的Item），Flutter会尝试尽量复用这个Widget，而不是重新创建它。这样可以提高性能，避免不必要的重建和重新渲染。

如果不使用Key，会导致Widget重新渲染；错误的状态管理;错误的Widget复用。

比如下面的例子：

```dart
class ExampleItem extends StatelessWidget {
  final String title;

  ExampleItem(this.title);

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(title),
    );
  }
}

class ExampleList extends StatelessWidget {
  final List<String> items = ['Item 1', 'Item 2', 'Item 3'];

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: items.length,
      itemBuilder: (context, index) {
        return ExampleItem(items[index]);
      },
    );
  }
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Example App'),
        ),
        body: ExampleList(),
      ),
    );
  }
}

void main() {
  runApp(MyApp());
}
```
上面的例子中，ExampleItem没有使用任何Key来标识，如果为items列表添加一个新的项，当我们运行程序时，就会创建一个新的ExampleItem来呈现这个项，而不是尝试复用已经存在的ExampleItem。

### 多种Key

**GlobalKey**

除了普通的Key外，Flutter还提供了全局Key（GlobalKey）。GlobalKey是一个特殊类型的Key，用于标识跨多个Widget层次结构的Widget。它可以用于查找和操作Widget树中的具体组件。例如，在表单提交后，可以使用GlobalKey来获取表单中某个输入字段的值。

**ObjectKey**

ObjectKey是Key的一个实现类，它将对象作为唯一标识符，并使用对象的hashCode和运算符==来比较对象的唯一性。ObjectKey通常用于根据数据模型动态创建和更新Widget，以确保正确的更新和重建。

**ValueKey**

ValueKey的构造函数接受一个值作为参数，该值用于唯一标识Widget。当Widget树发生变化时，Flutter会使用ValueKey来确定哪些Widget需要更新、移动或删除。

ValueKey的工作原理如下：Flutter会将ValueKey与之前的Widget进行比较，如果两个ValueKey具有相同的值，则Flutter会认为它们是相同的Widget。这允许Flutter在重新渲染时保持具有相同ValueKey的Widget的状态和位置的稳定性。


如果没有使用Key会导致什么问题呢？

```dart
import 'package:flutter/material.dart';

class ExampleWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        // 没有提供Key值的相同类型的Widget
        Container(
          color: Colors.red,
          height: 100,
        ),
        Container(
          color: Colors.green,
          height: 100,
        ),
        Container(
          color: Colors.blue,
          height: 100,
        ),
      ],
    );
  }
}
```

创建了三个相同类型的Container Widget，并将它们放置在ListView中。由于没有为这些Container提供Key值，当ListView重新渲染时，Flutter无法准确识别和定位每个Container。

假设在后续渲染中，ListView的数据源发生变化，需要对列表项进行重新排序。由于没有Key值，Flutter无法区分Container之间的差异，只会认为它们是相同类型的Widget。这将导致Flutter错误地删除、移动或重建Container，而不仅仅是调整它们的位置。

使用Key值可以解决这个问题。通过为每个Container提供唯一的Key值，Flutter可以正确识别和定位每个Container，并在重新排序时保持其状态和位置的稳定。

```dart
import 'package:flutter/material.dart';

class ExampleWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Container(
          key: ValueKey('container1'), // 使用ValueKey来创建Key值
          color: Colors.red,
          height: 100,
        ),
        Container(
          key: ValueKey('container2'), // 使用ValueKey来创建Key值
          color: Colors.green,
          height: 100,
        ),
        Container(
          key: ValueKey('container3'), // 使用ValueKey来创建Key值
          color: Colors.blue,
          height: 100,
        ),
      ],
    );
  }
}
```

### GlobalKey

在Flutter中，GlobalKey是一种特殊的Key实现类，用于标识跨多个Widget层次结构的Widget。它提供了一种查找和操作Widget树中具体组件的机制。

GlobalKey可以用于以下几个方面：

**查找Widget**：通过GlobalKey，你可以在整个Widget树中轻松地查找具有相应Key的特定Widget。这对于需要直接访问或修改特定Widget属性的情况非常有用。

**状态保留**：使用GlobalKey，你可以在Widget树的不同部分共享状态。例如，在表单提交后，你可以使用GlobalKey来获取表单中某个输入字段的值。

调用Widget方法：GlobalKey使你能够调用与特定Widget关联的方法。这对于触发特定Widget中的操作或执行逻辑非常有用。

**请注意以下几点：**

使用GlobalKey需要谨慎，因为它会引入一些复杂性，并且可能导致代码难以维护。

GlobalKey只能在StatefulWidget中使用，因为它需要与State对象关联。

对于大多数情况下，推荐使用更简单的Key实现类，如ValueKey或ObjectKey。

```dart
import 'package:flutter/material.dart';

class ExampleWidget extends StatefulWidget {
  @override
  _ExampleWidgetState createState() => _ExampleWidgetState();
}

class _ExampleWidgetState extends State<ExampleWidget> {
  GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey, // 使用GlobalKey来创建Form的Key
      child: Column(
        children: [
          TextFormField(
            // 表单字段
            // ...
          ),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState.validate()) {
                // 执行表单验证通过后的操作
              }
            },
            child: Text('提交'),
          ),
        ],
      ),
    );
  }
}
```

在上述示例中，我们使用GlobalKey来创建一个Form的Key，以便在提交按钮被点击时执行表单验证。通过_globalKey.currentState_，我们可以获取与该GlobalKey关联的FormState，并调用validate()方法来验证表单字段。

### ObjectKey

ObjectKey是Flutter中的另一种Key实现类，用于根据对象的身份来标识Widget的唯一性。它通过对象的hashCode和==操作符来确定对象的唯一性。

使用ObjectKey时，如果两个ObjectKey具有相同的对象引用或相等的对象（根据hashCode和==操作符的定义），则Flutter认为它们是相同的Widget，并在需要时保持其状态和位置的稳定性。

```dart
import 'package:flutter/material.dart';

class ExampleWidget extends StatelessWidget {
  final String title;

  ExampleWidget({required this.title});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      key: ObjectKey(this), // 使用ObjectKey来创建Key值
      title: Text(title),
      // ...
    );
  }
}
```
在上述示例中，我们将ExampleWidget用作ListTile的子组件，并使用该组件本身的对象引用来创建ObjectKey。这样，每个ExampleWidget都会有一个唯一的ObjectKey，以确保其在列表视图中的准确识别和位置稳定性。

ObjectKey的一些限制：

相同类型的不同实例应具有不同的ObjectKey。

对于匿名对象（没有重写==和hashCode的对象），应格外小心使用ObjectKey，因为它们的默认行为可能导致意外结果。

当使用ObjectKey时，请确保在Widget的生命周期中不会更改其关联的对象引用或相等的对象，否则可能导致意外的重建和状态丢失。


