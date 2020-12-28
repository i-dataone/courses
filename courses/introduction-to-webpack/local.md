# ローカルサーバー起動
CommandLineから毎回ビルドコマンドを打ち込むのは時間がかかり、非効率です。ファイルの変更を検知し（watch）、自動的にビルドコマンドを実行し、ブラウザをリロードする手順を自動化することができます。

## nmpモジュールインストール

webpack関連モジュールとwebpack-dev-serverモジュールをインストールします。

```shell
npm i -D webpack webpack-cli webpack-dev-server
```

インストールすると、package.jsonのファイルが書き変わります。
"start": "webpack serve"は追記しておきます。

```json
{
  "scripts": {
    "build": "webpack",
    "start": "webpack serve"
  },
  "devDependencies": {
    "webpack": "^5.0.0",
    "webpack-cli": "^4.0.0",
    "webpack-dev-server": "^3.11.0"
  },
  "private": true
}
```