---
title: 使用hexo在github上搭建博客：主题篇
date: 2019-07-29 20:33:41
category: 其他
tags: [github, hexo]
---

 本文介绍了hexo最常用的主题，[NexT主题](https://theme-next.org/)。

 这一主题使用人数多，自由度高，可扩展性强，是一款综合性能较好的主题。本博客也使用了NexT主题搭建。

 ## 安装
 hexo 默认主题为landscape，可以在[此页面](https://hexo.io/themes/)中选择喜欢的主题。但是不管选哪个，都需要自己下载。这里就以NexT为例了。

我们当然可以选择去官方网站下载源码，但是更简单的方法是使用git。在博客的目录下打开控制台，输入
>git clone https://github.com/theme-next/hexo-theme-next themes/next

即可将主题文件克隆到themes目录下的next文件夹中。

如果需要备份主题文件，此时应直接删去next文件夹下的.git文件夹，防止出现各种奇怪的问题。