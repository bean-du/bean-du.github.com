---
title: "错误处理"
description: ""
lead: ""
date: 2023-07-25T18:11:11+08:00
lastmod: 2023-07-25T18:11:11+08:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "error-handing-0878efee54a2b4060032f689f3995334"
weight: 999
toc: true
---

Phanes 对错误进行了一个简单的封装，使得在整个系统中处理错误变的方便又简单，且使用灵活

## 自定义错误

> 使用Phanes自定义错误，只需要定义错误常量，这里你可以定义任何你自定义的错误。并且在任何地方使用。

```Go
// common Error type
const (
  None Type = 0

  Unauthorized Type = 1000

  ErrParamsParse Type = iota + 1000
)

const (
  BadRequest Type = iota + 2000
  Forbidden
  NotFound
  InternalServerError
  NotImplemented
  ServiceUnavailable
)

func (t Type) String() string {
  switch t {
  case None:
    return "none"
  case BadRequest:
    return "bad request"
  case Unauthorized:
    return "unauthorized"
  case Forbidden:
    return "forbidden"
  case NotFound:
    return "not found"
  case InternalServerError:
    return "internal server errors"
  case NotImplemented:
    return "not implemented"
  case ServiceUnavailable:
    return "service unavailable"
  default:
    return ""
  }
}
```

> 这样设计的目的是为了增加错误处理的灵活性，如果一些错误是可以固定某些错误信息，那么可以直接定义在 Type 的 默认错误提示信息里面。如果有些错误可能会自己添加一些特别说明，就可以再在New的时候加入。

## 错误消息显示

1. 如果使用时添加自定义错误信息， 如：BadRequest.New("password is required")
    - Type 设置了默认消息提示，则会显示： `bad request: password is required`
    - 如果Tpye内没有设置默认消息，此时错误信息就会显示：`password is required`
2. 如果使用时不填写自定义错误信息，如：BadRequest.New("")
    - Type 设置了默认消息提示，则会显示： `bad request`
    - 如果方法内没有设置默认消息，此时错误信息就会显示为空。
3. 使用Wrap和Wrapf时遵循此规则

## 使用说明

### 1.1使用New创建一个错误

```Go
import "phanes/errors"

// New 时增加自定义错误信息
if err := c.ShouldBindJSON(&u); err != nil {
    c.Error(errors.ErrParamsParse.New("register unmarshal json error"))
    return
}

// New 时不增加自定义错误信息
if err := c.ShouldBindJSON(&u); err != nil {
    c.Error(errors.ErrParamsParse.New(""))
    return
}

```

### 1.2 包装一个错误

```Go
import "phanes/errors"

// Wrap 时增加自定义错误信息
if err := c.ShouldBindJSON(&u); err != nil {
    c.Error(errors.ErrParamsParse.Wrap(err, "register unmarshal json error"))
    return
}

// Wrap 时不增加自定义错误信息
if err := c.ShouldBindJSON(&u); err != nil {
    c.Error(errors.ErrParamsParse.Wrap(err, ""))
    return
}

```

> 当你包装一个错误时，也可以像New一样，不填写后面的错误信息，规则和New一样

##  错误断言

```Go
import "phanes/errors"

var err error

// 可以通过 Is 方法判断是否是我们自定义的错误或者其他错误类型
if errors.Is(err, errors.CustomError) {
    // 如果是自定义错误可以更具错误做出对应处理
    // do something
}
// 如果确定此错误就是我们自定义的错误，也可以直接使用 GetType 来获取我们定义的错误类型
// 根据错误类型进行对应处理
errType := errors.GetType(err)

if errType == 1000 {
  c.JSON(http.StatusUnauthorized, nil)
} else if errType > 1000 && errType < 2000 {
  c.JSON(http.StatusOK, gin.H{
    "trace_id": traceID,
    "code":     errType,
    "message":  e.Error(),
  })
}

```