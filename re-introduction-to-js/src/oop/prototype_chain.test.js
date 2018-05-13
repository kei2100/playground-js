/*
 * JavaScript には1つだけ、継承が発生する要素があります。オブジェクトです。
 *
 * どのオブジェクトもプロトタイプと呼ばれる、他のオブジェクトへの内部的な繋がりを持っています。
 * そのプロトタイプオブジェクトも自身のプロトタイプを持っており、あるオブジェクトのプロトタイプが null に到達するまでそれが続きます。
 * null は、定義によれば、プロトタイプを持たず、プロトタイプチェーンの最終リンクとなります。
 *
 * 新たに生成されたオブジェクト o は、その [[Prototype]] として Object.prototype を持ちます。
 * Object.prototype のプロトタイプは null です。
 * o ---> Object.prototype ---> null
 *
 *
 * 配列 a は Array.prototype（indexOf、forEach などのようなメソッドを持っている）から継承します。
 * a ---> Array.prototype ---> Object.prototype ---> null
 *
 * 関数 f は Function.prototype（call、bind などのようなメソッドを持つ）から継承します。
 * f ---> Function.prototype ---> Object.prototype ---> null
 *
 *
 * new 演算子を使ってコンストラクタ関数 G を呼び出してオブジェクト g を生成した場合、
 * g[[Prototype]]は new G() が実行される時点の G.prototype の値です。
 * g ---> G.prototype ---> Object.prototype ---> null
 *
 *
 * ECMAScript 5 は Object.create という新しいメソッドを紹介しています。
 * このメソッドを呼び出すと、新しいオブジェクトが生成されます。
 * 関数の最初の引数が、このオブジェクトのプロトタイプになります。
 * g = Object.create(G.prototype)で、以下になる。
 * g ---> G.prototype ---> Object.prototype ---> null
 *
 * ECMAScript 6 はクラスを実装する新たなキーワードのセットを導入しました。
 * これらの要素はクラスベースの言語の開発者にはよく知られたもののようですが、同じではありません。
 * JavaScript は引き続き、プロトタイプベースの言語です。
 * 新たなキーワードは class、constructor、static、extends、super です。
 */


/*
 * プロトタイプチェーンの上層にあるプロパティの検索時間は、性能に悪影響を及ぼす可能性があり、性能が重要であるコードにおいて、意義深いものになるかもしれません。
 * 加えて、存在しないプロパティへのアクセスは、常にプロトタイプチェーン全体を通過します。
 *
 *
 * また、オブジェクトのプロパティを順に処理する際、プロトタイプチェーンにあるすべての列挙可能なプロパティが列挙されます。
 * あるプロパティがプロトタイプチェーンのどこかではなく、オブジェクト自身に定義されたものであるかどうかを調べるには、
 * すべてのオブジェクトが Object.prototype から継承している hasOwnProperty メソッドを使う必要があります。
 *
 * hasOwnProperty は JavaScript において唯一、プロトタイプチェーンを通らずにプロパティを扱うものです。
 * 注: プロパティが undefined かどうかを調べるには不十分です。そのプロパティが存在するが、偶然、値に undefined がセットされているだけという可能性も大いにあります。
 */