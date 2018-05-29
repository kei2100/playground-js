/*
 * await
 * awaitは、async functionの中で、await指定した関数のPromiseの結果が返されるまで待機する
 * awaitは、async functionの中でしか使用できない
 */

test('await', async () => {
  const f1 = () => {
    return new Promise(resolve => {
      setTimeout(resolve.bind(undefined, 'f1'), 10);
    })
  };

  const f2 = async function () {
    return 'f2'
  };

  const f3 = async function () {
    const v1 = await f1();
    const v2 = await f2();
    return v1 + v2;
  };

  await expect(f3()).resolves.toBe('f1f2');
});

test('await with for', async () => {
  const f1 = async function () {
    return 1;
  };

  const f2 = async function () {
    let v = 0;
    for (let i = 0; i < 3; i++) {
      v += await f1();
    }
    return v;
  };

  await expect(f2()).resolves.toBe(3);
});

test('await promise all', async () => {
  const f1 = async function () { return 1; };
  const f2 = async function () { return 2; };

  const f3 = async function () {
    const [v1, v2] = await Promise.all([f1(), f2()]);
    return v1 + v2;
  };

  await expect(f3()).resolves.toBe(3);
});

test('await handle reject in try catch', async () => {
  const ok = function () { return new Promise(resolve => { resolve(1); }); };
  const ng = function () { return new Promise((resolve, reject) => { reject(100); }); };

  const f = async function () {
    let v = 0;

    try {
      v += await ok();
      v += await ok();
      v += await ok();
      v += await ng();
    } catch (e) {
      expect(e.toString()).toBe('100');
    }
    return v;
  };

  await expect(f()).resolves.toBe(3);
});
