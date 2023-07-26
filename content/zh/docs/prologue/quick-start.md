---
title: "快速开始"
description: "此页面你将学会如何使用 Phanes 快速构建一个微服务项目"
lead: "此页面你将学会如何使用 Phanes 快速构建一个微服务项目"
date: 2020-11-16T13:59:39+01:00
lastmod: 2020-11-16T13:59:39+01:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 110
toc: true
---

## 前置需求

- [Git](https://git-scm.com/) — 最新版本
- [Golang](https://go.dev/) — 大于1.19
- [protoc](https://grpc.io/docs/protoc-installation/) — 最新版本
- [protoc-gen-go](https://grpc.io/docs/languages/go/quickstart/) — 最新版本
- [protoc-gen-go-grpc](https://grpc.io/docs/languages/go/quickstart/) — 最新版本
- [protoc-gen-micro](https://github.com/go-micro/cli/) — 最新版本

## 前置知识
- Go 语言编程基础
- 微服务基础

{{< details "什么是微服务?" >}}
微服务是一种开发软件的架构和组织方法，其中软件由通过明确定义的API 进行通信的小型独立服务组成。 这些服务由各个小型独立团队负责。 微服务架构使应用程序更易于扩展和更快地开发，从而加速创新并缩短新功能的上市时间
{{< /details >}}


{{< details "什么是服务注册/服务发现?" >}}
（如：etcd， consul 等）
服务注册是指微服务在启动时，将自己的信息注册到注册中心的过程；服务发现是指查询可用的微服务列表及网络地址的机制 服务配置：动态修改服务配置，并将其推送到服务提供者和服务消费者而不需要重启服务。 健康检查：注册中心使用一定的机制定时检测已注册的服务，如发现某实例长时间无法访问，就会从服务注册表移除该实例
{{< /details >}}

{{< details "什么是配置中心?" >}}
「配置中心」，顾名思义，就是用来统一管理项目中所有配置的系统。 虽然听起来很简单，但也不要小瞧了这个模块。 如果一个中型互联网项目，不采用配置中心的模式，一大堆的各类配置项，各种不定时的修改需求，一定会让开发同学非常头疼且管理十分混乱。
{{< /details >}}

{{< details "什么是 rpc?" >}}
分布式计算中，远程过程调用是一个计算机通信协议。该协议允许运行于一台计算机的程序调用另一个地址空间的子程序，而程序员就像调用本地程序一样，无需额外地为这个交互作用编程。RPC是一种服务器-客户端模式，经典实现是一个通过发送请求-接受回应进行信息交互的系统
{{< /details >}}


{{< details "什么是分布式?" >}}
分布式系统是计算机程序的集合，这些程序利用跨多个独立计算节点的计算资源来实现共同的目标。 它也被称为分布式计算或分布式数据库，并依靠不同的节点通过公共网络进行通信和同步。 这些节点通常代表独立的物理硬件设备，但也可代表单独的软件进程或其他递归封装的系统。 分布式系统旨在消除系统的瓶颈或中心故障点。
{{< /details >}}

{{< alert icon="👉" text="如果你对这些知识不了解，请先自行查阅相关资料进行学习和了解" />}}


## 开始一个新的项目

安装 `Phanes` 命令工具 → 创建项目 → 生成代码 → 安装依赖 → 修改配置 → 运行你的项目.

### 安装命令工具

`phanes` 工具此项目的灵魂，一切由此开始...

```bash
go install github.com/phanes-o/phanes@latest
```

### 创建项目
使用 phanes 创建项目非常简单，命令如下：

```bash
phanes new project_name
```

### 生成代码
{{< details "生成了什么代码" >}}
phanes 提供了基本的 crud 操作的整套代码(HttpApi、业务、model、entity、数据存储相关代码) 生成代码依赖配置文件 gnenrator.go 此文件名称也是默认配置
{{< /details >}}

生成代码依赖配置文件 `gnenrator.go` 此文件也是默认配置文件, 具体如何配置请查看 [代码生成配置→ ]({{< relref "generator" >}})

使用默认配置文件生成：
```bash
phanes gen
```
或者指定配置文件生成：
```bash
phanes gen -c gen.go
```


### 安装依赖
别急，项目启动之前，我们还需要拉去项目的依赖项
```bash
go mod tidy
```

### 修改项目配置
最后一步，真的最后一步，就是修改项目启动配置，就可以启动项目了, 具体配置请查看 [项目配置文件→ ]({{< relref "project" >}})

{{< alert icon="👉" text="如果你只想快速体验，可以将 db 和 broker 配置注释掉" />}}

> 注意: 配置文件在  `your_project/script/config.yaml`

### 运行(Run your project...)
由于项目为微服务项目，启动时必须依赖 etcd， 所以需要在启动之前至少启动 etcd

```bash
go run main.go --registry=etcd --registry_address=127.0.0.1:2379 --config=./script/config.yaml
```

当你看到 `finished to init all component` 时， 🎉🎉恭喜你🎆🎆， 你的项目成功启动了，使用 postman 去请求 `http://localhost:7771/v1/xxx/xx` 体验你的首个Phanes 创建的微服务项目吧

## 开启新世界

更高级的用法请查看 [进阶教程 →]({{< relref "advance" >}})
