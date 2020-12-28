# webpack.config.js

webpack.config.jsファイルを用意することでwebpackの挙動を調整できます。
プロジェクトフォルダの配下に作成して、webpackの設定を行います。

## entry/output

よく使う設定として、entryと、outputがあります。
entryは、webpackがビルドする際に開始点となるjsファイルを設定します。
outputは、ビルドファイルの設定。どこにどのようなファイルを出力すればよいか設定します。

webpack.config.jsファイル：

```js
module.exports = {
  // 開始点となるjsファイルの設定
  entry: `./src/index.js`,

  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/dist`,
    // 出力ファイル名
    filename: "main.js"
  }
};
```

## その他の設定

### mode

modeは、modeはどのように最適化するかを指定できるものでdevelopmentで開発用（ソースマップを有効にする）、productionで本番用（JavaSciptのコードを圧縮する）、noneで最適化しない。を指定できます。デフォルトはproductionです。

```js
module.exports = {
...
  mode: "development"
...
};
```

### devtool

devtoolは、ソースマッピングのスタイルを選択して、デバッグプロセスを強化します。指定可能な値はstringとfalseです。

```js
module.exports = {
...
  devtool: 'cheap-module-eval-source-map',
...
}
```

### target

targetは、特定の環境をターゲットにするようにwebpackに指示してくれます。

```js
module.exports = {
...
  target: 'node',
...
}
```

### module

moduleは、特定の環境をターゲットにするようにwebpackに指示してくれます。以下の例では、'node'と設定しているので、Node.jsのような環境で使用するためにコンパイルしてます。

```js
...
module.exports = {
...
  target: 'node',
...
}
```

この他にも色々な設定があるので、気になる人は公式ドキュメントを参照してみてください。<https://webpack.js.org/concepts/>