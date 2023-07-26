---
title: "Commands"
description: "Commands 是 phanes 的主要使用方式"
lead: "phanes 附带了常用的几个命令."
date: 2020-10-13T15:21:01+02:00
lastmod: 2020-10-13T15:21:01+02:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 130
toc: true
---

## 主要 Commands
- new 创建新的微服务项目
- gen 生成代码
- env 环境监察和安装
- register 注册资源(规划移动到gen命令中)
- upgrade 升级phanes自身
> - updata 升级项目(在路上...)
> - build 构建命令(在路上...)
> - deploy 部署命令(在路上...)

创建新的项目

```bash
phanes new [name]
```

See also the Hugo docs: [hugo new](https://gohugo.io/commands/hugo_new/).

### Docs based tree

Create a docs based tree — with a single command:

```bash
npm run create -- --kind docs [section]
```

For example, create a docs based tree named guides:

```bash
npm run create -- --kind docs guides
```

## lint

Check scripts, styles, and markdown for errors:

```bash
npm run lint
```

### scripts

Check scripts for errors:

```bash
npm run lint:scripts [-- --fix]
```

### styles

Check styles for errors:

```bash
npm run lint:styles [-- --fix]
```

### markdown

Check markdown for errors:

```bash
npm run lint:markdown [-- --fix]
```

## clean

Delete temporary directories:

```bash
npm run clean
```

## start

Start local development server:

```bash
npm run start
```

## build

Build production website:

```bash
npm run build
```

### functions

Build Lambda functions:

```bash
npm run build:functions
```

### preview

Build production website including draft and future content:

```bash
npm run build:preview
```
