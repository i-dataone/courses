# Node.jsの紹介
<!-- もう少し追加 -->
Node.jsは、サーバでの処理をJavaScriptで制御できるオープンソースサーバ環境です。フロントの処理もサーバの処理も同じJavaScriptで構築することができるため、Webサイトだけでなく、IoTやスマホアプリなどにも用いられています。また、様々なプラットフォーム（Windows、Linux、Unix、MacOSなど）で実行できます。

## Node.jsのインストール

### windowsプラットフォーム

windows開発者は、Node.jsの公式サイトで直接ダウンロードすることができます<https://nodejs.org/ja/download/>。インストールした後に、コマンドプロンプト（以後「cmd」という）で以下のコマンドを実行してください。

```shell
C:\> node --version
v14.15.1
```

Node.jsのバージョンが表示されれば、無事にインストールができています。もし、バージョンが表示されない場合は、再度インストールを行っていください。

### MacOSプラットフォーム

Mac開発者は、Node.jsの公式サイトで直接ダウンロードすることができます<https://nodejs.org/ja/download/>。また、Homebrewで`brew install nodebrew`を実行、`nodebrew install-binary v14.15.1`をすることでもインストールできます。
nodevrewは、Node.jsのバージョン管理ツールです。
Node.jsのインストールの際は、v~は、バージョンの指定ができます。

## 動作確認

動作確認として、HelloWorldコードを見ていきます。
表示の方法としては、コンソールとWebブラウザでの表示を書いていきます。最初に、「HelloWorld.js」というファイルを作成してください。

### コンソールでのHello World

コンソールで「HelloWorld」を表示させます。
以下のように作成したファイルにコードを追加してください。

HelloWorld.js

```JavaScript
console.log('Hello world');
```

cmd

```shell
C:\> node HelloWorld.js
Hello world //表示
```

cmdのみで'Hello world'が表示されます。

### WebブラウザでのHello World

Webブラウザに「HelloWorld」を表示させます。
以下のようにコードを追加してください。

```JavaScript
const http = require('http');
const port = 3000;

const server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});

server.listen(port, () => {
    console.log(`Server running at http:// ${port}`);
})
```

コードの追加後、cmdで`node HelloWorld.js`を入力しWebサーバを起動しましょう。
cmdに`Server running at http://3000/`と表示されていることを確認し、`http://localhost:3000`にアクセスすると、'Hello World'が表示されています。
※実行後にエラーが出る場合は、コードの記述、実行ファイル名、実行ディレクトリなどを再度確認してください。
