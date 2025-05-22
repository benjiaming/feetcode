import deepEqual from './deep-equal';

describe('deepEqual', () => {
  it('compares primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual(1, '1')).toBe(false);
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
  });

  it('compares arrays', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(deepEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(deepEqual([1, [2, 3]], [1, [3, 2]])).toBe(false);
  });

  it('compares objects', () => {
    expect(deepEqual({a: 1, b: 2}, {a: 1, b: 2})).toBe(true);
    expect(deepEqual({a: 1, b: 2}, {a: 1, b: 3})).toBe(false);
    expect(deepEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 2}})).toBe(true);
    expect(deepEqual({a: 1, b: {c: 2}}, {a: 1, b: {c: 3}})).toBe(false);
  });

  it('compares arrays and objects deeply', () => {
    const a = [{x: 1}, {y: [2, 3]}];
    const b = [{x: 1}, {y: [2, 3]}];
    expect(deepEqual(a, b)).toBe(true);
  });

  it('returns false for different types', () => {
    expect(deepEqual([1, 2], {0: 1, 1: 2})).toBe(false);
    expect(deepEqual({}, [])).toBe(false);
  });
});