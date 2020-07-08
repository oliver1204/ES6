function Animal() {
  this.name = 'animal';
  this.age = 10;
}
Animal.prototype.say = function() {
  console.log(`I'm ${this.name}, I'm ${this.age} years old`)
}

function create(parentPrototype) {
  function Fn() {}
  Fn.prototype = parentPrototype;
  return new Fn();
}

function Tiger() {
  Animal.apply(this, ...arguments);
}
Tiger.prototype = Object.create(Animal.prototype, {constructor: {value: Tiger }});

let tiger = new Tiger();
console.log(tiger.say())