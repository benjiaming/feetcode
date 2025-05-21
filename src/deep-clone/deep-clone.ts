/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
/*
    > input only contains JSON-serializable values: null, boolean, number, string, Array, Object
    > input will not contain any other objects like Date, Regex, Map or Set
*/
  if (!value) return value

   function helper(thing) {
    if (Array.isArray(thing)) {
      return thing.map(t => helper(t))
    }
    if (thing !== null && typeof thing === "object") {
      return Object.fromEntries(Object.keys(thing).map(t => [t, helper(thing[t])]))
    } 
    return thing
  }
  return helper(value)
}