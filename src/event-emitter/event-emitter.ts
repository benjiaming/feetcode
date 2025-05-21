export default class EventEmitter {
listeners: Map<string,any>
  constructor() {
    this.listeners = new Map()
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
  on(eventName: string, listener: Function) {
    const current = this.listeners.get(eventName) || []
    current.push(listener)
    this.listeners.set(eventName, current)
    return this
  }

  /**
   * @param {string} eventName
   * @param {Function} listener
   * @returns {EventEmitter}
   */
off(eventName: string, listener: Function) {
  const allListeners = this.listeners.get(eventName)
  if (!allListeners) { return this }

  const newListeners =  [] 
  let removedAlready = false
  for (const l of allListeners) {
  if (l === listener && !removedAlready) {
    removedAlready = true;
    continue;
  }
  newListeners.push(l);
}
  this.listeners.set(eventName, newListeners)
  return this
}

  /**
   * @param {string} eventName
   * @param  {...any} args
   * @returns {boolean}
   */
  emit(eventName, ...args) {
    const listeners = this.listeners.get(eventName)
    if (!listeners || listeners.length < 1) {
      return false
    }
    listeners.forEach(l => l.apply(this, args))
    return true
  }
}