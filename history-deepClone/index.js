function deepClone(value, hash = new WeakMap) {
  if(value == null) return value;
  if(typeof value !== 'object') return value; // 数据类型 + 函数类型
  if(value instanceof RegExp) return new RegExp(value);
  if(value instanceof Date) return new Date(value);
  // object || array
  let instance = new value.constructor;

  // 判断 该对象是否已经被拷贝过了，
  // 如果已经拷贝过了，直接返回，不再进行深拷贝，
  // 如果没有拷贝过，继续进行
  if(hash.has(value)) return hash.get(value);
  hash.set(value, instance);

  for(let key in value) {
    if(value.hasOwnProperty(key)) {
      instance[key] = deepClone(value[key]);
    }
  }
  return instance;
}

console.log(deepClone({a: 1, b: [1, 2, {a: 2}]}))