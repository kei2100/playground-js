test('for of', () => {
  let sum = 0;
  for (let v of [1, 2, 4]) {
    sum += v;
  }
  expect(sum).toBe(7)
});

test('for in', () => {
  let sum = 0;
  const obj = {one: 1, two: 2, four: 4}
  for (let k in obj) {
    sum += obj[k];
  }
  expect(sum).toBe(7)
});
