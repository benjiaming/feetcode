/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable: any[]) {
  return new Promise((resolve, reject) => {
    const results = new Array(iterable.length);
    let unresolved = results.length;

    if (unresolved === 0) {
      resolve(results);
      return;
    }

    iterable.forEach((item, index) => {
      Promise.resolve(item).then(
        value => {
          results[index] = value;
          unresolved--;
          if (unresolved === 0) {
            resolve(results);
          }
        },
        err => {
          reject(err);
        }
      );
    });
  });
}