## react实现后台管理系统--Layout模块


### 项目基本架构

项目基本架构包括：导航模块，二级路由配置，菜单高亮功能，个人信息，退出登录功能

### 导航模块

新建layout文件夹，新建layout/index.js文件

打开 antd/Layout 布局组件文档，找到示例：顶部-侧边布局-通栏,将代码直接复制

```js
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
} from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

const LayoutBox = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">user.name</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="1">
              nav1
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="2">
              nav2
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>内容</Layout>
      </Layout>
    </Layout>
  )
}
export default LayoutBox
```

### 内容区域配置

内容区域其实也是一个个组件，点击左右导航，跳转到对应的路由，展示不同的内容

1、创建nav1,nav2三个文件夹

2、分别在文件夹中创建index.js并创建基础组件导出

3、在app配置嵌套子路由，在layout.js中配置二级路由出口

4、使用Link修改左侧菜单内容，与子路由规则匹配实现路由切换

创建2个文件夹

page/nav1/index.js

```js
const Nav1 = () => {
  return <div>Nav1</div>
}
export default Nav1
```

page/nav2/index.js

```js
const Nav2 = () => {
  return <div>Nav2</div>
}
export default Nav2
```

app.js

```js
<Route path="/" element={
    <AuthRoute>
      <Layout />
    </AuthRoute>
  }>
    {/* 二级路由默认页面 */}
    <Route index element={<Nav1 />} />
    <Route path="article" element={<Nav2 />} />
</Route>
<Route path="/login" element={<Login/>}></Route>
```

在Layout.js里使用Link链接到具体页面

```js
// 配置Link组件
<Menu
    mode="inline"
    theme="dark"
    style={{ height: '100%', borderRight: 0 }}
    selectedKeys={[selectedKey]}
    >
    <Menu.Item icon={<HomeOutlined />} key="/">
      <Link to="/">Nav1</Link>
    </Menu.Item>
    <Menu.Item icon={<DiffOutlined />} key="/article">
      <Link to="/article">Nav2</Link>
    </Menu.Item>
</Menu>

// 使用Outlet 进行二级路由对应显示
<Layout className="layout-content" style={{ padding: 20 }}>
  {/* 二级路由默认页面 */}
  <Outlet />
</Layout>
```


