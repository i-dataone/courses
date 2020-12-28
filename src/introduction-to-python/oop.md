# オブジェクト指向プログラミング

## クラスとインスタンス

Pythonのクラスはclassキーワードで定義されます。

```python
class classname(object):
    statements
```

クラスには`__init__()`と呼ばれる特別な関数（コンストラクタ）があり、クラスがインスタンス化されると自動的に呼び出されます。__init__メソッドでインスタンスの作成時に変数を宣言できます。__init__関数の最初のパラメーターは常にselfです。しかし、selfはPythonのキーワードではないため、任意の名前で置き換えると通常どおり実行できます。これは作成されたインスタンス自体を表します。クラスで定義されている他の関数もパラメータselfを宣言する必要があります。

```python
class fruit:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    def prt(self):
        print('fruit!')
```

ここにいくつかのクラスの特殊メソッドがあります：

| 関数  |  説明 |
| ------------ | ------------ |
|  \_\_init\_\_ | オブジェクトの生成時に自動的に呼び出されます  |
|  \_\_repr\_\_ | プリント  |
|  \_\_setitem\_\_ | インデックスで値を割り当てます  |
| \_\_getitem\_\_  |  インデックスで値を取得します |
|  \_\_len\_\_ | 長さを取得します  |

クラスに新しい関数を定義でき、クラスに既存の関数を直接追加できます。しかし、インスタンスの初期化変数を関数のパラメータに追加する必要があります：

```python
class fruit:
    def __init__(self, name, price):
        self.name = name
        self.price = price
def prt(self):          　#selfが必要
        print('fruit!')
fruit.prt = prt
```

fruitクラスをインスタンス化：

```python
a = fruit('apple','20')  #インスタンスを作成します
a.prt()                  #インスタンスの関数を呼び出します。
```

クラスfruitの初期化関数では2つの変数が定義されているため、インスタンスのパラメーターが二個未満の場合、エラーが発生します。

外部コードがクラスの一部のフィールド属性値を変更させたくない場合は、これらのフィールドをプライベート属性に変更できます。Pythonでは、インスタンスの変数名が`__`で始まる場合はプライベート変数（プライベート）になり、内部からのみアクセスでき、外部からはアクセスできません。
例：

```python
class fruit:
    def __init__(self, name, price):
        self.name = name
        self.price = price
        self.__innerprice = 10
    def prt(self):
        print('fruit!')
a = fruit('apple','20')
print(a.__innerprice)
```

Output:

```python
Traceback (most recent call last):
  File ..., line 9, in <module>
    print(a.__innerprice)
AttributeError: 'fruit' object has no attribute '__innerprice'
```

同様に、クラスのプライベート関数も関数名の前に`__`を追加します。

## 継承

クラスを定義する時に既存のクラスから継承できます。このクラスは他のクラスのフィールドと関数を継承できます。新しいクラスは「派生クラス」「子クラス」「サブクラス」と呼ばれ、継承されたクラスは「基底クラス」「親クラス」「スーパークラス」などと呼ばれます。
継承の構文は次のようになります：

```python
class subclassname(superclassname):
    statements
```

例：

```python
class fruit:
    def __init__(self, price):
        self.price = price
    def prt(self):
        print('fruit!')
class apple(fruit):
    def __init__(self, price, color):   #親クラスのコンストラクタを呼び出します
        fruit.__init__(self,price)
        self.color = color              #フィールドを追加します
    def colorprt(self):                 #新しい関数を追加します
        print('apple is '+ self.color)
a = apple(20, 'red')
a.prt()                                 #親クラスの関数を呼び出します
a.colorprt()                            #子クラスの関数を呼び出します
```

クラスは複数の親クラスから継承することもできます：

```python
class price:
    def __init__(self, price):
        self.price = price
    def prt(self):
        print('price!')
class color:
    def __init__(self, color):
        self.color = color
    def prt(self):
        print('color!')
class cherry(price, color):
    pass
c = cherry(20)
c.prt()
```

Output:`price!`

cherryクラスがpriceとcolorから派生し、独自のコンストラクタがありません。その場合は順序どおり(price)にコンストラクタを継承します。priceにはコンストラクタがない場合、後ろのcolorのコンストラクタを継承します。親クラスの同名の関数の呼び出しは同じ順です。

親クラスのコンストラクターを呼び出す方法は2つあります：

```python
class apple(price, color):
    def __init__(self, price, color):
        price.__init__(self, price)
        color.__init__(self, color)
class banana(price,color):
    def __init__(self, price, color):
        super().__init__(self, price, color)
```

appleクラスは2つの親クラスのコンストラクタを呼び出します。つまり2回__init__関数呼び出します。bananaクラスは`super()`関数ですべての親クラスを初期化します。初期化された変数は親クラスのコンストラクタ内のすべての変数を含む必要があります。

## オーバーライド

サブクラスは親クラスの関数内容を変更できます。この操作はオーバーライドと呼ばれます。
例：

```python
class fruit:
    def __init__(self, price):
        self.price = price
    def prt(self):
        print('fruit!')
class cherry(fruit):
    def prt(self):
        print('cherry!')
c = cherry(20)
c.prt()
```

Output:`cherry!`

親クラスがオーバーライドされる関数を呼び出したい場合には`super().`を使いできます。

## 属性

型チェックや合法性検証など、インスタンス属性へのアクセスと変更以外の処理ロジックを追加したい場合があります：

```python
class fruit:
    def setamount(self, value):
        if not isinstance(value, int):
            print('fail')
            return
        if value<0:
            print('fail')
            return
        self.amount=value
    def getamount(self):
        return self.amount
```

このクラスでは、`getamount`と`setamount`の2つの関数が定義されています。この関数は受けた値を確認また渡します。このクラスをインスタンス化した後、2つの関数を呼び出す必要があります。コードを簡略化するためにプロパティとして定義できます。
例：

```python
class fruit:
    @property
    def amount(self):
        return self._amount
    @amount.setter
    def amount(self,value):
        if not isinstance(value, int):
            print('fail')
        if value< 0:
            print('fail')
        self._amount=value
f=fruit4()
f.amount=-3
```

Output:`fail`

Pythonの組み込み`@property`デコレータは、関数をプロパティ呼び出しに変換します。property.setterデコレータは数値チェックと戻す役割を担当します。

## インターフェース

インターフェイスは抽象クラスであり、インスタンス化することはできません。インターフェースはサブクラスのメソッドを規制するための型です。インターフェイスクラスから継承されたサブクラスは、インターフェイスクラスの関数をオーバーライドする必要があります。型チェックを実行して、サブクラスが特定のメソッドを実装していることを確認します。
abcモジュールでインターフェースクラスを定義できます。例：

```python
from abc import ABCMeta, abstractmethod

class fruit(metaclass=ABCMeta):
    @abstractmethod
    def price(self):
        pass
    @abstractmethod
    def amount(self):
        pass
class apple(fruit):
    pass
class banana(fruit):
    def price(self):
        print(20)
    def amount(self):
        print(50)
```

fruitを継承したappleクラスはpriceとamount関数をオーバーライドしないため、エラーが発生します。

## 列挙

定数を定義したい場合は列挙型クラスを使用できます。
例：

```python
from enum import Enum

Week = Enum('Week',
             ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'))
```

イテレータを使用してすべての定数を取得できます。

```python
for name, member in Week.__members__.items():
    print(name, ',', member, ',', member.value)
```

Output:

```python
Mon , Week.Mon , 1
Tue , Week.Tue , 2
Wed , Week.Wed , 3
Thu , Week.Thu , 4
Fri , Week.Fri , 5
Sat , Week.Sat , 6
Sun , Week.Sun , 7
```

value属性はメンバーに自動的に割り当てられるint定数です。デフォルトでは1から始まります。
メンバーに特定の値を割り当てたい場合は、独自の列挙クラスを定義できます。

```python
from enum import Enum, unique
@unique                             #値が重複しないことを確保
class Week(Enum):
    Mon = 1;Tue = 2;Wed = 3;Thu = 4;Fri = 5;Sat = 6;Sun = 7

print(Week.Mon,' ',Week['Mon'],' ',Week(1),' ',Week.Mon.value) #異なる表示方法
```

Output:`Week.Mon   Week.Mon   Week.Mon   1`