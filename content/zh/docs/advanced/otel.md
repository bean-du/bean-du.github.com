---
title: "遥测数据"
description: ""
lead: ""
date: 2023-07-25T18:11:54+08:00
lastmod: 2023-07-25T18:11:54+08:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "otel-8d1b22353c8f94c59ebfe78e4f09e430"
weight: 999
toc: true
---

# 可观测数据


## Log

### 1.1日志配置

日志的配置在 Collect 下的 Log下配置，目前日志默认提供是 zap 的封装，支持异步日志写入，在大量并发请求时，有助于提高效率，减少IO次数。一以下是日志的设置，支持日志级别设置，文件名称，日志前缀（用于区分服务），缓存大小，定时刷入时间设置，这里缓存大小和时间

```yaml
log:
    # DebugLevel = -1, InfoLevel = 0, WarnLevel = 1 
    # ErrorLevel = 2, DPanicLevel = 3, PanicLevel = 4, FatalLevel = 5
    level: -1
    # log file name
    file_name: admin
    # log print prefix
    prefix: "[PHANES]"
    # will buffer up to 4096 kilobytes of logs,
    # waiting at most 10 seconds between flushes.
    buffer_size: 4096 # kb, default 256kb
    interval: 10 # second, default 30s
```

### 1.2使用示例
不携带 context 的日志
```go
import (
    log "auth/collector/logger"
)

log.Info("server shutdown!")
```

携带 context 的日志
```go
import (
    log "auth/collector/logger"
)

log.ErrorCtx(ctx, "create source error", zap.String("err", err.Error()))

```

> context 可以传递上下文信息，根据 otel 的规范，日志中需要添加 trace_id， span_id, 
> 当你的 context 中拥有 otel 规范的 trace_id 时， 你的日志将自动关联上这个 trace_id 和 span_id，无需手动在日志中添加。 

## Traces

### 2.1 Trace 配置
trace 目前只支持 jaeger，后续可以支持 otel 或 zipkin，配置也很简单，只需配置一个 jaeger 地址即可
```yaml
  trace:
    addr: "http://localhost:14268/api/traces"
```

### 2.2使用示例
目前 http 请求已经将 trace， metrics 和 log 在中间件中实现，如需监控每个具体链路中的某个方法，需要自己在自己的方法内手动添加
具体代码如下：
```go

// Find
func (a *resource) Find(ctx context.Context, in *model.ResourceInfoRequest) (*model.ResourceInfo, error) {
	var (
		err  error
		data *entity.Resource
		out  = &model.ResourceInfo{}
	)

	// trace example
	ctx, span := otel.GetTracerProvider().Tracer("Phanes").Start(ctx, "Bll.Resource.Find")
	defer func() {
		if err != nil {
			span.End()
		}
	}()

	if data, err = a.iResource.Find(ctx, in); err != nil {
		return nil, err
	}

	out = mapping.ResourceEntityToDto(data)
	return out, nil
}

```

## Metrics
### 3.1 Metric配置
metric 数据搜集提供两种方式，主动上报和被动采集，但常规用法使用被动采集，也就是 prometheus 主动到你的服务采集，那么我们就需要提供一个接口供他采集数据
所以我们启动一个 http 服务来供 prometheus 采集数据。这里我们只需要配置一个端口
```yaml
  metric:
    # metrics will listen a http port
    # example: localhost:2223/metrics
    listen: ":2223"
```
### 3.2使用示例
使用示例请查看项目下 `collector/metrics/http.go`

### 3.3.1 HTTP 请求常用指标

HTTP服务器监控的常见指标（metrics）包括：

1.  请求计数（Request Count）：记录HTTP服务器收到的请求数量。
2.  响应时间（Response Time）：跟踪HTTP服务器处理请求所花费的时间。
3.  错误率（Error Rate）：记录HTTP服务器返回错误状态码的请求数量占总请求数的比例。
4.  并发连接数（Concurrency）：监测同时连接到HTTP服务器的客户端数量。
5.  请求吞吐量（Request Throughput）：记录HTTP服务器每秒处理的请求数量。
6.  带宽利用率（Bandwidth Utilization）：跟踪HTTP服务器传输数据的带宽使用情况。
7.  CPU和内存利用率（CPU and Memory Utilization）：监控HTTP服务器的CPU和内存使用情况。
8.  磁盘空间利用率（Disk Space Utilization）：记录HTTP服务器存储空间的使用情况。
9.  响应状态码分布（Response Status Code Distribution）：统计HTTP服务器返回的不同状态码的数量，如200、404、500等。
10. 流量（traffic）：记录HTTP服务的网络流量，反映服务的带宽利用情况和网络质量。可以分别监控每个URI的流量，以了解每个URI的网络需求情况。
11. 日志记录（Logging）：记录HTTP服务器的访问日志，包括请求来源、路径、响应状态等信息。

> 以上指标只实现部分，如果有需要，可以自己实现