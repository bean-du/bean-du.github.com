---
title: "结构说明"
description: ""
lead: ""
date: 2023-07-27T16:36:47+08:00
lastmod: 2023-07-27T16:36:47+08:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "structrue_explain-d210bf07575f59e59333c4b87a970228"
weight: 160
toc: true
---

代码目录结构是经过多次迭代后的结果，目的还是为了更加简洁和高效的编码，这样的设计主要是想尽可能的将目录层级结构保持在2层以内，减少操作复杂度。
{{< details "目录结构, 点击查看👈">}}
```bash
├── assistant
│   ├── init.go
├── bll
│   ├── event_handle.go
│   ├── init.go
│   └── user.go
├── client
│   ├── broker
│   │   ├── init.go
│   │   ├── nats.go
│   │   └── rabbit.go
│   ├── grpc
│   │   └── init.go
│   ├── httpc
│   │   └── init.go
│   ├── init.go
│   └── websocket
│       └── init.go
├── collector
│   ├── init.go
│   ├── logger
│   │   ├── file_output.go
│   │   ├── init.go
│   │   ├── log.go
│   │   ├── syncer.go
│   │   └── zap.go
│   ├── metrics
│   │   ├── collector.go
│   │   ├── http.go
│   │   └── init.go
│   └── trace
│       └── init.go
├── config
│   ├── conf.go
│   ├── init.go
│   └── traefik.go
├── errors
│   ├── error.go
│   └── error_type.go
├── event
│   ├── data.go
│   ├── event.go
│   └── init.go
├── lib
│   ├── example_server
│   │   └── init.go
├── logs
│   └── admin.log
├── main.go
├── makefile
├── model
│   ├── auth.go
│   ├── entity
│   │   └── user.go
│   ├── group.go
│   ├── mapping
│   │   ├── mapping.go
│   │   └── user.go
│   ├── model.go
│   └── user.go
├── script
│   ├── config.yaml
│   ├── down.sql
│   ├── index.sql
│   └── up.sql
├── server
│   ├── example_server
│   │   └── init.go
│   ├── grpc
│   │   ├── init.go
│   │   └── middleware
│   │       ├── log.go
│   │       └── trace.go
│   ├── init.go
│   └── web
│       ├── init.go
│       ├── middleware
│       │   ├── auth.go
│       │   ├── otel.go
│       │   └── util.go
│       └── v1
│           ├── init.go
│           └── user.go
├── store
│   ├── init.go
│   ├── mysql
│   │   ├── init.go
│   │   └── migrate.go
│   ├── postgres
│   │   ├── user.go
│   │   ├── migrate.go
│   │   └── init.go
│   ├── redis
│   │   └── init.go
│   └── user.go
└── utils
    ├── http.go
    └── utils.go

```
{{< /details >}}


目录名称说明如下：
|||
|-|-|
|目录名|说明|
|assistant|助理，一切扩展的想象都在这里|
|bll|业务代码存放的地方|
|client|项目向外请求，如：HttpClient、BrokerClient、gRpcClient|
|collector|可观测数据封装，包括日志，链路追踪，指标监控|
|config|配置文件和配置初始化|
|event|EventBus， 事件总线|
|errors|错误处理包封装，自定义错误|
|lib|自己封装的库|
|model|数据模型，Entity，Mapping(model与entity的映射)代码|
|script|一些项目脚本|
|server|项目对外提供的服务，包括http，grpc，tcp等等|
|store|存储层代码，包括存储接口抽象和具体实现|
|utils|项目工具集|


关系图如下：
![phanes-structure](/images/phanes-structure.png)
