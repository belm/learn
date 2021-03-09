# nodejs



### 安装

```
1. 下载最新版nodejs  https://nodejs.org/zh-cn/download/
2.修改/etc/bashrc  添加环境变量  export PATH=$PATH:/usr/local/app/node-v15.11.0-linux-x64/bin
3.source /etc/bashrc
```

### 修改源

```
修改
npm config set registry https://registry.npm.taobao.org
验证
npm config get registry
```

### 安装其他程序

```
npm install -g pm2
```

### 指定源安装

```
npm install -g pm2 --registry https://registry.npm.taobao.org
```

