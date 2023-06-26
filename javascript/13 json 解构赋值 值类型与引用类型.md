#  json   值类型和引用类型   解构赋值

### json

##### *实例对象目的 :* 

保留数据, 用于后期获取数据, 传递数据 存储在 { } 内 键值对的形式存储

与数组相比,优点: 数据可通过属性名/键名反应出来 特性与作用

##### *json* : javascript object notation   js对象表示法 

```js
json  => "{\"name\": \"zhuque\"}" 需要转义 并且 不能是单引号
//在其它语言中，双引号引起来的都为字符串，但是单引号的是不一定的。
//如果只作用于前端，那么是单引号或双引号都可以。
```

```js
//1.属性名突出属性值的用途,含义
//2.每个键值对之间使用逗号分隔开,最后一条数据可加可不加
//3.使用属性  . 或者 [ ] 获取属性值 
//4.属性值可以为任意值 (属性名和属性值的对应, 后面还有值和值的对应)
//5.属性名都是字符串形式,不用追究是否声明等,但是值,使用非类型值必须声明
```

##### *添加属性*

```js
let obj = {
    name:"zhuque",
}
obj.age = 18;
console.log(obj)
//如果原来具有age属性,则会覆盖原来的值
```

##### **序列化和反序列化 ( 对象到json转化 ) **

```js
//序列化 
let obj = {
    name:"zhuque",
}
let strJ = JSON.stringify(obj)
console.log(strJ) // typeof strJ  =>string
  
//反序列化 
let obj1 = JSON.parse(strJ)
console.log(obj1)  // typeof obj1  =>object

/ /数组也可以序列化 ,但是 很少使用  函数会转为 null
```

##### *对象的复制*

```js
let obj2 = JSON.parse(JSON.stringify(str))
console.log(obj2)
```

##### *判断对象内是否存在某属性*

```js
let obj = {
    name:"zhuque",
    age:""
}
console("name" in obj)//true

//不能用这种方法判断
if(obj.age){ //防止 值为 所有false的情况
    console.log("存在")
}else{
    console.log("不存在")
}
```

##### *删除对象属性* 

```js
delete obj.name;
console.log(obj)
```

es6 键值和键名一样时,可以缩写

```js
let name = "zhuque"
let obj = {
    name:name,
    zhuque :function zhuque(){}
}
```



### 解构赋值

**解构赋值**:es6中,允许按照一定得模式,从对象或者数组里面提取值得方法,对变量进行赋值.

*加载第三方模块的时候,可能会用下解构赋值  ( 用的不多 )*

```js
let [a,b,c] = [1,2,3]
console.log(a,b,c) //1 2 3 
let {aa: n, bb: p, cc: s} = {aa: 1, bb: 2, cc: 3}
console.log(n,p,s)//1 2 3
let {a, b, c} = {a:1, b:2, c:3}
console.log(a, b, c)//123
```

*小应用*  直接调用对象某方法

```javascript
// Math 内建对象 提供了一些 数学上面的方法 
//比如每次使用 Math 都需要在庞大的对象上获取一个方法,如果这个方法能单独调用就好了 
const {PI} = Math 
const PI = Math.PI //效果也一样
```

*小应用2* 函数返回 解构赋值

```js
//函数中的return只会return最后一个值 
function fn(){
    return 1,2,3 // 只会返回c
    return [1,2,3]
}
let [a,b,c] = fn() // 就可以立即使用数组内的值 不需要循环获取
```

*小应用3* 传参解构赋值

```js
function add([x=0,y=0]){
    return x+y;
}//数组前两项的和
add([1,2,3,5,7]) //3
```

*多维数组的解构赋值*  只要保证遵循该对象的模式就行

```js
let [a,b,[c]] = [1,2,[3]]
console.log(a, b, c) // 1 2 3
```

### 值类型与引用类型

**值类型:** 字符串, 数值 ,null, undefined.boolean symbol

​	1.占用空间固定,保存在栈中,当一个方法执行时，每个方法都会建立自己的内存栈，在这个方法内定义的变量将会逐个放入这块栈内存里，随着方法的执行结束，这个方法的内存栈也将自然销毁了。因此，所有在方法中定义的变量都是放在栈内存中的；栈中存储的是基础变量以及一些对象的引用变量，`基础变量的值是存储在栈中`，而引用变量存储在栈中的是`指向堆中的数组或者对象的地址`

​	2.保存与复制的是值本身

​	3.使用typeof检测数据的类型

​	3.基本类型数据都是值类型

**引用类型**: 对象 => 函数 数组 实例对象 

​	1.占用空间不固定，保存在堆中（当我们在程序中创建一个对象时，这个对象将被保存到运行时数据区中，以便反复利用（因为对象的创建成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随方法的结束而销毁，即使方法结束后，这个对象还可能被另一个引用变量所引用（方法的参数传递时很常见），则这个对象`依然不会被销毁`，只有当一个对象没有任何引用变量引用它时，系统的垃圾回收机制才会在核实的时候回收它。）(解决方案是 使用完成后,将对象指针指向 null )

​	2,保存与复制的是 指向对象的一个指针

​	3.使用 instanceof 检测数据的类型

```JS
console.log(obj instanceof Object) // true
console.log(arr instanceof Array) // true
```

​	4.使用new()方法构造出的对象是引用型

声明变量时: 字面量 / 直接量 和使用new表达式  常用 字面量 

```js
let str = "我爱你" //字面量  一眼直接能看出声明的内容和类型
let str1 = new String("我爱你") //通过构造函数创建的对象 是引用型
console.log(str == str1) //true 值相等 
console.log(str === str1) //false 不全等
console.log(typeof str1) //object

let arr = [1,2,3]//字面量
let arr1 = new Array(1,2,"我")
console.log(arr1) // [1,2,"我"]

//数值
let num = new Number(1)
//布尔值
let boo = new Boolean(true)

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let obj = new Object({name:1}) //object是大boss 
// 传参时 会识别参数的类型,并返回对应引用类型 
// 不传参则是空数组

```

*引用型数据 比较的是 存于堆中的 IP地址* 

​	所有指向IP的指针的变量,通过其中一个修改IP内的数据,牵一发而动全身,所有指向他的指针都会发生变化. 

```js
let arr = [1,2,3]
let arr1 = arr //复制的是地址
arr1.splice(0,1)//改变原数组 那么该指针指向的地址的数据发生变化以后,所有指向这个地址的指针变量全部都会被改变 
console.log(arr) [2,3]
```

*值类型数据 只比较值 和数据类型*  