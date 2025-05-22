import { debounce } from "./debounce";

let i = 0;
function increment() {
  i++;
}
const debouncedIncrement = debounce(increment, 100);

debouncedIncrement(); // i = 0

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function doDebounce() {
    // t = 0: i is 0 because increment() has not been invoked yet.
    console.log(i); // i = 0
    await sleep(50);
    debouncedIncrement(); // t = 50: i is still 0 because increment() has not been invoked yet.
    console.log(i); // i = 0
    await sleep(150);
    debouncedIncrement(); // t = 100: increment() was invoked and i is now 1.
    console.log(i); // i = 1
    await sleep(250);
    debouncedIncrement(); // t = 150: increment() was invoked and i is now 2.
    console.log(i); // i = 2    
}

doDebounce()