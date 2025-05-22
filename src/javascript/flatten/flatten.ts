/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export function flattenRecursive(value: any[]): any[] {
  let result: any[] = [];
  for (const item of value) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

export default function flatten(value: any[]) {
  while (value.some(Array.isArray)) {
    value = [].concat(...value);
  }

  return value;
}