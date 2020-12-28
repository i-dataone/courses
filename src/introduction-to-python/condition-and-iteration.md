# 条件分岐と繰り返し処理

## 条件分岐

Pythonのif文の基本的な形式は以下のようになります：

```python
if condition：
    statements
```

if条件の最後にコロンを付け、<!--ます。⇒、-->条件内容をインデントする必要があります。
ifの条件が成立するのは条件値が非零または非空の場合であり、データ型はブール型(True, False)に限定されません。

例:

```python
a = 20
if a :
    print('a is %d' % a)
```

Output: `a is 20`

elseを追加することもできます。if判定がFalseまた0の場合はelseの内容を実行します。

```python
if 条件1:
    条件1が満たされるときに実行します。
else:
    条件1が満たされないときに実行します。
```

判定条件が複数の場合はelifを使います。

```python
if 条件1:
    条件1が満たされたときに実行します。
elif 条件2:
    条件2が満たされたときに実行します。
....
else:
    すべての条件が満たされないときに実行します。
```

## 繰り返し処理

### for文

forループは、リストや文字列などのシーケンスを繰り返し処理を行う時に利用できます。Pythonのforの構文は次のようになります。

```python
for item in sequence:
   statements
```

リストの場合は次のコード例のようになります。fruitはfor内に作成された一時変数であり、リストで繰り返される各アイテムを表します。

例：

```python
fruits = ['Apple','Banana','Melon']
for fruit in fruits:
   print(fruit)
```

Output:

```python
Apple
Banana
Melon
```

複数の要素の場合：

```python
list1 = [[1, 2], [3, 4], [5, 6]]
for x,y in list1:
   print(x, y)
```

Output:

```python
1 2
3 4
5 6
```

シーケンスインデックスでトラバースすることもできます。Pythonには一連の整数を生成する`range()`関数を提供します。`len()`はシーケンスの長さを出力します。

```python
fruits = ['Apple','Banana','Melon']
for i in range(len(fruits)):
   print (fruits[i])
```

Output:

```python
Apple
Banana
Melon
```

Pythonの組み込みenumerate関数は、リストをインデックスと要素のペアに変換し、インデックスと要素をforループで同時に出力できます。

```python
fruits = ['Apple','Banana','Melon']
for key,value in enumerate(fruits):
    print(key,value)
```

```python
0 Apple
1 Banana
2 Melon
```

一つの便利なところは、新しい集合変数を宣言するときにforおよびif文を使用できることです。例：

```python
list1 = [ 1, 2, 3, 4, 5 ]
list2 = [ i*2 for i in list1 if i%2==0 ]
print(list2)
```

Output:`[4, 8]`

*if条件はforの前におく場合は、elseを追加する必要があります。

```python
list1 = [ 1, 2, 3, 4, 5 ]
list2 = [ i*2 if i%2==0 else i for i in list1]
print(list2)
```

Output:`[1, 4, 3, 8, 5]`

2重forループで二つ集合の順列を生成できます。

```python
list1 = [ 'Alice', 'Bob']
list2 = [ 'Claine', 'David']
list3 = [m + '&' + n for m in list1 for n in list2]
print(list3)
```

Output:`['Alice&Claine', 'Alice&David', 'Bob&Claine', 'Bob&David']`

#### ジェネレータ

リストを生成する関数により、イテレータでリストを直接作成できます。pythonのジェネレータは指定するアルゴリズムに従って要素を計算できます。ループの過程で後続の要素を計算し、完全なリストを作成する必要がなくなり、メモリを節約できます。

ジェネレータの例は次のようになります：

```python
g = (x*2 for x in range(5))
print(g)
```

Output:`<generator object <genexpr> at 0x00000000025094F8>`

`print()`の出力はジェネレータの<!--"の"追加-->内容ではなくメモリアドレスです。要素を1つずつ出力したい場合はループ内に`next()`関数で次のジェネレータの戻り値を取得することです。

```python
>>> gen = (x*2 for x in range(5))
>>> next(gen)
0
>>> next(gen)
1
```

またはforループを使用します：

```python
gen = (x*2 for x in range(5))
for i in g:
   print(i, end=' ')
```

Output:`0 2 4 6 8 `

ジェネレータの一つの特徴はyield文です。

例の`odd()`関数を定義して実行します。

```python
def odd():
    print('No.1')
    print('No.3')
    print('No.5')
odd3()
```

Output:

```python
No.1
No.2
No.3
```

この関数にyieldを追加できます。これは`odd()`にジェネレーターのプロパティを与えることです。

```python
def odd():
    print('No.1')
    yield 1         #一番目yield:return=1
    print('No.3')
    yield 3         #二番目yield:return=3
    print('No.5')
    yield 5         #三番目yield:return=5
```

オブジェクトを生成してループの結果を観察します。

```python
o=odd()
for i in o:
   print(i)
```

Output:

```python
No.1
1
No.3
3
No.5
5
```

yieldはジェネレータのブレークポイントとして使用されます。実行の時にyield文を検出するとループが中断され、yieldの後ろの値を返します。`next()`またはイテレーターでもう一度ジェネレータを呼び出すと、中断したところから引き続き実行します。

### while文

while文では、条件が満たされる限り、ループは継続されます。条件が満たされない時にループは終了します。whileの構文は次のようになります。

```python
while condition：
    statements
```

例：

```python
i = 0
sum = 0
while i < 5:
    sum+=i
    i+=1
print(sum)
```

Output:`10`

## break、continueとelse

whileおよびforループにbreak文とcontinue文を使用できます。使う場合には、ループに新しい条件判断ステートメントを追加する必要があります。

### break

breakはループを終了するために使用されます。

例：

```python
i = 0
sum = 0
while i < 5:
    if i > 3:
        break
    sum+=i
    i+=1
print(sum)
```

Output:`6`

### continue

continueは今のループをスキップして次のループに進みます。

例：

```python
i = 0
sum = 0
while i < 5:
    i+=1
    if i == 3:
        continue
    sum += i
print(sum)
```

Output:`12`

しかし、コードをこう書けば：

```python
i = 0
sum = 0
while i < 5:
    if i == 3:
        continue
    i+=1
    sum += i
print(sum)
```

プログラムは無限ループに陥ります。

breakとcontinueを乱用しないように注意してください。ロジックを過度に分岐すれば、エラーが発生しやすくなります。 ほとんどのループでは、breakおよびcontinueを使用する必要はありません。ループ条件を書き換えるか、ループロジックを変更することにより、breakおよびcontinueを使わずに書けます。

### else

ループ本体の後にelseを追加できます。forやwhileループが完了したとき、またbreak文を使用しなかった時に実行します。

例：

```python
i = 0
sum = 0
while i < 5:
    i+=1
    if i == 3:
        continue
    sum += i
    print(sum,end=",")
else:
    print("end")
```

Output:`1,3,7,12,end`

## pass文

passは空のステートメントであり、プログラム構造の整合性を維持します。プレースホルダーステートメントとして使用されます。

例：

```python
for letter in 'Hello':
   if letter == 'l':
      pass
      print ('p', end=' ')
   print (letter, end=' ')
```

Output:`H e p l p l o `

Pythonでは、def関数が表示されることがあります。

```python
def example():
    pass
```

空の関数を定義するとエラーが発生するため、passで位置を占めます。関数の内容が未定の場合には、passがあればプログラムが正常に実行できます。
