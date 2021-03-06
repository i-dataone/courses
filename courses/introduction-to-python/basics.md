# Pythonの基礎文法

基礎知識を学ぶ前に、注意すべき点がいくつかあります。HelloWorldコードの例を見ましょう。最初に新しいHelloworld.pyファイルを作ります。テキストエディタとして、Sublime、notepad++などが使えます。統合開発環境にはpycharmを推奨します。

Helloworld.py中のコード：

```python
# -*- coding: UTF-8 -*-
hello = True
if hello:
    print ("Hello")
else:
    print ("World")
```

この.pyファイルはCMDで`python Helloworld.py`を実行でき、IDEに導入して実行することもできます。コードの一行目には使用するエンコード方法を宣言します。後はif条件分岐で判断した後、`print()`関数で
`Hello`を出力します。

<!--
「両方に実行できます。」
→意味が分かりませんでした。「両方」とは、何と何のこと？
-->

## インデント

フォーマットについて、他の言語とは異なり、文末にセミコロンをつける必要がなく、コードブロックには中括弧を使用しません。その代わりにインデントでクラス、関数、その他の判断を処理します。
そのためインデントのルールを厳守する必要があります。たとえばコードを
<!-- 他の言語とは異なり、文末にセミコロンをつける必要がありません。Pythonのコードブロック..⇒  Pythonは他の言語とは異なり、文末にセミコロンをつける必要がなく、コードブロック -->

```python
hello = True
if hello:
    print ("Hello")
else:
　print ("World")
```

で実行したら、エラーが発生します。コードブロックで同じインデント（Space、TAB）数を使用する必要があります。行の間隔を明確にするためTABをお勧めします<!--ます⇒します-->。またIDEの自動エラー訂正機能によってある程度でこのようなエラーを回避できます。

## 複数行に一つの文を表示

文を複数の行に分割する場合、バックスラッシュ`\`を使います。

```python
helloworld = "hello" + \
             "world"
```

## 1行に複数のステートメントを表示

ステートメントをセミコロンで分割します。

```python
x = "hello"; y="world"; print(x,y)
```

## 引用符

引用符`'`、二重引用符`"`、三重引用符`'''`,`"""`を使用して文字列を表すことができます。`'`と`"`の違いはありませんが、三重引用符は複数行で表示できます。

```python
x = """hello,
world"""
```

## コメント

コードをコメントしたい場合：

- 行コメント：コメントの頭に`#`をつけます

```python
 hello="hello" # It's a hello.
```

　または
<!--"は"追加-->

```python
 # It's a hello.
```

- 複数行コメント:三重引用符を頭と尾につけます。

```python
 """
 hello="hello"
 world="world"
 """
```
