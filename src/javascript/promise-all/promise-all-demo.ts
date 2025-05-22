import promiseAll from "./promise-all";

async function resolvedDemo() {
  // Resolved example.
  const p0 = Promise.resolve(3);
  const p1 = 42;
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('foo');
    }, 100);
  });

  console.log(await promiseAll([p0, p1, p2])); // [3, 42, 'foo']
}

async function rejectedDemo() {
  // Rejection example.
  const p0 = Promise.resolve(30);
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('An error occurred!');
    }, 100);
  });

  try {
    await promiseAll([p0, p1]);
  } catch (err) {
    console.log(err); // 'An error occurred!'
  }

}

resolvedDemo().then(() => {
  console.log("Resolved demo completed successfully.");
}).catch((error) => {
  console.error("Resolved demo failed:", error);
});

rejectedDemo().then(() => {
  console.log("Rejected demo failed.");
}).catch((error) => {
  console.error("Error during rejected demo failed:", error);
});   
