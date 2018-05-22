// async function
// - async function は呼び出されるとPromiseを返す
// - async function が値をreturnした場合、その値でPromiseがresolveされる
// - async function がthrowした場合、Promiseはrejectされる

test('async function resolve', () => {
  async function f() {
    return 'resolve!';
  }

  f().then(v => {
    expect(v).toBe('resolve!');
  });
});

test('async function reject', () => {
  async function f() {
    throw new Error('oops');
  }

  f().catch(err => {
    expect(err).toThrow('oops');
  });
});
