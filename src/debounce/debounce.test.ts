import { debounce } from './debounce';
import cancellableDebounce from './debounce';

jest.useFakeTimers();

test('debounce: should debounce calls and only invoke once', () => {
  const fn = jest.fn();
  const debounced = debounce(fn, 100);

  debounced();
  debounced();
  debounced();

  jest.advanceTimersByTime(99);
  expect(fn).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1);
  expect(fn).toHaveBeenCalledTimes(1);
});

test('debounce: should pass arguments and context', () => {
  const context = { value: 42 };
  function fn(this: any, arg: number) {
    expect(this).toBe(context);
    expect(arg).toBe(123);
  }
  const debounced = debounce(fn, 50);

  debounced.call(context, 123);
  jest.advanceTimersByTime(50);
});

test('should debounce calls and only invoke once', () => {
  const fn = jest.fn();
  const debounced = cancellableDebounce(fn, 100);

  debounced();
  debounced();
  debounced();

  jest.advanceTimersByTime(99);
  expect(fn).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1);
  expect(fn).toHaveBeenCalledTimes(1);
});

test('should pass arguments and context', () => {
  const context = { value: 42 };
  function fn(this: any, arg: number) {
    expect(this).toBe(context);
    expect(arg).toBe(123);
  }
  const debounced = cancellableDebounce(fn, 50);

  debounced.call(context, 123);
  jest.advanceTimersByTime(50);
});

test('should cancel scheduled call', () => {
  const fn = jest.fn();
  const debounced = cancellableDebounce(fn, 100);

  debounced();
  debounced.cancel();

  jest.advanceTimersByTime(200);
  expect(fn).not.toHaveBeenCalled();
});

test('should flush scheduled call immediately', () => {
  const fn = jest.fn();
  const debounced = cancellableDebounce(fn, 100);

  debounced('a');
  debounced.flush();

  expect(fn).toHaveBeenCalledWith('a');
});