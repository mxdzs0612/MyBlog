---
title: 使用hexo在github上搭建博客：主题篇
date: 2019-07-29 20:33:41
category: 其他
tags: [github, hexo]
---

 本文介绍了hexo最常用的主题，[NexT主题](https://theme-next.org/)。

 这一主题使用人数多，自由度高，可扩展性强，是一款综合性能较好的主题。本博客也使用了NexT主题搭建。

 注意，由于NexT在不断更新、演进，搜索引擎检索到的许多配置方法都已过时。本文写于2019年7月底，笔者无法保证本文中的信息今后不会过时、失效，请读者注意甄别。

 ## 安装
 hexo的默认主题为landscape，可以在[此页面](https://hexo.io/themes/)中选择喜欢的主题。但是不管选哪个，都需要自己下载。这里就以NexT为例了。

我们当然可以选择去官方网站下载源码，但是更简单的方法是使用git。在博客的目录下打开控制台，输入
>git clone https://github.com/theme-next/hexo-theme-next themes/next

即可将主题文件克隆到themes目录下的next文件夹中。

如果需要备份主题文件，此时应直接删去next文件夹下的.git文件夹，以防出现各种奇怪的问题。

## 基本配置
主题自己也有一个配置文件，文件名也叫_config.yml。此文件位于/themes/next/_config.yml路径下，与hexo的配置文件互补。如果出现冲突，以hexo的配置为准。请读者注意区分要修改的东西到底在哪个_config.yml文件中。

首先要切换主题。在hexo的配置文件中，找到# Extensions标签，进行如下修改：
```yml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: next
```
其中，填入的内容应与themes文件夹中存放主题的子文件夹名称相同。

然后切换语言。进入themes\next\languages\目录，选择想要的语言，以简体中文为例，复制其文件名称`zh-CN`。

修改hexo的配置文件中的# Site注释下的language条目，修改为对应语言的文件名，如`zh-CN`。

（未完待续）