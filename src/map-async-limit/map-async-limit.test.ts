import mapAsyncLimit from './map-async-limit';

function asyncDouble(x: number) {
  return new Promise<number>(resolve => setTimeout(() => resolve(x * 2), 10));
}

describe('mapAsyncLimit', () => {
  it('maps all items with concurrency limit', async () => {
    const input = [1, 2, 3, 4];
    const result = await mapAsyncLimit(input, asyncDouble, 2);
    expect(result).toEqual([2, 4, 6, 8]);
  });

  it('works with concurrency greater than input length', async () => {
    const input = [1, 2];
    const result = await mapAsyncLimit(input, asyncDouble, 10);
    expect(result).toEqual([2, 4]);
  });

  it('works with concurrency of 1 (sequential)', async () => {
    const input = [1, 2, 3];
    const result = await mapAsyncLimit(input, asyncDouble, 1);
    expect(result).toEqual([2, 4, 6]);
  });

  it('returns empty array for empty input', async () => {
    const result = await mapAsyncLimit([], asyncDouble, 2);
    expect(result).toEqual([]);
  });

  it('rejects if any callback rejects', async () => {
    const input = [1, 2, 3];
    const callback = (x: number) => x === 2 ? Promise.reject(new Error('fail')) : asyncDouble(x);
    await expect(mapAsyncLimit(input, callback, 2)).rejects.toThrow('fail');
  });
});