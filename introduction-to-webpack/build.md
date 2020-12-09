# ビルド

## ファイルの準備

プロジェクトフォルダの配下にsrcフォルダを作成し、試しにモジュール（index.jsとsub.js）を作成します。

index.js：

```js
//sub.js ファイルを読み込む。
import { hello } from "./sub"; 
hello();
```

sub.js：

```js
//hello関数
export function hello() {
  alert("hello！");
}
```

## package.jsonをカスタマイズ

モジュールはこのままだと、古いブラウザでは表示されません。
その為、古いブラウザが解釈できる形に変換（ビルド）する必要があります。

package.jsonファイルのscriptsにwebpackのビルドコマンドを追加します。
（package.jsonファイルには最低限scriptsとdevDependencies指定が記述されてあれば使えます。mainやauthorなどは消してしまっても問題ありません。）

package.json：

```json
{
  "scripts": {
    "build": "webpack"
  },
  "devDependencies": {
    "webpack": "^5.0.0",
    "webpack-cli": "^4.0.0"
  },
  "private": true
}
```

## ビルド
前述でpackage.jsonファイルに追記をしたことにより、`npm run build`とCommandLineで入力することで、内部的にwebpackが呼び出されて、index.js内で必要なsub.jsが統合され、distフォルダーのなかにmain.jsとして出力されます。

main.js：

```js
(()=>{"use strict";alert("hello！")})();
```

出力されたmain.jsをHTMLで読み込むと、バンドルされたコードが実行されます。
npx webpackコマンドでビルドするという方法もありますが、実際の開発ではnpm scriptsを使う方が便利なので、説明は割愛します。
