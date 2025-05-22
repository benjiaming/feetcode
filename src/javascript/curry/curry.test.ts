import curry from './curry';

describe('curry', () => {
  function add(a: number, b: number, c: number) {
    return a + b + c;
  }

  it('calls function when enough arguments are provided', () => {
    const curried = curry(add);
    expect(curried(1, 2, 3)).toBe(6);
  });

  it('supports partial application', () => {
    const curried = curry(add);
    expect(curried(1)(2, 3)).toBe(6);
    expect(curried(1, 2)(3)).toBe(6);
    expect(curried(1)(2)(3)).toBe(6);
  });

  it('preserves this context', () => {
    const obj = {
      x: 10,
      add(a: number, b: number) { return this.x + a + b; }
    };
    const curried = curry(obj.add);
    expect(curried.call({ x: 5 }, 1, 2)).toBe(8);
    expect(curried.call({ x: 7 }, 1)(2)).toBe(10);
  });

  it('works with functions of arity 1', () => {
    const curried = curry((a: number) => a * 2);
    expect(curried(4)).toBe(8);
  });
});