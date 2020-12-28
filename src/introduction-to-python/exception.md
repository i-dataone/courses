# 例外処理

プログラミングでは、構文の書き込みエラーやデータの問題などにより、実行中にさまざまなエラーが発生するかもしれません。 Pythonには、エラー処理に役立つ組み込みの例外処理メカニズムがあります。

## try

例外キャッチの構文は次のようになります。

```python
try:
    statements
except:
    executed when an exception occurs
```

一部のコードが間違っていると思われる場合は、このコードをtryで囲って実行します。実行時にエラーが発生する場合、後続のコードは実行を継続せず、exceptステートメントブロックのエラー処理コードに直接ジャンプします。

例：

```python
try:
    i = a + 2
    i = i + 1
    print('succeed')
except NameError as e:
    print('except:', e)
except (ValueError、OSError) as e:
    print('except:', e)
```

Output:`except: name 'a' is not defined`

try文には、異なる特定の例外を処理するために複数のexcept句を含めることができます。
except文ブロックの後にelseを追加できます。エラーが発生しない場合はelse文のブロックを実行します。

```python
try:
    i = 2
    print(i)
except NameError as e:
    print('except:', e)
else:
    print('succeed')
```

Pythonの例外は実際にはクラスであり、すべてのエラータイプはBaseExceptionから継承されます。例外タイプがわからない場合にExceptionを使えば十分です。詳細は公式ドキュメントを参照してください<https://docs.python.org/3/library/exceptions.html#exception-hierarchy>。複数のexceptを使う場合は異常の範囲が小さいものから大きいものへと配置する必要があります。

try文にfinallyを最後に追加できます。このブロックは例外が発生したかどうかに関係なく最後に実行されます。

```python
try:
    i = 2
    print(i)
except NameError as e:
    print('except:', e)
else:
    print('succeed')
finally:
    print('finished')
```

## raise

エラーはクラスであるため、エラーをキャプチャするとクラスのインスタンスがキャプチャされます。定義した関数は特定の条件によってエラーを発生させます。
例：

```python
x = 1
if x > 0:
    raise Exception('Bigger than 0!!!')
```

Output:

```python
Traceback (most recent call last):
  File ..., line 3, in <module>
    raise Exception('Bigger than 0!!!')
Exception: Bigger than 0!!!
```

exceptの中にraiseでエラーのタイプを変換できます。しかしこの二つのタイプはできるだけ包含関係になります。

```python
try:
    10 / 0
except ZeroDivisionError:
    raise ValueError('input error!')
```

## カスタム例外

新しい例外クラスを作成することにより、独自の例外を作れます。 このクラスは例外クラスから直接または間接的に継承します。

例：

```python
class MinusError(ValueError):
    def __init__(self, value):
        self.value = value
    def __str__(self):
        return repr(self.value)
i = -1
if i<0:
    try:
        raise MinusError(i)
    except MinusError as e:
        print(e.value,' is smaller than 0')
```

MinusErrorクラスは__init__関数をオーバーライドして、valueパラメータを渡すことができます。

## assert

assert式は簡単な式を判断するために使用されます。式の条件がfalseの場合、例外を発生させます。
例：

```python
n = 5
assert n < 0, 'n is not a positive number!'
print(n)
```

Output:

```python
Traceback (most recent call last):
  File ..., line 2, in <module>
    assert n < 0, 'n is not a positive number!'
AssertionError: n is not a positive number!
```

`-O`パラメータを使用して、Pythonインタープリタの起動するときにassertを閉じることができます。

## logging

assertと比較して、loggingはエラーを発生させません。出力またはファイルに保存します。
例：

```python
import logging
logging.basicConfig(level=logging.INFO)
n = 1
logging.info('n = %d' % n)
```

Output:

```python
INFO:root:n = 1
```

二行目はloggingのレベル。`debug``info``warning``error``critical`の五つのレベルがあります。これらのレベルを実際の状況に応じて選択します。

## warning

互換性などの問題により、警告メッセージを生成する場合があります。
例：

```python
import warnings
filea = '/Users/python/test'
if filea is not None:
    warnings.warn('file argument deprecated', DeprecationWarning)
```

Output:

```python
....py:4: DeprecationWarning: file argument is deprecated
  warnings.warn('file argument is deprecated', DeprecationWarning)
```

警告を例外に変換する場合はPythonインタープリタの起動するときに`-W error`を使用します。