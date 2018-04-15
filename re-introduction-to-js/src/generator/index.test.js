test('basic', () => {
  const gen = (function* () {
    let i = 0;
    while (true) {
      yield i++;
    }
  })();

  expect(gen.next().value).toBe(0);
  expect(gen.next().value).toBe(1);
  expect(gen.next().value).toBe(2);
});

test('with iterable', () => {
  const gen = (function* () {
    yield* 'abc';
  })();

  expect(gen.next().value).toBe('a');
  expect(gen.next().value).toBe('b');
  expect(gen.next().value).toBe('c');
  expect(gen.next().value).toBe(undefined);
  expect(gen.next().done).toBe(true);
});
