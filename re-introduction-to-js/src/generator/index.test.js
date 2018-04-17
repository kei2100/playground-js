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

  let i = 3;
  for (const v of gen) {
    expect(v).toBe(i++);
    if (i > 5) {
      break;
    }
  }
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

test('yield result', () => {
  const gen = (function* () {
    let i =0;
    while (true) {
      const reset = yield i++;
      if (reset) {
        i = 0;
      }
    }
  })();

  expect(gen.next().value).toBe(0);
  expect(gen.next().value).toBe(1);
  expect(gen.next().value).toBe(2);
  expect(gen.next(true).value).toBe(0);
});

test('throw exception from generator', () => {
  const gen = (function* () {
    let i = 0;
    while (true) {
      if (i < 1) {
        yield i++;
      } else {
        throw Error('oops');
      }
    }
  })();

  expect(gen.next().value).toBe(0);
  expect(() => { gen.next() }).toThrow('oops');
});

test('throw exception to generator', (done) => {
  const gen = (function* () {
    for (let i = 0; true; i++) {
      try {
        yield i;
      } catch (e) {
        expect(e.toString()).toBe('Error: oops');
        done();
      }
    }
  })();

  expect(gen.next().value).toBe(0);
  gen.throw(new Error('oops'));
});

test('process sequence', () => {
  let seq = [];

  const gen = (function* () {
    while (true) {
      seq.push('b');
      yield;
      seq.push('d')
    }
  })();

  seq.push('a');
  gen.next();
  seq.push('c');
  gen.next();
  expect(seq).toEqual(['a', 'b', 'c', 'd', 'b']);
});

test('return', () => {
  let seq = [];

  const gen = (function* () {
    while (true) {
      seq.push('b');
      yield;
      seq.push('d')
    }
  })();

  seq.push('a');
  gen.next();
  seq.push('c');
  expect(gen.return().done).toBe(true);
  expect(seq).toEqual(['a', 'b', 'c']);
});
