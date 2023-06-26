# 静态属性 包装对象  

### 静态属性 / 方法

只能被 类调用的属性,就是静态属性 如 Array.isArray()  反之则为实例方法

```js
// 类上的私有属性 和公有属性/方法  原则上都是让 实例使用的  而 静态属性,不提供给实例使用 只能类本身去调用 调用者是类 
```

```js
/ Array.isArray()  和 pop方法的对比 
pop 一定是数组实例 调用 
isArray 来确定是不是数组的  如果绑定在原型身上 其他任意类型的对象都不可以使用此方法,不能使用就没有判断的意义了,由于对象类型多且不确定,所以只能类本身来使用,使得它面向的范围更大 

如果只提供实例使用 就正常私有公有 
如果面向的对象范围大 , 不止停留在实例身上 就用静态属性


// es5静态属性/方法写法
function My(){}
My.own = fucntion(){} 
// own就是一个静态属性/方法 只能被 My调用 
// 凡属函数名.属性操作的 都是静态属性

//es6 静态属性/方法写法
class My{
    constructor(gouDan, age){
        this.gouDan = gouDan
        this.age = age
    }
    saygouDan(){console.log(this.gouDan)}
    //只有静态方法 没有静态属性 只支持定义方法
    //静态方法 只有 MY能用 my实例不可用
    static sayage (){console.log("只能爸爸使用")}
}

const my = new My("朱雀","18")
My.sayage() 

// 通过static 定义的方法就是静态的 


//关于super super让子类 继承属性之外 并且让子类 拥有this对象 this就是子类的this 
class My2 extends My{
    constructor(){
        //本次super 相当于 父类 执行返回父类的实例 生成子类的this 相当于父类.call(子类)
        // super() 直接调用只能出现在此 而且必须出现在此处
        super() // ===> 调用 父对象/父类 的构造函数
        super.say() //===> FatherClass.prototype.say 调用 父对象/父类 上的方法
    }
    add(){
        //super.  ===>使用目的是为了使用父类的原型 FatherClass.prototype
    }
    static sub(){
        //super.  ===>使用目的是为了调用父类的静态方法 FatherClass.staticMethods 
    } 
}

总结如下: 
// es6只能定义 静态方法 使用 static ! 
// 子类会继承父类的静态方法 
// super使用  不同地方的 不同意义
// 当定义一个空类时  new这个类的实例 会默认添加constructor(){super()}
// 继承的时候,子类里面必须要写constructor(){super()}  因为是super必写 所有constructor也必写
// 子类继承必须调用super  如果 不super  不能生成实例  不具备this 不能挂属性 
```

### 包装对象

```js
//值类型 需要调用属性时 需要借助包装对象 面试会问

//万物皆对象
let str = "123" //字面量: 基础值类型
str.num = 1 // . 前必然是对象 
console.log(str.num)// undefined

// 引用型
let str1 = new String(1234) // 生成一个对象
str1.num = 2
console.log(str1.num) // 1 存在自己的对象上

// 字面量 值类型的生成 
// 通过String构造函数 生成一个对象 生成后把对象杀掉 返回值本身 对象没有保留

str.num = 1// . 必须由对象来做
// 在调用属性和方法时,使用一个虚拟的对象来接收,临时生成的对象,就为包装对象 
// 做完就消失
console.log(str.num) //又生成一个新的临时对象 来接受  但是和前一次没任何的关系
```

#  DOM

**概念:**

`DOM 是javascript操作网页的接口,全称为文档对象模型(document object model),将网页转为一个javascript对象,从而可以用脚本进行网站的内容,结构和样式操作,想要更好的操作web网站,理解DOM是必要的.`

 **作用: 操作标签节点**

`严格来说DOM不属于javascript,因为其他语言,比如python,也有DOM操作,DOM是属于浏览器的.不是js特有的`

```js
//在最基本的层面上来说,web网站是由一个HTML文档组成,我们使用的浏览器是一个解析HTML和CSS的程序,它把样式,内容和结构呈现给你,也就是我们在浏览器上看到的样子,除了解析HTML结构和css样式之外,浏览器好创建了文档对象模型,也就是我们要说的DOM,该模型允许javascript以对象的形式访问网站文档的文本内容和元素
```

### 节点类型

DOM的最小组成单位叫做节点(node),文档的树形结构(DOM树),就是由各种不同类型的节点组成,每个节点可以看做文档树的一片叶子

*节点类型*  百度一波 有12种 但是大部分用不上

- document顶层节点

- documentType:doctype 标签

- Element 标签节点

- Attribute网页元素的属性节点

- text 标签之间或标签包含的文本 包括换行 和空格

- comment 注释节点

- documentFragment 不属于文档树 后面会讲  ( 解决不断的appendChild造成的重绘回流 因此当把创建的节点添加到该对象时，并不会导致页面的回流，因此性能就自然上去了。)

  ```js
  console.log(document)
  //输出和我们html文档一模一样的东西,document是一个内置对象,里面有很有的属性和方法
  ```

  DOM通常被称为DOM树,它由称之为节点的对象树组成.有三个节点类型是我们经常使用的 :

  *元素(element)节点  文本(text)节点, 注释(comment)节点*

  元素节点:标签

  文本节点:空格 换行 文本 字符

  注释节点:注释

  ```html
  <body>
  	<div>
          <!--注释-->
          <p><a href="">你好</a></p>
          <h2>我是h2</h2>
      </div>
  </body>
  ```

### 获取节点

##### **object.childNodes** 

*返回所有object的子节点  : 包括 标签节点,注释节点,文本节点 (只获取子节点,不会获取子节点内的节点)*

```js
let box = document.getElementById("box")
console.log(box.childNodes)//NodeList(5) [text, comment, text, p, text]
//text换行或空格  conment 注释 text换行或空格 p标签 text换行或空格
//文本返回类型  标签返回标签和标签选择器
```

存在兼容问题 : 在低版本ie内只返回 元素节点 (在ie上反而是我们所期望的样子)

兼容主要是指低版本ie 在移动端上的浏览器,基本上和主流浏览器差不多,不管是ios还是安卓 或者是winphone,只有极少部分属性表现出细微的差异,整体表现差距不大,所以兼容通常只针对低版本ie 

##### **object.children** *!!!!!*

*返回object所有的子元素节点:只包括子元素节点  获得一个标签节点集合  没有兼容问题,ie上也表现一致(所以就可以常用来获取子节点)  可以通过下标取值 获取的集合是动态的*

```js
console.log(box.children) //HTMLCollection [p]
//可以通过下标取值  可以不需要box.getElementsByTagName的操作  
console.log(box.children[1]) //<h2>我是h2</h2>
```

##### **object.parentNode** *!!!!!*

*返回object父元素节点   没有兼容问题* 

```js
console.log(box.parentNode) // body
```

##### **object.offsetParent** *!!!!!*

*返回object的定位父级节点*  

```html
<body>
	<div>
        <!--注释-->
        <p id="content"><a href="">你好</a></p> absolute
        <h2>我是h2</h2>
    </div>
</body>
<script>
	console.log(content.offsetParent) // body 不给定位父级时 是body  
    //给div 加上相对定位之后 
    console.log(content.offsetParent) // div 标签节点  
</script>
```

##### **nodeName**

*返回节点名称*

```js
 console.log(box.childNodes[0].nodeName) // #text
```

##### **nodeType**

  *返回节点类型*  类型用对应的序号代替  1是元素类型  2是属性类型 3是文本类型 记住1 3就可以了

  ```js
  console.log(box.childNodes[1].nodeType) // 3 
  // 可以用来判断是否是元素接待,以便操作 
  ```

##### **tagName** 

*返回元素节点的名称 (并且还是大写)* 不能返回注释节点和文本节点  

```js
 console.log(box.childNodes[0].tagName) // 文本节点会返回undefined  
```

##### **getAttributeNode() 方法**  

*通过参数属性 获取属性值*  

```js
console.log(box.getAttributeNode("id")) // id="box" 
console.log(box.getAttribute("id")) // "box" 一个是获取属性节点 一个是获取属性值 
```

##### **document.createAttribute("属性名")** (必须通过document创建) 

*创建一个属性节点 创建好之后,存在document里,可以设置给标签* 

```js
let zhuque = document.createAttribute("zhuque") 
```

##### **setAttributeNode("属性节点对象")**  

*设置一个属性节点到标签对象身上* 

```js
box.setAttributeNode(zhuque) //元素上将有一个 zhuque属性
box.setAttribute("queque","123") //设置属性和属性值 尽量不要用来操作合法属性,只添加非法属性


// 重构：浏览器的重构指的是改变每个元素的外观时所触发的浏览器行为，比如颜色、背景等样式发生了改变而进行的重新构造新外观的过程。重构不会引发页面的重新布局，不一定伴随着回流。

// 回流：指的是浏览器为了重新渲染页面的需要而进行的重新计算元素的几何大小和位置，他的开销是非常大的，回流可以理解为渲染树需要重新进行计算，一般最好触发元素的重构，避免元素的回流；比如通过添加class来添加css样式，而不是直接在DOM上设置，当需要操作某一块元素的时候，最好使其脱离文档流，这样就不会引起回流了，比如设置position：absolute或者fixed，或者display：none，等操作结束后在显示。
```

##### **了解即可部分**

- *firstChild* **1**.返回第一个子节点 同childNodes[0]  ie同样是返回第一个子元素节点
- *firstElementChild* **2**.返回第一个元素节点   只兼容主流浏览器
- *lastChild* 同 **1** 一个尿性
- *lastElementChild*  同 **2**一个尿性
- *nextSibling* 同 **1** 返回下一个兄弟节点 
- *nextElementSibling* 同 **2** 返回下一个兄弟元素节点
- *previousSibling* 同 **1** 返回上一个兄弟节点
- *previousELementSibling* 同 **2** 返回上一个兄弟元素节点 

### 创建标签对象

##### **1.创建标签对象  document.createElement("p")**

```js
let p1 = document.createElement("p")
let h = document.createElement("h2")
//创建出来的标签不存在于页面中,只存在于js当中 
```

##### **2.添加标签对象 object.appendChild( )**

```js
box.appendChild(p1) //每添加一次 渲染一次 添加多个 渲染多次
//把创建好的标签对象添加到对应的标签对象内
```

##### **3.创建一个文档片段节点 用于装下需要的标签对象**

```js
//先放到小仓库 再把仓库统一放进标签里面去
let domFrag = document.createDocumentFragment()
domFrag.appendChild(p1)
domFrag.appendChild(h)
box.appendChild(domFrag)

//标签的嵌套
let span1 = document.createElement("span")
p1.appendChild(span1)
domFrag.appendChild(p1)
domFrag.appendChild(h)
```

##### **和直接innerHTML添加的区别**

innerHTML会将对象内的所有节点剪切掉,将字符串文本重新放入进去渲染.这就会导致,原本(**静态获取**)的对象不复存在,需要重新获取

```js
<div id="box">
	<p class="name">11</p>
</div>

let p1 = document.getElementsByClassName("name")[0]
box.innerHTML =`<p class="name">11</p><p>我是新来的</p>` 
p1.onclick = function(){
    alert(123)
} // 此p1非彼p1了

let p2 = document.createElement("p")
p2.innerHTML = "123"
box.appendChild(p2)
p2.onclick = function  () {
    alert(123)
}

// 不需要对添加的或者原本的标签进行操作时,使用innerHTML  
// 如果需要给里面的标签添加事件,则使用appendChild
// 在低版本IE浏览器，如果需要创建一个对象，使用innerHTML 比使用 createElement要好。
// 在主流浏览器里，两者没有多大的区别。
```

### 操作标签节点

- **cloneNode** 复制节点

  接收参数 false 浅复制 只复制此标签节点   true 深复制 包括里面的子节点

  ```js
  let cloneBox = box.cloneNode(true)
  //拿到一个和box一模一样的节点对象
  ```

- **insertBefore** 添加到对应参数子节点的前面

  ```js
  <div id="box">
      <div class='wrap'>wrap</div>
      <div class='wrap'>wrap</div>
      <div class='wrap'>wrap</div>
      <div class='wrap'>wrap</div>
  </div>
  <script>
      let p = document.createElement("p")
  	box.insertBefore(p,box.children[2]) // 将p添加到 box的第三个子元素节点之前
  </script>
  ```

- **removeChild** 删除子节点 由爸爸来做 儿子不能自杀

  ```js
  <div id="box">
      <div class='wrap'>wrap1</div>
      <div class='wrap'>wrap2</div>
      <div class='wrap'>wrap3</div>
      <div class='wrap'>wrap4</div>
  </div>
  <script>
   	box.removeChild(box.children[0]) //第一个子元素节点被删除
  </script>
  ```

- **replaceChild** 更换节点

  ```js
  // box.replaceChild(newChild,oldChild)
  ```


