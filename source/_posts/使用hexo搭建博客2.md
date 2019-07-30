---
title: 使用hexo在github上搭建博客：主题篇
date: 2019-07-29 20:33:41
category: 其他
tags: [github, hexo]
---

 本文介绍了hexo最常见的主题，[NexT主题](https://theme-next.org/)的基本用法。

 这一主题使用人数多，自由度高，可扩展性强，且美观简洁，是一款综合性能较好的主题。本博客也使用了NexT主题搭建。

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

### **菜单栏**
在主题的配置文件中找到`Menu`关键字，进行设置。想要哪个就去掉哪个配置前面的“#”注释。
```yml
menu:
  home: / || home
  about: /about/ || user
  tags: /tags/ || tags
  categories: /categories/ || th
  archives: /archives/ || archive
  #schedule: /schedule/ || calendar
  #sitemap: /sitemap.xml || sitemap
  #commonweal: /404/ || heartbeat
```
例如：如果想给文章添加标签，应按如下步骤操作：

首先在博客根目录下，执行
>hexo new page tags

此操作会在`\source\tags`路径下生成一个`index.md`文件，其内容为
```
---
title: tags
date: 2019-07-29 09:07:39
type: "tags"
comments: false
---
```
其中`comments: false`这行是自己加的，如果之后想要开启评论功能，这个页面应该是禁止评论的，建议设置。

最后去掉主题配置文件中`menu.tags`设置前的“#”注释即可。

要在写的文章中使用标签，只需在new出来的文章头部类似的位置添加`tags: [标签1, 标签2]`即可。标签会显示在文章的末尾处。

同理可实现分类等功能。NexT默认提供的页面如下表。

| 键值 | 设定值 | 显示内容 |
| ------ | ------ | ------ |
| home | home: / | 主页 |
| about | about: /about | 关于 |
| tags | tags: /tags | 标签 |
| categories | categories: /categories | 分类 |
| archives | archives: /archives | 归档 |
| schedule | schedule: /schedule/ | 日程表 |
| sitemap | sitemap: /sitemap.xml | 站点地图 |
| commonweal | commonweal: /404.html | 404页 |

熟练掌握后，可以自己设定想在菜单栏中展示的页面。

### **设置头像**
在主题的配置文件中找到`avatar`关键字。

如果头像要使用在线地址，修改url的属性，内容填入图片的完整地址即可。如笔者使用自己的github头像，就可以这样配置：
```yml
# Sidebar Avatar
avatar:
  # In theme directory (source/images): /images/avatar.gif
  # In site directory (source/uploads): /uploads/avatar.gif
  # You can also use other linking images.
  url: https://avatars2.githubusercontent.com/u/35512473
  # If true, the avatar would be dispalyed in circle.
  rounded: false
  # If true, the avatar would be rotated with the cursor.
  rotated: false
```
如果要使用本地文件，则应将头像文件放在主题文件夹的`themes\next\source\images`路径下，然后修改url的属性为`avatar: /images/avatar.png`即可。

也可在source文件夹下新建upload目录，配置为`avatar: /uploads/avatar.png`。

其余选项的作用还请阅读注释或官方文档，自行探索。

## 集成第三方功能

（未完待续）