test('concat', () => {
  // 文字列を数字 (や他の値) に足すと、すべてのものはまず最初に文字列に変換されます
  expect('1' + 2 + 3).toBe('123');
});

test('template literal', () => {
  s = `In JavaScript \n is a line-feed.`;
  want = `In JavaScript 
 is a line-feed.`;

  expect(s).toBe(want);
});