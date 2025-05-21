/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
 */
export default function classNames(...args) {
  let result: string[] = []

  function helper(token: string|number|object|Array<string|number|object>) {
    if (token === null || token === undefined || token  === '') return
    if (typeof token === "string" || typeof token === "number") {
      result.push(String(token))
    } else if (Array.isArray(token)) {
      token.flat(Infinity).forEach(el => helper(el))
    } else if (typeof token === "object") {
      for (let key of Object.keys(token)) {
        if (token[key]) {
          result.push(key)
        }
      }
    }
  }
  args.forEach(a => helper(a))
  return result.join(' ')
}