/*
JavaScript の型付き配列は配列状のオブジェクトであり、生のバイナリデータにアクセスする手段を提供します。

すでにご存知のとおり、Array オブジェクトは動的に拡大または縮小され、任意の JavaScript 値を持つことができます。
JavaScript エンジンは、これらの配列を高速化するために最適化を実施します。

一方、Web アプリケーションがより強力になり動画を操作する、あるいは WebSocket を使用して生データにアクセスするなどさまざまな機能が追加されるため、
JavaScript コードがより速く動作する、また型付き配列により生のバイナリデータの操作が容易になることが有益であると考えられるのは明らかです。
 */

test('usage', () => {
  buf = new ArrayBuffer(16); // 16バイト固定長のバッファを作成
  expect(buf.byteLength).toBe(16); // バッファ状態だとできることはせいぜいサイズを知ることくらい

  const i32view = new Int32Array(buf); // バッファに対し、一つの要素を32ビット（4バイト）として扱うビューを用意
  for (let i = 0; i < i32view.length; i++) {
    i32view[i] = i * 2;
  }
  expect(Array.from(i32view)).toEqual([0, 2, 4, 6]);  // 16バイトのバッファを4バイトずつで区切るので4要素

  const i16view = new Int16Array(buf); // 別のビューで見てみると...。
  expect(Array.from(i16view)).toEqual([0, 0, 2, 0, 4, 0, 6, 0]);  // 埋められた16バイトのバッファを2バイト区切りで見るので、こうなる。
});
