# 任意課題

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

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