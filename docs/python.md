# python

#### python3 安装 turtle

```
pip3 download turtle
找到下载地址，下载到本地后， 解压，修改setup.py文件，第40行
except (ValueError, ve):

pip3 install -e ./turtle-0.0.2
```

pip3指定源

```
pip3 install -i https://mirrors.aliyun.com/pypi/simple notebook
```

配置默认源

```
mkdir ~/.pip  && vim ~/.pip/pip.conf
写入以下内容

[global]
index-url=https://mirrors.aliyun.com/pypi/simple/
[install]
trusted-host=mirrors.aliyun.com
```

centos7.9安装jupyter notebook

```
yum install libffi-devel -y
yum install python3
pip3 install -i https://mirrors.aliyun.com/pypi/simple notebook
启动
nohup jupyter notebook --allow-root &
nohup jupyter notebook --allow-root --ip='0.0.0.0'  >>jupyter.log 2>&1 &

关闭
jupyter notebook stop
```

pyecharts

```
pip3 install pyecharts
```

selenium  浏览器爬虫

```
pip3 install selenium
```

ubuntu安装chrome

```
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

```

centos安装 chrome和运行selenium

```
#添加repo源
sudo vi /etc/yum.repos.d/google.repo  

[google]
name=Google-x86_64
baseurl=http://dl.google.com/linux/rpm/stable/x86_64
enabled=1
gpgcheck=0
gpgkey=https://dl-ssl.google.com/linux/linux_signing_key.pub

#yum安装
sudo yum install google-chrome-stable -y   

#安装必要的库
yum install mesa-libOSMesa-devel gnu-free-sans-fonts wqy-zenhei-fonts -y  

#下载对应版本的chromedriver
http://chromedriver.storage.googleapis.com/index.html

chmod +x  /usr/bin/chromedriver


#添加chrome启动参数
option.add_argument("--no-sandbox")
option.add_argument("--disable-gpu")
option.add_argument("--disable-dev-shm-usage")


```

计算初始化一个相同元素的列表和元组分别所需的时间（元组比列表快5倍）

```
python3 -m timeit 'x=(1,2,3,4,5,6)'
python3 -m timeit 'x=[1,2,3,4,5,6]'
```

计算索引操作分别所需的时间（速度差不多）

```
python3 -m timeit -s 'x=(1,2,3,4,5,6)' 'y=x[3]'
python3 -m timeit -s 'x=[1,2,3,4,5,6]' 'y=x[3]'
```

容器内jupyter notebook， 如果系统修改了时区， 使用BlockingScheduler 需要指定时区

```
sched = BlockingScheduler(timezone="Asia/Shanghai")
```

anaconda安装

```
下载安装脚本  https://www.anaconda.com/products/individual#linux  
bash ./Anaconda3-2020.11-Linux-x86_64.sh

 source /root/.bashrc
 conda list  查看安装的包
 python  可以查看会显示anaconda
 
 anaconda-navigator 管理工具GUI  
 
 创建新环境
 conda create --name <env_name> <package_names>
 
 切换环境
 source activate <env_name>
 
 退出环境至root
 source deactivate
 
 显示已经创建的环境
 conda info --envs
 conda info -e
 conda env list
 
 复制环境
 conda create --name <new_env_name> --clone <copied_env_name>
 
 删除环境
 conda remove --name <env_name> --all
 
 查找可供安装的包版本
 conda search --full-name <package_full_name>  精确查找
 conda search <text>   模糊查找
 
 查看已经安装的包
 conda list
 
 在指定环境中安装包
 conda install --name <env_name> <package_name>
 
 在当前环境中安装包
 conda install <package_name>
 
 卸载指定环境中的包
 conda remove --name <env_name> <package_name>
 
 卸载当前环境中的包
 conda remove <package_name>
 
 更新所有包
 conda update --all
 conda upgrade --all
 
 更新指定包
 conda update <package_name>
 conda upgrade <package_name>
 
 修改下载源(配置文件 ~/.condarc)
 
 conda config --add channels https://mirrors.aliyun.com/pypi/simple/
 conda config --set show_channel_urls yes
 
 conda config --remove channels https://mirrors.aliyun.com/pypi/simple/
 
 conda config --show channels
 conda config --show-sources
```

