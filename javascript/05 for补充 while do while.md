##### **for循环内 var i** 

```js
 for(var i = 0; i < 10;i++ ){
   aItem[i].onclick = function(){
       alert(i)//每次点击 都输出 10   全局变量的重新赋值
   }
 }
 解决方案 : 存序号
 for(var i = 0; i < 10;i++ ){
   aItem[i].num = i;//存下当前的序号 存在对象的index属性上
   aItem[i].onclick = function(){
       alert(this.num)//this指向当前调用函数的对象=>aItem[i]
       aItem[this.num].style.fontSize = "20px"
   }
 }


 彻底解决方案 : 用let 声明  块作用域保护变量
 for(let i = 0; i < 10;i++ ){
   aItem[i].onclick = function(){
       alert(i)
       aItem[i].style.fontSize = "20px"
   }
 }
```

  

##### 批量生成 盒子 可用console.time测试

```js
console.time(1)
//把for循环代码放进来
console.timeEnd(1) //输出时间 

let oWrap = document.getElementById("wrap")
let oContent = document.getElementById("content")
	oWrap.onclick = function(){
        for(let i = 0;i < 10; i++ ){
            oContent.innerHTML += `<p>${i}</p>`
        }
	}
    
// 为了页面少渲染 可以先用一个变量全部存起来,循环完毕之后,塞进content里面
let oWrap = document.getElementById("wrap")
let oContent = document.getElementById("content")
let str = "";
	oWrap.onclick = function(){
        for(let i = 0;i < 10; i++ ){
            str += `<p>${i}</p>`
        }
         oContent.innerHTML = str;
	}
```

##### **while**     **do while**

```js
//基本循环: 声明在外面 条件在括号内,变量的变化(步幅在代码块内) 
let i = 0;
while(i < 5){
    console.log(i)
    i++;
}
//do while  管你符不符合条件 上来先做一次 再进入判断
let j = 0;
do{
   console.log(j) 
   j++;
}while(j < 5);
```

