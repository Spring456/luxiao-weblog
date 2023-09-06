## react 生命周期

> 只有类组件才有生命周期，因为类组件需要实例化，而函数组件不需要实例化，所有函数式组件没有生命周期

图示：

![react生命周期](../../media/life.png)

参考网站：[react生命周期图示](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

### 生命周期--挂载阶段

在挂载阶段，有constructor、render、componentDidMount这3个生命周期。它们的执行顺序是：

`constructor ->  render -> componentDidMount`

`constructor 钩子函数`

在创建组件时，最先执行，初始化的时候只执行一次。在这个生命周期中，可以初始化state，创建ref，使用bind解决this的指向问题(随着react版本发展，现在已经不用了)

`render 钩子函数`

render函数在每次组件渲染的时候都会触发，数据引起UI的改变，就会触发。因此这个钩子函数中不能调用setState

`componentDidMount 钩子函数`

这个钩子函数类似于vue的mounted钩子函数。是在完成dom渲染后执行，初始化的时候执行一次。在这个生命周期可以发送请求，进行dom操作。(比较重要)

### 生命周期--更新阶段

当调用方法会引起UI的变化就是更新阶段。这个阶段有两个生命周期：render和componentDidUpdate

`render 钩子函数`

每次组件渲染都会触发，渲染UI的作用

`componentDidMount 钩子函数`

是组件更新后，也就是DOM渲染完毕。可以获取到更新后的dom内容，不要在这个生命周期里使用setState

### 生命周期--卸载阶段

卸载阶段，只有一个生命周期--componentWillUnmount

在这个生命周期主要是用来清理定时器

