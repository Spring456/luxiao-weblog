## git使用

### 常用的git方法

**1、新建本地分⽀并push到远程**

```js
git branch 分⽀名
git push origin 本地分⽀名
```
**2、删除本地分⽀(必须保证不在删除的分⽀上，才能进⾏删除)**

```js
git branch -d dev
```

3、切换到本地分⽀

```
git checkout 分⽀名
```

4、创建本地分⽀并切换

```js
git checkout -b 分⽀名
```

5、删除远程分⽀

```js
git push --delete origin dev
```

6、远程删除了分⽀，本地也想删除

```js
// 1.git branch -a查看远程分⽀，红⾊的是本地远程远程分⽀记录。
// 2.执⾏下⾯命令查看远程仓库分⽀和本地仓库的远程分⽀记录的对应关系：

git remote show origin

// 3.会看到：
// refs/remotes/origin/远程仓库已经删除的分⽀名 stale (use
// 'git remote prune' to remove)
// 4.其中：
// Local refs configured for 'git push': 命令下⾯的分⽀是本地仓库的远程
// 分⽀记录中仍存在的分⽀，但远程仓库已经不存在。
// 4.输⼊git remote prune origin来删除远程仓库已经删除过的分⽀
// 5.验证 git branch -a
// 此时可以看到本地远程分⽀记录已经和远程仓库保持⼀致了。
```

7、分⽀管理

```js
git branch -r //#查看远程所有分⽀

git branch //#查看本地所有分⽀

git branch -a //#查看本地及远程的所有分⽀，如下图

git fetch //#将某个远程主机的更新，全部取回本地：

git branch -a //#查看远程分⽀

git branch //#查看本地分⽀：

git checkout 分⽀ //#切换分⽀：

git push origin -d 分⽀名 //#删除远程分⽀:

git branch -d 分⽀名 //#删除本地分⽀

git remote show origin //#查看远程分⽀和本地分⽀的对应关系

git remote prune origin //#删除远程已经删除过的分⽀
```
8、删除上次push的提交（直接删除上次的提交）

```js
git reset --hard HEAD^
git push origin master -f
```
这个HEAD^就是想撤销那个commit之前的那个commit
还可以使⽤revert命令

```js
git revert HEAD
git push origin master
```

两者差别：
revert是放弃指定提交的修改，但是会⽣成⼀次新的提交，需要填写提交注释，以前的历史记录都在；
reset是指将HEAD指针指到指定提交，历史记录中不会出现放弃的提交记录。

9、撤销上次的commit（还没有push）

```js
git reset --soft|--mixed|--hard <commit_id>
git push develop develop --force //(本地分⽀和远程分⽀都是 develop)
```
这⾥的<commit_id>就是每次commit的SHA-1，可以在log⾥查看到
--mixed 会保留源码,只是将git commit和index 信息回退到了某个版本.
--soft 保留源码,只回退到commit信息到某个版本.不涉及index的回退,如果还需要提交,直接commit即
可.
--hard 源码也会回退到某个版本,commit和index 都会回退到某个版本.(注意,这种⽅式是改变本地代码
仓库源码)
通常使⽤--soft即可，回到commit之前，⽂件保存修改

## 更全的git用法

### 初始

```js
git --v //验证本地git是否已经启动

git init//把当前目录变为git可以管理的仓库

git status//查看状态

git clone xx(地址)//下载项目到本地
```

### 配置

```js
git config --list//显示当前的Git配置

git config -e [--global]//编辑Git配置文件

git config [--global] user.name "[name]"//设置提交代码的用户信息

git config [--global] user.email "[email address]"//设置提交代码的用户信息，有可能是密码
```

### 添加或删除文件

```js
git add [file1] [file2] ... //添加指定文件到暂存区

git add [dir]//添加指定目录到暂存区，包括子目录

git add . //添加当前目录的所有文件到暂存区

```

### 提交代码

```js
git commit -m [message]//提交暂存区到仓库区

git commit [file1] [file2] ... -m [message]//提交暂存区的指定文件到仓库区

git commit -a//提交工作区自上次commit之后的变化，直接到仓库区

git commit -v//提交时显示所有diff信息

git commit --amend -m [message]//使用一次新的commit，替代上一次提交;如果代码没有任何新变化，则用来改写上一次commit的提交信息

git commit --amend [file1] [file2] ...//重做上一次commit，并包括指定文件的新变化
```

### 分支操作

```js
git branch//列出所有本地分支

git branch -r//列出所有远程分支

git branch -a//列出所有本地分支和远程分支

git branch [branch-name]//新建一个分支，但依然停留在当前分支

git checkout -b [branch]//新建一个分支，并切换到该分支

git branch [branch] [commit]//新建一个分支，指向指定commit

git branch --track [branch] [remote-branch]//新建一个分支，与指定的远程分支建立追踪关系

git checkout [branch-name]//切换到指定分支，并更新工作区

git checkout -//切换到上一个分支

git branch --set-upstream [branch] [remote-branch]//建立追踪关系，在现有分支与指定的远程分支之间

git merge [branch]//合并指定分支到当前分支

git cherry-pick [commit]//选择一个commit，合并进当前分支

git branch -d [branch-name]//删除分支

git push origin --delete [branch-name]//删除远程分支


```

### 标签

```js
git tag//列出所有tag

git tag [tag]//新建一个tag在当前commit

git tag [tag] [commit]//新建一个tag在指定commit

git tag -d [tag]//删除本地tag

git push origin :refs/tags/[tagName]//删除远程tag

git show [tag]//查看tag信息

git push [remote] [tag]//提交指定tag

git push [remote] --tags//提交所有tag

git checkout -b [branch] [tag]//新建一个分支，指向某个tag
```

### 查看信息

```js
git status//显示有变更的文件

git log//显示当前分支的版本历史

git log --stat//显示commit历史，以及每次commit发生变更的文件

git log -S [keyword]//搜索提交历史，根据关键词

git log [tag] HEAD --pretty=format:%s//显示某个commit之后的所有变动，每个commit占据一行

git log [tag] HEAD --grep feature//显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件

git log --follow [file]//显示某个文件的版本历史，包括文件改名

git whatchanged [file]//显示某个文件的版本历史，包括文件改名

git log -p [file]//显示指定文件相关的每一次diff

git log -5 --pretty --oneline//显示过去5次提交

git shortlog -sn//显示所有提交过的用户，按提交次数排序

git blame [file]//显示指定文件是什么人在什么时间修改过

git diff//显示暂存区和工作区的差异

git diff --cached [file]//显示暂存区和上一个commit的差异

git diff HEAD//显示工作区与当前分支最新commit之间的差异

git diff [first-branch]...[second-branch]//显示两次提交之间的差异

git diff --shortstat "@{0 day ago}"//显示今天你写了多少行代码

git show [commit]//显示某次提交的元数据和内容变化

git show --name-only [commit]//显示某次提交发生变化的文件

git show [commit]:[filename]//显示某次提交时，某个文件的内容

git reflog//显示当前分支的最近几次提交
```

### 远程同步

```js
git fetch [remote]//下载远程仓库的所有变动

git remote -v//显示所有远程仓库

git remote show [remote]//显示某个远程仓库的信息

git remote add [shortname] [url]//增加一个新的远程仓库，并命名

git pull [remote] [branch]//取回远程仓库的变化，并与本地分支合并

git push [remote] [branch]//上传本地指定分支到远程仓库

git push [remote] --force//强行推送当前分支到远程仓库，即使有冲突

git push [remote] --all//推送所有分支到远程仓库
```

### 撤销

```js
git checkout [file]//恢复暂存区的指定文件到工作区

git checkout [commit] [file]//恢复某个commit的指定文件到暂存区和工作区

git checkout .//恢复暂存区的所有文件到工作区

git reset [file]//重置暂存区的指定文件，与上一次commit保持一致，但工作区不变

git reset --hard//重置暂存区与工作区，与上一次commit保持一致

git reset [commit]//重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变

git reset --hard [commit]//重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致

git reset --keep [commit]//重置当前HEAD为指定commit，但保持暂存区和工作区不变

git revert [commit]//新建一个commit，用来撤销指定commit.后者的所有变化都将被前者抵消，并且应用到当前分支

git stash,git stash pop//暂时将未提交的变化移除，稍后再移入
```
