---
title: 使用hexo在github上搭建博客：个性化篇
category: 其它技术
tags: [github, hexo]
date: 2019-07-31 12:31:20
---

本文介绍了NexT主题的一些个性化配置方法，可以使你的博客变得与众不同。主要参考资料为官方网站的[文档](https://theme-next.org/docs/)。当然，很多东西都已经写在配置文件的注释里了，也可以自行探索。

NexT的页面是通过`.swig`格式的文件渲染的，其语法和前端静态页面几乎一致，做过WEB开发的读者应该都可以看懂。当然很多功能都在主题的配置文件里面集成好了，并不需要我们手动修改源码。

<!-- more -->

本文完成时，采用NexT的版本依然是7.3.0，故可能有过时之处，还望读者留意。

## 永久链接
更改博客的配置文件的`permalink`属性，即可修改文章的URL形式。

支持的修改类型与修改方法请参考Hexo的[官方文档](https://hexo.io/zh-cn/docs/permalinks.html)。

## 侧边栏设置
最后在主题的配置文件中搜索`social:`，即可配置在侧边栏要显示的社交链接。其中，“||”之后的是fontawesome图标的名称。

同样，`links:`后可以配置相关链接。
```yml
social:
  GitHub: https://github.com/mxdzs0612 || github #站点名称: 链接URL || 图标名称

social_icons:
  enable: true #是否显示图标
  icons_only: true #是否只显示图标，不显示站点名称
  transition: true

links_icon: link
links_title: 友情链接
links_layout: block
#links_layout: inline
links:
  #Title: http://example.com
```

## 文末提示
在路径`\themes\next\layout\_macro`中新建`passage-end-tag.swig`文件,并添加以下内容：
```html
<div>
    {% if not is_index %}
        <div style="text-align:center;color: #ccc;font-size:14px;">-------------本文结束<i class="fa fa-paw"></i>感谢您的阅读-------------</div>
    {% endif %}
</div>
```
中间的内容可按个人喜好修改，符合HTML语法即可。

打开同目录下的`post.swig`文件，搜索`post-footer`，在其所在标签上方增加
```html
<div>
  {% if not is_index %}
    {% include 'passage-end-tag.swig' %}
  {% endif %}
</div>
```
最后在主题的配置文件中的任意位置添加
```yml
# 文章末尾添加“本文结束”标记
passage_end_tag:
  enabled: true
```
这样，每篇文章的末尾处，都会自动打印所添加的内容。

## 网页底部内容
在主题配置文件中搜索`footer:`属性，按个人喜好进行配置即可。

可进行控制的项目有：
- 网站从哪年起建立（显示为该年~今年）
- 所显示的图案及样式（依然是之前介绍过的fa图标，可设定其颜色以及是否为动态的）
- 版权所有者声明，默认与author相同
- 是否显示Hexo、NexT的链接及版本号
- 是否显示网址ICP备案号

这些内容都会显示在网页最底部。

## 标签样式
在主题配置文件中搜索`tag_icon`，配置为true，即可把标签前的井号替换成图标。

如果对默认的图标不满意，可修改`/themes/next/layout/_macro/`路径下的`post.swig`文件，搜索`footer class="post-footer"`，修改`if theme.tag_icon`下的图标即可。

## 代码风格
在主题配置文件中搜索`codeblock:`，进行配置。
```yml
codeblock:
  # Code Highlight theme
  # Available values: normal | night | night eighties | night blue | night bright
  # See: https://github.com/chriskempson/tomorrow-theme
  highlight_theme: night blue
  # Add copy button on codeblock
  copy_button:
    enable: true
    # Show text copy result.
    show_result: false
    # Available values: default | flat | mac
    style:
```
对几种不同的风格的样子，可点进链接预览。    

若将`copy_button.enable`设为true，可在代码块右侧开启复制按钮，点击即可复制代码。

## Github横幅
在主题配置文件中搜索`github_banner:`，设为true后，即可在站点右上角显示一个github图标。

`permalink: `后填写Banner要跳转的链接地址（如个人主页），`title: `填鼠标放上去时显示的提示语。

## JavaScript动画
在主题配置文件中搜索`motion:`，根据相关注释配置页面加载时的动画。具体每种动画的实现效果还请一一尝试，这里列举我用到的几个。

首先是开启动态背景，最常用的是[Canvas Nest](https://github.com/hustcc/canvas-nest.js)。将`canvas_nest`的enable设为true，表示开启。其余属性请自行探索。

修改`pace:`的效果则是会在页面顶部增添一个动态的加载条，显示页面加载的进度。

想要成功使用JavaScript动画，除配置之外，还要引入相应的js文件。这里建议采用CDN，免去git clone的麻烦。搜索`vendors:`，根据注释中的Example将所需的js文件复制到配置中即可。

## 动态标题栏
在`/themes/next/source/js/`下新建文件`crash_cheat.js`，接着把下列代码粘贴到crash_cheat.js文件中。（代码出处不详）
```js
<!--崩溃欺骗-->
 var OriginTitle = document.title;
 var titleTime;
 document.addEventListener('visibilitychange', function () {
     if (document.hidden) {
         $('[rel="icon"]').attr('href', "/img/TEP.ico");
         document.title = '╭(°A°`)╮ 页面崩溃啦 ~';
         clearTimeout(titleTime);
     }
     else {
         $('[rel="icon"]').attr('href', "/favicon.ico");
         document.title = '(ฅ>ω<*ฅ) 噫又好了~' + OriginTitle;
         titleTime = setTimeout(function () {
             document.title = OriginTitle;
         }, 2000);
     }
 });
```
最后，在`\themes\next\layout\_layout.swig`末尾添加
```html
<!--崩溃欺骗-->
<script type="text/javascript" src="/js/src/crash_cheat.js"></script>
```
这样，网站的标题会出现有意思的特效。具体内容可以自己修改。

## 点击出现心形效果
在`/themes/next/source/js/`下新建文件`clicklove.js`，接着把下列代码粘贴到clicklove.js文件中。（代码出处不详）
```js
!function(e,t,a){function n(){c(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"),o(),r()}function r(){for(var e=0;e<d.length;e++)d[e].alpha<=0?(t.body.removeChild(d[e].el),d.splice(e,1)):(d[e].y--,d[e].scale+=.004,d[e].alpha-=.013,d[e].el.style.cssText="left:"+d[e].x+"px;top:"+d[e].y+"px;opacity:"+d[e].alpha+";transform:scale("+d[e].scale+","+d[e].scale+") rotate(45deg);background:"+d[e].color+";z-index:99999");requestAnimationFrame(r)}function o(){var t="function"==typeof e.onclick&&e.onclick;e.onclick=function(e){t&&t(),i(e)}}function i(e){var a=t.createElement("div");a.className="heart",d.push({el:a,x:e.clientX-5,y:e.clientY-5,scale:1,alpha:1,color:s()}),t.body.appendChild(a)}function c(e){var a=t.createElement("style");a.type="text/css";try{a.appendChild(t.createTextNode(e))}catch(t){a.styleSheet.cssText=e}t.getElementsByTagName("head")[0].appendChild(a)}function s(){return"rgb("+~~(255*Math.random())+","+~~(255*Math.random())+","+~~(255*Math.random())+")"}var d=[];e.requestAnimationFrame=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(e){setTimeout(e,1e3/60)}}(),n()}(window,document);
```
最后，在`\themes\next\layout\_layout.swig`末尾添加
```html
<!-- 页面点击出现小红心 -->
<script type="text/javascript" src="/js/src/clicklove.js"></script>
```
搞定！

## 首页文章不显示全文
文章在首页全部展示实在太长了。在主题的配置文件中搜索`auto_excerpt:`，将`enable`改为true，即可只显示`length`中指定的字数，并在下方显示“阅读全文”按钮。对点开后的文章并不影响。

如果你希望手动控制在哪里显示阅读全文，NexT也是支持的。在文章中你想截断的位置增加`<!-- more -->`即可。官方推荐的也是这种控制方式。

如果`scroll_to_more`设置为true，点开“阅读全文”后，会直接滚动到原文中`<!-- more -->`下方，跳过了首页预览看到过的那一部分。

## live2d模型
可以在博客上添加一个live2d看板娘。

首先执行
>npm install --save hexo-helper-live2d

然后在[这里](https://github.com/summerscar/live2dDemo)挑选你喜欢的模型，甚至可以在[这里](http://summerscar.me/live2dDemo/)预览。挑选好后克隆仓库。当然也可以通过npm安装，但个人不是很推荐。

在`assets`文件夹中找到你选好的模型，记住文件夹名称。此文件夹里必须要有`xxxx.model.json`文件。

然后将下面这段代码复制到任意一个配置文件中。
```yml
## Live2D
## https://github.com/EYHN/hexo-helper-live2d
live2d:
    enable: true
  # enable: false
    scriptFrom: local # 默认
    pluginRootPath: live2dw/ # 插件在站点上的根目录(相对路径)
    pluginJsPath: lib/ # 脚本文件相对与插件根目录路径
    pluginModelPath: assets/ # 模型文件相对与插件根目录路径
  # scriptFrom: jsdelivr # jsdelivr CDN
  # scriptFrom: unpkg # unpkg CDN
  # scriptFrom: https://cdn.jsdelivr.net/npm/live2d-widget@3.x/lib/L2Dwidget.min.js # 你的自定义 url
    tagMode: false # 标签模式, 是否仅替换 live2d tag标签而非插入到所有页面中
    debug: false # 调试, 是否在控制台输出日志
    model:
      use: live2d-widget-model-wanko # npm-module package name
    # use: wanko # 博客根目录/live2d_models/ 下的目录名
    # use: ./wives/wanko # 相对于博客根目录的路径
    # use: https://cdn.jsdelivr.net/npm/live2d-widget-model-wanko@1.0.5/assets/wanko.model.json # 你的自定义 url
    display: # 模型位置，根据不同的模型自行调整
      position: right
      width: 150
      height: 300
    mobile: # 是否适用于移动端
      show: true
```
将刚刚记住的名称复制到`model.use: `属性中，重新生成即可。

个人最推荐使用`tsumiki`，因为“功能”最全。当然笔者也并没有一一试过，读者可以选择自己喜欢的那个。