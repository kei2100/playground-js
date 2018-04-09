test('define with method', () => {
  const o = {
    myMethod1: function (v) {
      return v + v;
    }
  };
  expect(o.myMethod1(1)).toBe(2);
});

test('getter setter', () => {
  const o = {
    _prop: 0,
    get prop() { return this._prop },
    set prop(v) { this._prop = +(v) }
  };
  o.prop = 10;
  expect(o.prop).toBe(10);
});

test('short hand property and method names', () => {
  const prop = 100;
  const o = {
    prop,
    meth(v) {
      return v + v;
    }
  };
  expect(o.prop).toBe(100);
  expect(o.meth(1)).toBe(2);
});

test('computed property names', () => {
  const prop = 'foo';
  const o = {
    [prop]: 'bar'
  };
  expect(o.foo).toBe('bar');
});

test('property traverse', () => {
  const obj = {
    '1': 1,
    '2': 2
  };
  for (const k in obj) {
    expect(obj[k]).toBe(parseInt(obj[k]))
  }

  Object.keys(obj).forEach(k => { expect(obj[k]).toBe(parseInt(obj[k])) });

  // getOwnPropertyNamesは「列挙不可能な」プロパティもまとめて返す
  const arr = ['a', 'b'];
  expect(Object.keys(arr)).toEqual(['0', '1']);
  expect(Object.getOwnPropertyNames(arr).sort()).toEqual(['0', '1', 'length'])

  // 列挙不可能なプロパティ
  const obj2 = Object.create({}, {
    getOne: {
      value: () => { return 1 },
      enumerable: false
    }
  });
  expect(Object.keys(obj2)).toEqual([]);
  expect(Object.getOwnPropertyNames(obj2)).toEqual(["getOne"]);
});

test('Object.create()', () => {
  // オブジェクトは Object.create() メソッドを使用して作成することもできる。
  // このメソッドは、コンストラクター関数の定義なしに作りたいオブジェクトのプロトタイプを選べる

  const base = {
    type: 'unknown',
    toString: function() { return `[${this.type}]` }
  };

  const atype = Object.create(base);
  atype.type = 'A';
  expect(atype.toString()).toBe('[A]')
});
