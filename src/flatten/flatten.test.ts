import flatten from './flatten';

describe('flatten', () => {
  it('flattens a simple array', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('flattens a nested array', () => {
    expect(flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4]);
  });

  it('flattens deeply nested arrays', () => {
    expect(flatten([1, [2, [3, [4]], 5], 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('returns empty array for empty input', () => {
    expect(flatten([])).toEqual([]);
  });

  it('handles arrays with non-array elements', () => {
    expect(flatten([1, 'a', [true, [null]]])).toEqual([1, 'a', true, null]);
  });

  it('flattens arrays with empty arrays inside', () => {
    expect(flatten([1, [], [2, []], 3])).toEqual([1, 2, 3]);
  });

  it('flattens arrays with undefined, NaN, and false', () => {
    expect(flatten([undefined, [NaN, false], 0])).toEqual([undefined, NaN, false, 0]);
  });

  it('flattens arrays with objects and functions', () => {
    const fn = () => {};
    const obj = { a: 1 };
    expect(flatten([fn, [obj, [2]]])).toEqual([fn, obj, 2]);
  });

  it('flattens arrays with only one deeply nested element', () => {
    expect(flatten([[[[[42]]]]])).toEqual([42]);
  });

  it('flattens arrays with mixed types and deep nesting', () => {
    expect(flatten([1, ['a', [true, [{ b: 2 }]]], null])).toEqual([1, 'a', true, { b: 2 }, null]);
  });
});