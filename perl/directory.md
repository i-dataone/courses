# Perl関数

よく使う関数は以下です：

* opendir DIRHANDLE, EXPR  # ディレクトリを開く
* readdir DIRHANDLE 　　　　# ディレクトリを読む
* rewinddir DIRHANDLE      # ディレクトリ先頭にポイントする
* telldir DIRHANDLE        # ディレクトリの位置を返す
* seekdir DIRHANDLE, POS   # ディレクトリのPOS位置をポイントする
* closedir DIRHANDLE       # ディレクトリを閉じる
  
## ディレクトリの操作

### ファイル表示

ファイルを表示するにはglob関数を使います：
例えば：

```Perl
my $dir = "/tmp/*";
my @files = glob($dir);
```

と実行する時、結果は/tmpディレクトリの全てのファイルを表示します。

### ファイルの作成

ファイル表示するのはmkdir関数を使います：

例えば：

```Perl
my $dir = "/tmp/Perl";
mkdir($dir);
print "ディレクトリ作成成功\n"
```

と実行する時、結果は

```ディレクトリ作成成功
```

になります。

### ファイルの切り替える

ファイル表示するのはchdir関数を使います：

例えば：

```Perl
my $dir = "/Hello";
chdir($dir);
print "ディレクトリの位置は $dir\n です。"
```

と実行すると、結果は

```ディレクトリの位置は /Hello です。
```

になります。
