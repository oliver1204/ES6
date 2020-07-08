import A from './a';
import { b } from './b';
setInterval(() => {
  console.log(A.c)
}, 1001)
console.log(A.c, b)