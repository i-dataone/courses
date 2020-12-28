# モジュール

Pythonでは、.pyファイルはモジュールと呼ばれます。プログラムを作成するときに、Pythonでビルドされたモジュールやサードパーティのモジュールなど他のモジュールを参照することがよくあります。
定義するときに組み込み関数と同じ名前を付けないようにしてください。Python組み込み関数のドキュメント: <https://docs.python.org/3/library/functions.html>

モジュールを定義したら、import文を使用してモジュールを導入できます。構文は次になります：

```python
import module1(, module2, ....)
```

例として組み込まれたmathモジュールをインポートして自然対数の底と円周率を出力します。

```python
#!/usr/bin/python
# -*- coding: UTF-8 -*-

import math
print(math.e, math.pi)
```

Output:`2.718281828459045 3.141592653589793`

1行目のコメントは、システムのデフォルトライブラリの位置です。コンパイラはその位置でモジュールを探します。モジュールのパスを検索する順は：1.現在のディレクトリ、2.シェルパス変数PYTHONPATHの下の各ディレクトリ、3.デフォルトのパス。これにより、.pyファイルをLinuxとMacで直接実行できます。2行目のコメントは.pyファイル自体が標準のUTF-8エンコーディングを使用していることを表します。

fromは指定された部分をモジュールから今の.pyファイルにインポートできます。`*`を使用してモジュール全体をインポートすることができます。使いやすいように.pyでモジュールの名前を変更することもできます。

```python
from math import *
from time import localtime
import numpy as np
```

パッケージからモジュールのインポートも(from..)importを使います。
例のパッケージの構造は次のとおりです：

execute.py
package1
|-- __init__.py
|-- calculate.py

execute.pyにcalculate.pyを使うのは：

```python
import package1.calculate
```

モジュールの一つの指定する関数のみを使いたい場合:

```python
from package1.calculate import function
```

## 常用モジュール

### 組み込みモジュール

#### time、datatimeとcalendar

timeモジュールには、3つの主要な時間表現形式があります:timestampは1970年1月1日00:00:00から秒単位で計算されたオフセットを表します；struct_timeは時間タプルで表します；フォーマット時間はフォーマットされた構造は時間をより読みやすくします。カスタム形式と固定形式を含みます。
例：

```python
import time
from datetime import datetime

print(time.time())                       #timestampを出力する
print(time.localtime())                  #現地時間をstructtimeタプルで出力する
print(datetime.now())                    #現在のdatetime形式の時刻を出力する
print(datetime(2020,5,28,12,37))         #カスタム時間のdatatimeを出力する
print(time.strptime
    ('2020-05-28 12:37:06', '%Y-%m-%d %X'))
    #文字列をstructtimeに変換する（datetimeと同様）
print(time.strftime
    ("%Y-%m-%d %X",time.localtime()))
    #カスタム形式で現地時間(str)を出力する（datetimeと同様）
```

Output:

```python
1590637020.0
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=28, tm_hour=12, tm_min=37, tm_sec=21, tm_wday=3, tm_yday=149, tm_isdst=0)
2020-05-28 12:37:21.352358
2020-05-28 12:37:00
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=28, tm_hour=12, tm_min=37, tm_sec=6, tm_wday=3, tm_yday=149, tm_isdst=-1)
2020-05-28 12:37:21
```

struct_timeタプルの`tm_wday`は曜日を表し（0は日曜日）、`tm_yday`は年間通算日を表し、`tm_isdst`は夏時間かどうかを表します。

時間の加算と減算の操作:

```python
import time
from datetime import datetime, timedelta

t1 = time.time()
t2 = t1+10                      #秒単位でタイムスタンプを加算する
print(time.localtime(t2))
a = datetime(2020, 5, 31, 12, 40)
print(a + timedelta(days=1))
```

Output:

```python
time.struct_time(tm_year=2020, tm_mon=5, tm_mday=28, tm_hour=12, tm_min=40, tm_sec=33, tm_wday=3, tm_yday=149, tm_isdst=0)
2020-06-01 12:40:00
```

タイムゾーン変換：

まず`utcnow()`で現在の時間また特定の時間を`replace()`でUTC時刻を取得して任意のタイムゾーンの時刻に変換します。またはpytzサードパーティのライブラリを使用できます。

```python
from datetime import datetime, timedelta,timezone
from pytz import timezone as tz

setdate=datetime(2020, 5, 1, 12, 0)
central = tz('GMT')
loc_d = central.localize(setdate)           #変換前の時間とタイムゾーンを設定する
tokyo_d = loc_d.astimezone(tz('Asia/Tokyo'))
#タイムゾーンコードでタイムゾーンを変換する
print(tokyo_d)
dt = setdate.replace(tzinfo=timezone.utc)   #UTC時間に変換する
tokyo_dt = dt.astimezone(timezone(timedelta(hours=9)))　#プラス9時間
print(tokyo_dt)
```

Output:

```python
2020-05-01 21:00:00+09:00
2020-05-01 21:00:00+09:00
```

カレンダークラスは月間カレンダーで操作できます。カレンダークラスは月間カレンダーで操作できます。たとえば月間カレンダーを出力します：

```python
import calendar

cal = calendar.month(2020, 6)
print(type(cal))
print(cal)
```

Output:

```python
<class 'str'>
     June 2020
Mo Tu We Th Fr Sa Su
 1  2  3  4  5  6  7
 8  9 10 11 12 13 14
15 16 17 18 19 20 21
22 23 24 25 26 27 28
29 30
```

実際に出力されるのはフォーマットされた文字列です。
カレンダークラスを通じて、特定の月の日数範囲、最初の日の曜日、その他の情報を取得できます。たとえば1か月の日をループ処理します：

```python
from datetime import datetime, date, timedelta
import calendar

def get_month_range(startday=None):
    _, days_in_month = calendar.monthrange(startday.year, startday.month)
    endday = startday + timedelta(days=days_in_month)
    return (startday, endday)
oneday = timedelta(days=1)
firstday, lastday = get_month_range(datetime(2020,6,1))
while firstday < lastday:
    print('%d. %d'%(first_day.month,firstday.day))
    firstday += oneday
```

Output:

```python
1. 1
2. 2
...
6. 30
```

Pythonの日付と時刻は標準の数学演算子と比較演算子で計算できます。

#### json

jsonモジュールは、JSONデータをエンコードおよびデコードするためのシンプルな方法を提供します。 2つの主な関数は`dumps()`と`loads()`で、他のシリアライゼーション関数ライブラリより少ないです。JSON仕様に従うには、リストと辞書型をお勧めします。

例：

```python
import json
from collections import OrderedDict

#辞書型データ
data = {
    'type': 'fruit',
    'name': 'apple',
    'amount': 20
}

json_str = json.dumps(data)
datanew = json.loads(json_str)
print(type(data))
print(type(json_str))
ordereddata = json.loads(json_str,object_pairs_hook=OrderedDict)
print(ordereddata)
```

Output:

```python
<class 'dict'>
<class 'str'>
OrderedDict([('type', 'fruit'), ('name', 'apple'), ('amount', 20)])
```

jsonオブジェクトを読み取るときに、他のパラメータを設定してデータを`OrderedDict`などのタイプに変換できます。

Pythonとjsonの型変換は以下に対応します。

|  Python | JSON  |
| ------------ | ------------ |
|  int, float, Enums | number  |
|  str | string  |
| list, tuple  | array  |
| dict  | object  |
| True/False  |  true/false |
| None  | null  |

#### glob

globはUnixスタイルのパス操作の拡張モジュールであり、同じサフィックスファイルなどを操作することに便利です。
例：

```python
import glob

for fname in glob.glob("**/*.py",recursive=True):
    print(fname)        #現在のパスにあるすべてのpyファイル名
for fname in glob.glob("./tmp/*.py"):
    print(fname)        #現在のパスファイルtmpの下のPyファイル名
for fname in glob.glob("./f[!0-9].py"):
    print(fname)
    #正規表現範囲ワイルドカード、現在のパスファイルの下のfで始まる数字以外のpyファイル名
```

以下は、いくつかのワイルドカードの説明です

|  ワイルドカード |  説明 |
| ------------ | ------------ |
| *  | 0文字以上をマッチします  |
|  ** | すべてのファイル、ディレクトリ、サブディレクトリ、およびサブディレクトリ内のファイルをマッチします  |
|  ? |  一文字をマッチします |
| [n,m] | 指定された範囲n~mの文字をマッチします |
|  [!n,m] |  指定された範囲n~m以外の文字をマッチします |

大きなディレクトリツリーで`**`を使用すると、多くの時間がかかる可能性があります。

### サードパーティのモジュール

#### numpy

NumPy（Numerical Python）は多数の次元配列および行列演算をサポートしています。さらに、配列演算用の多数の数学関数ライブラリも提供しています。Pythonで数学モデル、統計分析また機械学習などを学びたい場合、numpyを理解しておく必要があります。numpyの内容と関数が多すぎるため、例として一般的な関数を紹介します。

NumPyで一般的に使用される基本配列単位はN次元配列オブジェクトndarrayです。
例として値を指定する多次元配列を作成して配列とサイズ、次元を出力します。`asarray()`を使用してPythonコレクション型をndarrayに変換できます。

```python
import numpy as np
a = np.array([[1,  2],  [3,  4]])
b= (1, 2, 3, 4)
print(a)
print(np.asarray(b))
print(a.shape)      #配列の次元
print(a.size)       #要素の数
```

Output:

```python
[[1 2]
 [3 4]]
[1 2 3 4]
(2, 2)
4
```

指定されたサイズの配列を作成します。

```python
import numpy as np
x = np.empty([2,2], dtype = int) #サイズとデータタイプを指定します
print (x)
```

Output:

```python
[[ -969198761 -1933286699]
 [ 1116264138  1701634856]]
```

初期値はランダムに割り当てられることに注意してください。 すべてが0また1の行列を生成したい場合は、`zeros()`、`ones()`を使います。指定された範囲の乱数配列を生成する場合は、randomが使えます:

```python
from numpy import random as nr
y = nr.randint(10, size=(3, 2))
```

算術シーケンスを生成する場合は`linspace()`また`arange()`を使います。
例：

```python
a = np.arange(1, 11, 2)         #3番目のパラメータはステップサイズ
b = np.linspace(1, 10, num=5)   #3番目のパラメータは生成される数
```

Output:

```python
[1 3 5 7 9]
[ 1.    3.25  5.5   7.75 10.  ]
```

出力によれば、arangeは出力数を丸めました。 シーケンスインデックスとして使用する場合は`arange()`を使用し、厳密な算術シーケンスを取得する場合は、`linspace()`を使用してください。

Pythonの集合タイプとは異なり、numpyの算術演算子は要素レベルに適用されます。

```python
a = np.arange(1,5)
print(a*2)
```

Output:`[2 4 6 8]`

行列の乗算は`@`（python3.5以降）演算子または`dot()`関数を使います。2つの行列を乗算するのは対応する2つの各要素の乗算を表します。行列の形状が異なる場合はエラーが発生します。
例：

```python
a = np.identity(2)          #単位行列を生成します
b = np.array([[1, 2], [3, 4]])
print(a@b)
```

Output:

```python
[[1. 2.]
 [3. 4.]]
```

比較演算子を使用して、指定された条件を満たす要素の配列を取得できます。

```python
x = np.array([[1, 2, 3],[4, 5, 6],[7, 8, 9]])
print(x[x > 5])
```

さまざまな関数で操作することもできます。行列を操作する関数のほとんどは、axisパラメータで処理したい行列の軸（行と列）を指定できます。

```python
x = np.array([[1, 2, 3],[4, 5, 6],[7, 8, 9]])
print(x)
print(x.sum())
print('sums by column:', x.sum(axis=0))
print('sums by row:', x.sum(axis=1))
```

Output:

```python
[[1 2 3]
 [4 5 6]
 [7 8 9]]
45
sums by column: [12 15 18]
sums by row: [ 6 15 24]
```

多次元配列の繰り返しはaxis0に対して行われます。配列の各要素に対して操作を実行する場合は、flatプロパティを使用できます。
<!--
「～するには、...を使います。」「...を使うことで、～できます。」
-->
例：

```python
x = np.array([[1, 2, 3],[4, 5, 6],[7, 8, 9]])
for i in x:
    print(i)
for ele in x.flat:
    print(ele,　end=" ")
```

Output:

```python
[1 2 3]
[4 5 6]
[7 8 9]
1 2 3 4 5 6 7 8 9 
```

配列の形状を変更する場合には一般的に`reshape()`を使います。
例：

```python
x = np.array([[1, 2, 3],[4, 5, 6]])
x2 = x.reshape(1,-1,order='C')      #(行、列、列で値を取る)
x3 = x.T                            #行列xの転置行列
print(x2)
print(x3)
x.resize((1, 6))
print('resized x: ', x)
```

Output:

```python
[[1 2 3 4 5 6]]
[[1 4]
 [2 5]
 [3 6]]
resized x:  [[1 2 3 4 5 6]]
```

`reshape()`関数は変更された形状の新しい行列を返し、`resize()`は配列自体を変更します。
