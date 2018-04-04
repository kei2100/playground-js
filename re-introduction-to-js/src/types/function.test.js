test('rest parameters', () => { // = var args
  const fn = (...args) => {
    return args.reduce((a, v) => { return a + v });
  };

  expect(fn(1, 2, 4)).toBe(7);
  expect(fn.apply(null, [1, 2, 4])).toBe(7);
  expect(fn(...[1, 2, 4])).toBe(7);
});
