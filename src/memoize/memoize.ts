/**
 * @param {Function} func
 * @returns Function
 */
export default function memoize<T, R>(func: (arg: T) => R): (arg: T) => R {
  const cache = new Map()
  return function(arg) {
    const c = cache.get(arg);
    if (cache.has(arg)) {
      return c;
    }
    const result = func.call(this, arg)
    cache.set(arg, result)
    return result
  }
}