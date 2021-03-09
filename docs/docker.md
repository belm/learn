

# docker

安装docker(centos7)

```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

启动docker

```
sudo systemctl start docker
```

容器操作

```
docker ps //查看正在运行的容器
docker ps -a //查看所有容器

docker create -it --name=busybox busybox  //创建容器
docker start busybox  //基于已经创建好的容器直接启动
docker run busybox    //基于镜像新建一个容器并启动，相当于 docker create + docker start
docker stop busybox  // 停止容器
docker rm busybox  //删除停止状态的容器
docker rm -f busybox  //删除运行中的容器
docker export busybox:belm > busybox.tar //导出一个容器到文件，不管此时该容器是否处于运行中的状态
docker import busybox.tar busybox:belm  //导入export导出的镜像文件,实现镜像的迁移
```

镜像操作

```
docker pull [Registry]/[Repository]/[Image]:[Tag]  //拉取镜像， tag为镜像的标签，默认为latest
docker tag busybox:latest mybusybox:latest  //重命名镜像
docker image ls  ; docker image list ; docker images; //查看本地镜像
docker image ls mysql  //查看指定的镜像
docker rmi //删除镜像 或者  docker image rm
构建镜像
docker build  //基于Dockerfile 构建镜像， 推荐
docker commit //基于已运行的容器，提交为镜像

docker image prune -af //仅仅清除没有被容器使用的镜像文件
docker system prune -f //清除多余的数据，包括停止的容器、多余的镜像、未被使用的volume等等

docker login --username=hi31454629@aliyun.com registry.cn-shanghai.aliyuncs.com  //密码为docker1234
docker tag [ImageId] registry.cn-shanghai.aliyuncs.com/belm/busybox:1001
docker push registry.cn-shanghai.aliyuncs.com/belm/busybox:1001  //推送镜像到阿里云仓库中  
docker pull registry.cn-shanghai.aliyuncs.com/belm/busybox:1001  //拉取阿里云仓库镜像
```

基于已运行的容器构建镜像

```
docker run --rm --name=busybox -it busybox sh
touch hello.txt && echo "I love Docker. " > hello.txt
docker commit busybox busybox:belm

docker run --rm --name=busybox_test -it busybox:belm sh
```

基于Dockerfile构建镜像

Dockerfile文件内容如下:

```
FROM centos:7
COPY nginx.repo /etc/yum.repos.d/nginx.repo
RUN yum install -y nginx
EXPOSE 80
ENV HOST=mynginx
CMD ["nginx","-g","daemon off;"]
```

使用下面这个命令构建

```
docker build  -t mycentos .
```

![image-20201110144425504](/Users/lumeng/Library/Application Support/typora-user-images/image-20201110144425504.png)



![image-20201110150626163](/Users/lumeng/Library/Application Support/typora-user-images/image-20201110150626163.png)

进入容器

处于运行状态的容器可以通过`docker attach`、`docker exec`、`nsenter`等多种方式进入容器

```
docker attach xxx  //命令同时在多个终端运行时，所有的终端窗口将同步显示相同内容，当某个命令行窗口的命令阻塞时，其他命令行窗口同样也无法操作, 不推荐

docker exec -it 容器id sh  //会单独启动一个 sh 进程，每个窗口都是独立且互不干扰的，也是使用最多的一种方式
```

容器监控

```
docker stats  //还有很多开源的解决方案，例如 sysdig、cAdvisor、Prometheus 等，都是非常优秀的监控工具

docker run --cpus=1 -m=2g --name=nginx  -d nginx  //启动一个资源限制为 1 核 2G 的 nginx 容器

docker inspect nginx |grep Pid  //查看上面启动的 nginx 容器的 PID
cat /proc/27348/net/dev   //27348为上面查询到的pid

k8s后面使用metrics server代替cADvisor了
cAdvisor 是提供底层数据的，metrics-server 底层数据来源是 cAdvisor
cAdvisor 是提供监控数据的，Prometheus 是负责采集的数据的，这两个作用是不一样的，生产集群中一般都是 cAdvisor 配合 Prometheus 一起使用
```

cAdvisor   是谷歌开源的一款通用的容器监控解决方案

```
docker pull google/cadvisor
docker run \
  --volume=/:/rootfs:ro \
  --volume=/var/run:/var/run:ro \
  --volume=/sys:/sys:ro \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --volume=/dev/disk/:/dev/disk:ro \
  --publish=8085:8080 \
  --detach=true \
  --name=cadvisor \
  --privileged \
  --device=/dev/kmsg \
  google/cadvisor
```

命令行工具 unshare，使用 unshare 命令可以实现创建并访问不同类型的 Namespace

```
//Mount Namespace 隔离不同的进程或进程组看到的挂载点
sudo unshare --mount --fork /bin/bash
//PID Namespace  主要是用来隔离进程
sudo unshare --pid --fork --mount-proc /bin/bash
//UTS Namespace 主要是用来隔离主机名的
sudo unshare --uts --fork /bin/bash
//IPC Namespace 主要是用来隔离进程间通信的
sudo unshare --ipc --fork /bin/bash
//User Namespace  主要是用来隔离用户和用户组的
sudo unshare --user -r /bin/bash
//Net Namespace 用来隔离网络设备、IP 地址和端口等信息的
sudo unshare --net --fork /bin/bash

docker run --net=host   //与主机共享namespace， 共享主机网络
```



搭建私有仓库

```
docker run -d -p 5000:5000 --name registry registry:2.7
docker tag busybox localhost:5000/busybox
docker push localhost:5000/busybox
docker rmi localhost:5000/busybox
docker pull localhost:5000/busybox

docker run -v /var/lib/registry/data:/var/lib/registry -d -p 5000:5000 --name registry registry:2.7  //仓库持久化到本地

//配置支持https自定义域名的仓库；需要ssl证书
docker run -d --name registry \
-v "/var/lib/registry/data:/var/lib/registry \
-v "/var/lib/registry/certs:/certs \ 
-e REGISTRY_HTTP_ADDR=0.0.0.0:443 \
-e REGISTRY_HTTP_TLS_CERTIFICATE=/certs/regisry.lagoudocker.io.crt \
-e REGISTRY_HTTP_TLS_KEY=/certs/regisry.lagoudocker.io.key \
-p 443:443 \
registry:2.7

docker tag busybox regisry.lagoudocker.io/busybox
docker push regisry.lagoudocker.io/busybox

//企业级的镜像仓库，支持角色访问控制管理和GUI界面等  Harbor； 结合kubernetes才能发挥价值
```

查看容器的ip

```
docker run --name=nginx -d -p 8080:80 nginx
docker inspect --format '{{ .NetworkSettings.IPAddress }}' nginx  //查看ip地址
sudo ps aux |grep docker-proxy

sudo iptables -L -nv -t nat //查看主机上 iptables nat 表的规则
```

docker 组件

```
docker //官方实现的标准客户端
dockerd  //Docker 服务端的入口，负责接收客户端发送的指令并返回相应结果
docker-init  //在业务主进程没有进程回收功能时则十分有用
docker-proxy //实现 Docker 网络访问的重要组件

containerd   完全遵循了 OCI 标准
* 镜像的管理，例如容器运行前从镜像仓库拉取镜像到本地；
* 接收 dockerd 的请求，通过适当的参数调用 runc 启动容器；
* 管理存储相关资源；
* 管理网络相关资源。

containerd-shim  将containerd 和真正的容器进程解耦,使用 containerd-shim 作为容器进程的父进程，从而实现重启 containerd 不影响已经启动的容器进程。

ctr  实际上是 containerd-ctr，它是 containerd 的客户端,主要用来开发和调试，在没有 dockerd 的环境中，ctr 可以充当 docker 客户端的部分角色，直接向 containerd 守护进程发送操作容器的请求。

runc 容器运行时组件, 一个标准的 OCI 容器运行时的实现，它是一个命令行工具，可以直接用来创建和运行容器。
```

![7.png](https://s0.lgstatic.com/i/image/M00/59/E6/Ciqc1F9y4vGAVzmAAADk1nlHpUA424.png)



容器网络

```
CNM标准  docker    
CNI标准  Google、Kubernetes、CoreOS

docker run --net=none -it busybox

bridge 桥接模式是 Docker 的默认网络模式，当我们创建容器时不指定任何网络模式，Docker 启动容器默认的网络模式为 bridge。

null 空网络模式：可以帮助我们构建一个没有网络接入的容器环境，以保障数据安全。 --net=none
bridge 桥接模式：可以打通容器与容器间网络通信的需求，默认是bridge模式。
host 主机网络模式：可以让容器内的进程共享主机网络，从而监听或修改主机网络。 --net=host
container 网络模式：可以将两个容器放在同一个网络命名空间内，让两个业务通过 localhost 即可实现访问。--net=container:busybox1

//container 网络模式允许一个容器共享另一个容器的网络命名空间
docker run -d --name=busybox1 busybox sleep 3600
docker exec -it busybox1 sh
docker run -it --net=container:busybox1 --name=busybox2 busybox sh

虽然最后k8s的CNI成为了容器网络标准，但是libnetwork的容器网络模式使得pod中容器共享网络环境成为可能
```

![Lark20200929-162901.png](https://s0.lgstatic.com/i/image/M00/59/ED/Ciqc1F9y8HGAaH1iAAClKDUq5FY736.png)



安装docker [参考](https://docs.docker.com/engine/install/centos/)

```
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
                  
sudo yum install -y yum-utils
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

sudo yum install -y docker-ce docker-ce-cli containerd.io

sudo systemctl start docker  //启动docker
sudo docker run hello-world  //验证安装是否ok
```

更新docker

```
sudo service docker stop
sudo yum update docker-engine
sudo service docker start
sudo docker version
```

配置镜像加速器, 通过修改daemon配置文件/etc/docker/daemon.json来使用加速器

```
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": ["https://odiam5xa.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```



mysql

```
docker run -itd --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql
docker run -d -p 3306:3306 --name mysql -e MYSQL_ROOT_PASSWORD=123456 -v /Users/lumeng/Downloads/docker:/docker-entrypoint-initdb.d  mysql
```

redis

```
docker run -itd --name redis -p 6379:6379 redis
```

phpmyadmin

```
docker run --name phpmyadmin -d --link mysql:mysql  -p 8001:80 -e PMA_HOST=mysql -e PMA_PORT=3306 -e PMA_USER=root -e PMA_PASSWORD=123456 phpmyadmin
```

docker-compose.yml

```
version: '3.1'
services:
  redis:
    image: redis
    restart: always
    ports:
      - 6379:6379
  mysql:
     image: mysql
     restart: always
     working_dir: /docker-entrypoint-initdb.d
     volumes:
        - ./:/docker-entrypoint-initdb.d
     ports:
      - 3306:3306
     environment:
        MYSQL_ROOT_PASSWORD: 123456

  phpmyadmin:
      image: phpmyadmin
      restart: always
      ports:
          - 8080:80
      environment:
          - PMA_HOST=mysql
          - PMA_PORT=3306
          - PMA_USER=root
          - PMA_PASSWORD=123456
      links:
        - mysql
        - redis
```

```
docker-compose up
docker-compose up -d 
docker-compose down
```



```
kubectl create -f user-service-deployment.yaml 
```



jenkins

```
docker run -d --name jenkins -p 8081:8080 -p 50000:50000 -v /root/docker/jenkins:/var/jenkins_home jenkins
```

elk

```
docker network create elk   //默认bridge类型
docker run -d --name elasticsearch --net elk -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.9.3
docker run -d --name kibana --net elk -p 5601:5601 kibana:7.9.3
docker run -d --name nginx --net elk -p 8080:80 -v /root/docker/nginx:/etc/nginx/conf.d  nginx
```

portainer    管理docker容器和镜像的GUI

```
docker run -d -p 8000:9000 --restart=always -v /var/run/docker.sock:/var/run/docker.sock --name portainer  portainer/portainer-ce
```

sftp

```
docker pull atmoz/sftp

docker run -p 22:22 -d atmoz/sftp foo:pass:::upload
docker run -v <host-dir>/upload:/home/foo/upload -p 2222:22 -d atmoz/sftp foo:pass:1001
docker run -v <host-dir>/users.conf:/etc/sftp/users.conf:ro -v mySftpVolume:/home -p 2222:22 -d atmoz/sftp

docker run -v /data/jupyter:/home/lum/upload -p 2222:22 -d atmoz/sftp lum:2e6371a37f4ffe48
chmod 777 /data/jupyter
sftp -P 2222 lum@60.205.168.239

```

theia-go

```
docker pull theiaide/theia-go

docker run -d --name theia-go -it -p 8003:3000 -v "$(pwd):/home/project:cached" theiaide/theia-go

docker run -d --name theia-go --security-opt seccomp=unconfined -e GO111MODULE=auto -it -p 8003:3000 -v "$(pwd):/home/project:cached" theiaide/theia-go

docker exec -u 0 -it theia-go /bin/bash
```

php容器内安装git

```
mv /etc/apt/sources.list /etc/apt/sources.list.bak
echo "deb http://mirrors.163.com/debian/ jessie main non-free contrib" >/etc/apt/sources.list
echo "deb http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list
echo "deb-src http://mirrors.163.com/debian/ jessie main non-free contrib" >>/etc/apt/sources.list
echo "deb-src http://mirrors.163.com/debian/ jessie-proposed-updates main non-free contrib" >>/etc/apt/sources.list
apt-get update
apt-get install -y git
```

```
#sh 'mv /etc/apt/sources.list /etc/apt/sources.list.bak'
#sh 'cp $WORKSPACE/ubuntu_sources.list /etc/apt/sources.list'
```

提交镜像

```
docker run -d it --name php php:7.4.13
修改自己的逻辑（推荐写成dockerfile）

docker commit php php-with-lint:7.4.13

docker login --username=hi31454629@aliyun.com registry.cn-shanghai.aliyuncs.com  //密码为docker1234
docker tag [ImageId] registry.cn-shanghai.aliyuncs.com/belm/php-with-lint:7.4.13
docker push registry.cn-shanghai.aliyuncs.com/belm/php-with-lint:7.4.13 //推送镜像到阿里云仓库中  
docker pull registry.cn-shanghai.aliyuncs.com/belm/php-with-lint:7.4.13  //拉取阿里云仓库镜像
```



xxl-job

```
docker run --link mysql:mysql -e PARAMS="--spring.datasource.url=jdbc:mysql://mysql:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai --spring.datasource.username=root --spring.datasource.password=123456 --spring.datasource.driver-class-name=com.mysql.jdbc.Driver" -p 9090:8080 -v /tmp:/data/applogs --name xxl-job-admin  -d xuxueli/xxl-job-admin:2.2.0
```



geoipupdate

```
docker run --env-file /home/GeoIP.conf -v /home/geoipupdate:/usr/share/GeoIP maxmindinc/geoipupdate

docker run -e GEOIPUPDATE_ACCOUNT_ID=  -e GEOIPUPDATE_LICENSE_KEY= -e GEOIPUPDATE_EDITION_IDS= -v /home/geoipupdate:/usr/share/GeoIP maxmindinc/geoipupdate

```



swagger-php

```
docker run -v "$PWD":/app -it --rm tico/swagger-php --output openapi.json --exclude vendor --pattern "*.php"
```



lnmp

```
docker run -dit \
-p 8000:80 \
-p 8001:443 \
-p 3306:3306 \
-p 9000:9000 \
-v /opt/lnmp/www:/www \
-v /opt/lnmp/mysql:/data/mysql \
--privileged=true \
--name=lnmp \
2233466866/lnmp
```



ddnsto

```
docker run -d  --name=ddnsto  -e TOKEN=9e38a586-119b-4fa2-9f42-a6c0136a9bca   -e DEVICE_IDX=0   -v /etc/localtime:/etc/localtime:ro  -e PUID=1001  -e PGID=1001  linkease/ddnsto
```

jupyter

```
docker run -d -it  -p 8001:8888 --name jupyter -v /home/docker/jenkins_new:/home/jovyan/work  jupyter/datascience-notebook
```

