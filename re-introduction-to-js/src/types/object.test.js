test('define with method', () => {
  let o = {
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
