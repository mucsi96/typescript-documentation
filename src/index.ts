class A {
  public a = 3;
}

const b = {};
export const hello = { ...b };

const a = new A();
console.log(a.a);
