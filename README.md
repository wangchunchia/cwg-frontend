## 1.概述

### 1.1. 简介

本项目实现了IDL Management Platform前端界面，便于用户直观在IDL管理平台实现增、删、改、查功能。

视频演示：https://lar0129-video.oss-cn-nanjing.aliyuncs.com/7%E6%9C%8831%E6%97%A5.mp4

### 1.2 项目结构

```shell
.
├── App.vue
├── components.d.ts
├── composables
│   ├── dark.ts
│   └── index.ts
├── config.ts
├── env.d.ts
├── main.ts
├── pages
│   └── index.vue
├── style.css
├── styles
│   ├── element
│   │   ├── dark.scss
│   │   └── index.scss
│   └── index.scss
└── utils
    └── request.ts
```



## 2.环境配置

（以Ubuntu/Debian为例）

1.  安装etcd:

```shell
## 下载https://github.com/etcd-io/etcd/releases
curl -LO https://github.com/etcd-io/etcd/releases/download/v3.5.9/etcd-v3.5.9-linux-amd64.tar.gz

## 解压
tar xvf etcd-v3.5.9-linux-amd64.tar.gz

## 复制到 /usr/local/bin
cd etcd-v3.5.9-linux-amd64.tar.gz
sudo cp etcd /usr/local/bin/
sudo cp etcdctl /usr/local/bin/
```

2. golang:

```sh
## 安装golang
curl -LO https://golang.google.cn/dl/go1.20.5.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.20.5.linux-amd64.tar.gz

## 修改环境变量
sudo vim /etc/profile
export PATH=$PATH:/usr/local/go/bin
source /etc/profile

## 验证环境
go version
```

3. hz安装

```
go install github.com/cloudwego/hertz/cmd/hz@latest
```

4. kitex安装

```
go install github.com/cloudwego/kitex/tool/cmd/kitex@latest
```

5. thriftgo安装

```
go install github.com/cloudwego/thriftgo@latest
```



## 3.本地部署步骤

### 3.1 后端运行

1.打开etcd注册中心

* 运行`etcd --log-level debug`

2.打开服务端 

* 从根目录打开student_service文件夹（或teacher_service）
* 运行命令
  * `sh build.sh`
  * `sh output/bootstrap.sh`
  * 显示etcd注册成功即可

3.打开api网关服务

* 从根目录打开hertz_gateway文件夹。
* 运行命令
  * `go build .`
* 运行生成的可执行文件./hertz.demo

### 3.2 前端运行

1. 打开前端文件夹，运行命令

   `npm install`

   `npm run dev`

2. 在新增IDL一栏填入服务名、idl路径、idl具体内容，点击新增按钮

   ![](https://hackmd.io/_uploads/H1BzKyBsh.png)


3. 在idl列表中可以查看服务，可以进行关键词搜索

   ![](https://hackmd.io/_uploads/ry1mY1rs2.png)

   ![](https://hackmd.io/_uploads/HynmFyHi3.png)


   在服务右侧可以对服务的description进行修改或删除该服务

   ![](https://hackmd.io/_uploads/rkhVYyHo2.png)
   ![](https://hackmd.io/_uploads/SJOrFkHsh.png)


4. 服务请求测试

   在服务请求测试一栏中输入请求服务名、请求方法名、json体内容，点击按钮

   ![](https://hackmd.io/_uploads/r118FJHsn.png)


   如果请求服务名、请求方法名、json体内容出现错误，会出现相应异常

   ![](https://hackmd.io/_uploads/BJSIt1Hs2.png)
   ![](https://hackmd.io/_uploads/Sy-DFyHi3.png)

