In the observer pattern (also commonly known as the publish-subscribe model), we can observe/subscribe to events emitted by publishers and execute code whenever an event happens.

```typescript
// Creates an instance of the EventEmitter class. Events and listeners are isolated within the EventEmitter instances they're added to, aka listeners shouldn't react to events emitted by other EventEmitter instances.
const emitter = new EventEmitter();

function addTwoNumbers(a, b) {
  console.log(`The sum is ${a + b}`);
}
// Adds a callback function (listener) that will be invoked when an event with the name eventName is emitted.
emitter.on('foo', addTwoNumbers);

// Invokes each of the listeners listening to eventName with the supplied arguments in order.
emitter.emit('foo', 2, 5);
// > "The sum is 7"

emitter.on('foo', (a, b) => console.log(`The product is ${a * b}`));
emitter.emit('foo', 4, 5);
// > "The sum is 9"
// > "The product is 20"

// Removes the specified listener from the list of listeners for the event with the name eventName.
emitter.off('foo', addTwoNumbers);
emitter.emit('foo', -3, 9);
// > "The product is -27"
```

This `EventEmitter` class is similar to [Node.js EventEmitter](https://nodejs.org/api/events.html).