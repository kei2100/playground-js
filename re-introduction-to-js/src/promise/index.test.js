/*
 Promiseの状態は以下のいずれかとなります。
 - pending: 初期状態。成功も失敗もしていません。
 - fulfilled: 処理が成功して完了したことを意味します。
 - rejected: 処理が失敗したことを意味します。

  Promise.prototype.then メソッドと
  Promise.prototype.catch メソッドもまたPromiseを返すので、
  これらをチェーン(連鎖)させることができます。
 */

test('promise resolve', done => {
  p = new Promise((resolve) => {
    setTimeout(() => { resolve('ok') }, 1)
  });

  p.then(v => {
    expect(v).toBe('ok');
    done();
  }).catch(() => {
    done.fail('oops')
  });
});

test('promise reject', done => {
  p = new Promise((resolve, reject) => {
    setTimeout(() => { reject('fail') }, 1)
  });

  p.then(() => {
    done.fail('oops')
  }).catch(v => {
    expect(v).toBe('fail');
    done();
  });
});

// ちなみにjestではもっと良いexpectの仕方がある
// https://facebook.github.io/jest/docs/ja/expect.html#resolves

test('promise chaining', done => {
  let sum = 0;

  p = Promise.resolve().then(() => {
    sum += 1;
  }).then(() => {
    sum += 2;
  }).then(() => {
    return Promise.reject('oops')
  }).then(() => {
    sum += 4;
  });

  p.then(() => {
    done.fail('want error');
  }).catch(v => {
    expect(sum).toBe(3);
    expect(v).toBe('oops');
    done();
  })
});

test('promise all', done => {
  Promise.all([
    new Promise((resolve) => { resolve(1) }),
    new Promise((resolve) => { resolve(2) }),
    new Promise((resolve) => { resolve(4) }),
  ]).then(results => {
    expect(results.reduce((a, b) => { return a + b })).toBe(7);
    done();
  })
});

test('promise race', done => {
  Promise.race(
    [
      new Promise((resolve) => { setTimeout(resolve.bind(null, 1), 10) }),
      new Promise((resolve) => { setTimeout(resolve.bind(null, 2), 20) }),
      new Promise((resolve) => { setTimeout(resolve.bind(null, 4), 40) }),
    ]
  ).then(v => {
    expect(v).toBe(1);
    done();
  });
});
