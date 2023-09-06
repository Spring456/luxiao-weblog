插件的本质就是--在某个生命周期做某件事情。

mixins的本质的就是创建一个数组，可以被所有组件使用。混入进组件的选项配置中。

打包过大，优化方案之一---拆分异步组件

vuex东西太多，

根据页面不同，加载不同的vuex

步骤：

1、混入生命周期

2、判断一下这个组件有没有需要异步加载vuex

3、根据组件name,从文件夹module里异步引入对应js

4、注册到vuex

function a(){}

a.install= function(){
    vue.mixin({
        beforCreate:function(){
            if(this.$options.isVuex){
                var name = this.$options.name
                import('../store/module'+name).then(res=>{
                    this.$store.registerModule(this.$options.name,res.dufault)
                })
            }
        }
    })
}

vue.extend

通过import引入的组件，拿到的是组件的配置。

如果想通过js来操作一个组件，然后挂载到一个dom上。我们想在外部的JS里面获取并且操作某个组件。就要用到vue.extend

