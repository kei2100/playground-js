/*
 * await
 * awaitは、async functionの中で、await指定した関数のPromiseの結果が返されるまで待機する
 * awaitは、async functionの中でしか使用できない
 */

test('await', () => {
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
    const v2 =await f2();
    return v1 + v2;
  };

  f3().then(v => { expect(v).toBe('f1f2'); })
});

