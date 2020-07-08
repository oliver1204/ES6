
// function Animal() {
//   this.name = 'animal';
//   this.say = function() {
//   };
// }
// Animal.prototype.eat = function() {

// }



// 构造函数的this，默认指向实例，
// 但是如果有return，则指向return后的值
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

// Animal();
let animal = new Animal();
console.log(animal)