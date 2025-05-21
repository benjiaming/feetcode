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
});