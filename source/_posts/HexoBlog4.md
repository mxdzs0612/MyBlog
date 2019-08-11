---
title: 使用hexo在github上搭建博客：多媒体与杂项篇
date: 2019-08-01 09:16:13
category: 其它技术
tags: [github, hexo]
---

本文将介绍如何在博客中添加多媒体内容，以及一些不太好归类的杂七杂八的小东西。

<!-- more -->

## 本地图片
有时候我们想把自己设备上的图片传到博客上。这项工作需要借助第三方工具。

在根路径下打开Git Bash，执行
>npm install hexo-asset-image --save

修改博客的配置文件，将`post_asset_folder:`设为true。

此后，每次新建博客的时候，都会在相同目录下新建一个同名文件夹。将图片放入此文件夹中，然后按照markdown语法引入图片即可。文件夹当然也可以手动创建。
```md
![文字说明](文件夹名/图片名.jpg)
```
如果不想这么麻烦，可以直接把图片塞到主题的`source\images`目录下。这样可以不用安装额外的包，~~但可能导致图片管理困难~~ 管理起来也并不困难，继续创建子文件夹即可，分类很方便。比较麻烦的一点是，用本地编辑器的预览功能（如VS Code）预览博客文件时，无法看到图片，从而无法预知实际效果。

引入图片时，使用绝对路径即可。
```md
![文字说明](/images/图片名.gif)
```
![抽烟](/images/表情包/抽烟.gif)

除markdown语句外，可以用HTML语法，如
```html
<img src="/images/图片名.jpg">
```

<img src="/images/表情包/黄大叔.gif">

## 在线多媒体
添加外部链接的图片就更简单了，直接将图片的URL贴进小括号中即可。
```md
![文字说明](图片地址)
```
如我的头像
![我的头像](https://avatars2.githubusercontent.com/u/35512473?s=100&v=4)

音乐和视频需要链接iframe格式的播放器插件，如

```html
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=4970195&auto=0&height=66"></iframe>
```

直接把这段代码贴到指定位置即可。

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=4970195&auto=0&height=66"></iframe>

这种插件通常可以从资源所在的网站获取。如网易云音乐网页版播放器的专辑封面下方，就有“生成外链播放器”的选项。

## README文件
在主题的`source`根目录下添加一个`README.md`文件，正常填写内容。

然后打开博客的配置文件，搜索`skip_render`参数，设为`README.md`。这样，部署博客时就会自动跳过README.md文件，内容可以正常显示在github仓库的首页。

## 搜索引擎收录
默认情况下，博客的内容是不会出现在搜索引擎中的。如果希望你的博客能够被搜索引擎搜索到，需要一点额外的操作。

各大搜索的相关操作引擎都大同小异，不过百度比较繁琐，需要非常麻烦的注册工作，所以下文就以谷歌为例。。

在主题配置文件中搜索`# SEO Settings`，往下拖，应该能够看到Google、Bing等搜索引擎的Webmaster设置。这时，我们就要点开注释中的地址，如 https://www.google.com/webmasters ，登录你的谷歌账号后，输入站点的URL，获取验证信息。注意，这个网页先不要关。然后将获得的verification内容添加进配置文件中对应的位置后，如谷歌就是`google_site_verification: `后，以验证身份。这样，谷歌才能确认确实是这个站点的站长提交了收录请求。最后，重新部署网站，在刚刚的网页点击“验证”按钮，等待片刻即可。

请注意，只需复制弹出的窗口中`content`后面的内容。格式与位置可参考下面的示例。
```html
<meta name="google-site-verification" content="D-2qw1qaLc7ftXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">
```
稍等几天，你的站点应该就能进入搜索引擎的法眼了。

更多搜索引擎，请参考[官方文档](https://theme-next.org/docs/theme-settings/seo.html)。

## 站点地图
感觉站点地图还是有必要加的，容我再观察几天。步骤如下：

首先在根目录下执行
>npm install hexo-generator-sitemap --save

然后重新编译。部署，自动生成的站点地图就会出现。

在对应搜索引擎的网站提交你的网站的站点地图地址即可，默认为`https://xxxx.github.io/sitemap.xml`。

理论上，这样能够让搜索引擎更好地捕捉你的网站。

如果出现网址错误等情况，请将博客配置文件中的`url: `改成你的博客地址，如`https://xxxx.github.io/`。

---
关于Hexo建站的内容就先写这么多吧。如果发现更多好点子，我会继续补充。如有过时、疏漏或错误之处，还请发issue/评论通知我，我看到了就会更改，谢谢支持！