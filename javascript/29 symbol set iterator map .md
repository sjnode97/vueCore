# symbol set map

# *symbol*

##### 产生的原因

es5的对象的所有属性名,实质上都是字符串,当我们接受一个别人提供的对象,想要拓展一些属性,那么这个对象里面有些什么属性,你并不是很清楚,就很可能造成,我们拓展新增的属性名和原本的属性名进行冲突和覆盖, 那么显然会影响原本的对象,并造成一定的问题,因此 es6提供一种新的属性类型 为symbol 他会生成一个独一无二的值,提供给你使用,不会造成属性名冲突的问题  这是他的出现的意义所在 *为对象属性名而生* ! 

##### Symbol是什么

Symbol实际上是ES6引入的一种原始数据类型，除了Symbol，JavaScript还有其他5种基础的数据类型，分别是Undefined、Null、Boolean、String、Number、和一种复杂类型的object对象，这6种数据类型都是ES5中就有的。

##### 声明方式

只能用个 Symbol函数生成 Symbol不是构造函数,前面不能使用 new 操作符,symbol也不是对象,而是一种特殊的字符串类型.普通值类型,不能添加任何属性  

```js
 let s = Symbol(1)
 let s1 = Symbol(1)
 console.log(s,s1)
 console.log(s == s1) // 完全不对等 == 和 === 都返回false
```

##### Symbol函数的参数

1.由于Symbol函数生成的都一个样,所以为做区分,我们可以给他添加参数,作为symbol的区别标志, 方便我们区分不同的symbol值. 

2.同一个参数,Symbol函数的返回值不相等,保证每一个symbol值都是独一无二的. 

3.如果参数是一个对象,内部会调用 toString() 方法,将其转为字符串, 然后再生成一个symbol值,==> 参数只能是 字符串

```js
let s = Symbol({name:1})
console.log(s) //Symbol([object Object])
```

4.Symbol值不可以进行运算  也不能和其他类型的值进行运算  Symbol值可以显式转化为字符串和布尔值，但是不能转为数值。

```js
let s = Symbol(1)
console.log(!!s) // true
console.log(Boolean(s)) // true
console.log(s.toString()) // Symbol(1)
console.log(Number(s)) //报错TypeError: Cannot convert a Symbol value to a number(…)
```

##### Symbol用法

Symbol就是为对象的属性名而生，那么Symbol值怎么作为对象的属性名呢？有下面几种写法：

```js
/ 由于symbol是特殊的字符串,因而不能使用 . 操作 ,而要使用[] 操作
let obj = {}
let s = Symbol();
let s1 = Symbol(1);
//第一种写法 : 通过obj挂载属性
obj[s] = "雀雀" 

//第二种写法 : 直接写在字面量里
let obj1 = {
    [s1]: "雀雀1"
}

//第三种写法 : 使用对象的静态方法
 Object.defineProperty(obj, s1, {value: 1})
// 第一个值是要添加属性的对象   第二个值是属性名 第三个值中value:后是 属性值 
// configurable 当且仅当该属性的 configurable 为 true 时，该属性也能从对应的对象上被删除并被重新定义,默认值为false。

// enumerable 当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为 false。

// writable 当且仅当该属性的writable为true时，value能被赋值运算符改变。默认为 false。不能修改
 console.log(obj)

```

1. 使用对象的Symbol值作为属性名时，获取相应的属性值不能用点运算符；

2. 如果用点运算符来给对象的属性赋Symbol类型的值，实际上属性名会变成一个字符串，而不是一个Symbol值；

   ```js
   let obj = {}
   let s = Symbol(1)
   Object.defineProperty(obj, s, {value: '1111'});
   console.log(obj)// {Symbol(1): "1111"}
   obj.s = "nihao"
   console.log(obj) //{s: "nihao", Symbol(1): "1111"}
   console.log(obj.s) // =>nihao
   console.log(obj[s]) // 先找变量 因此代表symbol 1111
   console.log(obj["s"]) // s字符串属性名  nihao
   ```

3. 在对象内部，使用Symbol值定义属性时，Symbol值必须放在方括号之中，不要带引号,否则只是一个字符串。

### Symbol值作为属性名的遍历

使用 for...in 和 for...of 都无法遍历到 Symbol值的属性，Symbol值作为对象的属性名，也无法通过Object.keys()、Object.getOwnPropertyNames()来获取了。但是，不同担心，这种平常的需求肯定是会有解决办法的。我们可以使用Object.getOwnPropertySymbols()方法获取一个对象上的Symbol属性名。也可以使用Reflect.ownKeys()返回所有类型的属性名，包括常规属性名和 Symbol属性名。

```js
let s5 = Symbol('s5');
let s6 = Symbol('s6');
let a = {
    [s5]: 's5',
    [s6]: 's6'
}
Object.getOwnPropertySymbols(a);   // [Symbol(s5), Symbol(s6)]
a.hello = 'hello';
Reflect.ownKeys(a);  //  ["hello", Symbol(s5), Symbol(s6)]
```

利用Symbol值作为对象属性的名称时，不会被常规方法遍历到这一特性，可以为对象定义一些非私有的但是又希望只有内部可用的方法。

### Symbol.for()和Symbol.keyFor()

Symbol.for()函数也可以用来生成Symbol值，但该函数有一个特殊的用处，就是可以重复使用一个Symbol值。

```js
// Symbol.for() 会记录下当前的标记 如果下次Symbol.for()新建,就会率先查找标记对应的值,如果有,则把此值返回出来,如果没有  就创建一个新的
let s1 = Symbol.for("s11");
let s2 = Symbol.for("s11");
console.log(s1 === s2)// true 

console.log(Symbol.keyFor(s3))//undefined
console.log(Symbol.keyFor(s2))//"s11"
console.log(Symbol.keyFor(s1))//"s11"
```

**Symbol.for()**函数要接受一个字符串作为参数，先搜索有没有以该参数作为名称的Symbol值，如果有，就直接返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值。

**Symbol.keyFor()**函数是用来查找一个Symbol值的登记信息的，Symbol()写法没有登记机制，所以返回undefined；而Symbol.for()函数会将生成的Symbol值登记在全局环境中，所以Symbol.keyFor()函数可以查找到用Symbol.for()函数生成的Symbol值。

## 内置Symbol值

ES6提供了11个内置的Symbol值，分别是Symbol.hasInstance 、Symbol.isConcatSpreadable 、Symbol.species 、Symbol.match 、Symbol.replace 、Symbol.search 、Symbol.split 、Symbol.iterator 、Symbol.toPrimitive 、Symbol.toStringTag 、Symbol.unscopables 等。

*https://blog.csdn.net/c__dreamer/article/details/81873087*

# Set 和 Map 数据结构

# *Set*

### 基本用法

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

Set 本身是一个构造函数，用来生成 Set 数据结构。

```js
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
//通过add方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。
```

Set 函数可以接受一个数组作为参数，用来初始化。

```js
// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
function divs () {
  return [...document.querySelectorAll('div')];
}

const set = new Set(divs());
set.size // 56

// 类似于
divs().forEach(div => set.add(div));
set.size // 56
```

### 对数组去重

```js
// 去除数组的重复成员
[...new Set(array)]
```

1. 向 Set 加入值的时候，不会发生类型转换，所以`5`和`"5"`是两个不同的值。
2. Set 内部判断两个值是否不同，使用的算法叫做“Same-value equality”，它类似于精确相等运算符（`===`），主要的区别是`NaN`等于自身，而精确相等运算符认为`NaN`不等于自身。

**注意**：两个对象总是不相等的。

### Set 实例的属性和方法 

#### Set 结构的实例有以下属性：

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。 
- `Set.prototype.size`：返回`Set`实例的成员总数。 不可被修改 只读属性

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

#### 四个操作方法： 

- `add(value)`：添加某个值，返回 Set 结构本身。
- `delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `clear()`：清除所有成员，没有返回值。

#### Array.from()可以将 Set 结构转为数组。

```js
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```

### 遍历操作

Set 结构的实例有四个遍历方法，可以用于遍历成员。

- `keys()`：返回键名的遍历器
- `values()`：返回键值的遍历器
- `entries()`：返回键值对的遍历器
- `forEach()`：使用回调函数遍历每个成员

#### keys()，values()，entries()

`keys`方法、`values`方法、`entries`方法返回的都是遍历器对象。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。

```js
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的`values`方法。

#### forEach()

Set 结构的实例与数组一样，也拥有`forEach`方法，用于对每个成员执行某种操作，没有返回值。

```js
let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9
```

`forEach`方法还可以有第二个参数，表示绑定处理函数内部的`this`对象。

# *Iterator*

## 概念

迭代器是一种接口、是一种机制。

为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：

1. 为各种数据结构，提供一个统一的、简便的访问接口；

2. 使得数据结构的成员能够按某种次序排列；

3. 主要供`for...of`消费。

**Iterator本质上，就是一个指针对象。**

过程是这样的：

（1）创建一个指针对象，指向当前数据结构的起始位置。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

**普通函数实现Iterator**

```js
function myIter(obj){
  let i = 0;
  return {
    next(){
      let done = (i>=obj.length);
      let value = !done ? obj[i++] : undefined;
      return {
        value,
        done,
      }
    }
  }
}
```

原生具备 Iterator 接口的数据结构如下。

- Array
- Map
- Set
- String
- 函数的 arguments 对象
- NodeList 对象

下面的例子是数组的`Symbol.iterator`属性 。

```js
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

下面是另一个类似数组的对象调用数组的`Symbol.iterator`方法的例子。

```js
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}
```

注意，普通对象部署数组的`Symbol.iterator`方法，并无效果。

```js
let iterable = {
  a: 'a',
  b: 'b',
  c: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // undefined, undefined, undefined
}
```

字符串是一个类似数组的对象，也原生具有 Iterator 接口。

```js
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
```

# *Map*

### 含义和基本用法  

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object 结构提供了“字符串—值”的对应，Map 结构提供了“值—值”的对应，是一种更完善的 Hash 结构实现。如果你需要“键值对”的数据结构，Map 比 Object 更合适。

```js
const o = {p: 'Hello World'};
m.set(o, 'content')

m.get(o) // "content"

m.has(o) // true

m.delete(o) // true

m.has(o) // false

作为构造函数，Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
```

```js
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。

```js
const map = new Map();

map.set(['a'], 555);
map.get(['a']) // undefined  ["a"]全新地址 
```

如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如`0`和`-0`就是一个键，布尔值`true`和字符串`true`则是两个不同的键。另外，`undefined`和`null`也是两个不同的键。虽然`NaN`不严格相等于自身，但 Map 将其视为同一个键。

### 实例的属性和操作方法 

1. size属性		返回成员总数
2. set(key,value)       设置键值对，返回Map结构
3. get(key)          读取key对应的值，找不到就是undefined
4. has(key)         返回布尔值，表示key是否在Map中
5. delete(key)    删除某个键，返回true，失败返回false
6. clear()             清空所有成员，没有返回值

### 遍历方法

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。
- `entries()`：返回所有成员的遍历器。
- `forEach()`：遍历 Map 的所有成员。

需要特别注意的是，Map 的遍历顺序就是插入顺序。遍历行为基本与set的一致。

### 与其他数据结构的互相转换

#### Map 转为数组

```js
const myMap = new Map()
myMap.set(true, 7)
myMap.set({foo: 3}, ['abc']);

[...myMap]
```

#### 数组 转为 Map

```js
new Map([
  [true, 7],
  [{foo: 3}, ['abc']]
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }
```

#### Map 转为对象

如果所有 Map 的键都是字符串，它可以转为对象。

```js
function strMapToObj(strMap) {
  let obj = Object.create(null);
  for (let [k,v] of strMap) {
    obj[k] = v;
  }
  return obj;
}

const myMap = new Map()
  .set('yes', true)
  .set('no', false);
strMapToObj(myMap)
// { yes: true, no: false }
```

#### **对象转为 Map**

```js
function objToStrMap(obj) {
  let strMap = new Map();
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k]);
  }
  return strMap;
}

objToStrMap({yes: true, no: false})
// Map {"yes" => true, "no" => false}

```

#### **Map 转为 JSON**

Map 转为 JSON 要区分两种情况。一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。

```js
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap));
}

let myMap = new Map().set('yes', true).set('no', false);
strMapToJson(myMap)
// '{"yes":true,"no":false}'

```

另一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。

```js
function mapToArrayJson(map) {
  return JSON.stringify([...map]);
}

let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
mapToArrayJson(myMap)
// '[[true,7],[{"foo":3},["abc"]]]'

```

#### **JSON 转为 Map**

JSON 转为 Map，正常情况下，所有键名都是字符串。

```js
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}

```

但是，有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是数组转为 JSON 的逆操作。

```js
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}

jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

