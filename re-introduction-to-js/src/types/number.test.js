test('数値は double-precision 64-bit format IEEE 754 values', () => {
  expect(0.1 + 0.2).not.toBe(0.3);
  expect(0.1 + 0.2).toBe(0.30000000000000002);
  expect(0.1 + 0.2).toBe(0.30000000000000003);
  expect(0.1 + 0.2).toBe(0.30000000000000004);
  expect(0.1 + 0.2).toBe(0.30000000000000005);
  expect(0.1 + 0.2).toBe(0.30000000000000006);
  expect(0.1 + 0.2).toBe(0.30000000000000007);
});

test('parsing', () => {
  expect(parseInt('123', 10)).toBe(123);
  expect(+'123').toBe(123);

  expect(parseInt('0x10')).toBe(16);
  expect(parseInt('10', 16)).toBe(16);
  expect(parseInt('0x10', 16)).toBe(16);

  expect(parseInt('123abc', 10)).toBe(123)
  expect(+'123abc').toBe(NaN)
});
