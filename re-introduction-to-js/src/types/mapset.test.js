/*
- Object のキーは StringsあるいはtoStringerなオブジェクトです、Map ならどんな値も使えます。
- Object はサイズを手作業で追跡する必要があるのに対し、Map は簡単にサイズを取得できます。
- Map の反復処理は要素の挿入順に行われます。
- Object はプロトタイプを持っているので、オブジェクトによるマップにはデフォルトキーが存在します（これは map = Object.create(null) を使って回避できます）。
 */

test('Map usage', () => {
  const m = new Map();
  m.set(1, 'one');
  m.set(2, 'two');
  expect(m.size).toBe(2);
  expect(m.has(1)).toBe(true);

  m.forEach((v, k) => {
    expect(m.get(k)).toBe(v);
  });
  m.clear();
  expect(m.size).toBe(0);
});

// WeakMapもある

/*
Map オブジェクトのキーの等値性と Set オブジェクトの値の等値性は両方とも、 「same-value-zero アルゴリズム」に基づいています:
- 等値性は同値演算子 === のように機能します。
- -0 と +0 は等しいと見なします。
- NaN は（=== とは逆に）自身と等しいと見なします。
 */

test('Set usage', () => {
  const s = new Set();
  s.add(1);
  s.add(2);
  expect(s.size).toBe(2);
  expect(s.has(2)).toBe(true);

  s.delete(2)
  expect(s.size).toBe(1);
  expect(s.has(2)).toBe(false);
});

// WeakSetもある
