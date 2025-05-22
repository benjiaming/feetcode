/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
  
  function compare(a, b) {
    if (typeof a !== typeof b) return false
    if (a === null && b === null) return true
    if (a === null || b === null) return false

    if (Array.isArray(a)) {
      if (Array.isArray(b)) {
        return compareArrays(a, b)
      }
      return false
    }    
    if (typeof(a) === "object") {
      if (Array.isArray(b)) {
        return false
      }
      return compareObjects(a, b)
    }
    if (a === b) return true
    return false
  }
  function compareArrays(a, b) {
    if (a.length !== b.length) return false
    for (let i=0; i<a.length; i++) {
      if (!compare(a[i], b[i])) return false
    }
    return true
  }
  function compareObjects(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length) return false
    for (let k of Object.keys(a)) {
      if (!compare(a[k], b[k])) return false
    }
    return true
  }
  return compare(valueA, valueB)
}