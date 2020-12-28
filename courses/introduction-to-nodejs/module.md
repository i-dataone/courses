# モジュール
<!-- 文章を修正 -->
モジュールとは、JavaScriptのライブラリと同じです。Node.jsでの開発では、実装済みのモジュールをインストールするで効率的に開発を進めることができます。Node.js組み込み関数のドキュメント:<https://www.w3schools.com/nodejs/ref_modules.asp>

## モジュールの利用

モジュールを使うためには、`require()`を記述することで、Node.jsで使えるようになります。

### 基本構文と書き方

基本的には、以下のような書き方で利用します。

```JavaScript
const 変数 = require(パッケージ名)
const 変数 = require(モジュールのファイルパス)
```

パッケージ名で指定したパッケージを拡張機能として呼び出せます。

### モジュールの読み込み

実際に、requireを使った具体例を見ていきます。
今回は、動作確認でおこなったHelloWorldコードでもちいた「httpモジュール」を書いていきます。

Node.jsでrequireを使って「http」読み込んでいきます。

```JavaScript
//httpモジュールの読み込み
const http = require('http')
//httpの利用
http.createServer(サーバ側の処理)
```

「http」の読み込みができたので、HTTPモジュールにアクセスができるようになり、サーバが作成できました。

## 独自のモジュール

独自のモジュールを作成して、利用することもできます。モジュールを作成するには、`exprts()`を利用することで作成できます。

### 作成構文

```JavaScript
exports.メソッド名 = function(変数) {
    return 処理
};
```

このモジュールは、以下の構文で呼び出せます。

```JavaScript
const 変数 = require(モジュールのファイルパス)
```
