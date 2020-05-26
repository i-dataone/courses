# perl

## perlとは

PerlはPractical Extraction and Report Languageの略で、「実用的なレポート抽出言語」に翻訳できます。
機能豊富なコンピュータープログラミング言語であるPerlは、100を超えるコンピュータープラットフォームで実行され、メインフレームからポータブルデバイス、ラピッドプロトタイピングから大規模でスケーラブルな開発まで、幅広く使用されています。
Perl言語には幅広いアプリケーションがあり、CGIに加えて、グラフィックプログラミング、システム管理、ネットワークプログラミング、金融、生物学などの分野で使用されています。

## Perlの利点と欠点

### Perlの利点

１．高効率
Perlはテキストベースのの状態で実行できるので、コンパイルの必要はありません。 このため、作業が高効率的に完了できます。
２．柔軟性、拡張性の高さ
強力な正規表現を備えていて、柔軟性高い言語です。
３．自由度
４．連想配列(ハッシュ)が使える
５．豊富な外部モジュール

### Perlの欠点

Perlの柔軟性のためこそ、Perlプログラムは簡単に書くことができますが（エラーを報告せずに）、文字を少なくすると予期しない結果が行われたことがあります。多くのPerlプログラムのコードは読みにくくて、同じ機能を実現するプログラムコードですが、長さは10倍から100倍異なる可能性があり、プログラムのメンテナー（作成者でさえ）が保守するのが困難になります。

同様に、Perlのランダムな性質のため、一部のPerlプログラマーは構文を忘れて、Perlのマニュアルを確認する必要がある場合があります。

## Perlのバージョンとインストール

### Perlのバージョン

Perlの公式ホームページ
<https://www.perl.org/get.html>
１．Perl6
現在の最新バージョンで、2010年にリリースされました。 一世代前のPerl5との互換性がなく、今後の成り行きが注目されている状況です。 まだほとんど普及もしていないようです。

<http://www.perl6.org/>

２．Perl5
最も普及しているバージョンです。
<http://www.perl.org/>

３．Active Perl
Windows向けに移植されたPerlです。ActiveState社により提供されています。

<http://www.activestate.com/>

４．Strawberry Perl

Windows向けに移植されたPerlです。Active Perlに比べて若干玄人向けの感があります。
モジュールのインストールも自由にできるようになっています。

<http://strawberryperl.com/>

Perl実行できるOS
Perlは次のOSで実行できます。

Unix (Solaris, Linux, FreeBSD, AIX, HP/UX, SunOS, IRIX etc.)
Win 9x/NT/2000/
WinCE
Macintosh (PPC, 68K)
Solaris (x86, SPARC)
OpenVMS
Alpha (7.2 and later)
Symbian
Debian GNU/kFreeBSD
MirOS BSD
…ect

### Perlのインストール

まず、 コマンドブロックを開いて、Perlのインストール完了するかどうかを以下の命令通りに確認しましょう。
perl -v
もし以下のメッセージが出てきたら、インストール完了しました。
![J5kGgH.jpg](https://s1.ax1x.com/2020/04/28/J5kGgH.jpg)
