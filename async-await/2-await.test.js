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

