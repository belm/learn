# centos



### centos 6.5安装最新node12



[gcc各版本下载链接](http://ftp.gnu.org/gnu/gcc/)

```
1. 升级gcc 从gcc 4.4.7升级到7.4.0
wget http://ftp.gnu.org/gnu/gcc/gcc-7.4.0/gcc-7.4.0.tar.gz
tar zxf gcc-7.4.0.tar.gz 
cd gcc-7.4.0
./contrib/download_prerequisites  #安装依赖插件（这个耗时较久）

mkdir /usr/local/gcc-7.4.0
cd /usr/local/gcc-7.4.0/
/root/gcc-7.4.0/configure -enable-checking=release -enable-languages=c,c++ -disable-multilib
#这个会有点久 （一小时多点）
make && make install

#检查当前动态库，没有最新的库
strings /usr/lib64/libstdc++.so.6 | grep GLIBC

#查看编译安装后最新库，发现最新的是6.0.24
find / -name "libstdc++.so*"

#将上面的最新动态库libstdc++.so.6.0.24复制到/usr/lib64目录下
cd /usr/lib64/
cp /usr/local/gcc-7.4.0/stage1-x86_64-pc-linux-gnu/libstdc++-v3/src/.libs/libstdc++.so.6.0.24 ./

#删除原来的软链接，并将默认库的软链接指向现在最新的动态库
rm -rf libstdc++.so.6
ln -s libstdc++.so.6.0.24 libstdc++.so.6

#重启 完成
reboot

#完成后查看版本
gcc -v
```



/usr/local/bin/node: /lib64/libc.so.6: version `GLIBC_2.16' not found

```
wget http://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
tar -xf glibc-2.17.tar.gz
cd glibc-2.17
mkdir build
cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
```

