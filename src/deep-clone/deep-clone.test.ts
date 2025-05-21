import deepClone from './deep-clone';

describe('deepClone', () => {
  it('clones primitives', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('foo')).toBe('foo');
    expect(deepClone(null)).toBe(null);
    expect(deepClone(undefined)).toBe(undefined);
  });

  it('clones arrays deeply', () => {
    const arr = [1, [2, 3], 4];
    const clone = deepClone(arr);
    expect(clone).toEqual(arr);
    expect(clone).not.toBe(arr);
    expect(clone[1]).not.toBe(arr[1]);
  });

  it('clones objects deeply', () => {
    const obj = { a: 1, b: { c: 2 } };
    const clone = deepClone(obj);
    expect(clone).toEqual(obj);
    expect(clone).not.toBe(obj);
    expect(clone.b).not.toBe(obj.b);
  });

  it('clones nested structures', () => {
    const data = { a: [1, { b: 2 }], c: 3 };
    const clone = deepClone(data);
    expect(clone).toEqual(data);
    expect(clone.a).not.toBe(data.a);
    expect(clone.a[1]).not.toBe(data.a[1]);
  });

  it('does not clone functions or special objects', () => {
    const fn = () => {};
    const date = new Date();
    const obj = { fn, date };
    const clone = deepClone(obj);
    expect(clone.fn).toBe(fn);
    expect(clone.date).not.toBe(date); // Will be a plain object, not a Date
  });
});