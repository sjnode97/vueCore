# 09 Math数学对象  定时器

### Math对象

Math是javascript一个内置对象,window对象下的一个属性

Math方法

- *PI* π

  ```js
  /console.log(Math.PI)/ 3.1415926
  ```

- *E* 自然常数

  ```js
  /console.log(Math.E)/ 2.71828182...
  //计算指数对数都会用到
  //a的b次幂等于N   loga N = b  a为底数  b为对数 N为真数 
  //当a = e 时  缩写为 lgN 
  ```

- *abs* 绝对值

  ```js
  let num = -1
  console.log(Math.abs(num))//1
  ```

- *acos*

- *asin*

- *cos*

- *sin*

- *tan* 等等等等 ...不再赘述 需要的再去拿来用即可

  ```JS
    Math.acos() //反余弦值 斜比邻 参数:接受的角度 以弧度表示的角
    Math.asin() //反正弦值 斜比对 参数:接受的角度 以弧度表示的角
    Math.cos() //余弦 临比斜 参数:接受的角度 以弧度表示的角
    Math.sin() //正弦 对比斜 参数:接受的角度 以弧度表示的角
  
  // 弧度计算  弧长 = r时对应的角度就是1弧度  一个圆的弧度等于 2πr/r  2π个弧度
  2π=360   2π/360 = 1度   一角度的弧度表示法 π/180   45度对应的弧度就是 45*π/180
  console.log(Math.sin(30*Math.PI/180))//sin30度  1/2 ~0.49999
  ```

- *ceil* 向上取整 只要是浮点数 小数部分砍掉 向上取整

  ```js
  let num = 1.1
  let num1 = -1.1
  console.log(Math.ceil(num))// 2
  console.log(Math.ceil(num1))// -1
  ```

- *floor* 向下取整 小数部分砍掉 整数部分不变 ( *常用* )

  ```js
  let num = 1.1
  let num1 = -1.1
  console.log(Math.floor(num))//1
  console.log(Math.floor(num1))//-2  往下取变成-2
  ```

- *max min* 取最大最小

  ```js
   console.log(Math.max(10,3,5)); //返回10
   console.log(Math.min(10,3,5)); //返回3
  ```

- *pow* 幂运算

  ```js
  console.log(Math.pow(2, 2))//第一个为底数 第二个为幂 4
  console.log(2 ** 2) //es6写法
  ```

- *round* 四舍五入

  ```js
  let num = 1.3
  let num1 = 1.8
  console.log(Math.round(num)) // 1
  console.log(Math.round(num1)) // 2
  ```

- *random* 随机数

  ```js
  //随机数的区间为 0~1的数值 左闭右开  无限接近于1但是取不到1 
  console.log(Math.random()) //输出任意小数
  ```

- *random小案例*  生成随机数区间函数

  ```js
  需求:fn(4,10)// 4~10的随机整数
  function randomNum (a, b) {
  	console.log( Math.floor(Math.random()*16 + 10))
      //Math.floor(Math.random()*(b - a + 1) + a)
      //向下取整
  }
   randomNum(10, 25)
  ```

- *随机颜色案例*

  ```js
  //number对象下一个方法  toFixed(1) 保留一位小数 2 保留两位小数
   function randomColor (num) {
       var str = ""//用空字符串接纳span
       for (let i = 0; i < num; i++) {
           //每次循环进来 获取四个值 
           var a = Math.floor(Math.random()*256)
           var b = Math.floor(Math.random()*256)
           var c = Math.floor(Math.random()*256)
           var d = Math.random().toFixed(1)
           str += `<span style="background-color:rgba(${a},${b},${c},${d});">rgba(${a},${b},${c},${d})</span>`
       }
       document.body.innerHTML = str //赋值进body里面
   }
  randomColor (20)
  ```

### 定时器

```js
// js的代码,除了触发执行,都是在加载页面瞬间编译执行的,定时器可以让我们在某一个固定的时刻往进程中添加代码执行,实现隔一段时间再执行一次代码
```

**开启定时器**

- **setTimeout** 一次性定时器

  接受参数 1,*回调函数*( 你将要抛出到进程中的函数 ) 由定时器抛出的回调函数,不用加括号,会主动执行 2,*隔多久抛出*  不写默认为0  单位为ms 毫秒 (1s = 1000ms)  3,*回调函数的传参* 可选 

  ```js
  function fn (a, b){
      console.log(a + b) //3
  }
  setTimeout(fn,1000,1,2) //隔1s抛出回调立即执行
  ```

定时器是window调用的,并且调用者不可修改,window.setTimeout()

定时器最短的时间，也是13。因为浏览器在渲染的时候是有一个最小时间的，通常这个时间在13-30之间 填时间的时候不要小于这个范围值

- **setInterval** 循环定时器

  接收参数同上  *循环*隔一定的时间抛出回调执行 

  ```js
  setInterval(function(){
      console.log(1)
  },500)
  ```

- **清除定时器**

  上面两种定时器,用下面任意一种清除都可以

  *clearTimeout()*

  *clearInterval()*

  传参清除的两种途径 1,*定时器的编号*  2,*定时器的名称*:其实就是接收的1的编号

  每开启一个定时器,定时器执行会返回一个编号,并自行叠加,编号从上往下的顺序,不根据执行先后

  ```js
  function fn(){
      console.log(1)
  }
  console.log(setTimeout(fn, 1000))
  console.log(setTimeout(fn, 100))
  console.log(setTimeout(fn, 1000))
  //通过该编号来清除定时器
  clearTimeout(1)
  clearTimeout(2)
  
  //由于编号不可控,不清晰 所以用变量接收 代表定时器的名称
  let timer1 = setInterval(fn,1000)
  clearInterval(timer1)
  
  //定时器执行的先后 根据时间来定 编号:根据出现顺序 用变量接收也不需要管他的编号是多少 直接用变量即可
  let timer1 = setTimeout(()=>{console.log("第一")}, 1000)
  let timer2 = setTimeout(()=>{console.log("第二")}, 500) 
  let timer3 = setTimeout(()=>{console.log("第三")}, 1000)
  //先输出第二 再第一 再第三
  consolr.log(timer1.timer2,timer3)
  ```

  ### 同步异步

  定时器是异步操作

  ```js
  function fn(){
      console.log("定时器运作")
  }
  setTimeout(fn,1000)
  console.log("queque")
  console.log("queque")
  console.log("queque")
  //不管定时器内时间为1000 还是 0 一直都是queque先打印.
  ```

  计算机(不止)有两个东西：cpu和内存，cpu是计算资源(能进行多少的计算)，内存是运行过程中的存储数据。维持电脑正常运行cpu(或者gpu)需要分配给不同软件不同的计算资源，就是通过进程控制的。

  *进程*：浏览器这个软件打开的时候有多个进程的，不同的进程有不同的作用(比如：插件，界面，GPU等)。单独打开一个新页面的时候是单独分配了一个进程。(单页面崩溃)

  *线程*: 一个进程里面有多个线程运行(异步线程，JS引擎，GUI渲染等)。其中有一个js引擎线程，掌控了所有的JS代码运行。

  *js是单线程语言*,所有的代码运行在一个线程内进行,做完一件事,再进行下面一件事,这些任务形成一个任务队列等候执行,执行按照任务排列顺序进行,一旦有一个任务卡住,加载不出来,或者运算庞大,那么后面的任务就会因此无法被加载,这就是阻塞进程,也叫同步,阻塞模式. 

   按照这个模式的话,执行效率会很低,,而由于js本身是单线程,没有办法开辟其他线程来进行任务的分担.但是js可以运行在浏览器和node.js环境下,浏览器为这些,相对来说,耗时的任务开辟了另外的线程,这些任务就是异步的.比如:包括http请求线程，浏览器定时触发器，浏览器事件触发线程   浏览器内核的实现至少有三个常驻线程: 界面渲染线程 javascript引擎线程,,浏览器事件触发线程

  界面渲染线程是浏览器单独开辟的线程,和js主线程是互斥的,也就是主线程执行任务时，浏览器渲染线程处于挂起状态。等执行任务完毕,再完成渲染. 由于js需要使用DOM 所以我们通常将js置于body结束标签之前,或者onload之后执行.  

  *所以说js一直是单线程的,浏览器才是实现异步的主角*

综上所诉 ,异步代码需要让当前队列的同步代码执行完毕之后才能执行

```js
//所以 setTimeout(fn,0) 无关时间,因为是异步,也要等当前同步代码执行完毕,再进行执行
```

```js
//随机颜色升级 无限生成
 function randomColor (num) {
     let a = Math.floor(Math.random()*256)
     let b = Math.floor(Math.random()*256)
     let c = Math.floor(Math.random()*256)
     var d = Math.random().toFixed(1)
     document.body.innerHTML += `<span style="background-color:rgba(${a},${b},${c},${d});">rgba(${a},${b},${c},${d})</span>`
 }
let timer = setInterval(randomColor, 500))
```

- **big小案例 圆周运动**

  ```js
  let oRun = document.getElementById("run");
  const R = 100;//半径
  let deg = 0; //增加的角度 
  let {PI,sin,cos} = Math;
  
  run()
  
  function run () {
      let rad = (PI / 180) * deg
      let leftY = R + sin(rad) * R -5
      let topX = R - cos(rad) * R -5
  
      oRun.style.top = topX + "px"
      oRun.style.left =leftY + "px"
      deg += 5
  
  }
  setInterval(run, 60)
  ```

