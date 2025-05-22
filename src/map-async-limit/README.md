`mapAsyncLimit` maps each element with an asynchronous mapping function and returns a Promise which resolves to the mapped results. It takes in an optional parameter size and the maximum number of ongoing async tasks so that the input array can be processed in chunks of size, achieving parallelism and staying within the provided limit. If size is not specified, the chunk size is unlimited.

```typescript
async function fetchUpperCase(q: string) {
  // Fake API service that converts a string to uppercase.
  const res = await fetch('https://uppercase.com?q=' + q);
  return await res.text();
}

// Only a maximum of 2 pending requests at any one time.
const results = await mapAsyncLimit(
  ['foo', 'bar', 'qux', 'quz'],
  fetchUpperCase,
  2,
);
console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
```
