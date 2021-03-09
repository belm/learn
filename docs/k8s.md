# K8s

## pod声明

* 元数据(metadata): namespace(命名空间)，name（对象名），uid（对象ID）, 标签（lables），注释（annotations）

* 规范（spec） 描述了该对象的详细配置信息，即用户希望的状态

* 状态（status）  包含了该对象的一些状态信息，会由各个控制器定期进行更新

  

环境搭建：

https://www.katacoda.com/courses/kubernetes/playground



namespace

```
 一组资源和对象的抽象集合，内置的namespace: default, kube-system, kube-public, kube-node-lease
```

```
apiVersion: v1 #指定当前描述文件遵循v1版本的Kubernetes API
kind: Pod #我们在描述一个pod
metadata:
  name: twocontainers #指定pod的名称
  namespace: default #指定当前描述的pod所在的命名空间
  labels: #指定pod标签
    app: twocontainers
  annotations: #指定pod注释
    version: v0.5.0
    releasedBy: david
    purpose: demo
spec:
  containers:
  - name: sise #容器的名称
    image: quay.io/openshiftlabs/simpleservice:0.5.0 #创建容器所使用的镜像
    ports:
    - containerPort: 9876 #应用监听的端口
  - name: shell #容器的名称
    image: centos:7 #创建容器所使用的镜像
    command: #容器启动命令
      - "bin/bash"
      - "-c"
      - "sleep 10000"
```

### 创建pod

```
kubectl create -f ./twocontainers.yaml
kubectl get pods
kubectl get pod twocontainers -o=jsonpath='{.status.phase}'
kubectl exec twocontainers -c shell -it -- bash
进入容器后执行
curl -s localhost:9876/info

kubectl describe pod twocontainers
```

### Pod 的重启策略  spec.restartPolicy

```
Always   表示一直重启，这也是默认的重启策略
OnFailure  表示只有在容器异常退出，即退出码不为 0 时，才会对其进行重启操作
Never  表示从不重启；
```

### Pod 中的健康检查(针对容器) spec.containers.xxx

* livenessProbe 可以用来探测容器是否真的在“运行”，即“探活”(探活检测)
* readinessProbe  常常用于指示容器是否可以对外提供正常的服务请求，即“就绪”(就绪监测)
* startupProbe  则可以用于判断容器是否已经启动好

Probe 内置了如下三个 Handler：

* [ExecAction](https://kubernetes.io/docs/resources-reference/v1.7/#execaction-v1-core) 可以在容器内执行 shell 脚本；
* [HTTPGetAction](https://kubernetes.io/docs/resources-reference/v1.7/#httpgetaction-v1-core) 方便对指定的端口和 IP 地址执行 HTTP Get 请求；
* [TCPSocketAction](https://kubernetes.io/docs/resources-reference/v1.7/#tcpsocketaction-v1-core) 可以对指定端口进行 TCP 检查；

在这里 Probe 还提供了其他配置字段，比如 failureThreshold （失败阈值）等，你可以到[这个官方文档](https://kubernetes.io/zh/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes)中查看更详细的解释。

```
对于每一种 Probe，Kubelet 只会执行其中一种 Handler。如果你定义了多个 Handler，则会按照 Exec、HTTPGet、TCPSocket 的优先级顺序，选择第一个定义的 Handler。
```

```
apiVersion: v1
kind: Pod
metadata:
  name: probe-demo
  namespace: demo
spec:
  containers:
  - name: sise
    image: quay.io/openshiftlabs/simpleservice:0.5.0
    ports:
    - containerPort: 9876
    readinessProbe:
      tcpSocket:
        port: 9876
      periodSeconds: 10
    livenessProbe:
      periodSeconds: 5
      httpGet:
        path: /health
        port: 9876
    startupProbe:
      httpGet:
        path: /health
        port: 9876
      failureThreshold: 3
      periodSeconds: 2
```

### 容器生命周期内的 hook

* PostStart 可以在容器启动之后就执行
* PreStop 则在容器被终止之前被执行，是一种阻塞式的方式。执行完成后，Kubelet 才真正开始销毁容器。

同上面的 Probe 一样，hook 也有类似的 Handler：

- Exec 用来执行 Shell 命令；
- HTTPGet 可以执行 HTTP 请求。

```
apiVersion: v1
kind: Pod
metadata:
  name: lifecycle-demo
  namespace: demo
spec:
  containers:
  - name: lifecycle-demo-container
    image: nginx:1.19
    lifecycle:
      postStart:
        exec:
          command: ["/bin/sh", "-c", "echo Hello from the postStart handler > /usr/share/message"]
      preStop:
        exec:
          command: ["/usr/sbin/nginx","-s","quit"]
```

### init 容器

应用容器专注于业务处理，其他一些无关的初始化任务就可以放到 init 容器中。这种解耦有利于各自升级，也降低相互依赖。

一个 Pod 中允许有一个或多个 init 容器。init 容器和其他一般的容器非常像，其与众不同的特点主要有：

- 总是运行到完成，可以理解为一次性的任务，不可以运行常驻型任务，因为会 block 应用容器的启动运行；
- 顺序启动执行，下一个的 init 容器都必须在上一个运行成功后才可以启动；
- 禁止使用 readiness/liveness 探针，可以使用 Pod 定义的**activeDeadlineSeconds**，这其中包含了 Init Container 的启动时间；
- 禁止使用 lifecycle hook。

```
apiVersion: v1
kind: Pod
metadata:
  name: myapp-pod
  namespace: demo
  labels:
    app: myapp
spec:
  containers:
  - name: myapp-container
    image: busybox:1.31
    command: [‘sh’, ‘-c’, ‘echo The app is running! && sleep 3600‘]
  initContainers:
  - name: init-myservice
    image: busybox:1.31
    command: ['sh', '-c', 'until nslookup myservice; do echo waiting for myservice; sleep 2; done;']
  - name: init-mydb
    image: busybox:1.31
    command: ['sh', '-c', 'until nslookup mydb; do echo waiting for mydb; sleep 2; done;']
```

在 myapp-container 启动之前，它会依次启动 init-myservice、init-mydb，分别来检查依赖的服务是否可用。

