# flutter



#### 1. webview url 使用http , ios不能正常显示

```
修改文件 ios/Runner/Info.plist
添加
<key>NSAppTransportSecurity</key>
<dict><key>NSAllowsArbitraryLoads</key><true/></dict> 
<key>io.flutter.embedded_views_preview</key>
<string>YES</string>
```





