---
title: 使用hexo在github上搭建博客：个性化篇
category: 建站
tags: [github, hexo]
date: 2019-07-31 12:31:20
---

本文介绍了NexT主题的一些个性化配置方法，可以使你的博客变得与众不同。主要参考资料为官方网站的[文档](https://theme-next.org/docs/)。

NexT的页面是通过`.swig`格式的文件渲染的，其语法和前端静态页面几乎一致，做过WEB开发的读者应该都可以看懂。

## 永久链接

更改博客的配置文件的`permalink`属性，即可修改文章的URL形式。

支持的修改类型与修改方法请参考Hexo的[官方文档](https://hexo.io/zh-cn/docs/permalinks.html)。

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
在主题配置文件中搜索`motion:`，根据相关注释配置页面加载时的动画。具体每种动画是怎么实现的就只能一一尝试了。

然后还可开启动态背景，最常用的是[Canvas Nest](https://github.com/hustcc/canvas-nest.js)。将`canvas_nest`的enable设为true，表示开启。其余属性请自行探索。

想要成功开启，还要引入相应的js文件。这里建议采用CDN，免去git clone的麻烦。搜索`vendors:`，根据注释中的Example引入所需的js文件即可。

## 动态标题栏
在`/themes/next/source/js/`下新建文件crash_cheat.js`，接着把下列代码粘贴到clicklove.js文件中。（代码出处不详）
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

---
关于Hexo建站的内容就先写这么多吧。如果发现更多好点子，我会继续补充。如有过时、疏漏或错误之处，还请发issue通知我，我看到了就会更改，谢谢支持！