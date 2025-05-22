import throttle from "./throttle";

let i = 0;
function increment() {
  i++;
}
const throttledIncrement = throttle(increment, 100);

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runDemo() {
  // t = 0
  console.log("t = 0: Call throttledIncrement(). i is now 1.");
  throttledIncrement();
  console.log("i =", i);

  // t = 50
  await sleep(50);
  throttledIncrement();
  console.log("t = 50: Call throttledIncrement() again. i is still 1.");
  console.log("i =", i);

  // t = 101
  await sleep(51);
  throttledIncrement();
  console.log("t = 101: Call throttledIncrement() again. i is now 2.");
  console.log("i =", i);
}

runDemo();
