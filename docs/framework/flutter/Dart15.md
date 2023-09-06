## Dart中的库，自定义库，系统库，第三方库

### Dart中的自定义库

 在Dart中，库的使用时通过import关键字引入的。

 library指令可以创建一个库，每个Dart文件都是一个库，即使没有使用library指令来指定。

 Dart中的库主要有三种：

**1、我们自定义的库**

> import 'lib/xxx.dart';

**2、系统内置库**    

> import 'dart:math';    
> import 'dart:io'; 
> import 'dart:convert';

**3、Pub包管理系统中的库**  

> https://pub.dev/packages
> https://pub.flutter-io.cn/packages
> https://pub.dartlang.org/flutter/

a、需要在自己想项目根目录新建一个pubspec.yaml

b、在`pubspec.yaml`文件 然后配置名称 、描述、依赖等信息

c、然后运行 `pub get` 获取包下载到本地  

d、项目中引入库 `import 'package:http/http.dart' as http`; 看文档使用

### Dart库的重命名

当引入两个库中有相同名称标识符的时候，如果是java通常我们通过写上完整的包名路径来指定使用的具体标识符，甚至不用import都可以，但是Dart里面是必须import的。当冲突的时候，可以使用as关键字来指定库的前缀。如下例子所示：

```dart
//下面Person1.dart，Person2.dart里面都有Person这个类，都引用的时候，如果不做别名处理就会报错
import 'lib/Person1.dart';
import 'lib/Person2.dart' as lib;

main(List<String> args) {
  Person p1=new Person('张三', 20);
  p1.printInfo();

  lib.Person p2=new lib.Person('李四', 20);
  p2.printInfo();
}
```

### Dart库部分引入

如果只需要导入库的一部分，有两种模式

模式一：只导入需要的部分，使用show关键字

> import 'package:lib.dart' show getData;

上面的引入，表示只引入了getData这个方法，其他方法都不能使用

模式二：隐藏不需要的部分，使用hide关键字

> import 'pachage:lib.dart' hide setData;

上面使用hide关键字，表示只不需要setData这个方法，其他方法可以正常使用