# 04运算符 自定义, 自定义标签属性

## 运算符

##### **算术运算符**  *运算符前后空格隔开*

```js
+ // 区别算术运算符 + 和字符串拼接符 + 加号两边只要有一边是字符串,则为字符串拼接符
- // 减号两边如果有字符串,会将字符串隐式转化为数值,如果字符串内非数字,则返回NaN
*  // 同上
/  //同上
** //指数运算 2**3 2的3次方 前一个叫底数,第二个叫指数,可以为负数
```

```js
% // 模  取余  大模小取余 小模大取小
//小案例 随机颜色 
let arr = ["red","pink","skyblue","yellow"]
let str = ""
	for (let i = 0; i < 20; i++) {
		str += `<span style="background:${arr[i%4]};">${i}</span>`
        // 4可以由arr.length 替代
		}
	box.innerHTML = str
```

##### **赋值运算符**

```js
= // 等号赋值先看右边,将右边的最终得值 赋予给左边
+= // x = x + y => x += y  同一个变量,原来的值 + 一个值 赋予给新的自己 
-= //  x = x - y => x -= y 同一个变量,原来的值 - 一个值 赋予给新的自己 
%= //  x = x % y  => x %= y  
/= // x = x / y => x /= y
*= // x = x * y => x *= y
++ // x = x + 1 => x++ 
-- // x = x - 1 => x-- 
```

```js
//前置 ++ 和后置++的区别 // -- 一样
日常使用中没啥区别 ,有些情况下,有点区别 如 赋值的时候
前置 ++ 先运算 再赋值  后置 ++ 先赋值后运算   如下
let a = 1
let c = a++ 
console.log(a, c)//2 1  
let b = 1;
let d = ++b
console.log(b, d)//2 2  

console.log((++a)+(a++)+(++a));//2 + 2 + 4 = 8  
一:++赋值2 参与运算 二:取值2参与运算 背后赋值成3  三:++并赋值为4 4参与运算
```

##### **比较运算符**

```js
>  <  >=  <=   ==  ===  !=  !==
//全等 和 等等于的区别 , 全等需要类型一致 一般使用全等于
3 == "3" true
3 === "3" false
// 引用类型比较的不是值一样否 而是地址是否一样
let arr1 = [1]
let arr2 = [1]
console.log(arr1 == arr2) //false 
```

##### **逻辑运算符**

```js
//逻辑与
&&  //遇到真通过 遇到假停下来并返回值  作为判断条件时,可以作为两个都要满足才可通过   都是真则返回最后一个
  	c = true && false //c = false   全为true则返回true   中间有false就返回 false 

//逻辑或
||  //遇到假通过 遇到真停下来并返回值  作为判断条件时,可以作为两个只要满足其一就通过  都是假则返回最后一个
    c = true || false //c = true   一方为true都可以   只要有true就ok 

//逻辑非 取反 会把值转为布尔值
!  强制转为对应布尔值 应该是 !![1] :true
//运算符优先级 先非再与再或 (百度一波运算符优先级)
let zq = "" && [1] || null || function(){alert("先与后或")}; //zq = fun
```

- **简单算法**

  第一题: *一张纸1mm  对折多少次可以达到珠穆朗玛峰的高度 8848m*

```js
let a = 1;
let b = 8848*1000;//转换单位 保持单位一致 毫米
let i = 0;
while (true) {
    i++;// i记录 折叠次数
    a *= 2; //每折叠一次, 高度翻倍
    if(a > b){//判断 高度是否达到 
        console.log(i);
        console.log(a);
        break //完成即可跳出 否则无限循环
    }
}
```

## 自定义属性

属性是对象附属的东西,对象下面都有他们相对应的属性.合法的对象属性 : 系统自带的对象属性, 非法的对象属性,是人为自定义的.

##### **自定义标签属性** // 标签内部的属性

```html
<div id="wrap" box="123"></div>
<script>
	wrap.zhuque = "123" //并不能成为标签内的属性 而是这个对象下的属性  
//给标签设置的自定义属性因为环境不同,所以在审查元素中不存在 但是在js环境中存在
	console.log(wrap.box) // 搜索js内对象下的属性 访问不到标签内部
</script>
```

对象.属性的操作只会搜索js内对象下的属性,而不能进入标签内查询

因此需要操作自定义标签属性及标签属性,需要如下操作:

​	1.*setAttribute 设置自定义标签属性*

```js
wrap.setAttribute("zhuque","123")//前一个是要设置的属性名 后一个是属性值
```

​	2.*getAttribute 获取标签属性*

```js
let value = wrap.getAttribute("zhuque")//可以访问合法标签属性
console.log(value) // 123
```

​	3.*removeAttribute  移除标签属性* 

```js
wrap.removeAttribute("zhuque")//可以移除合法标签属性
```

虽然以上能修改合法属性,但是不需要这样使用,合法的标签属性可以直接通过对象 . 属性操作

在html5中规定 自定义标签属性 需要以data-  开头  data- key = value   key会自动转为小写.  

##### **自定义属性**

基础类型的对象不能设置自定义属性 ==>和包装对象相关

复杂类型可以设置自定义属性==>函数 JSON 数组等等 

自定义属性不需要声明,挂载到对象身上,有了归属,则可以被识别.可以把对象.属性视为一个特殊的变量,一个只为这个对象服务的变量,别人不能操作.

自定义属性主要用来 , 存值 , 或者标记我们需要的信息 ,因为附属在单个的对象下,所以很方便用来记录这个对象的状态,我们就可以通过这个状态来决定下一步的操作.

*小案例*

```js
let box = document.getElementsByClassName("box")
for (let i = 0; i < box.length; i++) {
    box[i].index = true //记录当前每个div的状态 如果是true点击变红 如果是false 点击变粉
    box[i].onclick = function  () {
        if(this.index){
        	box[i].style.backgroundColor = "red"
        }else{
        	box[i].style.backgroundColor = "pink"
        }
        this.index = !this.index //每次点击完之后,取反
    }
}
```

**区别**

 寄存在js环境下 人为定义的为自定义属性
​        写在标签里面 人为写的属性 叫自定义标签属性
​        自定义标签属性不能直接通过 . 访问
​        默认找自定义属性,而不找自定义标签属性 因为js和html标签是相互独立的. 
​        要想操控标签,必须借助DOM提供的API

##### **classList** 操作class属性值 不兼容低版本 ie

```js
box[0].classList.add("zhuque")//添加一个类名,如果有,则不添加
box[0].classList.remove("zhuque")//移除一个类名,如果没有, 也不报错
box[0].classList.toggle("zhuque",)//有则删 无则加
box[0].classList.toggle("zhuque", true)//当有第二个参数时 第二个参数转化为布尔值 true则加 false则删除
box[0].classList.replace("old","new") //替换  new 替换 old
box[0].classList.contains("zhuque") //判断对象是否存在此类名  返回布尔值
```

运用toggle来达到开关的效果 方法即函数  内部已经进行了细分

```js
special{background:red;}
let box = document.getElementsByClassName("box")
for (let i = 0; i < box.length; i++) {
    box[i].onclick = function  () {
        box[i].classList.toggle("special")
    }
}
```



