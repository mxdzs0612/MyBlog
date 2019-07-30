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

若不慎忘记删去，备份时会上传一个空的next文件夹，里面的所有文件都不会上传。此时，若还想备份，必须先删掉整个next文件夹，commit一次，然后再将克隆下来的、删去.git文件夹后的next主题文件夹重新复制过来，再commit。

如果还是会出现文件备份不全的情况，可以自行修改主题所在目录下的`.gitignore`文件。笔者的做法是直接把默认的`landscape`目录中的`.gitignore`复制过来，经测试没有出现什么问题。

## 基本配置
主题自己也有一个配置文件，文件名也叫`_config.yml`。此文件位于`/themes/next/_config.yml`路径下，与hexo的配置文件互补。如果出现冲突，以hexo的配置为准。请读者注意区分下文的叙述中要修改的东西到底在哪个`_config.yml`文件中。

### **主题的切换**
首先要切换主题。在hexo的配置文件中，找到`# Extensions`注释，进行如下修改：
```yml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: next
```
其中，填入的内容应与`themes`文件夹中存放主题的子文件夹名称相同。

### **选择语言**
然后切换语言。进入`themes\next\languages\`目录，选择想要的语言，以简体中文为例，复制其文件名称`zh-CN`。

修改hexo的配置文件中的`# Site`注释下的language条目，修改为对应语言的文件名，如`zh-CN`。不清楚的地方请参考上一篇博客。

值得注意的是，可能会有部分教程此处配置的是`zh-hans`。这种写法已经过时，请以`languages`目录下的文件名为准。

### **主题模板**
NexT主题共提供了四种风格，可以点击[官方github中Live Preview标签](https://github.com/theme-next/hexo-theme-next#live-preview)下的页面进行预览。由于笔者是双子座，这里就选择了Gemini风格。

配置方法很简单。在NexT的配置文件中找到`# Schemes`注释，在下面的四种风格中去掉你要选的那种风格名称之前的“#”注释即可。如
```yml
# Schemes
#scheme: Muse
#scheme: Mist
#scheme: Pisces
scheme: Gemini
```
不进行设置时，默认选择的是第一个（Muse）。

### **导航栏**


（未完待续）