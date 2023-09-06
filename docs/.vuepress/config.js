module.exports = {
  title: "",
  description: "Welcome to your visit",
  theme: "reco",
  base: "/luxiao-weblog/",
  locales: {
    "/": {
      lang: "zh-CN",
    },
  },
  themeConfig: {
    logo: "https://img01.anheyu.com/useruploads/113/2023/04/23/6444b7bfb2406.jpg",
    authorAvatar:
      "",
    type: "blog",
    nav: [
      { text: "首页", link: "/", icon: "reco-home" },
      { text: "前端基础", link: "/home/", icon: "reco-date" },
      { text: "JS知识", link: "/js/", icon: "reco-date" },
      { text: "框架知识", link: "/framework/", icon: "reco-date" },
      { text:'工具插件',link:'/tools/',icon:'reco-date'},
      { text:'开发总结',link:'/develop/',icon:'reco-date'}
    ],
    sidebarDepth: 3,
    sidebar:{
      "/home/":[
        {
          title: "前端基础",
          collapsable: true,
          children: [
            "fontEnd/css",
            "fontEnd/html5",
            "fontEnd/reflow",
            "fontEnd/layout",
            "fontEnd/align",
            "fontEnd/flex",
            "fontEnd/rem",
            "fontEnd/esplli",
            "fontEnd/cssanima",
          ]
        },
      ],
      "/js/":[
        {
          title: "JS知识",
          collapsable: true,
          children: [
            "font/js",
            "font/arrr",
            "font/windows",
            "font/createObject",
            "font/knowtips",
            "font/pushState",
            "font/event",
            "font/jiagou",
            "font/decimal", 
            "font/applyColor",
            "font/optimize",
            "font/varib",
            "font/actionScope",
            "font/copy",
            "font/new",
            "font/thiscall",
            "font/this",
            "font/collection",
            "font/closure",
            "font/prototype",
            "font/bibao",
            "font/objfront",
            "font/objfront1",
            "font/objfront2",
            "font/arrgao",
            "font/debounce",
            "font/promise",
            "font/awaitasync",
          ]
        },
      ],
      "/framework/":[
       {
        title:'Vue',
        collapsable:true,
        children:[
          "font/vue_tips5",
          "font/tupu",
          "font/vueLife",
          "font/customModel",
          "font/axios",
          "font/mixins",
          "font/component",
          "font/router",
          "font/vuex",
          "font/slot",
          "font/vue_tips1",
          "font/vuedg",
          "font/vue_tips2",
          "font/computed",
          "font/vue_tips3",
          "font/vue_tips4",
          "font/vue_tips6",
          "font/vue_tips7",
          "font/vue_tips8",
          "font/compile",
          "font/render",
          "font/vnode",
          "font/keepalive",
          "font/vuecompile",
          "font/vue3",
        ]
       },
       {
        title:'Vue3',
        collapsable:true,
        children:[
          'vue3/page1',
          'vue3/page2',
          'vue3/page3',
          'vue3/page4'  
        ]
       },
       {
        title:'React',
        collapsable:true,
        children:[
          'fontReact/msg',
          'fontReact/reactChild',
          'fontReact/life',
          'fontReact/hook',
          'fontReact/router',
          'fontReact/mobx',
          'fontReact/alias',
          'fontReact/auth',
          'fontReact/history',
          'fontReact/react-dom',
          'fontReact/react-utils',
          'fontReact/react-question',
          'fontReact/react-pc1',
          'fontReact/react-pc2',
          'fontReact/react-pc3',
          'fontReact/react-pc4',
          'fontReact/setState',
        ]
       },
       {
        title:'Flutter',
        collapsable:true,
        children:[
          'flutter/Dart1',
          'flutter/Dart2',
          'flutter/Dart3',
          'flutter/Dart4',
          'flutter/Dart5',
          'flutter/Dart6',
          'flutter/Dart7',
          'flutter/Dart8',
          'flutter/Dart9',
          'flutter/Dart10',
          'flutter/Dart11',
          'flutter/Dart12',
          'flutter/Dart13',
          'flutter/Dart14',
          'flutter/Dart15',
          'flutter/Dart16',
          'flutter/Dart17',
          'flutter/flutter1',
          'flutter/flutter2',
          'flutter/flutter3',
          'flutter/flutter4',
          'flutter/flutter5',
          'flutter/flutter6',
          'flutter/flutter7',
          'flutter/flutter8',
          'flutter/flutter9',
          'flutter/flutter10',
          'flutter/flutter11',
        ]
       }
      ],
      '/develop/':[
        {
          title:'Develop',
          collapsable:true,
          children:[
            'font/copy',
            'font/echarts',
            'font/gpsto',
            'font/gdmapj',
            'font/ylpdf',
            'font/data',
            'font/elementUIs',
            'font/mixinDevelop',
            'font/menuDefend',
            'font/dmsd',
            'font/api',
            'font/vuejiqiao',
          ]
        },
        {
          title:'性能优化',
          collapsable:true,
          children:[
            'performance/page1',
            'performance/page2',
            'performance/page3',
            'performance/page4',
            'performance/perform1',
            'performance/perform2',
            'performance/perform3',
          ]
        },
        {
          title:'文章推荐',
          collapsable:true,
          children:[
            'artical/indexs'
          ]
        }
      ],
      '/tools/':[
        {
          title:'webpack',
          collapsable:true,
          children:[
            'webpack/webpack09',
            'webpack/webpack07',
            'webpack/webpack01',
            'webpack/webpack03',
            'webpack/webpack02',
            'webpack/webpack04',
            'webpack/webpack08',
            'webpack/webpack05',
            'webpack/webpack06',
            'webpack/webpack10',
            'webpack/webpack11',
          ]
        }
      ]
    },
    
    subSidebar:'auto',
    // blogConfig: {
    //   tag: {
    //     location: 2, // 在导航栏菜单中所占的位置，默认4
    //     text: "标签", // 默认文案 “标签”
    //   },
    // },
  },
  plugins: [['vuepress-plugin-code-copy', true]]
  // plugins: [
  //   [
  //     "sakura",
  //     {
  //       num: 20, // 默认数量
  //       show: true, //  是否显示
  //       zIndex: -1, // 层级
  //       img: {
  //         replace: false, // false 默认图 true 换图 需要填写httpUrl地址
  //       },
  //     },
  //   ],
  //   [
  //     "cursor-effects",
  //     {
  //       size: 2, // size of the particle, default: 2
  //       shape: "circle", // ['star' | 'circle'], // shape of the particle, default: 'star'
  //       zIndex: 999999999, // z-index property of the canvas, default: 999999999
  //     },
  //   ],
  //   [
  //     "vuepress-plugin-helper-live2d",
  //     {
  //       // 是否开启控制台日志打印(default: false)
  //       log: false,
  //       live2d: {
  //         // 是否启用(关闭请设置为 false)(default: true)
  //         enable: true,
  //         // 模型名称(default: hibiki)>>>取值请参考：
  //         // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
  //         model: "hibiki",
  //         display: {
  //           position: "right", // 显示位置：left/right(default: 'right')
  //           width: 135, // 模型的长度(default: 135)
  //           height: 300, // 模型的高度(default: 300)
  //           hOffset: 65, //  水平偏移(default: 65)
  //           vOffset: 0, //  垂直偏移(default: 0)
  //         },
  //         mobile: {
  //           show: false, // 是否在移动设备上显示(default: false)
  //         },
  //         react: {
  //           opacity: 0.8, // 模型透明度(default: 0.8)
  //         },
  //       },
  //     },
  //   ],
  //   ["vuepress-plugin-code-copy", true],
  // ],
};
