# Perl時間操作

Perlで時間を処理する関数は次のとおりです。

1. `time`関数：1970年1月1日からの累積秒数を返します
2. `localtime`関数：ローカルタイムを返します
3. `gmtime`関数：グリニッジ標準時を返します

## ローカルタイム関数

ローカルタイムを取得するには`localtime`関数を使います：
直接`localtime`を使用すると、システム時間を以下のように返します。

```Perl
localtime();
```

例えば：

```Perl
$day = localtime();
print"今日は$dayです。\n"
```

今日はThu May 21 16:31:08 2020です。

## グリニッジ標準時関数

グリニッジ標準時関数とローカルタイム関数は似ていますが、返す時間はグリニッジ標準時です。

```Perl
 gmtime();
 ```

例えば：

 ```Perl
 $local_time = localtime();
 print "ローカル時間は：：$local_time\n";

 $gmt_time = gmtime();
 print "グリニッジ時間は：$gmt_time\n";
 ```

と実行すると、結果は

 ```ローカル時間は：May 21 16:39:55 2020
 グリニッジ時間は：May 21 07:39:55 2020
 ```

となります。

この例から、日本時間とグリニッジ標準時は9時間差があると確認できます。

## 時間フォーマット化

関数strftime（）は、時刻を望むフォーマットに変換できます。書き方は：

```Perl
 use POSIX qw(strftime);
 strftime "記号",時間関数;
 ```

以下がフォーマットされる記号です。


* %a   曜日の略称（ Sun..Sat）
* %A   曜日のフルネーム（ Sunday..Saturday）
* %b   月の略称（Jan..Dec）
* %B   月のフルネーム（January..December）
* %c   日期和時間（Thu May 21 14:55:02 2020）
* %C   年/100 ,(00-99)
* %d   月の何日目
* %D   日期 MM/DD/YY
* %e   月の何日目
* %F   YYYY-MM-DD
* %g   年の末2位
* %h   月的略称（Jan..Dec）（%bと同じ）
* %H   24時間時計
* %I   12時間時計
* %j   年の何日目
* %m   月(01-12)
* %M   分（01-59）
* %P   AM/PM
* %R   HH:MM
* %S   秒（00-61）
* %Y   年（2001）

例えば：

```Perl
use POSIX qw(strftime);
$date = strftime "%Y-%m-%d %H:%M:%S", localtime;
print"ローカル時間は：$date\n";
 ```

と実行すると、結果は

```ローカル時間は：2020-05-21 14:15:11```

となります。
