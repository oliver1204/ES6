let a = 100;
let obj = {
  a: 1,
  fn: () => {
    console.log(this.a)
  }
}

let a = 100;
let obj = {
  a: 1,
  fn(){
    setTimeout(function() {
      console.log(this.a)
    }, 0)
  }
}

obj.fn()

class a extends obj {}

