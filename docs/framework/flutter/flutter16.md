## Flutter中的PageView组件

PageView组件是实现轮播图，上下滑页切换功能。

### 常见属性

scrollDirection---Axis.horizonta水平方向 Axis.vertical锤子方向

children----配置子元素

allowImplicitScrolling---缓存当前页面的前后两页

onPageChanged---page改变的时候触发

### 一个简单的DEMO

```dart
body: Center(
        child: PageView(
          scrollDirection: Axis.vertical,
          children: [
            Center(
              child: Text('1'),
            ),
            Center(
              child: Text('2'),
            ),
            Center(
              child: Text('3'),
            ),
            Center(
              child: Text('4'),
            )
          ],
        )
      ),
```

### PageView.builder

PageView.builder 创建一个可滚动列表.可以使用List来存储页面内容，并设置PageView.builder的itemCount参数为List的长度，然后使用builder函数来构建每一页的内容

itemBuilder---只有索引大于或等于零且小于 itemcount 时才会调用它

scrollDirection----滑动方向

padEnds----是否在列表的两端添加填充

lipBehaviour----内容将根据此选项进行剪辑（或不剪辑）

```dart
import 'package:flutter/material.dart';

class DemoPage extends StatelessWidget {
  final List<String> pages = [
    'Page 1',
    'Page 2',
    'Page 3',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Demo Page'),
      ),
      body: PageView.builder(
        itemCount: pages.length,
        itemBuilder: (context, index) {
          return Center(
            child: Text(
              pages[index],
              style: TextStyle(fontSize: 24),
            ),
          );
        },
      ),
    );
  }
}
```

### PageController animateToPage自动切换页面

```dart
import 'package:flutter/material.dart';
import 'dart:async';

class AutoPageSwitchDemo extends StatefulWidget {
  @override
  _AutoPageSwitchDemoState createState() => _AutoPageSwitchDemoState();
}

class _AutoPageSwitchDemoState extends State<AutoPageSwitchDemo> {
  final PageController _pageController = PageController(initialPage: 0);
  final List<String> pages = [
    'Page 1',
    'Page 2',
    'Page 3',
  ];
  int currentPageIndex = 0;
  Timer _timer;

  @override
  void initState() {
    super.initState();
    startTimer();
  }

  @override
  void dispose() {
    _timer?.cancel();
    _pageController.dispose();
    super.dispose();
  }

  void startTimer() {
    const Duration pageDuration = Duration(seconds: 5);
    _timer = Timer.periodic(pageDuration, (Timer timer) {
      if (currentPageIndex < pages.length - 1) {
        currentPageIndex++;
      } else {
        currentPageIndex = 0;
      }
      _pageController.animateToPage(
        currentPageIndex,
        duration: Duration(milliseconds: 500),
        curve: Curves.easeInOut,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Auto Page Switch Demo'),
      ),
      body: PageView.builder(
        controller: _pageController,
        itemCount: pages.length,
        itemBuilder: (context, index) {
          return Center(
            child: Text(
              pages[index],
              style: TextStyle(fontSize: 24),
            ),
          );
        },
      ),
    );
  }
}
```

上面的代码创建了一个PageController来管理页面切换。在initState函数中，启动了一个定时器，每隔5秒切换到下一个页面。在startTimer函数中，使用animateToPage函数来实现页面的平滑切换。当达到页面列表的最后一页时，将从头开始，重新切换到第一页。

在页面被销毁时，我们要取消定时器并释放PageController

### AutomaticKeepAliveClientMixin 缓存PageView页面

上面的例子我们会发现 每次滑动的时候都会触发子组件中的 build方法 print(widget.url);
可见 PageView 默认并没有缓存功能，一旦页面滑出屏幕它就会被销毁 ,实际项目开发中对页面进行缓存是很常见的一个需求，下面我们就看看如何使用AutomaticKeepAliveClientMixin 缓存页面。

注意：使用时一定要注意是否必要，因为对所有列表项都缓存的会导致更多的内存消耗。

```dart
class CachedPageView extends StatefulWidget {
  @override
  _CachedPageViewState createState() => _CachedPageViewState();
}

class _CachedPageViewState extends State<CachedPageView>
    with AutomaticKeepAliveClientMixin {
  // 保持页面状态的标志位
  @override
  bool get wantKeepAlive => true;

  // 页面数和页码
  final List<String> pages = [
    'Page 1',
    'Page 2',
    'Page 3',
  ];
  int currentPageIndex = 0;

  @override
  Widget build(BuildContext context) {
    super.build(context); // 这一行很重要，不要忘记调用它

    return PageView.builder(
      itemCount: pages.length,
      itemBuilder: (context, index) {
        return Center(
          child: Text(
            pages[index],
            style: TextStyle(fontSize: 24),
          ),
        );
      },
      onPageChanged: (index) {
        setState(() {
          currentPageIndex = index;
        });
      },
      controller: PageController(initialPage: currentPageIndex),
    );
  }
}
```

重写wantKeepAlive方法并返回true，以指示页面的状态应该被保持。

在build方法中，确保调用超类的build方法以确保缓存的页面状态。然后，将PageView.builder放在这个小部件的build方法中。PageView.builder可以按需动态生成页面，此处使用pages列表生成页面。

在PageView.builder中，我们还可以设置一个PageController来控制页面的初始位置。当页面切换时，我们使用onPageChanged回调来更新当前的页面索引。

这样，当使用CachedPageView小部件时，Flutter会自动缓存每个页面的状态，并在页面重新可见时恢复其状态。

### 自定义KeepAliveWrapper 缓存页面

AutomaticKeepAliveClientMixin 可以快速的实现页面缓存功能，但是通过混入的方式实现不是很优雅， 所以我们有必要对AutomaticKeepAliveClientMixin 混入进行封装

```dart
import 'package:flutter/material.dart';
class KeepAliveWrapper extends StatefulWidget {
const KeepAliveWrapper(
  {Key? key, @required this.child, this.keepAlive = true})
  : super(key: key);
final Widget? child;
final bool keepAlive;
@override
State<KeepAliveWrapper> createState() => _KeepAliveWrapperState();
}
class _KeepAliveWrapperState extends State<KeepAliveWrapper>
 with AutomaticKeepAliveClientMixin {
@override
Widget build(BuildContext context) {
 return widget.child!;
}
@override
bool get wantKeepAlive => widget.keepAlive;
@override
void didUpdateWidget(covariant KeepAliveWrapper oldWidget) {
 if (oldWidget.keepAlive != widget.keepAlive) {
  // keepAlive 状态需要更新，实现在 AutomaticKeepAliveClientMixin 中
  updateKeepAlive();
 }
super.didUpdateWidget(oldWidget);
}
}
```

