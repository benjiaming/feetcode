import throttle from './throttle';

jest.useFakeTimers();

describe('throttle', () => {
  it('should call the function immediately', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled('a');
    expect(fn).toHaveBeenCalledWith('a');
  });

  it('should not call the function again within the wait period', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled();
    throttled();
    throttled();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call the function again after the wait period', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled();
    jest.advanceTimersByTime(100);
    throttled();
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('should preserve context and arguments', () => {
    const context = { value: 42 };
    function fn(this: any, arg: number) {
      expect(this).toBe(context);
      expect(arg).toBe(123);
    }
    const throttled = throttle(fn, 100);
    throttled.call(context, 123);
  });
});