---
title: "生成配置"
description: ""
lead: ""
date: 2023-07-25T18:14:33+08:00
lastmod: 2023-07-25T18:14:33+08:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "generator-4d9020726cd6c9a43fe0aaac3586be43"
weight: 210
toc: true
---


## 介绍
默认生成配置文件 `generator.go`， 配置就是一个go语言结构体，非常简单，但为了满足需求，我们增加了一些注解和 tag，但这些都是非必需和非常简单的，下面是一个非常简单的示例，比如我们要生成一个 User 相关的操作，我们将这样定义这个配置
```go
// Yeah! it's so simple.
package main

import (
  "time"
  "github.com/lib/pq"
)

//project:hello
type  User struct {
  Id int64 `rule:"Parameter;Required"`
  Name string  `rule:"Parameter;Required"`
  Password string `rule:"Parameter;Required"`
  Phone string `rule:"Parameter"`
  Roles []pq.StringArray `rule:"Parameter"`
  CreatedAt time.Time
  UpdatedAt time.Time 
}

```

> 下面介绍这个结构体的定义规则

## 命名规则

结构体和结构体内字段都遵循统一的命名规则，仅有两个规则如下：

- 使用大驼峰命名
- 使用 go 语言的命名规则



## 字段支持数据类型

支持数据类型：

```Go
string,int,int32,int64,float32,float64,
time.Time
pq.StringArray
pq.Int32Array
pq.Int64Array
pq.Float32Array
pq.Float32Array

```

> `pq.* `的类型是 PostgresQL 的数据类型，需要使用者对 PostgresQL 有一定的了解，当然也支持生成mysql的 Entity和逻辑



## Tag 使用规则

在定义结构体时，使用 Tag 对字段进行设置，Example：

```Go
Id  int64 `rule:"Parameter;Required;;EnableValidator"`
```


{{< alert icon="👉" text="rule Tag作为字段的生成规则Tag，是 phanes 使用的特定Tag，除此Tag外，所有自定义Tag都将添加到生成的代码中" />}}


1. 支持自定义Tag，所有的自定义Tag 都将作为字段 Tag 添加到生成的机构体Tag中
2. 支持生成默认的 `json` 的tag，也遵循第一条，支持自定义
3. 支持生成 `gorm` 的Tag，也遵循第一条，支持自定义
4. Tag 名称必需使用小写

### rule 设置规则

- Parameter: 启用表示此字段为http请求参数, 默认为 false
- AutoFill:  当字段类型为 time.Time 时，是否自动填充此时间字段，  默认为 false
- Required: 启用表示此字段为必填参数，当Parameter未设置时此参数无效，  默认为 false
- AutoGenGormTag: 启用表示在代码生成的时候会根据数据类型为字段自动生成gorm的Tag，  默认为 true
- NameStyle: 字段的命名规则，可设置为 `snake_case` 和 `camelCase`, 默认为：snake_case
- EnableValidator: 启用此字段表示启用参数验证器（当前版本不支持自动生成, 默认为： false



> 注意：NameStyle字段后面需要设置具体的命名类型，必需使用 “:” 与名称分割，每个规则之间必需使用“;”分割

Example：

```Go
`rule:"Parameter;Required;;EnableValidator"`
```


## 注解使用规则
在定义结构体的时候，需要添加 Comment 来指定此代码生成到哪个项目，并且支持自定义生文件的保存路径和生成代码的类型，Example

```Go
//project:hello
//generate:bll;api.http
//dir:bll->./hello/bll/person
```

1. 使用`project`命令指定项目名称
2. 使用`gnenrate`命令指定所需生成的代码类型
3. 使用`dir`命令指定自定义文件保存路径
4. 命令 comment 与结构体之间不能有空行
5. 与go语言命令一致，命令与 “//” 之间不能有空格

### generate 注解指令

generate 支持以下类型， 且必需使用以下字段作为类型名称：

- bll : 业务逻辑代码
- model : 模型代码，此中包括 mapping 代码
- entity : 数据实体代码
- api.http : htpp api 代码
- api.grpc : grpc api 代码， 此版本中不支持设置
- api.all : http 和 grpc同时生成，此版本中不支持设置
- store.postgres : 生成PostgresQL的存储代码，此中包括数据存储层的抽象接口代码
- store.mysql :生成Mysql的存储代码，此中包括数据存储层的抽象接口代码

> 注意： 不指定默认生成所有代码，指定生成不通的代码类型使用 “;” 进行分割

Example:

```Go
//generate:bll;api.http
```

### dir 注解指令

dir 支持以下指令，且必需使用以下字段作为key名称

- bll : 业务逻辑路径名称
- model : 模型路径名称
- entity : 数据库实体路径名称
- mapping : 模型和数据库实体映射转换路径名称
- http_api : http api路径名称
- grpc_api : grpc api路径名称
- store_mysql : mysql 存储路径名称
- store_postgres : postgresql 存储路径名称

> 注意：路径名称和路径是一对key→value， 使用“→”进行分割

Example:

```Go
//dir:bll->./hello/bll/person
```



完整的示例：

```Go
//project:hello
//generate:bll;api.http
//dir:bll->./hello/bll/person
type Person struct {
  Id        int64          `rule:"Parameter;Required;;EnableValidator"`
  Name      string         `rule:"Parameter;Required;;EnableValidator"`
  Arm       string         `rule:"Parameter;;EnableValidator"`
  Age       int            `rule:";EnableValidator"`
  Phones    pq.StringArray `rule:"Parameter;;EnableValidator"`
  CreatedAt time.Time      `rule:"Parameter;;EnableValidator"`
  UpdatedAt time.Time      `rule:"Parameter;;EnableValidator"`
}

```

