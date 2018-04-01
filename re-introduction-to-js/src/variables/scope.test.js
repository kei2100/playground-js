test('let scope', () => {
  expect(() => {
    expect(v).toBe(undefined);  // may be throw ReferenceError
    let v = 0;
    expect(v).toBe(0);
  }).toThrow(ReferenceError);
});

test('const scope', () => {
  expect(() => {
    expect(v).toBe(undefined);  // may be throw ReferenceError
    const v = 0;
    expect(v).toBe(0);
  }).toThrow(ReferenceError);
});

test('var scope', () => {
  expect(() => {
    expect(v).toBe(undefined);  // may be undefined
    var v = 0;
    expect(v).toBe(0);
  }).not.toThrow(ReferenceError);
});
