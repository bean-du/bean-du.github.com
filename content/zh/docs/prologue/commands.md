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


- new 创建新的微服务项目
- gen 生成代码
- env 环境监察和安装
- register 注册资源(规划移动到gen命令中)
- upgrade 升级phanes自身
> - updata 升级项目(在路上...)
> - build 构建命令(在路上...)
> - deploy 部署命令(在路上...)



## new 创建新的项目

```bash
phanes new [name]
```

## gen 代码生成

```bash
phanes gen -c [config_file_name]
```


## env 环境相关命令
### 开发运行环境监测

```bash
phanes env chech
```

### 开发环境工具安装

```bash
phanes env install
```

## 升级

### phanes 升级自身
```bash
phanes upgrade
```

### 升级项目代码
{{< alert icon="👉" text="此命令正在开发中... 欢迎给出建议和方案" />}}
```bash
phanes update
```

## build 构建命令
{{< alert icon="👉" text="此命令正在开发中... 欢迎给出建议和方案" />}}

```bash
phanes build
```
## deploy 部署命令
{{< alert icon="👉" text="此命令正在开发中... 欢迎给出建议和方案" />}}
```bash
phanes deploy
```
