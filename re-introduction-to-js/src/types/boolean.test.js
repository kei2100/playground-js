test('falsy', () => {
  [
    false,
    0,
    "",
    NaN,
    null,
    undefined
  ].forEach(v => {
    expect(Boolean(v)).toBe(false);
    // 上記以外は全てtruthy
  })
});
