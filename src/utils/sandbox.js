//attempt to create random color generator
let num = Math.random();
console.log(num.toString(16));
console.log(num.toString(16) + "000000");

console.log("#" + (num.toString(16) + "000000").substring(2, 8));
