- **小案例 1  obj.a ( ) 输出this 与 f ( ) 输出this**

  ```js
  function fn(){
              console.log(this);
          }
  let obj = {
      a:fn //函数的地址
  }
  let f = obj.a;//函数的地址赋值给f f保存的是函数的地址 和object没有关系了
  obj.a();// 输出obj3 先找obj3的地址 再找a属性 再执行
  f()// 输出window   
  
  //一个是在obj下面 借东西 (还是依赖于obj 所有权还是obj得)  一个是在obj下面买东西(买掉所有权 和obj无关了)
  ```

- **小案例2 面试题 关于argument的指向** 

  ```js
  function fn(){
              console.log(this);
          }
  let obj = {
      a:fn //函数的地址
  }
  function fn1(e){
      e()//指向window 等同于e = obj3.a //类似于上面的f = obj
      arguments[0]()//指向arguments 只能使用[]  类似于arg = [0:fn地址]
   }
   fn1(obj3.a) // window  arguments
  ```

  ### 改变this指向

  - **this指向调用函数地址的对象,并且,谁近指谁** /也就是事件源

    ```js
    let arr = [1,2]
    function fn () {
    	console.log(this) 
    }
    document.onclick = fn //点击指向document
    ```

    ```js
     let obj = {
                name : "zhuque",
                fn : function(){
                    console.log(this);
                },
                dudu : {
                    name : "dd",
                    fn : function(){
                        let num = 10;
                        console.log(this);
                    }
                }
            };  
            obj.fn(); //this =>obj这个对象
            obj.dudu.fn(); //this => dudu这个对象
                
    ```

#### **改变 this 指向**

- 三种方式 call apply bind  前两种会主动执行 后一种不会主动执行

  ##### **call** 

     		1.改变函数的this指向,还会马上执行函数

  ​                2.第一个参数是你想改变的this指向的对象

  ​                3.后面的其它参数就是该函数的实参

  ```js
  let obj = {
      name: "queque"
      fn : function(a, b){
          console.log(this, a, b)
      }
  }
  let obj1 = {
      name: "zhuzhu"
  }
  obj.fn() //this指向 obj undefined undefined
  obj.fn.call(obj1,1,2) //指向obj1 
  ```

  ##### **apply**  

  ​		1.改变函数的this指向,还会马上执行函数

  ​                2.第一个参数是你想改变的this指向的对象

  ​                3.后面的其它参数就是该函数的实参 必须是*数组*  实参用数组包裹

  ```js
  let obj = {
      name: "queque"
      fn : function(a, b){
          console.log(this, a, b)
      }
  }
  let obj1 = {
      name: "zhuzhu"
  }
  obj.fn.apply(obj1,[1,2]) //指向obj1 
  ```

  ##### **bind**  

  ​		1.改变函数的this指向, *不会马上执行函数*

  ​		2.第一个参数是你想改变的this指向的对象

  ​		3.后面的其它参数就是该函数的实参

  ```js
  let obj = {
      name: "queque"
      fn : function(a, b){
          console.log(this, a, b)
      }
  }
  let obj1 = {
      name: "zhuzhu"
  }
  obj.fn.bind(obj1,1,2)() //指向obj1   主动执行需要加括号 
  // 也可以 obj.fn.bind(obj1)(1,2) 实参写后面 
  ```

  bind不兼容 ie8 及其以下

  ```js
  /*我们需要模拟的是bind 
      bind可以加括号  那么他是一个方法
      我们模拟的流程是
      function fn(){
          console(this,a,b)
      }
      fn.bind(arr,1,2)
      我们可以使用 的内容是 apply 或者call  需要修改的this对象 以及参数
      bind方法的this指向是当前调用的fn本人
      以及fn的传入的参数 
  	
      1,判断是否兼容 不兼容则使用兼容代码
      bind这些方法是属于function内建函数小仓库的方法 ,小仓库 为prototype 只需要查看 最顶层的function爸爸小仓库是否存在此方法就可以判断是否兼容
      */
  	if(!Function.prototype.bind){
          Function.prototype.bind = function(value){
              //value 为bind后()第一个参数 为将要修改的this指向 可传入apply或者call方法中
              //后面的参数 可用不定参接受  因为是ie8 不考虑rest
              
              //由于bind加()不立即执行 在加一个括号才执行 所以有返回函数
              var nowFn = this //留下 fn 
              var arg = [].slice.call(arguments,1)
              //slice实际上方法内部是切的这个方法的this 也就是[],只要改变slice方法里面的this 就可以达到切arguments 的目的. 而且会返回一个真正的数组,是slice干的活.由于arguments结构和数字一模一样,所以切出来也不会有问题
              return function (){
                  nowFn.apply(value,arg)
              }
          }
      }
      var arr = [1,2]
      var fn = function(a,b){
          console.log(this,a,b)
      }
      fn.bind(arr,1,2)() //arr 1,2
  ```



