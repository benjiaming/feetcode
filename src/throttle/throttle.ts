/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func: { apply: (arg0: any, arg1: any[]) => void }, wait: number) {
  let isThrottled = false
  return function(...args: any[]) {
    if (isThrottled) {
      return 
    }
    isThrottled = true
    func.apply(this, args)
    setTimeout(() => {
      isThrottled = false
    }, wait)
  }
}