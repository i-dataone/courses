# ファイル操作

Perlは、ファイルハンドルという変数を使用してファイルを操作します。
ファイルハンドルはファイルからデータを読み書きする時に使えます。ファイルハンドルは、I / O接続の名前です。

Perlには、標準入力、標準出力、および標準エラー出力をそれぞれ表すために、STDIN、STDOUT、およびSTDERRの3つのファイルハンドルが用意されています。

## ファイルハンドル名

ファイルハンドル名を付けるには規則があります。

1. 変数名にはアルファベット、数字、「＿」が使えます。
2. 先頭は数字を使えません。
3. 大文字と小文字が区別されていますが、一般的に全部大文字を付けます。

## ファイルの開閉関数

### open関数

`open`関数の書き方は以下の通りです：

```Perl
open(ファイルハンドル名, "ファイル名");
```

例：

```Perl
open(DATA, "file.txt");
```

ここでは、`file.txt`というファイルを開いて、`DATA`というファイルハンドルを設定しています。
あるいは

```Perl
open(ファイルハンドル名, "モード", "ファイル名");
```

ファイルは開けない場合は、`die`関数を使います。書き方は

```Perl
open(ファイルハンドル名, "ファイル名") or die(処理);
```

あるいは

```Perl
open(ファイルハンドル名, "ファイル名") || die(処理);
```

例：

```Perl
open(DATA, "file.txt") or die("Error");
```

#### open関数のモード

モードは以下のように用意されています。

* 「<」 /「r」    読み込み専用、ファイル先頭にポイントする
* 「>」 /「w」    書き込み専用、ファイル先頭にポイントしてファイルサイズをゼロに切り捨てます。 ファイルが存在しない場合は、作成します。
* 「>>」 /「a」　　追加書き込み。ファイル最後をポイントして、ファイルが存在しない場合は、作成します。
* 「+<」 /「r+」   読み書き両用、ファイル先頭にポイントする
* 「+>」 /「w+」   読み書き両用、ファイル先頭にポイントしてファイルサイズをゼロに切り捨てます。 ファイルが存在しない場合
* 「+>>」 /「a+」  読み書き両用、ファイル最後をポイントして、ファイルが存在しない場合は、作成します。
* | command        パイプ出力用
* command |        パイプ入力用
  
### Sysopen関数

Sysopen関数はopen関数と似ていますが、書き方は違います、Sysopen関数の書き方は以下の通りです：

```Perl
Sysopen(ファイルハンドル名, "ファイル名",モード) ;
```

Sysopenのモードは以下のように用意されています：

* O_RDWR     読み書き両用、ファイル先頭にポイントする
* O_RDONLY   読み込み専用、ファイル先頭にポイントする
* O_WRONLY   書き込み専用、ファイル先頭にポイントしてファイルサイズをゼロに切り捨てます。 ファイルが存在しない場合は、作成します。
* O_CREAT    ファイルを作成する
* O_APPEND   ファイルを追加する
* O_TRUNC    ファイルサイズをゼロに切り捨てます
* O_EXCL　　　ファイルはあれば、エラーを出てきます、このモードはファイルの存在するかどうかをテストできる。
* O_NONBLOCK  ブロックされずに、操作が成功するか、エラーかをすぐに返すことができる。

### close関数

close関数の書き方は以下の通りです：

```Perl
close(ファイルハンドル名);
```

例えば：

```Perl
open(DATA, "file.txt");
close(DATA);
```

ファイルは閉めない場合で、「die」関数を使います。書き方は

```Perl
close(ファイルハンドル名) || die(処理);
```

## ファイルの読み書き

### ファイルの読み込む

まずは「hello.dat」というファイルで以下のようにデータを格納します：

```1
2
3
4
5
```

次のコードを実行すると、

```Perl
open(IN,"<","hello.dat")or die("ファイルは開けません");

while(<IN>) {
 print $_;
}

close(IN);
```

結果は

```1
2
3
4
5
```

となります。

### ファイルの書き込む

まずは「hello.dat」というファイルに以下のようにデータを格納します：

```1
2
3
4
5
```

以下の文を実行すると、

```Perl
open(OUT,">","hello.dat")or die("ファイルは開けません");

print OUT "6\n";
print OUT "7\n";

close(OUT);
```

「hello.dat」の内容は

```6
7
```

となります。

### 追加書き込み

追加書き込みの書き方は：

```Perl
1. open(ファイルハンドル名, ">>", "ファイル名");
2. open(ファイルハンドル名, ">> ファイル名");
```

の二種類があります。引数が二つ以内あれば、2番の書き方で書きます。引数が三つ以上あれば、1番の書き方で書きます。

まずは「hello.dat」というファイルに以下のようにデータを格納します：

```1
2
3
4
5
```

次のコードを実行すると、

```Perl
open(OUT,">> hello.dat")or die("ファイルは開けません");

print OUT "6\n";
print OUT "7\n";

close(OUT);
```

「hello.dat」の内容は

```1
2
3
4
5
6
7
```

となります。

## ファイルの変更

### ファイル名の変更

ファイル名の変更はrename関数を使います。書き方は下記です：

```Perl
rename("旧名","新名");
```

### ファイルの削除

ファイル名の変更はunlink関数を使います。書き方は下記です：

```Perl
unlink("ファイル名");
```

### ファイルのコピー

ファイル名の変更はwhile文で実現します。書き方は下記です：

```Perl
while(<コピー元ファイルハンドル>){
 print コピー先ファイルハンドル $_;
}
```

例：

```Perl
open(FILE1,"<file1.txt");
open(FILE2,">file1.txt");
while(<FILE1>){
 print FILE2 $_;
}
close(FILE1);
close(FILE2);
```

これを実行すると、file1.txtの内容はfile2.txtにコピーされます。
