# Pythonの紹介

Pythonが誕生したのはハードウェアの処理機能が低い時代で、当時には多くの人が知らない言語でした。時代の進展に伴い、ハードウェアの機能は向上し、ソフトウェアの複雑度も増大しました。企業はより一層の開発効率を求めるため、Pythonは徐々に開発者に支持されています。

同じタスクを遂行する為に、C言語で1000行、JAVAで100行のコードが必要な時、Pythonで20行で済みます。Pythonは効率的な仕事、研究の実現に必要な開発言語です。機械学習が普及している現在、この分野を始めるならばPythonは最優先に選択すべき言語です。

## Python２系と３系

今Pythonは2.xと3.xの二つバージョンがありますが、互換性がありません。Linux、macOSなどシステムに付属しているのは2系ですがプログラミングにはほとんど3系以上のが使われているので3系Pythonの勉強を勧めます。

## Pythonのインストール

### Windowsプラットフォーム

Windows開発者は公式サイトに直接ダウンロードできます<https://www.python.org/downloads/>、インストーラーで自動環境変数を設定するのをチェックできます。インストールした後、CommandLineで`python`を実行し、

```shell
C:\> python
Python 3.8.x ...[MSC v... 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> _
```

のインタラクティブ環境が出ればインストールは成功しています。終了したい場合
`exit()`を実行してください。もしインストールの時に環境変数設定をチェックしていなければ、PythonのPATHを手動で追加してください。

### Unix/Linuxプラットフォーム

まずソースパッケージをダウンロードします。コンパイル用のパッケージをインストール必要があります。

```bash
yum install -y gcc patch libffi-devel python-devel  zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
```

そしてソースを解凍し、`./configure --prefix=/opt/python38`でconfigure操作します。そしてmakeとmake installをコンパイルします。後で必要があればパス変数を変えます。

### MacOSプラットフォーム

公式ウェブサイトでダウンロードしてインストールでき、Homebrewで`brew install python3`を実行してもできます。環境変数の設定はLinuxの場合と同様です。

## Pyenvと仮想環境

PCに複数バージョンのPythonがインストールされている場合、Pyenvバージョン管理ツールを使用すると、プロジェクトによって複数環境を作成し、便利な切り替え方法がつかえるようになります。PyenvとPyenv-virtualenvはgithubでダウンロードできます。<https://github.com/pyenv/pyenv>

環境変数が設定されているならば、Linuxの場合`pyenv versions` で、すべてのバージョンが確認できます。特定のバージョンをインストールするには、`pyenv install 3.x.x`のようにします。`pyenv global 3.x.x`でグロバールバージョンを切り替え、`pyenv local 3.x.x`で今のパスのバージョンを切り替えます。
独立した仮想環境を作るには、`pyenv virtualenv <version> <name>`を実行します。
`pyenv activate <name>`を実行して有効化します。

## Pipパッケージ管理とanaconda

### pip

pipはpythonに付属するパッケージ管理ツールです。パッケージを使いたい場合、`pip install xxx`で自動ダウンロードできます。しかしpip使うと2系のディレクトリにインストールされます。3系にインストールする場合はpip3を使用してください。

### anaconda

科学パッケージとその依存関係を含むリソースツールです。それについてのcondaもバージョンとパッケージ管理のための統合ツール、virtualenvの軽量ツールに比べて、condaはより操作しやすいと思います。データ分析、科学計算、機械学習に触れたい方にお勧めです。Windowsマシンには<https://www.anaconda.com/download/>でダウンロードできます。MacOSとLinuxはCondaコマンドを設定できます。

環境設定は次のように行います：

* `conda create -n name python=3.x.x`で環境を作成
* `Source activate name/deactivate`で有効化
* `conda install ...`でパッケージをインストール。
