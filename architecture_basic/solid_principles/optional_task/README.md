# 任意課題

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [凝集度](#%E5%87%9D%E9%9B%86%E5%BA%A6)
  - [偶発的凝集](#%E5%81%B6%E7%99%BA%E7%9A%84%E5%87%9D%E9%9B%86)
  - [論理的凝集](#%E8%AB%96%E7%90%86%E7%9A%84%E5%87%9D%E9%9B%86)
  - [時間的凝集](#%E6%99%82%E9%96%93%E7%9A%84%E5%87%9D%E9%9B%86)
  - [手続き的凝集](#%E6%89%8B%E7%B6%9A%E3%81%8D%E7%9A%84%E5%87%9D%E9%9B%86)
  - [通信的凝集](#%E9%80%9A%E4%BF%A1%E7%9A%84%E5%87%9D%E9%9B%86)
  - [逐次的凝集](#%E9%80%90%E6%AC%A1%E7%9A%84%E5%87%9D%E9%9B%86)
  - [機能的凝集](#%E6%A9%9F%E8%83%BD%E7%9A%84%E5%87%9D%E9%9B%86)
- [結合度](#%E7%B5%90%E5%90%88%E5%BA%A6)
  - [内部結合](#%E5%86%85%E9%83%A8%E7%B5%90%E5%90%88)
  - [共通結合](#%E5%85%B1%E9%80%9A%E7%B5%90%E5%90%88)
  - [外部結合](#%E5%A4%96%E9%83%A8%E7%B5%90%E5%90%88)
  - [制御結合](#%E5%88%B6%E5%BE%A1%E7%B5%90%E5%90%88)
  - [スタンプ結合](#%E3%82%B9%E3%82%BF%E3%83%B3%E3%83%97%E7%B5%90%E5%90%88)
  - [データ結合](#%E3%83%87%E3%83%BC%E3%82%BF%E7%B5%90%E5%90%88)
  - [メッセージ結合](#%E3%83%A1%E3%83%83%E3%82%BB%E3%83%BC%E3%82%B8%E7%B5%90%E5%90%88)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 凝集度

- モジュールの協調度を表す
- 高い、低いで程度を表す

![](https://assets.st-note.com/production/uploads/images/50757950/picture_pc_1a45543ccf3223225d72d3726faaa1f4.jpg?width=800)

-  機能的凝集が理想的だが、全てをこれで書き表すのは無理
-  凝集度が低いモジュールをできるだけ小さく保つようにすべき

![](https://assets.st-note.com/production/uploads/images/50757942/picture_pc_ab1ffb43a47685ad32b1d393b0429d0f.jpg?width=800)

![](https://assets.st-note.com/production/uploads/images/50757922/picture_pc_d267df33a03112d6099c8a29249653a3.jpg?width=800)


### 偶発的凝集

- 適当（無作為）に集められたものがモジュールとなっている
- モジュールないの各部分には特に関連性がない
- とりあえず動く、状況

```ts
function main() {
  const data = getData()  // データの取得
  console.log("Hello World")  // 出力
  calcPrimeNumber(10)  // 素数の計算
}
```

### 論理的凝集

- 論理的に似たようなことをするものを集めたモジュール
- 例えば、フラグによって動作を変える
- 共通化という名目でやっちゃいがちだが、保守性が低く、よくない

```ts
// sampleAとsampleBが似ている
function sample(isA: Bool) {
  if isA {
    sampleA()
  } else {
    sampleB()
  }
}
```

- ユースケースが異なるが、処理が似ている実装をDRYにするときに注意！
- 例えば最初は、ユースケース1のみを想定すればよかったが、その関数のままユースケース2を想定すると、論理的凝集となる
- ありがち....で良くないと認識されないことも多い
- デメリット
  - ユースケースが増えると、そのモジュールはフラグだらけになる
  - 複数のユースケースを表現する関数になると、他のユースケースへの影響がある関数になってしまう
    - ユースケース1を変更すると、2,3,4にバグが発生...!
  - 他のユースケースへの影響が大きくなってくると、凝集度が低くなっていると言える
    - 影響範囲の理解が困難...

```ts
// Bad: 論理的凝集になってしまっている
function usecase1and2(isUsecase1: Bool) {
  a()
  b()
  // usecase1の時のみ実行
  if isUsecase1 {
    c()
  }
  d()
}

// 呼び出し側が、usecase1か2かを実行時点で理解する必要がある
function main() {
  // 1を使う時
  usecase1and2(true)

  // 2を使う時
  usecase1and2(false)
}
```

- 回避する方法
  - ユースケースごとに関数を定義する
  - これにより論理的凝集から、時間的凝集になる

```ts
// Good: ユースケースごとに関数を定義
function usecase1() {
  a()
  b()
  c()
  d()
}

function usecase2() {
  a()
  b()
  c()
}

function main() {
  // 1を使う時
  usecase1()

  // 2を使う時
  usecase2()
}
```

- ユースケースを分離せずに再利用したくなる理由は、時間的凝集の関数に必要な詳細な実装を書きすぎているため

```ts
// Bad: 詳細な実装を書きすぎている例
function usecase1() {
  // aに関する処理が20行
  // bに関する処理が20行
  // cに関する処理が20行
  // dに関する処理が20行
}

function usecase2() {
  // aに関する処理が20行
  // bに関する処理が20行
  // dに関する処理が20行
}
```

- そうではなく、ユースケースの内部の機能を、機能的凝集で関数化する
- これにより、複数のユースケースに対応して再利用する必要性が低下する

```ts
// Good: ユースケースの内部の機能を、機能的凝集で関数化する
function usecase1() {
  a()
  b()
  c()
  d()
}

function usecase2() {
  a()
  b()
  d()
}
```

- 実行順序の表現をDRYにしたい場合
  - 多くの場合、実行順序の表現をDRYにすることよりも、論理的凝集を回避する方が良い
    - 順序が変わることはほとんどないため
    - 順序が変わっても、その場合は機能しなくなるので、最低限の動作確認が気が付くため

- 論理的凝集を回避するメリット
  - ユースケースを表現するレイヤーから条件分岐が消える！
    - ユースケースの可読性が向上する
  - 別のユースケースが生まれた場合に、他のユースケースからコピペするだけで作れるようになる
  - 単一責任になる
  - ユースケースの関数を変更するタイミングが、対象ユースケースの実行順序が変わった時のみに限定される

### 時間的凝集

- 時間的に近く動作するものを集めたモジュール
- 実行順序を入れ替えても動作する
- 例えば、初期化処理や、UIのフォアグラウンド時の処理など

```ts
function initApp(isA: Bool) {
  initConfig()
  initLogger()
  initDB()
}
```

- 時間的凝集は、絶対悪ではない
  - main関数で必要なセットアップは時間的凝集
  - バックエンドのユースケース層の関数も時間的凝集
  - クライアントやアプリ開発のviewのライフサイクル管理は、標準フレームワークが時間的凝集を強制してくる
    - iOSなら、viewDidLoad()、viewWillAppear()、viewDidAppear()など

- 注意すべきこと！
  - 時間的凝集の関数は、具体的な処理を書くのではなく、**極力機能的凝集の関数を実行することに徹するべき！！**

```ts
// Bad: 具体的な処理が書いてある例
function badExampleFunction(logFileName: string, dbSource: string) {
  // Configの読み込み
    // 具体的な処理

  // DBへの接続
    // 具体的な処理

  // ログの初期化
    // 具体的な処理
}
```

```ts
// Good: 極力機能的凝集の関数を実行する例
function goodExampleFunction() {
  // Configの読み込みを行う関数の実行
  loadConfig()

  // DBへの接続を行う関数の実行
  dbAccess()

  // ログの初期化
  initLogger()
}

function loadConfig() {
  // 具体的な処理
}

function dbAccess() {
  // 具体的な処理
}

function initLogger() {
  // 具体的な処理
}
```

- 時間的凝集には、以下のような現実があるが、Reactは、`useEffect()`関数で擬似的な機能的凝集を可能にした
  - たまたま同じ時間に実行するだけで、機能としては無関係な処理を同じ関数に記述する必要がある -> 時間的凝集
  - 同じ処理Aに関することでも、実行タイミングで関数が別れてしまう

### 手続き的凝集

- 順番に実行する必要があるものを集めたモジュール
- 共通したデータは使わない
- 例えば、アクセス権を確認してファイルに書き込む

```ts
function outputFile(file: File) {
  checkPermission()
  writeFile(file)
}
```

### 通信的凝集

- 同じデータを扱う部分を集めたモジュール
- 順番は重要ではない

```ts
function changeAll(data: Data) {
  changeA(data)
  changeB(data)
  changeC(data)
}
```

### 逐次的凝集

- ある部分の出力が、別の部分の入力となるような部分を集めたモジュール
- 例えば、ファイルを取得して変換して保存する

```ts
function sample() {
  const file = getFile()
  const transformed = transform(file)
  saveFile(transformed)
}
```

### 機能的凝集

- 単一の定義されたタスクを実現するモジュール
- 例えば、２点間の距離の計算

```ts
function calcLength(a: Point, b: Point): Int {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const length = sqrt(dx * dx + dy * dy)
  return +length
}
```

## 結合度

- モジュール間の相互依存性の程度

![](https://assets.st-note.com/production/uploads/images/50757938/picture_pc_4d88ad270d7d4063a702af197b2dbe88.jpg?width=800)

- 凝集度と同じく、全てをメッセージ結合のみで行うことはできない。
- 結合度が高いモジュールをできるだけ小さく分離させることが大事

![](https://assets.st-note.com/production/uploads/images/50757937/picture_pc_c2f00cd69e4d9b608cd7eb86640dd209.jpg?width=800)

### 内部結合

- あるモジュールが別のモジュールの内部動作によって、変化したり依存したりする
- 例えば、別のモジュールの内部データをリフレクションなどで直接参照する
- TODO: typescriptで書きたいが良い例が見つからなかったので今は省略

### 共通結合

- 複数のモジュールが同じグローバルデータにアクセスできる状態
  - グローバル変数や、Singletonでグローバル化してしまった状態など
- 変更が加えられると、予期しない副作業が発生する可能性がある

```ts
const data: Data = Data()

function updateA() {
  data.value = "a"
}

function updateB() {
  data.value = "b"
}
```

### 外部結合

- 標準化されたインターフェースを保つグローバルな状態を共有する
- 外部ツールや外部デバイスへの通信で発生する可能性がある
- （文献により解釈が一部異なる）

```ts
function function1() {
  Api.getData()
}

function function2() {
  Api.update(Data())
}
```

### 制御結合

- あるモジュールに何をすべきかについての情報を渡すことで、別のモジュール処理の流れを制御する
- 論理的凝集が発生するので、良くない

```ts
function function1() {
  function2(true)
}

function function2(flag: Bool) {
  if (flag) {
    console.log("A")
  } else {
    console.log("B")
  }
}
```

### スタンプ結合

- 構造体やクラスなどの受け渡しで結合されている
  - 構造体内のプロパティを変更、削除すると影響を受ける
- 不必要にデータを渡す可能性がある

```ts
function function1() {
  function2(User(name = "Mika"))
}
```

### データ結合

- 単純な引数のやりとり
- 必要最小限のデータを渡す
  - スタンプ結合よりは結合度は低い

```ts
function function1() {
  function2(123, "abc")
}
```

### メッセージ結合

- 引数のないやりとり
- データのやり取りは存在しない

```ts
function function1() {
  function2()
}
```

## 参考

- [良いコードとは何か - エンジニア新卒研修 スライド公開](https://note.com/cyberz_cto/n/n26f535d6c575)
- [オブジェクト指向のその前に-凝集度と結合度/Coheision-Coupling](https://speakerdeck.com/sonatard/coheision-coupling)
- [モジュール結合度について](https://qiita.com/eKushida/items/39bdb3f88fb68ecd66f6)