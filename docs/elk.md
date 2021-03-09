# ELK 

（Elasticsearch & Logstash & Kibana）

[TOC]

###  Elasticsearch


#### 下载

```
https://www.elastic.co/cn/downloads/elasticsearch
```

#### 目录说明

| 目录    | 配置文件          | 描述                                                      |
| ------- | ----------------- | --------------------------------------------------------- |
| bin     |                   | 脚本文件，包括启动elasticsearch，安装插件。运行统计数据等 |
| config  | elasticsearch.yml | 集群配置文件，user, role based 相关配置                   |
| JDK     |                   | 内置Java运行环境                                          |
| data    | path.data         | 数据文件                                                  |
| lib     |                   | Java类库                                                  |
| logs    | path.log          | 日志文件                                                  |
| modules |                   | 包含所有ES模块                                            |
| plugins |                   | 包含所有已安装插件                                        |

#### JVM配置

* 修改JVM -  config/jvm.options    7.1版本 默认设置为1GB 
* 配置的建议
  * Xmx和Xms 设置成一样
  * Xmx 不要超过机器内存的50%
  * 不要超过30GB

#### 启动elasticsearch

简单启动

````
前台启动
bin/elasticsearch
后台启动
bin/elasticsearch -d
````

集群启动

```
bin/elasticsearch -E node.name=node0 -E cluster.name=test -E path.data=node0_data -d
bin/elasticsearch -E node.name=node1 -E cluster.name=test -E path.data=node1_data -d
bin/elasticsearch -E node.name=node2 -E cluster.name=test -E path.data=node2_data -d
bin/elasticsearch -E node.name=node3 -E cluster.name=test -E path.data=node3_data -d
```

web查看启动的节点

```
http://localhost:9200/_cat/nodes
```

杀掉集群进程

```
ps aux|grep elasticsearch
kill pid
```

#### 安装插件和查看安装的插件

查看已经安装的插件

```
bin/elasticsearch-plugin list
```

安装插件

```
bin/elasticsearch-plugin install  analysis-icu
```

web查看已经安装的插件

```
http://localhost:9200/_cat/plugins
```

ElasticSearch提供插件的机制对系统进行扩展

* Discovery Plugin
* Analysis Plugin
* Security Plugin
* Management Plugin
* Ingest Plugin
* Mapper Plugin
* Backup Plugin

#### 查看启动情况

```
http://localhost:9200
```



### Kibana

#### 下载

```
https://www.elastic.co/cn/downloads/kibana
```

#### 启动 （先启动elasticsearch）

```
bin/kibana
```

#### 查看

```
http://localhost:5601
```

* 可以导入sample数据方便学习（首页）
* 重点关注 dev_tools  可查看elastic的数据  比如 Console 输入 get  /_cat/nodes 查看节点

#### 插件

```
安装插件
bin/kibana-plugin install plugin_location
查看插件
bin/kibana-plugin list
移除插件
bin/kibana-plugin remove xxx
```



### Logstash

#### 下载

```
https://www.elastic.co/cn/downloads/logstash
```

#### 下载测试数据集（解压后放在logstash根目录）

```
https://grouplens.org/datasets/movielens/
http://files.grouplens.org/datasets/movielens/ml-latest-small.zip
```

#### 下载示例配置文件logstash.conf (放在bin目录下面)

```
https://github.com/geektime-geekbang/geektime-ELK/tree/master/part-1/2.4-Logstash%E5%AE%89%E8%A3%85%E4%B8%8E%E5%AF%BC%E5%85%A5%E6%95%B0%E6%8D%AE/movielens/
```

修改logstash.conf配置文件里面的movies.csv文件路径

#### 启动导入数据

```
cd bin
sudo ./logstash -f logstash.conf
```



### 入门

开发视角（逻辑）：    索引，文档

运维视角（物理）：    节点，分片

#### 抽象与类比

| RDBMS  | Elasticsearch |
| ------ | ------------- |
| Table  | Index(Type)   |
| Row    | Document      |
| Column | Filed         |
| Schema | Mapping       |
| SQL    | DSL           |

#### 常见操作dev tools

```
//查看所有节点
get /_cat/nodes

//查看索引相关信息
get movies

//查看索引的文档总数
get movies/_count

//查看前10条文档
post movies/_search
{}

//查看indices
get /_cat/indices/kibana*?v&s=index

//查看状态为绿色的索引
get /_cat/indices?v&health=green

//按照文档个数排序
get /_cat/indices?v&s=docs.count:desc

//查看具体的字段
get /_cat/indices/kibana*?pri&v&h=health,index,pri,rep,docs,count,mt
```



