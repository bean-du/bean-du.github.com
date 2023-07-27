---
title: "项目配置"
description: ""
lead: ""
date: 2023-07-25T18:14:25+08:00
lastmod: 2023-07-25T18:14:25+08:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "project-aac7a046f09990bb4e258e56f6a4adf9"
weight: 220
toc: true
---


## 项目配置文件

{{< alert icon="👉" text="⚠️注意：项目启动完全依赖配置文件，如果配置出错，可能会导致项目不能正常启动" />}}

配置文件支持 yaml，toml，json, 默认支持 json 和 yaml，如需使用 toml 需要在配置 `config/init.go` 中修改 `configFileType` 变量

Example:

```yaml
name: hello
env: dev
version: 0.1.0
auto_migrate: true

http:
  listen: :7771
  validate_trans: zh

# 如果使用数据库，可将整个 db 配置删除，这会使存储和 cache 不初始化
# db 支持 postgreSQL，mysql, 这里将 cache 的配置也放在这里做初始化
# addr: 数据库连接串
# type: 数据库类型
# user: 数据库用户名， 目前除 redis 其他数据库不启用
# pwd: 数据库密码，目前除 redis 其他数据库不启用
db:
  - addr: host=127.0.0.1 user=postgres password=root dbname=auth port=5432
      sslmode=disable TimeZone=Asia/Shanghai
    pwd: root
    type: postgres
    user: root
  - addr: 127.0.0.1:6379
    pwd: ""
    type: redis
    user: ""

# 如果使用数据库，可将整个 db 配置删除，这会使存储和 cache 不初始化
# 配置字段与 db 一样
broker:
  addr: amqp://coco:kk123123123@127.0.0.1:5672/
  pwd: ""
  type: rabbitmq
  user: ""

# otel config
collect:
  log:
    # DebugLevel = -1, InfoLevel = 0, WarnLevel = 1 ErrorLevel = 2, DPanicLevel = 3, PanicLevel = 4, FatalLevel = 5
    level: -1
    # log file name
    file_name: admin
    # log print prefix
    prefix: "[PHANES]"
    # will buffer up to 4096 kilobytes of logs,
    # waiting at most 10 seconds between flushes.
    buffer_size: 4096 # kb, default 256kb
    interval: 10 # second, default 30s
  metric:
    # metrics will listen a http port
    # example: localhost:2223/metrics
    listen: ":2223"
  trace:
    addr: "http://localhost:14268/api/traces"

# 本项目支持自动注册 http，tcp 到 traefik，以下是配置注册方式
traefik:
  # reverse proxy type support: tcp udp http grpc(h2c)
  type: tcp
  # support "||" or "&&"
  rule: "&&"
  # is enable tls
  tls: true
  # reverse proxy domain
  domain: test.com
  # is enable traefik proxy
  enabled: true
  # match prefix
  # prefix:

```


