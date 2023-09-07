(window.webpackJsonp=window.webpackJsonp||[]).push([[231],{778:function(e,t,a){"use strict";a.r(t);var p=a(2),v=Object(p.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"webpack跨域配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#webpack跨域配置"}},[e._v("#")]),e._v(" webpack跨域配置")]),e._v(" "),t("p",[e._v("在安装webpack时，其内部就内置了跨域配置的插件。webpack-dev-server。")]),e._v(" "),t("p",[e._v("webpack-dev-server使用的是http-proxy-middleware来实现跨域代理的。")]),e._v(" "),t("p",[e._v("webpack版本不同，跨域设置的方式也有所不同。下面针对webpack3.0，4.0进行设置")]),e._v(" "),t("div",{staticClass:"language- extra-class"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("module.exports = {\n  //...\n  devServer: {\n    proxy: {\n      '/api': {\n        target: 'http://www.baidu.com/',\n        pathRewrite: {'^/api' : ''},\n        changeOrigin: true,     // target是域名的话，需要这个参数，\n        secure: false,          // 设置支持https协议的代理\n      },\n      '/api2': {\n          .....\n      }\n    }\n  }\n};\n")])])]),t("h3",{attrs:{id:"配置参数说明"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#配置参数说明"}},[e._v("#")]),e._v(" 配置参数说明")]),e._v(" "),t("p",[t("code",[e._v("**1、'/api'**")])]),e._v(" "),t("p",[e._v("捕获API的标志，如果API中有这个字符串，那么就开始匹配代理，")]),e._v(" "),t("p",[e._v("比如API请求/api/users, 会被代理到请求 http://www.baidu.com/api/users 。")]),e._v(" "),t("p",[e._v("也可以将api看做是请求地址,在请求的时候，用api替代请求地址。在nginx上也需要根据api字段来进行配置。否则nginx编译不成功.")]),e._v(" "),t("p",[t("code",[e._v("**2、'target'**")])]),e._v(" "),t("p",[e._v("代理的API地址，就是需要跨域的API地址。")]),e._v(" "),t("p",[e._v("地址可以是域名,如：http://www.baidu.com")]),e._v(" "),t("p",[e._v("也可以是IP地址：http://127.0.0.1:3000")]),e._v(" "),t("p",[e._v("如果是域名需要额外添加一个参数changeOrigin: true，否则会代理失败。")]),e._v(" "),t("p",[t("code",[e._v("**3、'pathRewrite'**")])]),e._v(" "),t("p",[e._v("路径重写，也就是说会修改最终请求的API路径。")]),e._v(" "),t("p",[e._v("比如访问的API路径：/api/users,")]),e._v(" "),t("p",[e._v("设置pathRewrite: {'^/api' : ''},后，")]),e._v(" "),t("p",[e._v("最终代理访问的路径：http://www.baidu.com/users，")]),e._v(" "),t("p",[e._v("这个参数的目的是给代理命名后，在访问时把命名删除掉。")]),e._v(" "),t("p",[t("code",[e._v("**4、changeOrigin**")])]),e._v(" "),t("p",[e._v("这个参数可以让target参数是域名。")]),e._v(" "),t("p",[t("code",[e._v("**5、secure**")])]),e._v(" "),t("p",[e._v("secure: false,不检查安全问题。\n设置后，可以接受运行在 HTTPS 上，可以使用无效证书的后端服务器")]),e._v(" "),t("p",[t("code",[e._v("**5、secure**")])]),e._v(" "),t("p",[e._v("secure: false,不检查安全问题。")]),e._v(" "),t("p",[e._v("设置后，可以接受运行在 HTTPS 上，可以使用无效证书的后端服务器")]),e._v(" "),t("p",[t("code",[e._v("**6、其他参数配置查看http-proxy-middleware文档**")])])])}),[],!1,null,null,null);t.default=v.exports}}]);