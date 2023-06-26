# ajax

**1**,页面除了跟用户一些交互以外,还存在一些数据交互,现在本来就是数据时代,我们页面和后台进行交互的就是数据交互,**2**.早期的数据交互是 form表单 action里面填的地址  当数据填好之后,触发form表单 会刷新界面 和后台交互的时候 刷新页面会造成不需要改动的部分 重复请求数据 页面出现闪动 增加后台压力 .

##### **ajax**  Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）

*[eɪˈsɪŋkrənəs]*

XML和HTML长得一样,一样是标签,但是没有预定义标签,因此我们可以自定义标签 xml可以说是html的一个补充,但是html是用于展示 而xml是用于传输数据.当我们传输数据时,我们得对数据进行区分账号是账号,密码是密码,不能混淆,我们这个XML自定义的这些标签内名就可以作为识别.  ==> 但现在发送数据形式 都是JSON 数据可读性强 结构清晰 操作容易 比XML要清楚简单多了

ajax 是一种创建交互式网页应用的一门网页开发技术, 它可以让我们在不刷新页面的情况下，实现与后台的数据交互. ajax不指向某个具体的东西,也不是编程语言,他是一门技术. 

ajax技术中,需要使用方法等,需要挂载在一个对象身上,最终规划后的对象为 **XMLHttpRequest**

### ajax使用详解

```js
// 1. 创建ajax实例 (兴起表白念头)
let xhr = new XMLHttpRequest()     => let xhr = new XMLHttpRequest()

// 2. 设置与后台交互的方式 或者 请求接口方式(交互方式)(表白方式)
xhr.open(method,url,boolean) 
method =>提交方式                     =>xhr.open("get","http://baidu.com") 
url =>提交的地址
boolean =>决定是否异步 默认为true 异步  

// http1.0协议为我们提供了三种方法  GET POST HEAD (发送(关注)请求头)
// http1.1协议 => OPTIONS(), PUT(增加), DELETE(删除), TRACE() 和 CONNECT ()
(不同的请求方法 含义是不一样的 一般用GET 和POST就够了  随着需求越来越复杂化,
 => 茫茫多的请求方式,实际上大部分公司都只用post和get  对请求方式细分 为了更清晰会使用新增的几种请求方式
 	 增加    =>POST   常用
     查找     =>GET  常用
	 删除	   =>DELATE  
	 修改    =>PUT
     1、OPTIONS
    返回服务器针对特定资源所支持的HTTP请求方法，也可以利用向web服务器发送‘*’的请求来测试服务器的功能性
    2、HEAD (只发送请求头)
    向服务器索与GET请求相一致的响应，只不过响应体将不会被返回。这一方法可以再不必传输整个响应内容的情况下，就可以获取包含在响应小消息头中的元信息。
    3、GET
    向特定的资源发出请求。它本质就是发送一个请求来取得服务器上的某一资源。资源通过一组HTTP头和呈现数据（如HTML文本，或者图片或者视频等）返回给客户端
    4、POST
    向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。
    5、PUT
    向指定资源位置上传其最新内容
    6、DELETE
    请求服务器删除Request-URL所标识的资源
    7、TRACE
    回显服务器收到的请求，主要用于测试或诊断
    8、CONNECT
    HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。
    
 // 3. 发送  (表白正式执行出去 情书=>)             
 									=>xhr.send("user=雀雀&psw=123456")
 // 4. 监听 (情书寄送出去的因素,以便检测情书是否送到位)
 xhr.onload = () =>{
     if(xhr.readyState === 4){//监听个人原因 个人状态 只有4才算是成功
         if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){//监听后台原因  通过个人和后台都成功才算是真的成功
             console.log(xhr)
             //默认是 responseText  如果是xml数据 则responseXML 所以 那response则好
             xhr.responseText //返回的是json 需要转为对象 
           //后台返回的数据 ↑↑↑↑↑ ajax只负责发起请求拿到数据 拿到数据之后 跟他们都没有关系了 
         }
     }
 }
 // xhr.onreadystatechange = () => {} //监听状态码改变的过程  用onload监听和这个监听都是可以的.  // 可能失败的原因: 个人原因  后台原因 
一.(监听个人)xhr.readyState 是 xhr 的状态码: 
0:请求未初始化  1.服务连接已建立 2.请求已接收 3.请求处理中 4 请求已完成 且响应已经就绪
反应(比如有没有对应把请求发送出去 有没有把对象创建好等等)

二.(监听返回数据)xhr.status =>http状态码(服务器的状态) (百度http状态码)
	只要关注 2开头的 和 304
	1 开头的 消息
    2 开头的 成功 最常见200
	3 开头的 重定向
	4 请求错误
	5 服务器错误
当后台没有更新的时候 可以读取缓存  缓存状态码304 也能算成功

// 5 后台返回的数据 完成 数据全部接收 ,前端爱咋咋地

// => 一运行  发现问题  (浏览器)不允许跨域 !!  (安全问题)
域 是Windows网络中独立运行的单位，域之间相互访问则需要建立信任关系
服务器 域名 域  跨域
服务区 一栋大楼  域名 指向不同楼层的门牌号 不同楼层不同域 不可跨域 
端口是楼层内的 房间,不同端口用来做不同的事情 ,如80端口通常用来显示网页,一个楼层可有一千多个端口. 不同房间之间,也分了小域,不可跨域.  因此 不同域名之间 不可跨域 同域不同端口之间 不可跨域  
=>> 阻止跨域实际上是来自浏览器的拒绝:发起请求的域和服务器的域是不是同一个域,如果是 那就正常请求  如果不是  那就把请求扼杀掉
//解决方案
// 1.可使用jsonp(唯一属于前端的跨域方法) 利用src不会被限制跨域 (这就是外部插件得以引入的原因)
// 2.或者CORS(这个是后台的活)进行跨域 在后台程序里,设置,让对应的域进行访问 此时浏览器了解了你们之间的微妙关系,就不会不铜鼓了 
// 3.通过信任服务器代理请求(不在浏览器中发起请求 找个代理) 
								//=>举例:翻墙   国内网关禁止访问国外网站 请求发送不过去  gfw城墙限制我们看外面的世界  如果需要访问国外网站,就需要第三方可信任服务器的代理去访问,拿到数据再通过服务器过来,这个行为就叫做翻墙 

```

### 

```js
//post写法
let xhr = new XMLHttpRequest()
xhr.open("POST","http://localhost:6789/main")

xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded")//不记得就百度 post请求头设置 Content-Type 当前内容的MIME =>描述消息内容类型的因特网标准 =>包含文本、图像、音频、视频以及其他应用程序专用的数据

xhr.send("user=朱雀&pwd=12345")
xhr.onload = ()=>{
    if(xhr.readyState !==4)return
    if(xhr.status <200 || xhr.status >=300 &&xhr.status !== 304)return
    console.log(JSON.parse(xhr.responseText))
    return JSON.parse(xhr.responseText)
}
```

### jquery 类库 的ajax写法

```js
//引入框架写法 百度bootCDN 托管网站   下载jquery
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
$.ajax({
	url: "http://localhost:3000",
	type: "POST",
    date:{//发送的数据
        user:"zhanghao",
        pwd:"123456"
    },
	success(msg){ //成功就走到这里 
		console.log(msg)
	}	
})

$.ajax({
    url:"",    //请求的url地址
    dataType:"json",   //返回格式为json
    async:true,//请求是否异步，默认为异步，这也是ajax重要特性
    data:{"id":"value"},    //参数值,键值对
    type:"GET",   //请求方式
    beforeSend:function(){
        //请求前的处理
    },
    success:function(req){
        //请求成功时处理
    },
    complete:function(){
        //请求完成的处理
    },
    error:function(){
        //请求出错处理
    }
});
```

# Fetch

传统 Ajax 指的是 XMLHttpRequest（XHR），现在和未来已被 [Fetch](https://fetch.spec.whatwg.org/) 替代。 

Fetch API 是基于 Promise 设计，旧浏览器不支持 Promise，需要使用 polyfill [es6-promise](https://github.com/jakearchibald/es6-promise) 。 

# 何为Fetch

XMLHttpRequest 是一个设计粗糙的 API，配置和调用方式非常混乱，而且基于事件的异步模型写起来也没有现代的 Promise，generator/yield，async/await 友好。 

Fetch 的出现就是为了解决 XHR 的问题。

使用 XHR 发送一个 json 请求一般是这样：

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.responseType = 'json';

xhr.onload = function() {
  console.log(xhr.response);
};

xhr.onerror = function() {
  console.log("Oops, error");
};

xhr.send();
```

使用 Fetch 后，顿时看起来好一点

```js
fetch(url)
.then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log("Oops, error");
});
```

使用 ES6 的 [箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 后：

```js
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(e => console.log("Oops, error", e))
```

使用 async/await 来做最终优化： 

```js
try {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
} catch(e) {
  console.log("Oops, error", e);
}
// 注：这段代码如果想运行，外面需要包一个 async function
```



# 用法

```js
fetch(url, options).then(function(response) {
  // handle HTTP response
}, function(error) {
  // handle network error
})
```



## url

定义要获取的资源。这可能是：

- 一个 `USVString` 字符串，包含要获取资源的 `URL`。
- 一个 `Request` 对象。

## options（可选）

一个配置项对象，包括所有对请求的设置。可选的参数有：

- `method`: 请求使用的方法，如 `GET`、`POST`。
- `headers`: 请求的头信息，形式为 `Headers` 对象或 `ByteString`。
- `body`: 请求的 `body` 信息：可能是一个 `Blob`、`BufferSource`、`FormData`、`URLSearchParams` 或者 `USVString` 对象。注意 `GET` 或 `HEAD` 方法的请求不能包含 `body` 信息。
- `mode`: 请求的模式，如 `cors`、 `no-cors` 或者 `same-origin`。
- `credentials`: 请求的 `credentials`，如 `omit`、`same-origin` 或者 `include`。
- `cache`: 请求的 `cache` 模式: `default`, `no-store`, `reload`, `no-cache`, `force-cache`, 或者 `only-if-cached`。

## response

一个 `Promise`，`resolve` 时回传 `Response` 对象：

- 属性：
  - `status (number)` - HTTP请求结果参数，在100–599 范围
  - `statusText (String)` - 服务器返回的状态报告
  - `ok (boolean)` - 如果返回200表示请求成功则为true
  - `headers (Headers)` - 返回头部信息，下面详细介绍
  - `url (String)` - 请求的地址
- 方法：
  - `text()` - 以`string`的形式生成请求text
  - `json()` - 生成`JSON.parse(responseText)`的结果
  - `blob()` - 生成一个`Blob`
  - `arrayBuffer()` - 生成一个`ArrayBuffer`
  - `formData()` - 生成格式化的数据，可用于其他的请求
- 其他方法：
  - `clone()`  创建一个Response对象的克隆 
  - `Response.error()`   返回一个绑定了网络错误的新的Response对象 
  - `Response.redirect() ` 用另一个URL创建一个新的 response. 

## response.headers

- `has(name) (boolean)` - 判断是否存在该信息头
- `get(name) (String)` - 获取信息头的数据
- `getAll(name) (Array)` - 获取所有头部数据
- `set(name, value)` - 设置信息头的参数
- `append(name, value)` - 添加header的内容
- `delete(name)` - 删除header的信息
- `forEach(function(value, name){ ... }, [thisContext])` - 循环读取header的信息



## 使用案例

### get

```js
fetch('/users.html')
  .then(function(response) {
    return response.text()
  }).then(function(body) {
    document.body.innerHTML = body
  })
```

### post

```js
fetch('/users', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
```



### Fetch 优点主要有 ：

1. 语法简洁，更加语义化
2. 基于标准 Promise 实现，支持 async/await

**BUT**

原生支持率并不高，幸运的是，引入下面这些 polyfill 后可以完美支持 IE8+ ：

1. 由于 IE8 是 ES3，需要引入 ES5 的 polyfill: [es5-shim, es5-sham](https://github.com/es-shims/es5-shim)
2. 引入 Promise 的 polyfill: [es6-promise](https://github.com/jakearchibald/es6-promise)
3. 引入 fetch 探测库：[fetch-detector](https://github.com/camsong/fetch-detector)
4. 引入 fetch 的 polyfill: [fetch-ie8](https://github.com/camsong/fetch-ie8)
5. 可选：如果你还使用了 jsonp，引入 [fetch-jsonp](https://github.com/camsong/fetch-jsonp)
6. 可选：开启 Babel 的 runtime 模式，现在就使用 async/await



### 键盘事件

键盘事件是有用户击打键盘触发 主要有keydown keypress keyup

不是所有元素都有键盘事件,只有能获取焦点的元素才能有键盘事件,表单元素都能获得焦点

```js
onkeydown//按下键位时触发
onkeyup //抬起时触发
onkeypress //按下有值的键盘时触发,即按下ctrl,alt,shift,mete这样无值的键,这个事件不会触发,对于有值的键,按下时先触发kyedowm事件,再触发这个事件.
document.onkeydown = function(e){
    console.log("down")
    console.log(e.key)
}
//e事件对象身上有key属性 对应我们按下的键 但由于表现不统一,所以不建议用这个 比如空格为" " 空格s键对应 s
可以使用keycode 
document.onkeydown = function(e){
    console.log("down")
    console.log(e.keycode)
}

// keycode不记录鼠标 但是which属性能记录鼠标 但which不兼容 低版本ie
document.onkeydown = function(e){
    console.log("down")
    console.log(e.which)
}

 document.oncontextmenu= function(e){ //先取消右键的默认行为 兼容懒得写了
     e.preventDefault()
 }
document.onmousedown= function(e){
    switch(e.which){
        case 1:
            console.log("鼠标左键")
            break;
        case 2:
            console.log("鼠标滚轮键");
            break;
        case 3:
            console.log("鼠标右键");
            break;
    }
}
```

***配合键位做个方向键控制盒子移动***

```js
document.onkeydown = function(e){ //上面这版本更简单
    var key = e.keyCode;
    if(key === 37 || key === 38 || key === 39 || key === 40)e.preventDefault()
    switch(key){
        case 37://左边
            wrap.style.left = wrap.offsetLeft - 10 + "px"
            break;
        case 38://上边
            wrap.style.top = wrap.offsetTop - 10 + "px"
            break;
        case 39://右边
            wrap.style.left = wrap.offsetLeft + 10 + "px"
            break;
        case 40://下边
            wrap.style.top = wrap.offsetTop + 10 + "px"
            break;

    }
}

var arr = [] //为啥用下面这版本
document.onkeydown = function(e){
    var key = e.keyCode;
    if(key === 37 || key === 38 || key === 39 || key === 40)e.preventDefault()
    arr[key] = true; //给arr的 标值 如果全部都是 true 则都会进去后面的移动 所以需要取消
    console.log(key);
    arr[37] && (wrap.style.left = wrap.offsetLeft - 10 + "px")
    arr[38] && (wrap.style.top = wrap.offsetTop - 10 + "px")
    arr[39] && (wrap.style.left = wrap.offsetLeft + 10 + "px")
    arr[40] && (wrap.style.top = wrap.offsetTop + 10 + "px");
    console.log(arr);
}
document.onkeyup = function (e) {
    var key = e.keyCode;
    arr[key] = false
}

```

## cookie  

```js
/*
	商城保存记录密码的时候，可以使用cookie来存；
	cookie:
        必须安装环境；
        localhost或127.0.0 开头。
     演示：
     	控制台 -> 应用池 -> cookie -> 
     		如果点击登陆的时候，页面当中就会保存一些cookie。
     		cookie是可以被劫持的。
     	设置 -> 高级 -> 内容设置 -> cookie -> 
        	有保存对应的数据。
     
*/

//每个浏览器储存的位置都不一样。
console.log( document.cookie ) // 当前浏览器所储存的cookie；
document.cookie = 'name = abc';
console.log( document.cookie ); 
/*
	在设置一个名称叫做name,值为abc;储在哪个域名下的:127.0.0；Path:路径； expires（过期时间）：如果没有设置时间的话，就是当前会话（打开一个窗口，就是打开一个会话。）
	默认储存时间：
		默认就是当前会话，存储在运行内存里。
		当时会话没有结束的时候，可以继续 访问别的页面。
*/


```

### 设置cookie时间:

```js
/*
	设置cookie时间:
		date.toMGTString() 用一个世界时间进行保存；
		

*/
var date = new date( new Date().getTime() + 30*60*1000 );//30分钟过期后的时间
document.cookie = 'name = abc';
```

### 删除cookie时间:

```js
document.cookie = 'name=;expires='+new Date( new Date().getTime() - 1 ).toGMTString();
        console.log(document.cookie)
```

### 封装设置cookie

**设置一个 : **

```js
/*
	1.封装cookie;
    	name:'';//名字
    	value:'';//值
    	expores:;//以分钟计时的cookie;
	2.功能实现：
		1.定义一个时间等于设置的时间；
		2.document.cookie 进行赋值；
*/
```

**设置多个值 : **

```js
/*
	1.用一个数组保存起来，之后里面可以设置多个值：
		每一组：
			名字属性(name)：test1
			属性值(value)：'30天'
			时间值(time):30*24*60
	2.封装区分对象为json对象还是数组对象。
    	function is_array( arr ){  }
			数组[]与json对象之间的区别在于：前者有长度而后者没有长度。
	3.判断内容：
		为假的时候为Json对象：
			直接传入已经封装好的值；
		为真的时候为数组【】对象：
			定义一个变量等于0，长度为数组的长度；
             递归：
             	setCookie(data[i])
    
	
*/
```

### 删除一个cookie

```js
/*
	在原先的基础上去封装一个删除cookie；
		1.delCookie( _name )
			单独把设置方法抽象出来，设定一个过期的时间。
				name:_name;对象的名字
				value:'';对象属性值设置为空
				time:-1;
		2.进行加密与解密；
         3.用正则去进行匹配：
         	


*/
```



### Jsonp 模糊词

```js
let oText = document.getElementById("text");
let oOpt = document.getElementById("option");   
oText.oninput = function () {
        let val = oText.value
        if (!val) return
        let oS = document.createElement("script")
        oS.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${val}&cb=callback`
        document.body.appendChild(oS)
        oS.onload = function () {
            document.body.removeChild(oS)
        }

    }

    function callback(data) {
        let arr = data.s
        let len = arr.length
        let str1 = ""
        for (let i = 0; i < len; i++) {
            str1 += `<li><a href="https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=${arr[i]}">${arr[i]}</a></li>`
        }
        oOpt.innerHTML = str1

    }
```




### 表单事件

##### focus() 获得焦点 方法

```js
<input type="text" id="wrap"/>
wrap.focus() //刷新 input就会获取焦点
```

##### blur() 失去焦点 方法

```js
document.onkeydown = function(e){
    if(e.keyCode === 13){
    wrap.focus()
    }
}
```

##### onfocus 获得焦点事件

```js
wrap.onfocus = function(){
    console.log(1)
}
```

##### onblur 失去焦点事件

```js
wrap.onblur = function(){
    console.log(1)
}
```

##### onchange 内容发生改变失去焦点(或者回车提交)才触发

##### oninput 内容发生改变就会触发 



