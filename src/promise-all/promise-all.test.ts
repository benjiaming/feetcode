import promiseAll from './promise-all';

describe('promiseAll', () => {
  it('resolves with all values in order', async () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.resolve(2);
    const p3 = Promise.resolve(3);
    await expect(promiseAll([p1, p2, p3])).resolves.toEqual([1, 2, 3]);
  });

  it('resolves with mixed promises and values', async () => {
    await expect(promiseAll([1, Promise.resolve(2), 3])).resolves.toEqual([1, 2, 3]);
  });

  it('rejects if any promise rejects', async () => {
    const p1 = Promise.resolve(1);
    const p2 = Promise.reject(new Error('fail'));
    const p3 = Promise.resolve(3);
    await expect(promiseAll([p1, p2, p3])).rejects.toThrow('fail');
  });

  it('resolves empty array if input is empty', async () => {
    await expect(promiseAll([])).resolves.toEqual([]);
  });
});