import EventEmitter from './event-emitter';

describe('EventEmitter', () => {
  let emitter: EventEmitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  it('calls listeners when event is emitted', () => {
    const fn = jest.fn();
    emitter.on('foo', fn);
    emitter.emit('foo', 1, 2);
    expect(fn).toHaveBeenCalledWith(1, 2);
  });

  it('returns true if listeners are called, false otherwise', () => {
    const fn = jest.fn();
    emitter.on('foo', fn);
    expect(emitter.emit('foo')).toBe(true);
    expect(emitter.emit('bar')).toBe(false);
  });

  it('removes a listener with off', () => {
    const fn = jest.fn();
    emitter.on('foo', fn);
    emitter.off('foo', fn);
    emitter.emit('foo');
    expect(fn).not.toHaveBeenCalled();
  });

  it('removes only one instance of a duplicated listener', () => {
    const fn = jest.fn();
    emitter.on('foo', fn).on('foo', fn);
    emitter.off('foo', fn);
    emitter.emit('foo');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('supports chaining', () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();
    emitter.on('foo', fn1).on('foo', fn2);
    emitter.emit('foo');
    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
  });
});