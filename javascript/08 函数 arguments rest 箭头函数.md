##### **arguments** 不定参   

函数里面存在, es5之前的产物 只在函数作用域内存在的类数组对象.

arguments会接收函数所有传进来的实参,收录到一起, 类数组,长得和数组一样,却又没有正统数组的那些方法.但是一样有length 一样可以通过下标取值. 

```js
function zq(){
    console.log(arguments.length)//接收到的实参个数
    for(let i = 0 ; i < arguments.length; i++){
        console.log(arguments[i])
    }
}
zq(1,2,3,4,"美丽","你好")   

arguments.callee() //调用函数本身 不使用 
```

##### **rest 参数 es6出炉 更好用 **

```js
function fn(name, ...rest){//名字随意 ...a
    console.log(rest) //接收的是剩余的实参,一个数组对象
    	//...是rest写法 是吧rest这个数组里面的参数一个一个拿出来的操作   rest只能放在形参的最后面 
}
fn("朱雀","美丽","你好") 
```

**区别** : arguments 拿到全部参数  rest拿到剩余参数  前者是类数组 后者是数组  

**形参的赋值** 当未接收到实参时,赋值给默认值  默认赋值的形参放到最后

```js
function fn1(name,age = 18){
    console.log(`${name}今年${age}岁`)
}
fn1("雀雀")//雀雀今年18岁 
```

##### **箭头函数 es6 出炉** 挺方便的

当函数里面直接需要return值的时候 ,可以使用箭头函数,函数的简便写法

声明箭头函数只能通过函数表达式

```js
let fn = (n) => n + 1
console.log(fn(2))//输出 3
```

1.关于形参,不需要形参可以不写,不写的时候,括号必须写

```js
let fn1 = () => 2
```

2.只有一个形参的时候 可以删掉括号

```js
let fn = n => n + 1
```

3.多个形参不能省略括号

4.箭头函数不止需要return还需要进行逻辑操作时,使用 { } 

```js
let fn2 = (n) =>{
    console.log(n)
    return n
}
```

5,使用了{ } 还需要return依旧需要手动写上

6.箭头函数里的this是固化的,或者说压根没有this  如若使用,则指向使用外层的this,如果外层没有,则指向顶层对象

```js
box.onclick = function(){
    let fn = () => {
        console.log(this) //指向box
    }
    fn()
}
```

7,箭头函数里没有arguments 可使用...rest代替


