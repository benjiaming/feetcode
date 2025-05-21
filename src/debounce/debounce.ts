
export function debounce(fun: (...args: any[]) => void, ms: number) {
    let timeoutId: NodeJS.Timeout | undefined;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            timeoutId = undefined;
            return fun.apply(this, args);
        }, ms)
    }
}

export default function cancellableDebounce(func: { apply: (arg0: any, arg1: any) => void; }, wait: number) {
    let tid = null
    let context
    let invokeArgs
    function clearTimer() {
      clearTimeout(tid)
      tid = null
    }
    function invoke() {
      if (tid === null) return
      clearTimer()
      func.apply(context, invokeArgs)
    }
    function fn(...args) {
      context = this
      invokeArgs = args
      tid = setTimeout(() => {
        clearTimeout(tid)
        invoke()
      }, wait)
    }
    fn.cancel = clearTimer
    fn.flush = invoke;
    return fn
}