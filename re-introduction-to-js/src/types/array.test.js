test('length always returns one more than the highest index', () => {
  // 「常に一番大きな添字より1大きい値」なのでこういうことが起こる
  const arr = ['a', 'b'];
  arr[100] = '!';
  expect(arr.length).not.toBe(3);
  expect(arr.length).toBe(101);
});

test('for loop', () => {
  const arr = [1, 2, 4];
  let sum = 0;

  for (const v of arr) {
    sum += v;
  }
  expect(sum).toBe(7);

  // 「for in」 でも「length」以外の添字をプロパティとして列挙してループできるが、
  // だれかがArray.prototypeに新しいプロパティをパッチしていたりしたら、それも列挙してしまうので、
  // 「for in」によるループは推奨されない。

  // arr.forEachでももちろんOK
});
