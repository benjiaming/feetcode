import classNames from './classnames';

describe('classNames', () => {
  it('joins strings and numbers', () => {
    expect(classNames('foo', 'bar', 1, 0)).toBe('foo bar 1 0');
  });

  it('handles objects with truthy values', () => {
    expect(classNames({ foo: true, bar: false, baz: 1 })).toBe('foo baz');
  });

  it('handles arrays', () => {
    expect(classNames(['foo', 'bar'], 'baz')).toBe('foo bar baz');
  });

  it('handles nested arrays', () => {
    expect(classNames(['foo', ['bar', ['baz']]])).toBe('foo bar baz');
  });

  it('handles mixed input', () => {
    expect(classNames('foo', [null, false, 'bar'], { baz: true, qux: false }, 0)).toBe('foo bar baz 0');
  });

  it('returns empty string for no arguments', () => {
    expect(classNames()).toBe('');
  });

  it('ignores falsy values', () => {
    expect(classNames(null, undefined, false, '', 0)).toBe('0');
  });
});