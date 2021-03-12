# jupyter



安装启动jupyter notebook

```
#安装
pip3 install jupyter notebook
pip3 install -i https://mirrors.aliyun.com/pypi/simple notebook
#启动
jupyter notebook
nohup jupyter notebook --allow-root --port 8001 --ip='0.0.0.0'  >>jupyter.log 2>&1 &

```

docker安装 anaconda3

```
docker pull continuumio/anaconda3

docker run -it --name="anaconda" -p 8888:8888 continuumio/anaconda3 /bin/bash
conda install -c conda-forge jupyterlab

nohup jupyter lab --ip='*' --port=8888 --no-browser --allow-root >/dev/null  2>&1 &

or

docker run -i -t -p 8888:8888 continuumio/anaconda3 /bin/bash -c "/opt/conda/bin/conda install jupyter -y --quiet && mkdir /opt/notebooks && /opt/conda/bin/jupyter notebook --notebook-dir=/opt/notebooks --ip='*' --port=8888 --no-browser"

```

docker安装jupyter/datascience-notebook

```
#拉取镜像
docker pull jupyter/datascience-notebook
#运行容器
docker run -d -p 8888:8888 -v /data/jupyter:/home/jovyan/work --name jupyter  jupyter/datascience-notebook
#进入容器 普通用户权限
docker exec -it jupyter /bin/bash
#进入容器 root用户权限
docker exec -u 0 -it jupyter /bin/bash  
#查看正在运行的notebook
jupyter notebook list


#保存修改后的容器jupyter为新的镜像jupyter2
docker commit jupyter jupyter2
docker run -d -p 8888:8888 -v /data/jupyter:/home/jovyan/work --name jupyter  jupyter2
docker exec -it jupyter /bin/bash
docker exec -u 0 -it jupyter /bin/bash
```


```
docker pull jupyter/base-notebook
docker run -d -p 8001:8888 -v  /data/jupyter:/home/jovyan --name jupyter jupyter/base-notebook
docker exec -it jupyter /bin/bash
jupyter notebook list

pip3 install requests apscheduler selenium

#查看安装的chrome版本
yum info google-chrome-stable

#查看chromedriver版本
./chromedriver --version
```

WebDriverException: Message: Service ./chromedriver unexpectedly exited. Status code was: 127
```

```


Jupyter Notebook(Anaconda) 自动补全代码提示

```
pip3 install jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
pip3 install --user jupyter_nbextensions_configurator
jupyter contrib nbextension install --user --skip-running-check
```

Jupyter Notebook 重启

```
jupyter notebook
```

python插件

```
//定时任务插件
pip3 install apscheduler

//安装pandas
pip3 install pandas   

//安装企业微信webhook
pip3 install --upgrade wechat_work_webhook

//安装企业微信发送pandas dataframe插件
yum install python-devel
pip3 install dataframe_image
```





