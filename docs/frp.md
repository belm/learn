# frp



### 下载

```
https://github.com/fatedier/frp/releases
```

### 服务端启动

```
./frps -c ./frps.ini
```

### 客户端启动

```
./frpc -c ./frpc.ini
```

### 使用pm2启动

```
pm2 start /usr/local/app/frp/frps --node-args="-c /usr/local/app/frp/frps.ini" --watch
pm2 start '/usr/local/app/frp/frps -- -c /usr/local/app/frp/frps.ini' --watch

不知道为啥  pm2只能启动主服务， 其他的不行
```

### 服务端配置 cat /usr/local/app/frp/frps.ini

```
[common]
bind_addr = 0.0.0.0
bind_port = 7000
bind_udp_port = 7001
kcp_bind_port = 7000

dashboard_addr = 0.0.0.0
dashboard_port = 7500
dashboard_user = admin
dashboard_pwd = Asdf5151
enable_prometheus = true

log_file = /usr/local/app/frp/frps.log
log_level = info
log_max_days = 3

authentication_method = token
authenticate_heartbeats = false
authenticate_new_work_conns = false
token = Asdf5151

vhost_http_port = 7080
vhost_https_port = 7081
tcp_mux = true
max_pool_count = 10
```

### 内网客户端配置

<img src="/Users/lumeng/Library/Application Support/typora-user-images/image-20210308193252118.png" alt="image-20210308193252118" style="zoom:50%;" />

![image-20210308193401711](/Users/lumeng/Library/Application Support/typora-user-images/image-20210308193401711.png)

