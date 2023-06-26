# if   switch for

## if / switch判断语句

==>**流程控制**: 决定逻辑运行的走向 , 根据条件决定如何做出反应 

**语法:** 判断条件为真,则走进{ } 中 执行语句 

```js
if(判断条件){
   //执行语句 
} 
```

*判断条件会自动转为布尔值* true 或者 false  如果是数据类型,参考几种会转为false的特殊值  回顾: "" 0 NaN undefined null false 

```js
if(true){//使用其他可以转化为true的值也是一样的
  console.log("条件为真")  
}
```

##### **比较运算符**:

```js
//<小于  >大于 <=小于等于 >=大于等于 ==等等于 ===全等于 != 不等于 !== 全不等   没有不大于 和不小于
let a = 1
if(a > 0){
    console.log("a是正数")
}
```

##### **if...else语句** 条件分支

```js
if(条件一){ //满足条件一则 进入执行语句1 不满足则 进入执行语句2
    //执行语句1
}else{
    //执行语句2
}
```

*[[[[[[*不同年龄段的 就读阶段  小于11 小学  12<=初中<15  15<=高中<=18 18以上 大学*]]]]]]*

```js
//条件 不能   0<a<10  只能用 &&逻辑与 (和的意思)连接起来
let a = 14;
if(a <= 11){
    console.log(`这个娃${a}岁,是个青铜小学生`)
}else if(a >= 12 && a < 15){
    console.log(`这个娃${a}岁,是个荣耀初中生`)
}else if(a >= 15 && a <= 18){
     console.log(`这个娃${a}岁,是个叛逆高中生`)
}else if(a > 18){
    console.log(`这个娃${a}岁,是个颓废大学生或者社会人`)
}
```

if 后只有一条语句时,可不写 { }  直接接在括号后面   不利于维护不推荐使用

```js
if(a > 2)console.log(2);
```

##### **switch**

判断变量相同   case: 语句 break跳出  default 当以上不匹配时,进入     break结束

```js
let a = "雀雀"
switch(a){
    case "阿飞":
       console.log('阿飞是个万人迷');
    	break;
    case "乌拉":
        console.log('乌拉敲级美');
        break;
    case "雀雀":
        console.log('雀雀是最棒的');
        break;
    default:
        console.log('不管是谁,雀雀都是最棒的');
        break;
}
```

##### **三目运算**

使用条件,只有真假两个分支,每个分支仅有一条语句  ① ? ② : ③  ?前面①是判断条件  真留②   假留③

```js
let x = 1
let a;
if(x > 0){
    a = x;
}else{
   a = 0
}
a = x > 0 ? x : 0; //x > 0 是不是真的 走真 则 ?号后面 得到x a = x 走假 则:号后面 得到 0 a = 0
x > 0 ? a = x : a = 0; // 下面也可
```

## for循环--迭代器

```js
let aItem = document.getElementsByClassName("item");
aItem[0].onclick = function () { alert("点击")}
aItem[1].onclick = function () { alert("点击")}
```

重复且繁琐的事情,我们可以交给迭代器来做, for迭代器 

*迭代*: 每一次对过程的重复称为一次 迭代，而每一次迭代得到的结果会作为下一次迭代的初始值 , 把重复事情简单化( ok 然后你们觉得并不简单 - - 蓝瘦) 

##### **语法**:

```js
for(var i = 0; i < 10; i++){
    aItem[i].onclick = function () { alert("点击")}
}
```

! =>for ( ) 三条语句 第一条是 **义语句** : 循环的变量声明和初始化 : 决定使用的变量 和他的初始值, 第二条是**判断语句**,条件查询  决定循环的次数 结束条件  第三条是**变化语句 **循环变量的递增或递减,决定变量的变化     语句之间用 ; 分号隔开

在for循环中，循环的变量声明和初始化，条件查询和循环变量的递增或递减都可以在相同的行中完成。它增加了可读性，降低了出错的几率

大部分是写在for内部,如果想不开,也有写在外面的 如: ( 没有错 但是不必要) 分号不能少

```js
var i = 0
for(; i < 10;){
    console.log(i )
    i++ //放所有语句的后面
}
```

##### **运作规律**:

```js
for(①; ②; ③){④}
执行顺序: 1 => 2 => 4 =>" 3 => 2 => 4 " =>" 3 =>2 => 4" =>
```

当 2 始终正确时,就会陷入无限循环  如果死循环了 程满了 就会卡死 没法刷新和关闭

##### **break / continue**

break强制退出本次以及后续循环体 , 后面的循环不再执行 , continue跳出本次循环体 , 进入下一次

```js
for(var i = 0; i < 10;i++ ){
    //if(i === 2)break //跳出本次所有的循环,后面也不再执行
    //if(i === 2)continue//跳出本次 i=2 的循环,后面继续执行
    console.log( i )
}
```

##### **嵌套for循环**

外层for进去一次,把内层循环体全部运行完毕之后,再进去第二次  

```js
for(var i = 0; i < 5; i++){
    for(var j = 0 ; j < 4; j++){
        console.log(`第${i}行第${j}个`)
    }
}
```

##### **label** 给for : 标记一个名字 可以跳出循环时使用

```js
l1: for(var i = 0; i < 5; i++){
     l2: for(var j = 0 ; j < 4; j++){
     		if(j === 2)break l1; //只会运行 00 01 
        	console.log(`第${i}行第${j}个`)
    	}
	}
```

##### **关于性能**

当不清楚 i 的具体次数时,类似像,给元素注册事件等,可以把限制条件改成集合长度

let i = 0; i < aItem.length;i++ 

**性能的优化**

```js
let len = aItem.length
for(let i = 0; i < len; i++){
    aItem[i].onclick = function () { alert("点击")}
}
```

##### **倒序遍历**

```js
for(let i = 10; i >= 0; i--){
    console.log(i)// 10 9 8 7 6 5 4 3 2 1 0
}
```





