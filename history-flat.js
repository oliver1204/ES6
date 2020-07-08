function flat(arr) {
  return arr.reduce(
    (pre, current) => pre.concat((Array.isArray(current) ? flat(current) : current)), [])
}

let arr = [[1, [2]],new Date(), [{a: 1}, [3, [4, [5]]]]];
// console.log(arr.flat(100));
console.log(flat(arr))
