# マルチプロセスとマルチスレッド

以前に作成したすべてのPythonプログラムは、単一のタスクを実行するプロセスです。つまり、スレッドは1つだけです。コンピュータに同時に複数のタスクを処理させたい場合があります。 プログラミングは複雑ですが、コンピュータの利用効率を大幅に向上させることができます。

## マルチプロセス

multiprocessingモジュールは、プロセスオブジェクトを表すProcessクラスを提供します。
例：

```python
from multiprocessing import Process
import os

def runprocess(name):
    print('Run child process %s (%s)' % (name, os.getpid()))

if __name__=='__main__':
    print('Parent process %s.' % os.getpid())
    p = Process(target=runprocess, args=('process1',))
    print('Child process will start.')
    p.start()
    p.join()
    print('Child process end.')
```

Output:

```python
Parent process 15584.
Child process start.
Run child process process1 (14624)
Child process end.
```

最初のprintは現在のプロセス番号を出力します。idはオペレーティングシステムによって動的に割り当てられ、実行毎に値は必ずしも同じではありません。

`Process()`関数で子プロセスを生成します。一番目のtargetパラメータは子プロセスが実行する関数を表します。二番目は関数のパラメータを代入します。
`start()`関数は子プロセスを起動します。`join()`関数は子プロセスが終了した後に実行を継続できます（現在の位置でメインプロセスをブロックし、joinの子プロセスの終了後にメインプロセスを実行し続けます）。

複数のプロセスがある場合、プロセスプールを作成できます。
例：

```python
import time
from multiprocessing import Pool

def runprocess(num):
    print("Child Process %s" % num)
    time.sleep(1)
    print('process %s end' % num)
if __name__ == '__main__':
    print('Parent Process start')
    start_time = time.time()
    pool = Pool(3)
    print('Child start')
    for i in range(3):
        pool.apply(runprocess, (i+1,))
    print('Parent Process done time: %ss' % (time.time() - start_time))
```

Output:

```python
Parent Process start
Child start
Child Process 1
process 1 end
Child Process 2
process 2 end
Child Process 3
process 3 end
Parent Process done time: 3.1831817626953125s
```

例では`Pool()`で三つの子プロセスを生成しました。プールのデフォルトサイズはCPUコア数です。`apply()`関数は`join()`に似ていますので、メインプロセスをブロックし、子プロセスを順番に実行します。startとjoinを省略できます。`apply_async()`はメインプロセスをブロックせずに子プロセスを実行でき、joinを使うより効率が良いです。

## マルチスレッド

マルチタスクは、複数のプロセスまたはプロセス内の複数のスレッドで実行できます。Python標準ライブラリは2つのモジュールを提供します：_threadとthreading。_threadは低レベルモジュール、threadingは高レベルモジュールであり、_threadをカプセル化しています。
例：

```python
import time
import threading as td

def runthread():
    print('Thread %s start:' % td.current_thread().name)
    n = 0
    while n < 2:
        n = n + 1
        print('Thread %s count %s' % (td.current_thread().name, n))
        time.sleep(1)
    print('Thread %s end.' % td.current_thread().name)
if __name__=='__main__':
    print('Thread %s start:' % td.current_thread().name)
    t = td.Thread(target=runthread, name='Childthread')
    t.start()
    t.join()
    print('Thread %s end.' % td.current_thread().name)
```

Output:

```python
Thread MainThread start:
Thread Childthread start:
Thread Childthread count 1
Thread Childthread count 2
Thread Childthread end.
Thread MainThread end.
```

threadingの`current_thread()`関数は現在のスレッドインスタンスを返します。子スレッドの名前は、作成のときに指定されます。名前が指定されない場合、自動的にThread-*を付けます。スレッドを作成するときに、パラメータdaemonをTrueに設定して、スレッドをバックグラウンドに転送できます。

### カスタムスレッド

threadクラスを継承してスレッドをカスタマイズできます。
例：

```python
from threading import Thread
import time

class CustomizedThread(Thread):
    def __init__(self, n):
        super().__init__()
        self.n = n
    def run(self):
        i=0
        while i < self.n:
            print('Count', i)
            i += 1
            time.sleep(1)
print('Main thread start')
c = CustomizedThread(3)
c.start()
c.join()
print('Main thread end')
```

Output:

```python
Main thread start
Count 0
Count 1
Count 2
Main thread end
```

CustomizedThreadはスレッドクラスから継承されたメソッドです。スレッドを実行するデフォルトの関数は`run()`であるため、`run()`をオーバーライドすることでスレッド実行の内容を変更できます。

### ロック

マルチスレッドでは、変数がすべてのスレッドで共有されるため、どのスレッドでも変更できます。たとえばスレッド1がリスト内のすべての要素を後ろから前へ削除し、スレッド2が要素を前から後ろへ読み取って印刷します。スレッド2はスレッド1がまだ削除してないいくつかの要素を出力します。これはデータが同期されていない状況です。これを回避するために、ロックの概念が導入されました。
ロックには2つの状態：ロックとロック解除があります。 一つのスレッドが関数（データの共有など）にアクセスする場合はロックを取得する必要があります。別のスレッドがすでにロックを取得している場合は、このスレッドを一時停止（同期的にブロックする）し、ロックしたスレッドがアクセスを終了してロックを解放するまで待機します。 その後、二番目のスレッドを続行します。
例：

```python
import threading
import time

class CustomizedThread (threading.Thread):
    def __init__(self, name, counter, loop):
        threading.Thread.__init__(self)
        self.name = name
        self.counter = counter
        self.loop = loop
    def run(self):
        print ('Thread:' + self.name + ' start')
        threadLock.acquire()            #ロックを取得する
        plusminus(self.name, self.counter, self.loop)
        threadLock.release()            #ロックを解除する
def plusminus(threadName, num, loop):
    while loop:
        global sumup
        time.sleep(1)
        sumup= sumup + int(num)
        loop -=1
        print('%s: sum is %d' % (threadName, sumup))
sumup=0
threadLock = threading.Lock()
threads = []
thread1 = CustomizedThread('Thread-1', 1, 2)
thread2 = CustomizedThread('Thread-2', -1, 2)
thread1.start()
thread2.start()
thread1.join()
thread2.join()
print ("threads end")
```

Output:

```python
Thread:Thread-1 start
Thread:Thread-2 start
Thread-1: sum is 1
Thread-1: sum is 2
Thread-2: sum is 1
Thread-2: sum is 0
threads end
```

しかし実際には、ロックが追加されたため、同じメソッドを使用する2つのスレッドが同時に実行されませんでした。
