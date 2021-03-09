# pm2



###  安装

```
npm install -g pm2 --registry https://registry.npm.taobao.org
```

### 操作

```
启动
pm2 start ./bin/www --watch
pm2 start app.js --watch -i 2

重启
pm2 restart app.js

停止 or 删除
pm2 stop app_name|app_id

停止所有
pm2 stop all

查看
pm2 list

查看某个进程
pm2 describe 0

开机启动
pm2 startup

传参
pm2 start app.js --node-args="--harmony"

监控
pm2 monit

内存超过上限自动重启
pm2 start big-array.js --max-memory-restart 20M
```

### 参数说明

```
--watch：监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件。
-i --instances：启用多少个实例，可用于负载均衡。如果-i 0或者-i max，则根据当前机器核数确定实例数目。
--ignore-watch：排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如--ignore-watch="test node_modules "some scripts""
-n --name：应用的名称。查看应用信息的时候可以用到。
-o --output <path>：标准输出日志文件的路径。
-e --error <path>：错误输出日志文件的路径。
--interpreter <interpreter>：the interpreter pm2 should use for executing app (bash, python...)。比如你用的coffee script来编写应用
```

