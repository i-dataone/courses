# I/O処理

IOは、コンピューターのInput/Output、つまり入力と出力を指します。

## ファイルの読み書き

Pythonはopen()関数でファイルを開き、ファイルオブジェクトを作成します。そして関連する関数でこのオブジェクトを呼び出して読み取りと書き込みを行います。
構文は次のようになります：

```python
fileobject = open(name (, mode, buffering))
```

nameは読み取りたいファイルのパスを表します。modeはファイルのアクセスモードで、読み取り専用、書き込み、追加などがあります。 デフォルトのモードは読み取り専用です。bufferingはバッファのサイズを指定することです。
一般的なアクセスモードは次のようになります：

| モード  | 説明  |
| ------------ | ------------ |
| t  |  テキストモード |
| r  |  ファイルを読み取り専用で開きます（デフォルト）。ファイルポインタはファイルの先頭に配置されます。 |
| rb+ | 読み取りおよび書き込み用にバイナリ形式でファイルを開きます。ファイルポインタはファイルの先頭に配置されます。通常は画像などの非テキストファイルに使用されます。  |
| w+ |  読み取りと書き込みのためにファイルを開きます。 ファイルが既に存在する場合は、ファイルを開いて最初から編集します。元のコンテンツは削除されます。ファイルが存在しない場合は、新しいファイルを作成します。 |
| a  |  追加するためにファイルを開きます。ファイルが既に存在する場合、ファイルポインターはファイルの末尾に置かれます。新しい内容は既存の内容の後に書き込まれます。ファイルが存在しない場合は新しいファイルを作成します。|

例としてファイルを読み取るreadfile.pyを作成します。ファイルのパスはコマンドラインの入力から取得されます。

```python
import sys
def openfile():
    args = sys.argv
    f = open(args[0], 'r')
    print(f.read())
    f.close()
if __name__=='__main__':
    openfile()
```

コマンドラインにはこのように入力します。

```shell
python readfile.py /Users/python/test.txt
```

sys.argv関数は.pyの後ろのパラメータをリストに入れます。パラメータはスペースで区切られます。この例の場合には`/Users/python/test.txt`パスのファイルを`open()`関数で開きます。`read()`を呼び出して、ファイルの内容全体を読み取ります。内容をメモリに読み取り、strオブジェクトで表します。ファイルオブジェクトはOSのリソースを占有するため、使用後に`close()`でファイルを閉じる必要があります。
ファイルの読み書き中にIOエラーが発生する可能性があります。エラーが発生すると次のclose()は呼び出されません。 withはエラーの有無に関係なくファイルを正しく閉じることができます。

```python
import sys
def openfile():
    args = sys.argv
    with open(args[0], 'r') as f:
        print(f.read())
if __name__=='__main__':
    openfile()
```

`write()`を使用してファイルを書き込みます。入力は文字列型でなければなりません。

```python
with open('/Users/python/test.txt', 'w') as f:
    f.write('Test text')
```

上記の基本的な関数以外には、Pythonのioモジュールは複数のストリーミングインターフェイスを提供します。ファイルの読み書きに限らずメモリに直接読み書きすることもできます。

例えばメモリ内の文字列を読み書きます：

```python
from io import StringIO
f = StringIO()
f.write('Hello')
```

読み取ります：

```python
from io import StringIO
f = StringIO('Hello')
s = f.readline()
```

バイナリデータを操作する場合はBytesIOを使用します。

```python
from io import BytesIO
f = BytesIO()
f.write('バイナリ'.encode('utf-8'))
```

書き込まれるのはUTF-8エンコードされたバイトです。

## ファイルとディレクトリを操作する

ファイルとディレクトリを操作する関数はosモジュールとos.pathモ​​ジュールに配置されます。
例：

```python
import os
path = os.path.abspath('.')     #現在の.pyファイルの絶対パスを取得します。
a = os.path.join(path, 'testdir')   #現在のパスとフォルダ名を組み合わせます。
b = os.path.split('/Users/python/testdir/test.txt') #パスを分けます。
print(a)
print(b)
```

Output:

```python
/Users/python/testdir
('/Users/python/testdir', 'test.txt')
```

2つのパスを1つに結合するときは文字列を直接に連結せず、異なるOSのパス区切り文字を正しく処理できる`os.path.join()`関数を使ってください。`split()`関数はパスを自動的に2つの部分に分割できます。後者の部分は最後のディレクトリまたはファイル名です。

他の常用的な方法は次のようになります。

|  関数 | 説明  |
| ------------ | ------------ |
| mkdir()  | ディレクトリを作成します。  |
|  rmdir() | ディレクトリを削除します。  |
|  rename(before, after) | ファイル名を変更します。  |
|  remove() |  ファイルを削除します。 |

## データシリアライズ

前の節はファイルにテキストの書き込みを説明しました。より複雑なPythonオブジェクトをディスクに書き込む場合、データをシリアル化する必要があります。Pythonはシリアル化のpickleモジュールを提供します。
例：

```python
import pickle
list1 = [1, 2, 3]
pickle.dumps(list1)
with open('/Users/python/test.txt', 'wb') as f:
    pickle.dump(list1, f)
```

オブジェクトをディスクからメモリに読み取る場合は、pklファイルをバイトに読み取り、pickle.loads()関数を使用してオブジェクトを逆シリアル化できます。

```python
with open('/Users/python/test.txt', 'rb') as f:
    d = pickle.load(f)
```
