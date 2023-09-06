(window.webpackJsonp=window.webpackJsonp||[]).push([[194],{725:function(t,s,a){"use strict";a.r(s);var n=a(2),e=Object(n.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h2",{attrs:{id:"git使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#git使用"}},[t._v("#")]),t._v(" git使用")]),t._v(" "),s("h3",{attrs:{id:"常用的git方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用的git方法"}},[t._v("#")]),t._v(" 常用的git方法")]),t._v(" "),s("p",[s("strong",[t._v("1、新建本地分⽀并push到远程")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git branch 分⽀名\ngit push origin 本地分⽀名\n")])])]),s("p",[s("strong",[t._v("2、删除本地分⽀(必须保证不在删除的分⽀上，才能进⾏删除)")])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("d dev\n")])])]),s("p",[t._v("3、切换到本地分⽀")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("git checkout 分⽀名\n")])])]),s("p",[t._v("4、创建本地分⽀并切换")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git checkout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("b 分⽀名\n")])])]),s("p",[t._v("5、删除远程分⽀")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git push "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("delete")]),t._v(" origin dev\n")])])]),s("p",[t._v("6、远程删除了分⽀，本地也想删除")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1.git branch -a查看远程分⽀，红⾊的是本地远程远程分⽀记录。")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2.执⾏下⾯命令查看远程仓库分⽀和本地仓库的远程分⽀记录的对应关系：")]),t._v("\n\ngit remote show origin\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 3.会看到：")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// refs/remotes/origin/远程仓库已经删除的分⽀名 stale (use")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 'git remote prune' to remove)")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 4.其中：")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Local refs configured for 'git push': 命令下⾯的分⽀是本地仓库的远程")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 分⽀记录中仍存在的分⽀，但远程仓库已经不存在。")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 4.输⼊git remote prune origin来删除远程仓库已经删除过的分⽀")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 5.验证 git branch -a")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 此时可以看到本地远程分⽀记录已经和远程仓库保持⼀致了。")]),t._v("\n")])])]),s("p",[t._v("7、分⽀管理")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("r "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#查看远程所有分⽀")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#查看本地所有分⽀")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#查看本地及远程的所有分⽀，如下图")]),t._v("\n\ngit fetch "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#将某个远程主机的更新，全部取回本地：")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("a "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#查看远程分⽀")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#查看本地分⽀：")]),t._v("\n\ngit checkout 分⽀ "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#切换分⽀：")]),t._v("\n\ngit push origin "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("d 分⽀名 "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#删除远程分⽀:")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("d 分⽀名 "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#删除本地分⽀")]),t._v("\n\ngit remote show origin "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#查看远程分⽀和本地分⽀的对应关系")]),t._v("\n\ngit remote prune origin "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//#删除远程已经删除过的分⽀")]),t._v("\n")])])]),s("p",[t._v("8、删除上次push的提交（直接删除上次的提交）")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git reset "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("hard "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HEAD")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("^")]),t._v("\ngit push origin master "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("f\n")])])]),s("p",[t._v("这个HEAD^就是想撤销那个commit之前的那个commit\n还可以使⽤revert命令")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git revert "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HEAD")]),t._v("\ngit push origin master\n")])])]),s("p",[t._v("两者差别：\nrevert是放弃指定提交的修改，但是会⽣成⼀次新的提交，需要填写提交注释，以前的历史记录都在；\nreset是指将HEAD指针指到指定提交，历史记录中不会出现放弃的提交记录。")]),t._v(" "),s("p",[t._v("9、撤销上次的commit（还没有push）")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git reset "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("soft"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("mixed"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("hard "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("commit_id"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\ngit push develop develop "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("force "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//(本地分⽀和远程分⽀都是 develop)")]),t._v("\n")])])]),s("p",[t._v("这⾥的<commit_id>就是每次commit的SHA-1，可以在log⾥查看到\n--mixed 会保留源码,只是将git commit和index 信息回退到了某个版本.\n--soft 保留源码,只回退到commit信息到某个版本.不涉及index的回退,如果还需要提交,直接commit即\n可.\n--hard 源码也会回退到某个版本,commit和index 都会回退到某个版本.(注意,这种⽅式是改变本地代码\n仓库源码)\n通常使⽤--soft即可，回到commit之前，⽂件保存修改")]),t._v(" "),s("h2",{attrs:{id:"更全的git用法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#更全的git用法"}},[t._v("#")]),t._v(" 更全的git用法")]),t._v(" "),s("h3",{attrs:{id:"初始"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#初始"}},[t._v("#")]),t._v(" 初始")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("v "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//验证本地git是否已经启动")]),t._v("\n\ngit init"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//把当前目录变为git可以管理的仓库")]),t._v("\n\ngit status"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//查看状态")]),t._v("\n\ngit clone "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("xx")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("地址"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//下载项目到本地")]),t._v("\n")])])]),s("h3",{attrs:{id:"配置"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[t._v("#")]),t._v(" 配置")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git config "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("list"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示当前的Git配置")]),t._v("\n\ngit config "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("e "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("global"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//编辑Git配置文件")]),t._v("\n\ngit config "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("global"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("name "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"[name]"')]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//设置提交代码的用户信息")]),t._v("\n\ngit config "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("global"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" user"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("email "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"[email address]"')]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//设置提交代码的用户信息，有可能是密码")]),t._v("\n")])])]),s("h3",{attrs:{id:"添加或删除文件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#添加或删除文件"}},[t._v("#")]),t._v(" 添加或删除文件")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git add "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//添加指定文件到暂存区")]),t._v("\n\ngit add "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("dir"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//添加指定目录到暂存区，包括子目录")]),t._v("\n\ngit add "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//添加当前目录的所有文件到暂存区")]),t._v("\n\n")])])]),s("h3",{attrs:{id:"提交代码"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#提交代码"}},[t._v("#")]),t._v(" 提交代码")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("m "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("message"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//提交暂存区到仓库区")]),t._v("\n\ngit commit "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("m "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("message"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//提交暂存区的指定文件到仓库区")]),t._v("\n\ngit commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//提交工作区自上次commit之后的变化，直接到仓库区")]),t._v("\n\ngit commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("v"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//提交时显示所有diff信息")]),t._v("\n\ngit commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("amend "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("m "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("message"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//使用一次新的commit，替代上一次提交;如果代码没有任何新变化，则用来改写上一次commit的提交信息")]),t._v("\n\ngit commit "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("amend "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file2"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//重做上一次commit，并包括指定文件的新变化")]),t._v("\n")])])]),s("h3",{attrs:{id:"分支操作"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#分支操作"}},[t._v("#")]),t._v(" 分支操作")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git branch"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//列出所有本地分支")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("r"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//列出所有远程分支")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("a"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//列出所有本地分支和远程分支")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//新建一个分支，但依然停留在当前分支")]),t._v("\n\ngit checkout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("b "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//新建一个分支，并切换到该分支")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//新建一个分支，指向指定commit")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("track "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("remote"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//新建一个分支，与指定的远程分支建立追踪关系")]),t._v("\n\ngit checkout "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//切换到指定分支，并更新工作区")]),t._v("\n\ngit checkout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//切换到上一个分支")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("set"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("upstream "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("remote"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//建立追踪关系，在现有分支与指定的远程分支之间")]),t._v("\n\ngit merge "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//合并指定分支到当前分支")]),t._v("\n\ngit cherry"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("pick "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//选择一个commit，合并进当前分支")]),t._v("\n\ngit branch "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("d "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//删除分支")]),t._v("\n\ngit push origin "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("delete")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//删除远程分支")]),t._v("\n\n\n")])])]),s("h3",{attrs:{id:"标签"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#标签"}},[t._v("#")]),t._v(" 标签")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git tag"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//列出所有tag")]),t._v("\n\ngit tag "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//新建一个tag在当前commit")]),t._v("\n\ngit tag "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//新建一个tag在指定commit")]),t._v("\n\ngit tag "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("d "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//删除本地tag")]),t._v("\n\ngit push origin "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("refs"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("tags"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("tagName"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//删除远程tag")]),t._v("\n\ngit show "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//查看tag信息")]),t._v("\n\ngit push "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("remote"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//提交指定tag")]),t._v("\n\ngit push "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("remote"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("tags"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//提交所有tag")]),t._v("\n\ngit checkout "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("b "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//新建一个分支，指向某个tag")]),t._v("\n")])])]),s("h3",{attrs:{id:"查看信息"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#查看信息"}},[t._v("#")]),t._v(" 查看信息")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git status"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示有变更的文件")]),t._v("\n\ngit log"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示当前分支的版本历史")]),t._v("\n\ngit log "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("stat"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示commit历史，以及每次commit发生变更的文件")]),t._v("\n\ngit log "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("S")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("keyword"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//搜索提交历史，根据关键词")]),t._v("\n\ngit log "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HEAD")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("pretty"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("format"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),t._v("s"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示某个commit之后的所有变动，每个commit占据一行")]),t._v("\n\ngit log "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("tag"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HEAD")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("grep feature"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件')]),t._v("\n\ngit log "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("follow "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示某个文件的版本历史，包括文件改名")]),t._v("\n\ngit whatchanged "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示某个文件的版本历史，包括文件改名")]),t._v("\n\ngit log "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("p "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示指定文件相关的每一次diff")]),t._v("\n\ngit log "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("pretty "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("oneline"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示过去5次提交")]),t._v("\n\ngit shortlog "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("sn"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示所有提交过的用户，按提交次数排序")]),t._v("\n\ngit blame "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示指定文件是什么人在什么时间修改过")]),t._v("\n\ngit diff"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示暂存区和工作区的差异")]),t._v("\n\ngit diff "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("cached "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示暂存区和上一个commit的差异")]),t._v("\n\ngit diff "),s("span",{pre:!0,attrs:{class:"token constant"}},[t._v("HEAD")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示工作区与当前分支最新commit之间的差异")]),t._v("\n\ngit diff "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("first"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("second"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示两次提交之间的差异")]),t._v("\n\ngit diff "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("shortstat "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@{0 day ago}"')]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示今天你写了多少行代码")]),t._v("\n\ngit show "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示某次提交的元数据和内容变化")]),t._v("\n\ngit show "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("name"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("only "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示某次提交发生变化的文件")]),t._v("\n\ngit show "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("filename"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示某次提交时，某个文件的内容")]),t._v("\n\ngit reflog"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示当前分支的最近几次提交")]),t._v("\n")])])]),s("h3",{attrs:{id:"远程同步"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#远程同步"}},[t._v("#")]),t._v(" 远程同步")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git fetch "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("remote"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//下载远程仓库的所有变动")]),t._v("\n\ngit remote "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("v"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示所有远程仓库")]),t._v("\n\ngit remote show "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("remote"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//显示某个远程仓库的信息")]),t._v("\n\ngit remote add "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("shortname"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("url"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//增加一个新的远程仓库，并命名")]),t._v("\n\ngit pull "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("remote"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//取回远程仓库的变化，并与本地分支合并")]),t._v("\n\ngit push "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("remote"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("branch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//上传本地指定分支到远程仓库")]),t._v("\n\ngit push "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("remote"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("force"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//强行推送当前分支到远程仓库，即使有冲突")]),t._v("\n\ngit push "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("remote"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("all"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//推送所有分支到远程仓库")]),t._v("\n")])])]),s("h3",{attrs:{id:"撤销"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#撤销"}},[t._v("#")]),t._v(" 撤销")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[t._v("git checkout "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//恢复暂存区的指定文件到工作区")]),t._v("\n\ngit checkout "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//恢复某个commit的指定文件到暂存区和工作区")]),t._v("\n\ngit checkout "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//恢复暂存区的所有文件到工作区")]),t._v("\n\ngit reset "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("file"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//重置暂存区的指定文件，与上一次commit保持一致，但工作区不变")]),t._v("\n\ngit reset "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("hard"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//重置暂存区与工作区，与上一次commit保持一致")]),t._v("\n\ngit reset "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变")]),t._v("\n\ngit reset "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("hard "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致")]),t._v("\n\ngit reset "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("--")]),t._v("keep "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//重置当前HEAD为指定commit，但保持暂存区和工作区不变")]),t._v("\n\ngit revert "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commit"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//新建一个commit，用来撤销指定commit.后者的所有变化都将被前者抵消，并且应用到当前分支")]),t._v("\n\ngit stash"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("git stash pop"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//暂时将未提交的变化移除，稍后再移入")]),t._v("\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);