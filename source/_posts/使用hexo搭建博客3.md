---
title: 使用hexo在github上搭建博客：个性化篇
category: 建站
tags: [github, hexo]
date: 2019-07-31 12:31:20
---

本文介绍了NexT主题的一些个性化配置方法，可以使你的博客变得与众不同.

NexT的页面是通过`.swig`格式的文件渲染的，其语法和前端静态页面几乎一致，做过WEB开发的读者应该都可以看懂。

## 永久链接

更改博客的配置文件的`permalink`属性，即可修改文章的URL形式。

支持的修改类型请参考Hexo的[官方文档](https://hexo.io/zh-cn/docs/permalinks.html)。

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

## 网页底部内容
在主题配置文件中搜索`footer:`属性，按个人喜好进行配置即可。

可进行控制的项目有：
- 网站从哪年起建立
- 所显示的图案及样式（依然是之前介绍过的fa图标，可设定其颜色以及是否为动态的）
- 版权所有者声明，默认与author相同
- 是否显示Hexo、NexT的链接及版本号
- 是否显示网址ICP备案号

## 标签样式

## 代码风格

## Github横幅

## Canvas

## 动态标题栏

## 点击效果

## 鼠标样式

（待续）