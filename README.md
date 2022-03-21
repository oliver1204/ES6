## 1. Map, Set, WeakMap, WeakSet, defineProperty, reflect, proxy
Map 和 Set 的功能类似，唯一区别就是Set没有key, Map 有key
## 2. reflect + symbol

大多数用 Object. 的方法都被 es6 用 reflect 重写了一遍（加入了更多，并且有返回值），比如：

* Object.defineProperty()  => Reflect.defineProperty(target, propertyKey, attributes)
* Object.getOwnPropertyDescriptor() => Reflect.getOwnPropertyDescriptor(target, propertyKey)
* Object.getPrototypeOf() => Reflect.getPrototypeOf(target)
...

类的new 也被重写了，
new target(...args) => Reflect.construct(target, argumentsList[, newTarget])
## 3. 深拷贝
深拷贝中要注意循环引用自身的问题：

```js
obj = {
  a: b
}

b = obj
```
递归是要有终止条件，深拷贝的终止条件就是循环引用自身, 建立一个空的hash表，将每次赋值的key保存起来，如果有重复的key 则证明该项已经拷贝过了。

```js
let instance = new value.constructor;

if(hash.has(value)) return hash.get(value);
hash.set(value, instance);

```
## 4. reduce 数组收敛

数组扁平化：

```js
function flat(arr) {
  return arr.reduce(
    (pre, current) => pre.concat((Array.isArray(current) ? flat(current) : current)), [])
}

let arr = [[1, [2]],new Date(), [{a: 1}, [3, [4, [5]]]]];
// console.log(arr.flat(100));
console.log(flat(arr))
```
es6的扩展运算符能将二维数组变为一维

```js
[].concat(...[1, 2, 3, [4, 5]]);  // [1, 2, 3, 4, 5]
```
## 5. export 和 export default 的区别

es6 可以通过 export 的方式导出文件

```js
// a.js
export let a = 'a';
export let aa = 'aa';
export let aaa = 'aaa';

// b.js
export let b = 'b';

// index.js
import { a, aa, aaa } from './a';
import * as A from './a';
import { b } from './b';

console.log(a, aa, aaa, b)
```
也可以通过 default 导出
```js
// a.js
let a = 1;
let aa = 2;
let aaa = 3;

export default {
  a,
  aa,
  aaa
}

// index.js
import A from './a';
console.log(A); // {a: 1, aa: 2, aaa: 3}
```
当我们在导出文件中加入定时器后，会发现两种导出的方式的不同，
```js
let a = 'a';
let c = 1;

setInterval(() => {
  c++;
}, 1000)

export {
  c,
  a
}

// index.js
import {a,c} from './a';
setInterval(() => {
  console.log(c)
}, 1001)
console.log(c, a); // 分别是 1，2， 3... 每隔一秒+1

```
```JS
// a,js
let a = 'a';
let c = 1;

setInterval(() => {
  c++;
}, 1000)

export default {
  c,
  a
}

// index.js
import A from './a';

setInterval(() => {
  console.log(A.c)
}, 1001)
console.log(A.c); // 每次打印出来的都是1，没有变化
```
总结： export default 导出的是具体值；而 export 导出的是变量，也可以叫接口。
## 6. es6 import 返回结果

es6 import 后返回的是 一个promise，我们可以拿到结果的default，相当于 import * as result from './hello.js';

```js
// webpack 懒加载的用法
let button = document.createElement('button')
button.innerHTML = "点我试试"

button.addEventListener('click', event => {
  import('./hello.js').then(result => {
    alert(result.default)
  })
})
document.body.appendChild(button)

```
## 7. es6类 和 es5类 的区别

### 7.1 es6类 和 es5类 的区别
es6类 和 es5类 的区别有： 
* es5没有类的概念，它是一个类似类的函数。
* es5类的实例可以 new， 也可以通过 函数执行 的方式，es6类只能通过 new。
* es5类 的属性可以枚举，es6类则不可以。

### 7.2 类的实例 和 类的公共方法和属性
```js
function Animal() {
  this.name = 'animal';
  this.eat = function() {};
}

Animal.prototype.say = function() {};

let animal1 = new Animal();
let animal2 = new Animal();

animal1.say = animal2.say; // true 公共方法
animal1.eat = animal2.eat; // false 实例方法
```
用 es6 的写法是：

```js
class Animal {
  constructor() {
    this.name = 'animal'
  }
  static eat() {
  
  }
  say() {

  }

  get sleep() { // 公共属性 es6写法
    return 1
  }
  
  get sleep = 1 // es7写法 

  static get sleep() { // 实例属性

  }
}

```

### 7.3. 用 es5 模拟 es6 类
依次解决上面连个差别

1）es5类的实例可以 new 也可以通过 函数执行 的方式，es6类只能通过 new。

因为new 一个构造函数其this，默认指向实例，但是如果有return，则指向return后的值；调用函数，this指向调用者。

例如： 

```js
function Animal() {
  this.name = 'animal';

  return {} 
}

let animal = new Animal();
```

`return {}` this 指向 {},没有 `return {}` this 指向 Animal .

所以，我们通过判断 this 指向 来判断 实例是调用还是new。

```js
var Animal = (function() {
  function Animal() {
    if(!(this instanceof Animal)) {
      throw new Error('not new');
    }
    this.name = 'animal';
  };
  return Animal;
})();

Animal(); // this 为 windows
new Animal(); // this 为 Animal
```

2) es5类 的属性可以枚举，es6类则不可以

```JS
function _defineProperties (target, props) {
  for(var i = 0; i < props.length; i++) {
    var descriptor = props[i]; 
    descriptor.enumerable = descriptor.enumerable || false; 
    descriptor.configurable = true; 
    if ("value" in descriptor) descriptor.writable = true; 
    Object.defineProperty(target, descriptor.key, descriptor); 
  }
};

function _createClass(Constructor, protoProps, staticProps) {
  if(protoProps) {
    _defineProperties(Constructor.prototype, protoProps);
  }

  if(staticProps) {
    _defineProperties(Constructor, staticProps);
  }

  return Constructor;
}

var Animal = (function() {
  function Animal() {
    // 判断类是否是通过new实现的
    if(!(this instanceof Animal)) {
      throw new Error('not new');
    }
    this.name = 'animal';
  };

  _createClass(Animal, [{
    key: 'eat',
    value: function eat() {} 
  }], [{
    key: "say",
    value: function say() {}
  }]);
  return Animal;
})();
```

### 7.4 抽象类
JS中是没有直接的抽象类的，abstract是个保留字，但是还没有实现，简单讲一个不能被new的类就是抽象类。

### 7.5 super 关键字
super 就是父类

## 7.6实例继承
继承实例的方法用 Animal.call(this);

继承原型的方法有两种：
1） Object.create(Animal.prototype)
2) Tiger.prototype.__proto_ = Animal.prototype;
归根结底，其原理都是在原型链中间插入一个中间函数变量（可以理解为在链表中插入一项, 这也是create的原理）

```js
function Animal() {
  this.name = 'animal';
  this.age = 10;
}
Animal.prototype.say = function() {
  console.log(`I'm ${this.name}, I'm ${this.age} years old`)
}


function Tiger() {
  Animal.apply(this, ...arguments);
}
Tiger.prototype = Object.create(Animal.prototype,  {constructor: {value: Tiger }});

let tiger = new Tiger();
console.log(tiger.say())
```
create的原理：
```js
function create(parentPrototype) {
  function Fn() {}
  Fn.prototype = parentPrototype;
  return new Fn();
}
```

ES6 的 `class a extends Animal {} `中的extends就是 Animal.call() + Object.create(Animal)

new 关关键字的原理也是 继承。(https://juejin.cn/post/6844903789070123021)[重新认识new]

## 8. 箭头函数（三无）
箭头函数是没有this, 没有arguments（需要arguments可以...args）, 没有prototype.

```js
let a = 100;
let obj = {
  a: 1,
  fn() {
    console.log(this.a)
  }
}

obj.fn()
```
结果： 1

```js
let a = 100;
let obj = {
  a: 1,
  fn: () => {
    console.log(this.a)
  }
}

obj.fn()
```
结果： undefined
解析： 箭头函数是没有this，所以向上寻找this，window 上没有a（let 不挂在window上）

```js
let a = 100;
let obj = {
  a: 1,
  fn(){
    setTimeout(() => {
      console.log(this.a)
    }, 0)
  }
}

obj.fn()
```

## 如何终断promise
