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

如果需要备份主题文件，此时应直接删去next文件夹下的.git文件夹，以防出现各种奇怪的问题。理论上使用--recursive参数也可以，但是会非常麻烦。

若不慎忘记删去就进行了备份，备份时会上传一个空的next文件夹，但是里面的所有文件都不会上传，文件夹在github上显示为黑色。此时，若还想备份，必须先删掉整个next文件夹，commit一次，然后再将克隆下来的、删去.git文件夹后的next主题文件夹重新复制过来，再次commit。

如果还是出现了文件备份不全的情况，可以自行修改主题所在目录下的`.gitignore`文件。笔者的做法是直接把默认的`landscape`目录中的`.gitignore`复制过来，经多台设备测试，没有出现什么问题。

注意，之后若安装了插件，主题的配置文件中可能含有各种app的id等信息，会公开展示在分支中备份源代码内。虽然一般这些应用都会验证使用者的身份，其他人即使获取到密钥也无法使用这些插件，但还是可能有人对此感到介意，因此在这里进行提醒。不想公开的话，就只能不备份主题文件了。

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

修改hexo的配置文件中的`# Site`注释下的language条目，修改为对应语言的文件名，如`zh-CN`。不清楚具体位置的读者请参考上一篇博客的`博客的基本配置`部分。

值得注意的是，可能会有部分教程此处配置的是`zh-hans`。这种写法已经过时，请以`languages`目录下的文件名为准。

### **主题模板**
NexT主题共提供了四种风格，可以点击[官方github中Live Preview标签](https://github.com/theme-next/hexo-theme-next#live-preview)下的页面进行预览。笔者对主题没有什么特别的偏好。但由于笔者是双子座，这里就选择了Gemini风格。

配置方法很简单。在NexT的配置文件中找到`# Schemes`注释，在下面的四种风格中去掉你要选的那种风格名称之前的“#”注释即可。如
```yml
# Schemes
#scheme: Muse
#scheme: Mist
#scheme: Pisces
scheme: Gemini
```
不进行设置时，默认选择的是第一个（Muse）。不是很建议选择Mist主题，因为后续支持的内容可能比较少。

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

要在写的文章中使用标签，只需在new出来的文章头部类似的位置添加`tags: [标签1, 标签2]`，标签即会自动归档，并显示在文章的末尾处。

同理可实现分类等功能。NexT默认提供的页面如下表。

| 键值 | 设定值 | 显示内容 |
| ------ | ------ | ------ |
| home | home: / | 主页（默认开启） |
| about | about: /about | 关于 |
| tags | tags: /tags | 标签 |
| categories | categories: /categories | 分类 |
| archives | archives: /archives | 归档（默认开启） |
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

### **设置网站图标**
网站图标就是显示在网页标签最左边的那个小图片。

先将图标文件复制到主题目录中的`images`文件夹下，然后在主题的配置文件中找到`favicon`关键字，按照提示修改为相对路径即可。

## 集成第三方功能
NexT内部集成了大量第三方的工具。这里将挑选几个进行介绍。更多可用内容，请参考[官方文档](https://theme-next.org/docs/)。

理论上也可以使用[hexo的插件](https://hexo.io/plugins/index.html)，进行下载。~~但是在NexT主题下，笔者的尝试<ruby>全部失败<rt>全部木大</rt></ruby>了。如果读者知道该怎么做，欢迎发[issue](https://github.com/mxdzs0612/mxdzs0612.github.io/issues)进行教学。~~ 经尝试发现，凡是出现这种情况的，都是因为对应的插件的用法不是那么简单，不是那种安装了、enable设为true了就能用的，需要更多更复杂的配置。一些比较简单的、集成程度较好的第三方服务可以成功开启。

### **阅读数量统计**
NexT集成的阅读数量统计工具非常多，这里就以最简单的不蒜子为例。

在主题的配置文件中搜索`busuanzi_count`，将下面的enable属性设为true即可。下面几条属性可自行设置。

total_visitors：总访问人数统计；total_views：总访问量统计。这两个值会显示在页面的最下面。

post_views：文章阅读量统计，会显示在文章的标题下方。

xxx_icon可设置这些访问量的示意图标，图标采用的是[Font Awesome Icons](https://fontawesome.com/v4.7.0/icons/)，可自行替换成自己喜欢的。
```yml
busuanzi_count:
  enable: true
  total_visitors: true
  total_visitors_icon: user
  total_views: true
  total_views_icon: eye
  post_views: true
  post_views_icon: eye
```
不蒜子的缺点是统计不是很准（只多不少，很容易刷数据）。如想使用其它第三方统计工具，~~个人推荐[LeanCloud](https://leancloud.cn/)。~~ 现在LeanCloud需要上传身份证照片实名认证才能使用，个人对此非常介意，因此不再推荐。不想用不蒜子的同学可以考虑谷歌/百度的统计。

### **搜索功能**
在主题配置文件中搜索`# Search Services`注释，下面包含了NexT集成的两种配置方式。先来介绍第一种，即`algolia_search`。

首先进入[Algolia官方网站](https://www.algolia.com/)，注册账号。可以直接使用你的github账号。

填写信息后（部分信息可跳过不填），点击页面上的粉红色按钮`NEW INDEX`，新建一个索引，起一个名字（后面会用到）。

来到[API Keys](https://www.algolia.com/api-keys)页面，`Application ID`和`Search-Only API Key`都是后面要用的。

再来到`All API Keys`标签，点击Edit，在ACL选项中打开`search`、`addObject`、`deleteObject`、`listIndexes`、`deleteIndex`。

然后安装插件。在主题根目录下执行
>	npm install hexo-algoliasearch --save

然后在根目录的站点配置文件中，增添
```yml
algolia:
  applicationID: 'appId'
  apiKey: 'apiKey'
  indexName: 'indexName'
  chunkSize: 5000
```
将刚刚记录下来的值填进去。

但还没结束。下一步需要让Algolia记录你的文章数据。

在根目录下打开Git Bash，输入
>export HEXO_ALGOLIA_INDEXING_KEY=Search-Only API key

（注：若用cmd，要将export换成set，但此法可能会导致不可预知的错误，因此建议使用Git Bash）
>hexo algolia

顺利的话，Algolia后台的`Indices`下应该就能看到我们的博客的信息了。

最后添加页面上的入口及脚本。进入主题目录下，Git Bash输入
>git clone https://github.com/theme-next/theme-next-algolia-instant-search source/lib/algolia-instant-search

在`source/lib/`目录下安装algolia-instant-search所需的文件。

最后，把主题配置文件中的`algolia_search.enable`，属性设为true，即可开启搜索功能。

更详细信息，可参考github上的[文档](https://github.com/theme-next/hexo-theme-next/blob/master/docs/zh-CN/ALGOLIA-SEARCH.md)。

### **本地搜索功能**
algolia免费用户策略改版后出现了一个缺点：不支持全文搜索。因此本站决定换用`Local Search`。个人也更推荐这种搜索方式。

首先在根目录打开Git Bash，运行
>$ npm install hexo-generator-searchdb --save

在博客配置文件增添下列语句：
```yml
search:
  path: search.xml
  field: post
  format: html
  limit: 10000
```
最后在主题配置文件中搜索`# Local search`，将`enable`属性设为true即可。
```yml
# Local search
# Dependencies: https://github.com/theme-next/hexo-generator-searchdb
local_search:
  enable: true
  # If auto, trigger search by changing input.
  # If manual, trigger search by pressing enter key or search button.
  trigger: auto
  # Show top n results per article, show all results by setting to -1
  top_n_per_article: 1
  # Unescape html strings to the readable one.
  unescape: false
  # Preload the search data when the page loads.
  preload: false
```

搜索功能的位置和algolia一样，也在菜单栏的最下面，并且支持全文搜索。此外，也可自己定制样式，非常好用。

这种方式就简单了很多，缺点是需要额外一些安装包，换设备部署需要重新安装。

### **评论**

本文直接使用了[GITALK](https://gitalk.github.io/)。这种方式的优点是配置简单，缺点是不支持无登陆评论。

GITALK是利用github API，基于Github issue开发的评论系统。

首先要去[这里](https://github.com/settings/applications/new)申请一个新app。四个位置依次填入app名称、博客地址`https://xxxx.github.io`、描述（任填）以及回调地址（仍然填博客地址）。点击绿色按钮创建。

完成后，记住app的信息，在主题配置文件中搜索`# Gitalk`，进行设置
```yml
##next/_config.yml
    # Gitalk
    # Demo: https://gitalk.github.io
​    gitalk:
​      enable: false     # 设为true即可启用
​      github_id:        # Github repo owner，填入你的用户名
​      repo:             # Repository name to store issues，新建的用于保存评论数据的仓库名，填入博客的repo名即可，如xxxx.github.io`
​      client_id:        # Github Application Client ID，填入app信息
​      client_secret:    # Github Application Client Secret，填入app信息
​      admin_user:       # GitHub repo owner and collaborators, only these guys can initialize github issues
​      distraction_free_mode: true # Facebook-like distraction free mode
      # Gitalk's display language depends on user's browser or system environment
      # If you want everyone visiting your site to see a uniform language, you can set a force language value
      # Available value: en, es-ES, fr, ru, zh-CN, zh-TW
​      language:
```
这样就完成了。

使用时，需要登录github账号，在文章末尾处进行初始化。只有在`admin_user`中配置了用户名的用户可以开启某篇文章的评论功能，较为麻烦。因此笔者暂时关闭了评论功能，也在考虑更换评论系统。

### **字数统计**