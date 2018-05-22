// strict モードはスクリプト全体または個別の関数に適用できます
// strictモードのスクリプトと、そうでないスクリプトを連結すると問題になる可能性がある
// そういった場合に、関数適用を考える

test('unexpected global variable definition', () => {
  'use strict';
  expect(() => {
    hoge = 1;
  }).toThrow(ReferenceError);
});

test('no-strict unexpected global variable definition', () => {
  expect(() => {
    hoge = 1;
  }).not.toThrow(ReferenceError);
});

test('unexpected assignment', () => {
  expect(() => {
    // Assignment to a non-writable property
    'use strict';
    const obj1 = {};
    Object.defineProperty(obj1, "x", {value: 42, writable: false});
    obj1.x = 9; // throws a TypeError
  }).toThrow(TypeError);

  expect(() => {
    // Assignment to a getter-only property
    'use strict';
    const obj2 = {
      get x() {
        return 17;
      }
    };
    obj2.x = 5; // throws a TypeError
  }).toThrow(TypeError);

  expect(() => {
    // Assignment to a new property on a non-extensible object
    'use strict';
    const fixed = {};
    Object.preventExtensions(fixed);
    fixed.newProp = "ohai"; // throws a TypeError
  }).toThrow(TypeError);
});

test('invalid delete a property', () => {
  expect(() => {
    'use strict';
    delete Object.prototype;
  }).toThrow(TypeError);
});
