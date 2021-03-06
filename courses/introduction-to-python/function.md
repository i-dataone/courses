# 関数

Pythonは関数を柔軟に定義できるだけでなく、多くの便利な関数が組み込まれています。

## 関数の定義と呼び出し

Pythonの関数を定義するには、def文を使用し、関数名、括弧、括弧内のパラメーター、およびコロンを順に記述し、次にインデントされたブロックに関数本体を記述します。関数の戻り値はreturn文で返されます。returnがない場合に関数は実行後にNoneを返します。
Pythonの関数の構文は次のようになります。

```python
def function( parameters ):
   statements
   return [expression]
```

関数は複数の値を返すことができます。関数を呼び出すには、関数の名前とパラメータを知っている必要があります。

例：

```python
def fun():
    x1 = 2
    y1 = 0
    return x1, y1

x,y = fun()    #fun()を呼び出します。
z = fun()
print(x, y)
print(z)
```

Output:

```python
2 0
(2, 0)
```

複数の値を返す場合は実際には一つのタプルが返されます。複数の変数が一つのタプルを同時に受け取り、位置に応じて対応する値が割り当てられます。

## 関数のパラメータ

### 位置パラメータ

べき乗を求める関数を定義します。

```python
def power(x, n):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s
```

xとnは位置パラメータです。関数を呼び出すと、渡された2つの値が位置に従ってパラメータxとnに順に割り当てられます。そうしないとエラーが発生します。

### デフォルトのパラメータ

関数を宣言するときに、パラメーターをデフォルト値に設定できます。関数を呼び出すときにその値を割り当てる必要はありません。

例：

```python
def power(x, n=2):
    s = 1
    while n > 0:
        n = n - 1
        s = s * x
    return s
print(power(5))
```

Output:`25`

デフォルトパラメータはデフォルトのパラメータは後ろに配置する必要があります。前に配置すると、コンパイラは混乱します：

```python
def fruit(name, amount=6, color, price=20):
    print('name:', name)
    print('amount:', amount)
    print('color:', color)
    print('price:', price)
fruit('banana', 'yellow')
```

Output:

```python
  File ..., line 1
    def fruit(name, amount=6, color , price=20):
             ^
SyntaxError: non-default argument follows default argument
```

複数のデフォルトパラメータがある場合は、キーワードを使用して、割り当てるパラメータを指定することができます:

```python
def fruit(name, color, amount=6, price=20):
    print('name:', name)
    print('amount:', amount)
    print('color:', color)
    print('price:', price)
fruit2('banana', 'yellow',　price=50)       #priceの値を指定します。
```

デフォルトのパラメータは不変オブジェクトを指す必要があります。リストを使用する場合：

```python
def appendstr(deflist=[]):
    deflist.append('Default')
    return deflist
print(appendstr())
print(appendstr())
```

Output:

```python
['Default']
['Default', 'Default']
```

再宣言のdeflistの値はリセットされていません。内部デフォルト変数の値が記憶され、Default値を累積しました。

### 可変長パラメータ

宣言したときより多くのパラメータを処理できる関数が必要になる場合があります。その場合は宣言するときにパラメーターの前に`*`を付けます。

例：

```python
def sumup(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n
    return sum
print(sumup(1, 2, 3, 4, 5))
```

Output:`15`

関数内では、受け取ったパラメーター`numbers`はタプルです。タプル型パラメータを可変長パラメータに代入する場合も`*`を使います。

```python
nums = [1, 2, 3, 4, 5]
print(sumup(*nums))
```

### キーワードパラメータ

キーワードパラメータを使用すると、0または任意の数のパラメータをパラメータ名（必要）で渡すことができます。これらのキーワードパラメータは、関数内にdictで自動的に変換されます。宣言するときにパラメーターの前に`**`を付けます。

例：

```python
def fruit(name, color, **kw):
    print('name:', name, 'color:', color, 'info:', kw)
fruit('apple','red', shape='round',price=70)
```

Output:

```python
name: apple color: red info: {'shape': 'round', 'price': 70}
```

キーワードパラメータの名前を制限する場合は、名前付きキーワードパラメータを使用できます。

```python
def fruit4(name, color, *, shape, price):
    print('name:', name, 'color:', color, 'shape:', shape,'price:', price)
```

## lambda

ラムダはdefより簡単な形式の関数（式）です。
ラムダ関数の構文にはステートメントが1つだけ含まれています。次のようになります。

```python
lambda [arg1 (arg2, arg3, ...)]:expression
```

例：

```python
g = lambda x: x % 3
print(g(4))
```

Output:`1`

シーケンスオブジェクトを操作する場合には、`map()`関数を使用してオブジェクトをイテレータにマップできます。

```python
nums = [1, 3, 5]
nums2 = [2, 4, 6]
for i in (map(lambda x,y: x+y, nums,nums2)):
    print(i,end=' ')
```

Output:`3 7 11 `

これはジェネレータとfor文を直接使用するのと同じです。

```python
[x+y for x in nums for y in nums2]
```

## 関数の使用

1つの関数が別の関数をパラメータとして受け取ることができます。 この関数は高次関数と呼ばれます。

例：

```python
def add(x,y,f):
    return f(x)+y
def fun(a):
    return a**2
print(add(2,3,fun))
```

Output:`7`

add関数を呼び出し、add関数にfun関数をパラメータとして代入します。

### デコレータ

関数の本体を変更せずに関数の機能を増やしたい場合があります。デコレータは関数を返す高次関数です。 次のように例を挙げます。

```python
def decorator(fun):
    def prt(*args, **kw):
        print('Running decorator')
        return fun(*args, **kw)
    return prt
@decorator
def fun():
    print('Running function')
fun()
```

Output:

```python
Running decorator
Running function
```

`decorator()`関数を定義します。この関数は、パラメータを受け取ったときにfun関数を返す前にテキスト行を出力します。`decorator()`関数でデコレートしたいfun関数の前に@記号を追加すると、コンパイラがこの関数を自動的にデコレータに置き換えます。

`fun = decorator(fun)`と同じです。

パラメータをデコレータに渡す必要がある場合は、デコレータを返す高次関数を作成する必要があります。

```python
def decorator(text):
    def rtfun(fun):
        def prt(*args, **kw):
            print('Running decorator' + ' and add ' + text)
            return fun(*args, **kw)
        return prt
    return rtfun
@decorator('text')
def fun():
    print('Running function')
fun()
```

Output:

```python
Running decorator and add text
Running function
```