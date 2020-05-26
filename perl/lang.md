# 言語

## 基本言語

Perlは多くのプログラミング言語の機能を借用しており（例えばC、sed、awk、shell等）、構文はこれらの言語に似ていますが、Perl独自の特性を持っています。

Perlプログラムは宣言と命令から構成されます。プログラムはループと条件付き制御を含め、上から順番に実行されます。各命令はセミコロン「;」で終わります。

Perl言語
Perlファイルの拡張子は「.pl」です。
次のコードを「hello.pl」というファイル名で保存してください

```print "hello world\n";```
コマンドプロンプトで「```perl hello.pl```」の命令を入力」して実行すると、「```hello world```」の結果が出力されます。

![J53pAe.png](https://s1.ax1x.com/2020/04/28/J53pAe.png)

コメントの書き方「＃」

１．コメントは「#」の後に続けます。命令の先頭や命令の後に書きます。

Perl は先頭に「`use strict; use warnings;`」を書くことが推奨されています。これを付けると文法の厳密なチェックをしたり、警告を出力することができて、正しいプログラムが書けるようになります。このために、忘れずに付けるように覚えてください。

## 条件分岐

### If条件分岐

If条件分岐の基本文法：

```Perl
if(条件){
  条件に合わせる場合の処理；
 }
```

条件を書くために`<`,`>`,`==`,`<=`,`>=`,`!=`等の演算子が使えます。

例えば、

```Perl
my $score = 65;
if($score >= 60){
  print("OK");
 }
```

とすると、実行結果は
```OK```
となります。

If条件分岐の条件には数字だけではなく、文字列も使えます。

条件は`eq`(==) `ne`(!=) `gt`(>) `lt`(<) `ge`(>=) `le`(<=) 、なお、文字列を比較する時、文字コードの順番は`0-9 < A-Z < a-z`です、例えば「aA」>「Aa」。は論理演算子には`&&`（AND）,`||`（OR）,`&&`（AND）,`!`（NOT）があります。
<!--
※文字列の大小の比較が分かりにくいです。例えば、この説明から「A<a」は分かりますが、「aA」と「Aa」のどちらが大きいかは分かりません。（まだ修正する方はわかりません、明日調べます。）
-->
例えば、

```Perl
my $color = green;
my $score = 60;
if($color eq green)&&($score = 60){
  print("OK");
 }
```

を実行すると、結果は

```OK```
となります。

#### if条件の後置

if文は処理の後でも書けます。たとえば、前のif条件分岐は以下のようにも書けます：

```Perl
my $score = 65;
print("OK"); if($score >= 60)
```

を実行すると、結果は
```OK```
となります。

### if...else条件分岐

If...else条件分岐の基本文法：

```Perl
if(条件){  
 条件に合わせる場合の処理;
 }else{
 条件に合わせない場合の処理;
 }
```

例えば、

```Perl
my $score = 65;
if($score >= 60){
  print("OK");
 }else{
  print("NG");
 }
```

を実行すると、結果は
```OK```
となります。
もし`$score = 55`としたら、実行結果は
```NG```
となります。

### if...elsif...条件分岐

If...elsif...条件分岐の基本文法：

```Perl
if(条件1){  
 条件1に合わせる場合の処理;
 }elsif(条件2){
 条件2に合わせる場合の処理;
 }else{
 条件1も条件2も合わせない場合の処理;
 }
```

例えば、

```Perl
my $score = 65;
if($score < 60)&&($score < 90){
  print("NG");
}elsif($score >= 60)&&($score < 90){
  print("OK");
 }else{
  print("GREAT");
 }
```

を実行すると、結果は
```OK```
となります。
もし`$score = 55`としたら、実行結果は
```NG```
もし`$score = 95`としたら、実行結果は
```GREAT```
となります。

###　三項演算子
三項演算子の基本文法：

```Perl
(条件)?　値a : 値b;
```

例えば、

```Perl
my $a = 50;
my $b = 60;
my $max = ($a > $b)? $a : $b;
print $max;
```

を実行すると、結果は
```60```
となります。

### unless条件分岐

unless条件分岐の基本文法：

```Perl
unless (条件){
  条件に合わせない場合の処理 1;
  条件に合わせない場合の処理 2;
}
```

例えば、

```Perl
my $score = 65;
unless ($score < 60){
  print ("OK");
  print ("YES");
}
```

を実行すると、結果は
```OKYES```
となります。

### unless...else条件分岐

unless...else条件分岐の基本文法：

```Perl
unless(条件)｛
 条件に合わせない場合の処理;
 ｝else{
 条件に合わせる場合の処理;
 }
```

例えば、

```Perl
my $score = 65;
unless($score < 60){
 print"OK";
}else{
 print"NG"
}
```

を実行すると、結果は
```OK```
となります。

### unless...elsif条件分岐

unless...else条件分岐の基本文法：

```Perl
unless(条件1)｛
 条件1に合わせない場合の処理;
 ｝elsif(条件2){
 条件2に合わせる場合の処理;
 } else{
  その他の場合の処理;
 }
```

例えば、

```Perl
my $score = 65;
unless($score>60){
 print"NG";
}elsif($score>=60)&&($score<90){
 print"OK";
}else{
 print"GREAT";
}
```

を実行すると、結果は
```OK```
となります。
もし`$score = 55`としたら、実行結果は
```NG```
もし`$score = 95`としたら、実行結果は
```GREAT```
となります。

### switch条件分岐

Switchの実行はSwitchモジュールに基づいています。このモジュールはデフォルトではインストールされません。
Switchモジュールのインストール：
コマンドプロンプトを開いて、以下の命令を入力します：

```cmd
cpan
cpan> install Switch
cpan> exit
```

switch条件分岐の基本文法：

```Perl
use Switch;

Switch(引数){
case 1  {print"数字１"}
case "a"{print"文字a"}
...
else    {print"その他"}
}
```

例えば、

```Perl
use Switch;
my $number = 10;
my @score = (50,60,90);
my %hash = ('Tom'=50,'Lily'=90);

Switch($number){
 case 10       {print"数字10"};
 case "a"      {print"文字a"};
 case(\@score) {print"数字はscore配列の中"}
 else          {print"その他"}
}
```

を実行すると、結果は
```数字10```

## 繰り返し処理

### while文

while文の基本文法：

```Perl
while(条件){
 実行処理;
 ループ処理;
}
```

例えば、

```Perl
my $number = 0;
while($number<5){
 print"number=$number\n";
 $number++;
}
print"ループ完了。";
```

を実行すると、結果は

```number=0
number=1
number=2
number=3
number=4
ループ完了。
```

と0から4まで5回ループ処理を行われました。

### do...while文

do...while文の基本文法：

```Perl
do{
 実行処理;
 ループ処理;
}while(条件);
```

*　do ... whileループはwhileループに似ていますが、do...whileループが少なくとも1回ループ実行されることが保証されます。

例えば、

```Perl
my $number = 0;
do{
 print"number=$number\n";
 $number++;
}while($number<5);
print"ループ完了。";
```

を実行すると、結果は

```number=0
number=1
number=2
number=3
number=4
ループ完了。
```

と0から4まで5回ループ処理を行われました。

### for文

for文の基本文法：

```Perl
for(初期化;条件;ループ処理){
 実行処理;
}
```

例えば、

```Perl
for(my $number = 0;$number < 5;$number++){
 print"number = $number\n";
}
print"ループ完了";
```

を実行すると、結果は

```number=0
number=1
number=2
number=3
number=4
ループ完了。
```

と0から4まで5回ループ処理を行われました。

###　until文
until文の基本文法：

```Perl
until(条件){
 実行処理;
 ループ処理;
}
```

while文とuntil文の違い：while文は条件に合う場合でループ処理を実行するのに対して、until文は条件に合わない場合でループ処理を実行します。
例えば、

```Perl
my $number = 0;
until($number>=5){
 print"number = $number\n";
 $number++;
}
print"ループ完了"
```

を実行すると、結果は

```number=0
number=1
number=2
number=3
number=4
ループ完了。
```

と0から4まで5回ループ処理を行われました。

### foreach文

foreach文の基本文法：

```Perl
foreach 変数(リスト){
 実行処理;
}
```

リストの要素は順番に変数に格納するループ処理です。
例えば、

```Perl
my @color = ("red","yellow","green");
foreach my $signal (@color){
 print"$signal\n";
}
```

を実行すると、結果は

```red
yellow
green
```

となります。

実は、for文とforeach文は同じ構文です。for文の変数をリストに指定すれば、foreach文と同じループ処理を行うことができます。このためで、以下の通りに書くと同じ結果ができます。

```Perl
my @color = ("red","yellow","green");
for my $signal (@color){
 print"$signal\n";
}
```

を実行すると、結果は

```red
yellow
green
```

となります。

### next文

「next」演算子は実行しているループを指示する位置をスキップして次のループを行います。

next文の基本文法：

```Perl
next;
```

例えば：

```Perl
my $number = 0;

while ($number <= 5){
  $number++;

  if ($number == 2){
    next;
  }

  print "$number\n";
  
}
print "end\n";
```

を実行すると、結果は

```1
3
4
5
6
end
```

となります。

## continue文

「next」演算子は実行しているループを指示する位置をスキップして次のループを行います。

next文の基本文法：

```Perl
while(条件)｛
　処理；
｝continue{
  処理;
}
```

例えば：

```Perl
$number = 0;
while($number < 5){
 print"number = $number\n"；
}continue{
 $number = $number+1;
}
```

を実行すると、結果は

```number = 0
number = 1
number = 2
number = 3
number = 4
```

となります。
