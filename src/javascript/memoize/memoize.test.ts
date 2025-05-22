import memoize from './memoize';

describe('memoize', () => {
  it('returns the same result as the original function', () => {
    const fn = jest.fn(x => x * 2);
    const memoized = memoize(fn);
    expect(memoized(2)).toBe(4);
    expect(memoized(3)).toBe(6);
  });

  it('caches results for the same argument', () => {
    const fn = jest.fn(x => x * 2);
    const memoized = memoize(fn);
    memoized(2);
    memoized(2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('does not cache for different arguments', () => {
    const fn = jest.fn(x => x * 2);
    const memoized = memoize(fn);
    memoized(2);
    memoized(3);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('preserves this context', () => {
    const obj = {
      factor: 3,
      fn(x: number) { return this.factor * x; }
    };
    obj.fn = memoize(obj.fn);
    expect(obj.fn(2)).toBe(6);
  });

  it('works with non-primitive arguments (reference equality)', () => {
    const fn = jest.fn(obj => obj.value * 2);
    const memoized = memoize(fn);
    const arg = { value: 5 };
    expect(memoized(arg)).toBe(10);
    expect(memoized(arg)).toBe(10);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoized({ value: 5 })).toBe(10); // New object, not cached
    expect(fn).toHaveBeenCalledTimes(2);
  });
});