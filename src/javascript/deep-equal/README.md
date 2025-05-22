`deepEqua` performs a deep comparison between two values. It returns true if two input values are deemed equal, and returns false if not. 

Assumptions:
1. There are only JSON-serializable values (numbers, strings, boolean, null, objects, arrays).
2. There wouldn't be cyclic objects, i.e. objects with circular references.

```typescript
deepEqual('foo', 'foo'); // true
deepEqual({ id: 1 }, { id: 1 }); // true
deepEqual([1, 2, 3], [1, 2, 3]); // true
deepEqual([{ id: '1' }], [{ id: '2' }]); // false
```