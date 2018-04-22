test('proxy hello world', () => {
  // Proxy
  // - 特定の操作に割り込める
  // - 例えばプロパティの取得操作に割り込めば、rubyのmethod_missingのようなことができる

  // Proxyの概念
  //
  // - handler
  //   - 下記のtrapを提供するためのオブジェクト
  // - trap
  //   - 特定の割り込みに反応するメソッド
  //   - 例えば、「get」トラップはプロパティへのアクセスに反応し、「set」トラップはプロパティへの代入に反応する
  //   - いろいろなtrapがある。https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler
  // - target
  //   - Proxy が仮想化するオブジェクト
  //   - var p = new Proxy(target, handler)のようにtargetを仮想化する
  // - invariant（不変条件）
  //   - プロキシで変えてはいけない挙動。違反すると「TypeError」が返却される
  //   - 例えばenumerateトラップではオブジェクトを返す必要がある、など


  // e.g. method_missing的

  const target = {
    someMethod() {
      return 'someMethod';
    }
  };

  const handler = {
    // getトラップ
    get: (target, name) => {
      return name in target ? target[name] : () => { return 'oops' };
    }
  };

  const p = new Proxy(target, handler);

  expect(p.someMethod()).toBe('someMethod');
  expect(p.nothingMethod()).toBe('oops');
});

test('proxy revokable', () => {
  const target = {
    someMethod() {
      return 'someMethod';
    }
  };

  const handler = {
    get: (target, name) => {
      return name in target ? target[name] : () => { return 'oops' };
    }
  };

  const revokable = Proxy.revocable(target, handler)
  const p = revokable.proxy;

  expect(p.someMethod()).toBe('someMethod');
  expect(p.nothingMethod()).toBe('oops');

  revokable.revoke();

  // revokeするとどんな操作もTypeErrorになる
  expect(() => { p.nothingMethod() }).toThrow(TypeError);
  expect(() => { p.someMethod() }).toThrow(TypeError);
});
