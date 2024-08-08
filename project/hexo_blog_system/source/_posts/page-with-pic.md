---
title: page with pic
date: 2024-06-21 15:02:31
tags:
    - Markdown
categories:
    - IT
# cover: https://aurora.tridiamond.tech/favicon.ico
feature: true
abstracts: 测试文章
---

# hihihihi
官方解决方案（不能显示文件，存在bug）
文章静态资源将保存在同级目录下的同名文件夹中，并通过特定方式引入，不能通过md语法
```markdown
{% asset_img example.png [alt]%}
```
{% asset_img image-20240621142102818.png alien image%}

- hexo v3引入新的嵌入图片方式
如需启用，在_config.yml中
post_asset_folder: true
marked:
  prependRoot: true
  postAsset: true
启用后，资源图片将会被自动解析为其对应文章的路径。
还需要安装本地md图片相对路径转构建后public的图片绝对路径插件
```bash
npm install https://github.com/CodeFalling/hexo-asset-image --save
```
参考文章 [图片路径转储](https://blog.csdn.net/m0_43401436/article/details/107191688)

最终效果
![image-20240621142102818](./page-with-pic.md/image-20240621142102818.png)
