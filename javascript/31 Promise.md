# Promise

## 概念

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

所`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

### 特点

1. 对象的状态不受外界影响。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

### 状态

`Promise`对象代表一个异步操作，有三种状态：

`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。

只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

### 缺点

1. 无法取消`Promise`，一旦新建它就会立即执行，无法中途取消 。
2. 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部 。
3. 当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

> 注意，为了行文方便，本章后面的 **resolved** 统一只指 **fulfilled** 状态，不包含 **rejected** 状态。

## 用法 

写js必然不会对异步事件陌生。

```js
settimeout(()=>{
  console.log("123")
},0)

console.log("abc")
//先输出谁？
```

如果abc需要在123执行结束后再输出怎么办？

当然，可以使用callback，但是callback使用起来是一件很让人绝望的事情。

> 这时：Promise这个为异步编程而生的对象站了出来....

```js
let p = new Promise((resolve,reject)=>{
  //一些异步操作
  settimeout(()=>{
    console.log("123")
    resolve("abc");
  },0)
})
.then(function(data){
  //resolve状态
  console.log(data)
}).then(function(data){
  //resolve状态
  console.log(data)
})
//'123'
//'abc'
```

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

也就是说，状态由实例化时的参数（函数）执行来决定的，根据不同的状态，看看需要走then的第一个参数还是第二个。

**resolve()和reject()的参数会传递到对应的回调函数的data或err**

> then返回的是一个新的Promise实例，也就是说可以继续then

## 链式操作的用法

所以，从表面上看，Promise只是能够简化层层回调的写法，而实质上，Promise的精髓是“状态”，用维护状态、传递状态的方式来使得回调函数能够及时调用，它比传递callback函数要简单、灵活的多。所以使用Promise的正确场景是这样的：

```js
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return runAsync3();
})
.then(function(data){
    console.log(data);
});
//异步任务1执行完成
//随便什么数据1
//异步任务2执行完成
//随便什么数据2
//异步任务3执行完成
//随便什么数据3
```

runAsync1、runAsync2、runAsync3长这样↓

```js
function runAsync1(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;            
}
function runAsync2(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    return p;            
}
function runAsync3(){
    var p = new Promise(function(resolve, reject){
        //做一些异步操作
        setTimeout(function(){
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;
}
```

在then方法中，你也可以直接return数据而不是Promise对象，在后面的then中也可以接收到数据：

```js
runAsync1()
.then(function(data){
    console.log(data);
    return runAsync2();
})
.then(function(data){
    console.log(data);
    return '直接返回数据';  //这里直接返回数据
})
.then(function(data){
    console.log(data);
});
//异步任务1执行完成
//随便什么数据1
//异步任务2执行完成
//随便什么数据2
//直接返回数据
```

**reject的用法**

前面的例子都是只有“执行成功”的回调，还没有“失败”的情况，reject的作用就是把Promise的状态置为rejected，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。

```js
let num = 10;
let p1 = function() {
   	return new Promise((resolve,reject)=>{
      if (num <= 5) {
        resolve("<=5，走resolce")
        console.log('resolce不能结束Promise')
      }else{
        reject(">5，走reject")
        console.log('reject不能结束Promise')
      }
    }) 
}

p1()
  .then(function(data){
    console.log(data)
  },function(err){
    console.log(err)
  })
//reject不能结束Promise
//>5，走reject
```

resolve和reject永远会在当前环境的最后执行，所以后面的同步代码会先执行。

如果resolve和reject之后还有代码需要执行，最好放在then里。

然后在resolve和reject前面写上return。

## Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

```js
p1()
  .then(function(data){
    console.log(data)
  })
  .catch(function(err){
  	console.log(err)
  })
//reject不能结束Promise
//>5，走reject 	
```

## Promise.all( ) 

`Promise.all`方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.all([p1, p2, p3]);
```

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

1. 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`。 此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。
2. 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

`promises`是包含 3 个 Promise 实例的数组，只有这 3 个实例的状态都变成`fulfilled`，或者其中有一个变为`rejected`，才会调用`Promise.all`方法后面的回调函数。

如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法，如果没有参数没有定义自己的catch，就会调用`Promise.all()`的`catch`方法。

## Promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```js
const p = Promise.race([p1, p2, p3]);
```

上面代码中，只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。



## Promise.resolve()

有时需要将现有对象转为 Promise 对象，`Promise.resolve`方法就起到这个作用。

```js
const jsPromise = Promise.resolve('123');

```

上面代码将123转为一个 Promise 对象。

`Promise.resolve`等价于下面的写法。

```js
Promise.resolve('123')
// 等价于
new Promise(resolve => resolve('123'))
```

`Promise.resolve`方法的参数分成四种情况。

1. **参数是一个 Promise 实例**

   如果参数是 Promise 实例，那么`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

2. **参数是一个thenable对象**

   `thenable`对象指的是具有`then`方法的对象，比如下面这个对象。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   ```

   `Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法。

   ```js
   let thenable = {
     then: function(resolve, reject) {
       resolve(42);
     }
   };
   
   let p1 = Promise.resolve(thenable);
   p1.then(function(value) {
     console.log(value);  // 42
   });
   
   ```

   上面代码中，`thenable`对象的`then`方法执行后，对象`p1`的状态就变为`resolved`，从而立即执行最后那个`then`方法指定的回调函数，输出 42。

3. **参数不是具有then方法的对象，或根本就不是对象**

   如果参数是一个原始值，或者是一个不具有`then`方法的对象，则`Promise.resolve`方法返回一个新的 Promise 对象，状态为`resolved`。

   ```js
   const p = Promise.resolve('Hello');
   
   p.then(function (s){
     console.log(s)
   });
   // Hello
   
   ```

   上面代码生成一个新的 Promise 对象的实例`p`。由于字符串`Hello`不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是`resolved`，所以回调函数会立即执行。`Promise.resolve`方法的参数，会同时传给回调函数。

4. **不带有任何参数**

   `Promise.resolve`方法允许调用时不带参数，直接返回一个`resolved`状态的 Promise 对象。

   所以，如果希望得到一个 Promise 对象，比较方便的方法就是直接调用`Promise.resolve`方法。

   ```js
   const p = Promise.resolve();
   
   p.then(function () {
     // ...
   });
   
   
   ```

   上面代码的变量`p`就是一个 Promise 对象。

   需要注意的是，立即`resolve`的 Promise 对象，是在本轮“事件循环”（event loop）的结束时，而不是在下一轮“事件循环”的开始时。

   ```js
   setTimeout(function () {
     console.log('three');
   }, 0);
   
   Promise.resolve().then(function () {
     console.log('two');
   });
   
   console.log('one');
   
   // one
   // two
   // three
   
   ```

   上面代码中，`setTimeout(fn, 0)`在下一轮“事件循环”开始时执行，`Promise.resolve()`在本轮“事件循环”结束时执行，`console.log('one')`则是立即执行，因此最先输出。

   ## Promise.reject()

   `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

   ```js
   const p = Promise.reject('出错了');
   // 等同于
   const p = new Promise((resolve, reject) => reject('出错了'))
   
   p.then(null, function (s) {
     console.log(s)
   });
   // 出错了
   
   ```

   上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

   注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

   ```js
   const thenable = {
     then(resolve, reject) {
       reject('出错了');
     }
   };
   
   Promise.reject(thenable)
   .catch(e => {
     console.log(e === thenable)
   })
   // true
   
   ```

   上面代码中，`Promise.reject`方法的参数是一个`thenable`对象，执行以后，后面`catch`方法的参数不是`reject`抛出的“出错了”这个字符串，而是`thenable`对象。

# Generator

## 简介

### 基本概念

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。

**跟普通函数的区别**

1. `function`关键字与函数名之间有一个星号；
2. 函数体内部使用`yield`表达式，定义不同的内部状态。
3. Generator函数不能跟new一起使用，会报错。

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}

var hw = helloWorldGenerator();
```

上面代码定义了一个 Generator 函数`helloWorldGenerator`，它内部有两个`yield`表达式（`hello`和`world`），即该函数有三个状态：hello，world 和 return 语句（结束执行）。

调用 Generator 函数后，该函数并不执行，返回的也不是函数运行结果，而是一个指向内部状态的指针对象，也就是上一章介绍的遍历器对象。

下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态。也就是说，每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句）为止。换言之，Generator 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

> ES6 没有规定，`function`关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

```js
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```

------

### yield 表达式

由于 Generator 函数返回的遍历器对象，只有调用`next`方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield`表达式就是暂停标志。

遍历器对象的`next`方法的运行逻辑如下。

（1）遇到`yield`表达式，就暂停执行后面的操作，并将紧跟在`yield`后面的那个表达式的值，作为返回的对象的`value`属性值。

（2）下一次调用`next`方法时，再继续往下执行，直到遇到下一个`yield`表达式。

（3）如果没有再遇到新的`yield`表达式，就一直运行到函数结束，直到`return`语句为止，并将`return`语句后面的表达式的值，作为返回的对象的`value`属性值。

（4）如果该函数没有`return`语句，则返回的对象的`value`属性值为`undefined`。

**`yield`表达式与`return`语句既有相似之处**

都能返回紧跟在语句后面的那个表达式的值。

**不同之处**

每次遇到`yield`，函数暂停执行，下一次再从该位置继续向后执行，而`return`语句不具备位置记忆的功能。一个函数里面，只能执行一次（或者说一个）`return`语句，但是可以执行多次（或者说多个）`yield`表达式。正常函数只能返回一个值，因为只能执行一次`return`；Generator 函数可以返回一系列的值，因为可以有任意多个`yield`。

**注意：**

`yield`表达式只能用在 Generator 函数里面，用在其他地方都会报错。

另外，`yield`表达式如果用在另一个表达式之中，必须放在圆括号里面。

```js
console.log('Hello' + yield 123); // SyntaxError
console.log('Hello' + (yield 123)); // OK
```

### 与 Iterator 接口的关系 

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的`Symbol.iterator`属性，从而使得该对象具有 Iterator 接口。

```js
Object.prototype[Symbol.iterator] = function* (){
  for(let i in this){
    yield this[i];
  }
}
//--------------
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

```

## next 方法的参数

`yield`表达式本身没有返回值，或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值。

```js
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

这个功能有很重要的语法意义。

Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过`next`方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

## for...of 循环

`for...of`循环可以自动遍历 Generator 函数时生成的`Iterator`对象，且此时不再需要调用`next`方法。

```js
function *foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

// 求 与上一次运算结果之和

```js

function* fibonacci() {
  let [prev, curr] = [1, 1];
  while(true){
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

for (let n of fibonacci()) {
  if (n > 10000000) break;
  console.log(n);
}

```



## Generator.prototype.return()

Generator 函数返回的遍历器对象，还有一个`return`方法，可以返回给定的值，并且终结遍历 Generator 函数。

```js
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }
```

## yield* 

如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的。

```js
function* foo() {
  yield 'a';
  yield 'b';
}

function* bar() {
  yield 'x';
  foo();
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "y"
```

`foo`和`bar`都是 Generator 函数，在`bar`里面调用`foo`，是不会有效果的。

这个就需要用到`yield*` 表达式，用来在一个 Generator 函数里面执行另一个 Generator 函数。

```js
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}

// 等同于
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}

for (let v of bar()){
  console.log(v);
}
// "x"
// "a"
// "b"
// "y"
```

再来看一个对比的例子。

```js
function* inner() {
  yield 'hello!';
}

function* outer1() {
  yield 'open';
  yield inner();
  yield 'close';
}

var gen = outer1()
gen.next().value // "open"
gen.next().value // 返回一个遍历器对象
gen.next().value // "close"

function* outer2() {
  yield 'open'
  yield* inner()
  yield 'close'
}

var gen = outer2()
gen.next().value // "open"
gen.next().value // "hello!"
gen.next().value // "close"

```

上面例子中，`outer2`使用了`yield*`，`outer1`没使用。结果就是，`outer1`返回一个遍历器对象，`outer2`返回该遍历器对象的内部值。

从语法角度看，如果`yield`表达式后面跟的是一个遍历器对象，需要在`yield`表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为`yield*`表达式。

## 作为对象属性的 Generator 函数

如果一个对象的属性是 Generator 函数，可以简写成下面的形式。

```js
let obj = {
  * myGeneratorMethod() {
    ···
  }
};
```



# async 函数

## 含义

ES2017 标准引入了 async 函数，使得异步操作变得更加方便。

async 函数是 Generator 函数的语法糖。

> 什么是语法糖？
>
> 意指那些没有给计算机语言添加新功能，而只是对人类来说更“甜蜜”的语法。语法糖往往给程序员提供了更实用的编码方式，有益于更好的编码风格，更易读。不过其并没有给语言添加什么新东西。
>
> 反向还有语法盐：
>
> 主要目的是通过反人类的语法，让你更痛苦的写代码，虽然同样能达到避免代码书写错误的效果，但是编程效率很低，毕竟提高了语法学习门槛，让人齁到忧伤。。。

`async`函数使用时就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已。

`async`函数对 Generator 函数的区别：

（1）内置执行器。

Generator 函数的执行必须靠执行器，而`async`函数自带执行器。也就是说，`async`函数的执行，与普通函数一模一样，只要一行。

（2）更好的语义。

`async`和`await`，比起星号和`yield`，语义更清楚了。`async`表示函数里有异步操作，`await`表示紧跟在后面的表达式需要等待结果。

（3）正常情况下，`await`命令后面是一个 Promise 对象。如果不是，会被转成一个立即`resolve`的 Promise 对象。

（4）返回值是 Promise。

`async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。你可以用`then`方法指定下一步的操作。

进一步说，`async`函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖。

## 错误处理

如果`await`后面的异步操作出错，那么等同于`async`函数返回的 Promise 对象被`reject`。

```js
async function f() {
  await new Promise(function (resolve, reject) {
    throw new Error('出错了');
  });
}

f()
.catch(e => console.log(e))
// Error：出错了

```

上面代码中，`async`函数`f`执行后，`await`后面的 Promise 对象会抛出一个错误对象，导致`catch`方法的回调函数被调用，它的参数就是抛出的错误对象。具体的执行机制，可以参考后文的“async 函数的实现原理”。

防止出错的方法，也是将其放在`try...catch`代码块之中。

```js
async function f() {
    try {
        await new Promise(function (resolve, reject) {
            throw new Error('出错了');
        });
    } catch(e) {
        console.log(e);
    }
}
f()
```

如果有多个`await`命令，可以统一放在`try...catch`结构中。

```js
async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
```

## 应用

```js

var fn = function (time) {
  console.log("开始处理异步");
  setTimeout(function () {
    console.log(time);
    console.log("异步处理完成");
    iter.next();
  }, time);

};

function* g(){
  console.log("start");
  yield fn(3000)
  yield fn(500)
  yield fn(1000)
  console.log("end");
}

let iter = g();
iter.next();
```

下面是async函数的写法

```js
var fn = function (time) {
  return new Promise(function (resolve, reject) {
    console.log("开始处理异步");
    setTimeout(function () {
      resolve();
      console.log(time);
      console.log("异步处理完成");
    }, time);
  })
};

var start = async function () {
  // 在这里使用起来就像同步代码那样直观
  console.log('start');
  await fn(3000);
  await fn(500);
  await fn(1000);
  console.log('end');
};

start();
```





# *垃圾回收*

JavaScript是具有自动垃圾收集机制的。通常情况下，程序在执行的过程中，会存储各种变量以及环境(作用域)。如果不对不需要的内容定时清理，就会使得页面的内存占用越来越多，使得浏览器越来越卡影响用户体验，所以，需要对不需要的变量或者没有使用的作用域进行定期清理。定时删除不需要无影响的内容。

​	这种清理是自动的，无需手动管理，这是依赖优秀的垃圾回收机制。

​	在我们全局里面的就是全局变量,浏览器关闭之后才会自动回收,当我们浏览器打开,会自动开辟一个空间来放它的值,所以我们要减少全局变量的使用.在局部里面声明的变量就是局部变量,局部变量里面的变量没有使用的时候,自动就会回收

 **标记清除( mark-and-sweep)**

JavaScript最常用的是标记清除：当变量进入环境(作用域)，则将变量标记为进入环境，当变量离开环境的时候，将其标记为离开环境。

垃圾收集器在运行时会给存储在内存种所有变量标记，然后去掉环境变量与被环境变量引用的变量，剩下的就是环境无法访问的变量，这些变量以及其占用的内容空间将被清理回收。

 **引用计数( reference counting)**

不太常见的垃圾回收策略：引用计数。跟踪每一个值得引用次数。当声明一个引用并将一个引用类型赋值给这个变量得时候，这个值得引用计数加1，如果又把这个引用给了第三个变量，那么引用计数又加1，变成2。如果有变量得引用被指向了别的值，那么引用计数减1，直到等于0。意味着这个值已经不会被变量引用，垃圾收集器下次运行得时候就会清理引用为0得值所占据得内存。

如果一个值得引用出现闭环得话，这个值得引用不会变为0，循环引用使得值得内存永远得不到回收。意味着永远占用内存。

所以：对于不需要得值，或者使用完的值，请手动将变量得指向指向清除。

# *WeakSet*

### 含义

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别：

1. WeakSet 的成员只能是对象，而不能是其他类型的值。
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

由于上面这个特点，WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6 规定 WeakSet 不可遍历。

对于被添加进WeakSet的元素对象，只要该元素对象没有被除WeakSet以外的其他对象引用,在WeakSet中的该元素对象自动被释放，不会出现内存泄漏。

因为这一特性，其性能要比map要高，对于存储无顺序要求的，不重复的，临时存储的场景，可以使用它

**用法跟set差不多**

```js
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}

//下面的写法不行
const b = [3, 4];
const ws = new WeakSet(b); //由于Weak会把值拿出来 因此 3 和 4 不是引用类型
// Uncaught TypeError: Invalid value used in weak set(…)
```

WeakSet 结构有以下三个方法。

- **WeakSet.prototype.add(value)**：向 WeakSet 实例添加一个新成员。
- **WeakSet.prototype.delete(value)**：清除 WeakSet 实例的指定成员。
- **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

**WeakSet 没有`size`属性，没有办法遍历它的成员。**

# *WeakMap*

### 含义

`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。

##### `WeakMap`与`Map`的区别有两点：

1. `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。
2. `WeakMap`的键名所指向的对象，不计入垃圾回收机制。



> **WeakMap**的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。

```js
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
//e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。
//一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
```

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。

```js
const wm = new WeakMap();
const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"
```

### WeakMap 的语法

`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

无法被遍历，因为没有size。无法被清空，因为没有clear()，跟WeakSet相似。

### WeakMap 应用的典型

```js
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, {timesClicked: 0});

myElement.addEventListener('click', function() {
  let logoData = myWeakmap.get(myElement);
  logoData.timesClicked++;
}, false);
```

上面代码中，`myElement`是一个 DOM 节点，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是`myElement`。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。















