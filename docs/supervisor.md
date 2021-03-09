# supervisor



### 安装

```
pip3 install supervisor
```

### 使用

```
生成默认配置文件
echo_supervisord_conf > /etc/supervisord.conf

修改/etc/supervisord.conf
files = /etc/supervisor/conf.d/*.conf

mkdir -p /etc/supervisor/conf.d

新增 /etc/supervisor/conf.d/frp.conf
[program:frp]
command = /usr/local/app/frp/frps -c  /usr/local/app/frp/frps.ini
autostart = true

启动
supervisord -c /etc/supervisord.conf

启动指定
supervisorctl start frp # 启动 指定的程序

重启
supervisorctl restart frp
supervisorctl update

查看状态
supervisorctl status

查看program日志
supervisorctl tail -f frp

停止所有
supervisorctl stop all
supervisorctl stop frp

关闭
supervisorctl shutdown

```



