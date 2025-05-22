import deepEqual from "./deep-equal";

console.log(deepEqual('foo', 'foo')); // true
console.log(deepEqual({ id: 1 }, { id: 1 })); // true
console.log(deepEqual([1, 2, 3], [1, 2, 3])); // true
console.log(deepEqual([{ id: '1' }], [{ id: '2' }])); // false
