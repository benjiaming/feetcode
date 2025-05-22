/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * @return {Promise}
 */
export default function mapAsyncLimit<T, R>(
    iterable: T[],
    callbackFn: (item: T) => Promise<R>,
    size: number = Infinity
): Promise<R[]> {
    if (!iterable.length) return Promise.resolve([])
    if (size <= 0) {
        return Promise.reject(new Error('Size must be greater than 0'))
    }
    const results = new Array(iterable.length)
    let resolved = 0
    let nextItem = 0
    return new Promise((resolve, reject) => {
        function runNext(i) {
            nextItem++
            callbackFn(iterable[i]).then(result => {
                results[i] = result
                resolved++
                if (resolved === iterable.length) {
                    resolve(results)
                    return
                }
                if (nextItem < iterable.length) {
                    runNext(nextItem)
                }
            }).catch(reject)

        }
        for (let i = 0; i < Math.min(iterable.length, size); i++) {
            runNext(i)
        }
    })
}
