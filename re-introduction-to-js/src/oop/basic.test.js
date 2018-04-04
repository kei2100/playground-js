function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

test('What is `new`', () => {
  /*
  new は this と強い関連があります。
  これは新しい空のオブジェクトを作り、this にその新しいオブジェクトをセットして、後に続く関数を呼びます。
  this に指定された関数は値を返しているのではなく、単に this オブジェクトを変更していることに注意してください。
  this オブジェクトを呼び出し元に返しているのは new です。
  new によって呼ばれるよう設計された関数はコンストラクター関数と呼ばれます。
  new によって呼ばれるということがわかるよう、先頭を大文字にすることがよく行われています。
   */

  p = new Person('Reggie', 'Miller');
  expect(`${p.firstName} ${p.lastName}`).toBe('Reggie Miller');
});

/*
 Person.prototype は Person のすべてのインスタンスで共有されるオブジェクトです。
 これは (「プロトタイプチェーン」という特別な名前を持った) ルックアップチェーンの一部を構成します。
 Person の何もセットされていないプロパティにアクセスしようとするときはいつでも、
 JavaScript は Person.prototype が代わりのプロパティを持っているか確認します。
 結果として、Person.prototype に割り当てられたプロパティはすべて
 this オブジェクトを通じてコンストラクターのすべてのインスタンスで利用できるようになります。
 */
Person.prototype.fullName = function () {
  return `${this.firstName} ${this.lastName}`
};

test('what is `prototype`', () => {
  p = new Person('Reggie', 'Miller');
  expect(p.fullName()).toBe('Reggie Miller');
});

/*
 プロトタイプはチェーンの一部を構成します。
 チェーンの根は Object.prototype であり、toString() メソッドを含んでいます。
 これはオブジェクトを文字列で表そうとするときに呼ばれるメソッドです。
 */
test('toString()', () => {
  p = new Person('Reggie', 'Miller');
  expect(p.toString()).toBe('[object Object]')
});

test('toString() override', () => {
  Person.prototype.toString = function () {
    return this.fullName()
  };

  p = new Person('Reggie', 'Miller');
  expect(p.toString()).toBe('Reggie Miller')
});
