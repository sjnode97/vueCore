#     BOM

### BOM(browser object model) 浏览器对象模型

```js
/*
	Screen 对象包含有关客户端显示屏幕的信息
	History 对象包含用户(在浏览器窗口中)访问过的URL
	Location 对象包含有关当前 URL的信息
*/
```

### Screen 对象包含有关用户客户端显示屏幕的信息

```js
/*
	Window 对象
		所有浏览器都支持 window 对象。它表示浏览器窗口。
	window.screen 对象在编写时可以不使用 window 这个前缀。
*/
	  /[ə'veɪl]/
screen.availHeight  // 设备高度  不包括底部或顶部任务栏
screen.availWidth  // 设备宽度 不包括右侧或左侧任务栏
screen.height  // 设备高度  包括底部或顶部任务栏
screen.Width  // 设备宽度 包括右侧或左侧任务栏
		//[depθ]
screen.colorDepth   // 目标设备缓冲器上的调色板的比特深度 不用管不懂没事
screen对象身上还有很多我们不用太考虑的属性 自行了解
```

### Window Location

```js

https://www.shiguangkey.com
//https => 协议 网络协议 本地协议  http协议基于通信协议来传递数据 请求返回的过程由它完成.
//www.shiguangkey.com 域名 一般非大型网站都是一个域名 , 大型网站后台可能使用后台的微服务框架 =>多域名

//全部课程 https://www.shiguangkey.com/course/list
// course/list => 路由 其实就是简化我们的url 使得我们的url更加的清晰明了
// 路由的工作是,定位文件 简化url 
// 路由更多的是一种操作  一种处理访问地址的操作
// 如我们进行路由定义 aa = bb/cc/dd 那么以上就是一种路由规定 
// 当用户输入/aa时  系统会通过aa = bb/cc/dd 去进行映射 // 找到当前路径和目标文件“对应”的关系 

window.location.href = 设置或返回完整的 URL。
	console.log( location.href ) //window前缀可省略 

url中符号
// url中的一些符号我们了解一下 
//  # ( 位置标志符 )这个实际上 只是作为当前页面的一个位置信息 , 比如跳转顶部 等,可以如此设计,但是#后面的任何字符 是不会传输去服务器的,并且 也不会导致当前页面的刷新. 不需要重新请求html网页  并且谷歌的网络蜘蛛会忽视url的# 部分 ;但是在谷歌中,如果你希望动态生成的内容被浏览器抓取,可以使用#!
// 用途: 它会被记录在历史记录中,因此可以利用它,进行前后网页的后退和前进,也比较的方便 也可用于锚点等操作 
通过获取 : window.location.hash	= 设置或返回 url#后面的内容 //锚点 


// ? ( 查询 默认get提交 )连接作用  清除缓存的作用 (不适用缓存)
window.location.search	= 设置或返回 url?,?+后面的内容
// &  不同参数之间的间隔符 

//端口  不管是本地服务器还是云服务器都 存在很多不同的端口,端口对应不同的服务,比如80端口是用于网页浏览,购买云的服务器如果不开80端口就没法打开网站,比如5500端口是对外开放端口,很多端口是不对外开放的. 我们上传网页时,不同的服务不同的数据请求,都要通过不同的端口获取,而上传后,端口只对管理员开放,外界不能访问.
window.location.port	设置或返回当前 URL 的端口号。

//中文转为uri编码  encodeURI("朱雀")或者 encodeURIComponent("朱雀")
//URI编码 转为中文 decodeURI("%E6%9C%B1%E9%9B%80")

window.location.hostname	设置或返回当前 URL 的主机名。
window.location.host	设置或返回主机名和当前 URL 的端口号
window.location.pathname	设置或返回当前 URL 的路径部分
window.location.protocol	设置或返回当前 URL 的协议

location.reload()  文档重载  刷新界面
```

### window.history

##### window.history.back( ) 返回前一条历史记录 

##### window.history.forward( ) 返回后一条历史记录

##### window.history.go( ) 返回第几个页面

### window方法

##### window.open("新地址","跳转方式",)

```js
document.onclick = function(){
	window.open("http://www.baidu.com","_blank")
}
////有些浏览器会阻止新窗口打开  还有可能for循环一直打开 没啥大的用处
```

#####  window.close() 关闭当前页

```js
document.onkeydown = ()=>{
    window.close()
}
```

### 浏览器信息

navigator下很有属性都是前端不需要的,但是navigator.userAgent 浏览器标信息标识符 

```js
window.navigator.userAgent => 返回 浏览器信息
// 整理各个浏览器不同的标识符可以用来分辨不同的浏览器.以便后续的开展,对于这些浏览器的细微差别,只需要使用前人整理出来的即可 (因为浏览器实在是太多了,自己整理压根行不通的!)
```

### window 事件

##### onscroll 滚动事件

##### onresize 窗口改变事件

##### onfocus获取焦点

##### onblur 失去焦点

**自行实验一下**

```js
//定时器的一个bug  当窗口切换到另一个页面时  定时器后台继续运行逻辑 但是页面停止渲染 过一会点回来 可能会报错 页面停滞  
let timer =setInterval(fn);
const fn = () =>{
    document.title++
    setInterval(fn,13)
}
fn()  


let timer = null;
window.onfocus = function (){//获取到焦点 也就是当前窗口是这个页面
	timer = setInterval(fn,13)
}
window.onblur = function (){//失去焦点 也就是当前切换到别的页面
	clearInterval(timer)
}

//用requestAnimationFrame 可以解决这个问题
const fn = () =>{
    document.title++
    requestAnimationFrame(fn,13)//没有下面的bug问题
}
fn()
```

