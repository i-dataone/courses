# 静的ファイルサーバ

フレームワークを利用せず、Node.jsだけで静的ファイルサーバを作成する方法を紹介していきます。

## ファイルの作成

最初に、「app.js」というファイルを作成してください。作成後、コードを追加して行きます。

## モジュールの読み込み

今回は、3つのモジュールを読み込んでいきます。
`http`、`fs`、`path`を用意します。
| モジュール  | 説明 |
| ---------- | ----- |
| http | HTTPを介してデータを転送させるモジュール |
| fs | ファイルシステムの操作するモジュール |
| path | ディレクトリとファイルパスを操作するモジュール |

```JavaScript
const http = require('http')
const fs = require('fs')
const path = require('path')
```

## サーバの構築

サーバを作成してリッスンポートも設定していきます。
今回のリッスンポートは、3000番に設定しておきます。

|   メソッド  | 説明 |
| ---------- | ---- |
|   createServer  | コンピュータでサーバ作成 |

```JavaScript
http.createServer(function (req, res) {
    //処理を記載
}).listen(3000);
```

## ファイルパスの設定

ファイルパスを設定するコードを書いていきます。
ファイル名がないときは、デフォルト名を設定するようにします。コードは、サーバ構築した中に記載していきます。

```JavaScript
let filePath = '.' + req.url;
if (filePath == './') {
    filePath = './index.html'
}
```

sample.orgというURLを要求したときには、sample.org/index.htmlになります。

## ファイルの拡張子の確認

要求されたファイルの拡張子を確認し、一致したタイプを使います。

|   メソッド  | 説明 |
| ---------- | ---- |
| extname | ファイル名の拡張子を返すメソッド |
| toLowerCase | 文字列を小文字に変換するメソッド |

```JavaScript
let extname = String(path.extname(filePath)).toLowerCase();
let types = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.svg': 'application/image/svg+xml'
};

let contentType = types[extname] || 'application';
```

## ファイルの読み込み

|   メソッド  | 説明 |
| ---------- | ---- |
| readFile | ファイルの内容全体を非同期に読み込むメソッド |

```JavaScript
fs.readFile(path[,options], callback)
//path:ファイル名
//options: 文字コードなど
//callback: 機能(error, data)
//dataは、ファイルの内容
```

filePathを用いて、ファイルを読み込む処理を書いていきます。

```JavaScript
fs.readFile(filePath, function(error, content){
    //処理を記載
})
```

## エラー処理

存在しないファイルが要求されたとき(ENOENT)に、エラーコードを返すページを返す処理を書いていきます。

```JavaScript
if(error.code == 'ENOENT') {
    fs.readFile('./404.html', function(error, content) {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
    });
}
else {
    res.writeHead(500);
    res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
    res.end();
}
}
```

## 完成コード

これで、静的ファイルサーバの完成です。

```JavaScript
const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function (req, res) {
    console.log('request ', req.url);

    let filePath = '.' + req.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    let extname = String(path.extname(filePath)).toLowerCase();
    let types = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    let contentType = types[extname] || 'application';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./404.html', function(error, content) {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                });
            }
            else {
                res.writeHead(500);
                res.end('check with the site: '+error.code+' ..\n');
                res.end();
            }
        }
        else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });

}).listen(3000);
```
