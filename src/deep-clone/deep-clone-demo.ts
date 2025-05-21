import deepClone from "./deep-clone";

const obj1 = { user: { role: 'admin' } };
const clonedObj1 = deepClone(obj1);
console.log(clonedObj1); // { user: { role: 'admin' } }

clonedObj1.user.role = 'guest'; // Change the cloned user's role to 'guest'.
clonedObj1.user.role; // 'guest'
obj1.user.role; // Should still be 'admin'.
console.log(obj1); // { user: { role: 'admin' } }

const obj2 = { foo: [{ bar: 'baz' }] };
const clonedObj2 = deepClone(obj2);

obj2.foo[0].bar = 'bax'; // Modify the original object.
obj2.foo[0].bar; // 'bax'
clonedObj2.foo[0].bar; // Should still be 'baz'.
console.log(clonedObj2); // { foo: [{ bar: 'baz' }] }