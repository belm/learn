# go



参考 [code](https://golang.org/doc/code.html)

```
引用类型: 严格来说，Go 语言没有引用类型，但是我们可以把 map、chan、slice、函数、接口 称为引用类型，这样便于理解。
值类型： struct, 浮点型、整型、字符串、布尔、数组

在 Go 语言中，函数的参数传递只有值传递，而且传递的实参都是原始数据的一份拷贝。如果拷贝的内容是值类型的，那么在函数中就无法修改原始数据；如果拷贝的内容是指针（或者可以理解为引用类型 map、chan、slice、func、interface等），那么就可以在函数中修改原始数据。

函数传递的都是值类型， 由于引用类型底层其实传的是指针，所以也能跟指针一样修改指向的值。

new 函数只用于分配内存，并且把内存清零，也就是返回一个指向对应类型零值的指针。new 函数一般用于需要显式地返回指针的情况，不是太常用。

make 函数只用于 slice、chan 和 map 这三种内置类型的创建和初始化，因为这三种类型的结构比较复杂，比如 slice 要提前初始化好内部元素的类型，slice 的长度和容量等，这样才可以更好地使用它们。
```



### 线程和协程的区别

```
线程： 操作系统调度的
协程： go语言自己调度
```



### 常用命令

```
go mod init belmeng.com/learn/hello   //新增go.mod文件

go install belmeng.com/learn/hello  //安装hello命令
或者切换到hello目录，执行
go install .
go install 

go env  //查看go的相关环境变量
go env -w GOBIN=/somewhere/else/bin  //设置环境变量
go env -u GOBIN  //移除环境变量

go build //编译package到本地缓存 

go clean -modcache  //清理gopath目录里面的pkg/mod

go test  //测试

go run -race counter.go  //检查是否有并发问题

 go tool compile -race -S counter.go  //查看编译后的代码
```

```
curl -X POST http://localhost:8080/upload \
  -F "file=@/Users/appleboy/test.zip" \
  -H "Content-Type: multipart/form-data"
```



```
curl -X POST http://localhost:8080/upload2 \
-F "upload[]=@/Users/lumeng/Downloads/Document/mmczblsq1.doc" \
-F "upload[]=@/Users/lumeng/Downloads/Document/mmczblsq2.doc" \
-F "upload[]=@/Users/lumeng/Downloads/Document/mmczblsq3.doc" \
-H "Content-Type: multipart/form-data"
```

跨平台编译 详情参考[文档](https://golang.org/doc/install/source#environment)

* GOOS：代表要编译的目标操作系统，常见的有 Linux、Windows、Darwin 等。

* GOARCH：代表要编译的目标处理器架构，常见的有 386、AMD64、ARM64 等。

```
GOOS=linux GOARCH=386 go build .

GOOS：android, darwin (macOS/iOS), dragonfly, freebsd, illumos, js, linux, netbsd, openbsd, plan9, solaris and windows
GOARCH：amd64 (64-bit x86, the most mature port), 386 (32-bit x86), arm (32-bit ARM), arm64 (64-bit ARM), ppc64le (PowerPC 64-bit, little-endian), ppc64 (PowerPC 64-bit, big-endian), mips64le (MIPS 64-bit, little-endian), mips64 (MIPS 64-bit, big-endian), mipsle (MIPS 32-bit, little-endian), mips (MIPS 32-bit, big-endian), s390x (IBM System z 64-bit, big-endian), and wasm (WebAssembly 32-bit).
```



* When you run commands like `go install`, `go build`, or `go run`, the `go` command will automatically download the remote module and record its version in your `go.mod` file:

类型转换

```
i2s:=strconv.Itoa(i)  //整形转字符串
s2i,err:=strconv.Atoi(i2s) //字符串转整形
strconv.ParseFloat
strconv.ParseBool
strconv.FormatFloat
strconv.FormatBool

//数字之间转换
i2f:=float64(i)  //整形转浮点型
f2i:=int(f64)  //浮点转整形
```

查看本地文档

```
godoc -http=:6060
```

检测代码是否存在资源竞争

```
go run -race ./ch08/main.go 
```

```
go tool compile -race -S counter.go
```



### 变量定义

```
var a, b int = 1,2
var a,b = 1, "hello"
c := "hello"  //只能在函数内使用，不能放在函数外

变量声明分组
var (
	ToBe   bool       = false
	MaxInt uint64     = 1<<64 - 1
	z      complex128 = cmplx.Sqrt(-5 + 12i)
)
```

### 常量定义

```
const Pi = 3.14
常量不能用 := 语法声明。

数值常量
const (
	// 将 1 左移 100 位来创建一个非常大的数字
	// 即这个数的二进制是 1 后面跟着 100 个 0
	Big = 1 << 100
	// 再往右移 99 位，即 Small = 1 << 1，或者说 Small = 2
	Small = Big >> 99
)
```



### 类型转换

```
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)

打印类型
v := 42.2 
fmt.Printf("v is of type %T\n", v)
```

