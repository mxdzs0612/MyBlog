---
title: 使用hexo在github上搭建博客：基础篇
date: 2019-07-29 10:58:21
category: 其他
tags: [github, hexo]
---

本文记录在github上搭建hexo博客的过程，以及一些遇到的问题。

关于hexo的简介，可以参考[官方文档](https://hexo.io/zh-cn/docs/)。

## 环境准备
首先需要安装、配置好[git](https://git-scm.com/)。

安装[node.js](https://nodejs.org/zh-cn/)。

然后注册[github](https://github.com/)账号。git的配置中，用户名和邮箱应与github相同。

具体过程还请自行搜索，此处从略。

然后配置ssh密钥。在控制台输入
>ssh-keygen -t rsa -C "github的注册邮箱"

一路回车，得到信息，密钥会被保存在系统盘用户目录下的.ssh文件夹中。

找到id_rsa.pub文件并用文本编辑器（如[Notepad++](https://notepad-plus-plus.org/)）打开，复制里面的内容。注意此处有两个文件，其中id_rsa文件中保存的是**私钥**，是只能自己看的，而公钥是可以上传的，不要点错了。

进入github的[ssh配置页面](https://github.com/settings/ssh)，点击New SSH key，将刚才复制的公钥的值粘贴到Key一栏中。title可任填，如blog。完毕后点击绿色按钮保存。

## 创建仓库
在github的右上角点击[Create a new repository](https://github.com/new)。

在<font color=orange>Repository name</font> 中填入**你的用户名.github.io**，如mxdzs0612.github.io即为本博客的仓库名。

这同时也是博客的域名。在下文中，将用“xxxx”代替用户名。

其它选项任填，完毕后点击绿色按钮创建。

## 准备分支
为了能够在多台设备上维护博客，这里建议直接新建分支。

点击仓库左上角的Branch标签，默认值为master。在这里新建hexo分支，并将其[设置](https://github.com/mxdzs0612/mxdzs0612.github.io/settings/branches)为主要（默认）分支。

后续过程中，master分支用于存放博客的静态页面，而hexo分支用于存放源文件。分支名可任取。

在本地某个文件夹下打开Git Bash，克隆仓库。指令为

>git clone git@github.com:xxxx/xxxx.github.io.git

这一步的目的是获取远程仓库自动生成的.git文件夹及其中的配置内容。

## 安装hexo
进入xxxx.github.io文件夹，打开Git Bash，依次执行以下指令：
>npm install hexo

>hexo init

>npm install

>npm install hexo-deployer-git

Bash中，当前分支应显示为hexo。

此时，hexo的安装应该已完成。

Windows系统不建议在cmd中安装hexo，因为这样会安装到系统盘个人目录下的某个文件夹中，控制台会出现各种找不到指令的问题，严重影响使用。

## 博客的基本配置
打开目录下的_config.yml文件，继续修改其中的内容。请注意，**yaml语法中，冒号后面需要空一格**，再键入内容。

基本的配置在# Site下，即
```
title: 这是一个博客 # 网站标题
subtitle: 这是一个副标题 # 副标题
description: 试着搭个博客 # 网页描述，类似座右铭，一般会显示在author附近
author: mxdzs0612 # 站长信息
language: zh-CN # 网站语言，部分主题的默认语言是英文，建议修改
timezone: Asia/Shanghai # 网站时区，默认使用电脑的时区
```
然后比较重要的是# Deployment下的部署信息，即
```
deploy: 
  type: git
  repo: https://github.com/xxxx/xxxx.github.io.git
  branch: master
```
请务必将_config.yml中的deploy参数的值修改为master。这样编译好的静态文件将被上传到master分支。

## 完成部署
### **博客的部署**
先来部署网站。Shift+右键点击文件夹的空白位置，打开控制台，依次执行
>hexo generate

>hexo server

在浏览器输入 http://localhost:4000/ ，可以在本地预览博客的效果。其中预置了一个hello-world.md文件，因此会有一篇默认博客。

如果需要新建文章，输入
>hexo new "文章名"

在xxxx.github.io\source\_posts\路径下找到该文章，用markdown编辑器进行编辑。推荐使用[VS Code](https://code.visualstudio.com/)或[Typora](https://typora.io/)。

保存，依次执行下列操作
>hexo clean

这一步的目的是清除缓存，这一步不是必须的，如果网站显示异常，可尝试此操作。
>hexo generate

>hexo deploy

此过程中会跳出github登录提示，用自己的账户登录即可。

这时访问 xxxx.github.io ，即可看到文章已发布。如果没看到效果，请等待几秒钟（十秒左右），然后强制清除缓存并刷新页面（Chrome浏览器的快捷键为Ctrl+Shift+R）。

后两步操作可合并成一步，即
>hexo g -d

### **备份源代码**

不要忘记将源文件上传。在Git Bash中依次执行
>git add .

>git commit –m "add branch"

>git push 

即可将源代码上传至hexo分支。

第二条命令的引号中的内容可任填，填入的内容会用作提交的commit message，显示在github code列表中文件名的右侧。

日常使用时，建议的执行顺序为先备份源代码，再部署。虽然一般不会出现什么问题，但万一突然断网甚至系统崩溃、文件丢失，交换顺序可能就会出现问题。

### **已有博客的备份**
如果之前已经创建并上传好了博客，但没有备份源码，操作几乎相同。唯一的区别是，clone的hexo branch中已经有内容了。

因此，只需将clone的文件中除.git文件夹以外的文件全部删掉，将原来写的博客的源文件全部复制过来即可。

注意，复制过来的源文件中应该包含一个.gitignore文件，如果没有需要手动创建，内容为
```
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
```
如果之前安装过主题，也应该将themes文件夹中的.git文件夹删掉，防止主题文件上传不上去。这会导致主题的配置在其它设备上无法使用。

之后再按照上文中的步骤将源文件push到github上即可。

### **新设备上的操作**
安装过程与之前一样，只需省略初始化（init）的步骤即可。

首先克隆仓库。在任意文件夹下，用控制台输入
>git clone git@github.com:xxxx/xxxx.github.io.git

注意，默认分支应仍为hexo。如已修改，需使用
>git clone -b hexo git@github.com:xxxx/xxxx.github.io.git

在本地新拷贝的xxxx.github.io文件夹中，通过Git Bash依次执行
>npm install hexo

>npm install

>npm install hexo-deployer-git

此后的修改配置部署操作就都如常了。请参考上文，自行操作。
