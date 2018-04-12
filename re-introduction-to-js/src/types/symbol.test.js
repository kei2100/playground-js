test('usage', () => {
  const sym = Symbol();
  // typeof
  expect(typeof sym).toBe('symbol');

  // 一度作成したSymbolはそれ自身とのみ一致する
  // 渡した文字列はデバッグのために使われる
  const symA = Symbol("sym");
  const symB = Symbol("sym");

  expect(symA === symB).toBe(false);
  expect(symA == symB).toBe(false);

  // Objectのキーとして使える
  const prop = Symbol();
  const obj = {};
  obj[prop] = 'prop!';

  expect(obj[prop]).toBe('prop!');
  expect(obj.prop).toBe(undefined);    // 別物
  expect(obj['prop']).toBe(undefined); // これも

  // Symbolのオブジェクトプロパティは列挙可能ではない
  obj['prop2'] = 'prop2!';
  expect(Object.keys(obj)).toEqual(['prop2']);
});

