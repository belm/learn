# linux

查看系统

```
cat /etc/issue
uname -a
cat /proc/version
```

查看端口

```
netstat -antpl
```

查看防火墙端口

```
firewall-cmd --query-port=8000/tcp
```

查看用户

```
cat /etc/passwd
```

查看dns

```
cat /etc/resolv.conf
```

校验时间

```
yum install ntpdate

crontab add :
*/30 * * * * /usr/sbin/ntpdate cn.pool.ntp.org > /dev/null
```

批量杀掉进程

```
ps -ef | grep bi.admin.heitao.com | grep -v grep | awk '{print $2}' | xargs kill -9
```

查看进程的所有线程

```
ps -mp pid -o THREAD,tid   //例如： ps -mp 76379 -o THREAD,tid
```

跟踪线程的系统调用

```
strace -p 线程id
```

跟踪进程的系统调用

```
strace -fp 进程id
```

lsof命令查看进程文件描述符对应打开的文件

```
lsof -p 进程id
```

查看进程的描述符目录

```
ls /proc/进程id/fd
```

查看进程状态

```
cat /proc/进程id/status
```

查看进程堆栈信息

```
cat /proc/进程id/stack
```

查看导致进程睡眠或者等待的函数

```
cat /proc/进程id/wchan

poll_schedule_timeout   是在等待 I/O,不可能使用的是非阻塞 I/O.其他很多进程的状态就是这个，这是一个比较正常的状态
futex_wait_queue_me  表示因为资源的问题产生的锁
sk_wait_data:wait for some data on a network socket.根据这个可以判断该进程是在等待某一个经过 socket 传输的资源
```

查看dns

```
cat /etc/resolv.conf

dig -x 223.5.5.5

nslookup www.heitao.com 223.5.5.5
```



参考

http://vearne.cc/archives/297

https://blog.csdn.net/peng314899581/article/details/79064616



生成rsa私钥和公钥

```
//生成私钥
openssl genrsa -out rsa_private_key.pem 1024

//私钥转成PKCS8格式
openssl pkcs8 -topk8 -inform PEM -in rsa_private_key.pem -outform PEM -nocrypt -out ./rsa_private_key_pkcs8.pem

//生成公钥
openssl rsa -in rsa_private_key.pem -out rsa_public_key.pem -pubout
```



生成ssh公私钥

```
ssh-keygen -t rsa
```



软连接

```
ln -s  /usr/local/app    app  
```



指定目录挂盘

```
fdisk -l  #查看系统存在的磁盘
mount /dev/sdb1 /指定目录 //挂载指定目录
umount /test  //卸载指定目录
```

修改时区

```
//查看当前时区
ls -l /etc/localtime

执行tzselect 命令选择自己的时区

//删除默认的时区
sudo rm -f /etc/localtime  

//使用新设置的时区
sudo ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

or 

//使用系统命令
sudo timedatectl set-timezone 'Asia/Shanghai'
```

sed

```

```

awk

```

```

grep

```

```

