test('usage', () => {
  // iteratorは、
  // - next()メソッドを持ち、メソッドを呼ぶとiteratorResultを返却するオブジェクトのこと

  // iteratorResultは、iterator.next()により返却されるオブジェクトで、下記どちらかのプロパティを持つオブジェクトのこと
  // - value: iteratorに要素がある場合、その値
  // - done: iteratorに要素が存在しない場合、true

  // また、Symbol.iteratorキーのプロパティを持ち、iteratorを返却するオブジェクトのことを
  // iterable（反復可能オブジェクト）という。

  // iterableオブジェクトは、for ... ofで繰り返すことができる。

  const iterator = () => {
    let v = -1;
    return {
      next() {
        v++;
        return (v < 10) ? { value: v } : { done: true };
      }
    };
  };

  const iterable = {};
  iterable[Symbol.iterator] = () => { return iterator() };

  let want = 0;
  for (const v of iterable) {
    expect(v).toBe(want);
    want++;
  }
  expect(want).toBe(10);

  // String, Array, TypedArray, Map, Setのビルトインオブジェクトはiterable
  // [Symbol.iterator]()で返却するiteratorは、それ自体がiterableで、さらに[Symbol.iterator]()を呼ぶと自分自身を返す。

  arr = [0, 1, 2];
  arrItr = arr[Symbol.iterator]();
  expect(arrItr[Symbol.iterator]()).toBe(arrItr);

  // arrItr自体がiterableなので for ... ofできる
  want = 0;
  for (const v of arrItr) {
    expect(v).toBe(want);
    want++;
  }
  expect(want).toBe(3);
});
