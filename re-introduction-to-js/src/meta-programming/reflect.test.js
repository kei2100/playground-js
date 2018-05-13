test('reflect apply', () => {
  let ret;

  ret = Function.prototype.apply.call(String.fromCharCode, undefined, [104, 101, 108, 108, 111])
  expect(ret).toBe('hello');

  ret = String.fromCharCode.apply(undefined, [104, 101, 108, 108, 111]);
  expect(ret).toBe('hello');

  ret = Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111]);
  expect(ret).toBe('hello');
});

// 他にもProxyと組み合わせた使用なども