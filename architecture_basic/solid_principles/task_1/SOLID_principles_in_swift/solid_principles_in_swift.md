# 課題1

- SwiftによるSOLID原則

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

## 単一責任の原則

- 以下のように、過去のメッセージの一覧を取得するメッセージアプリの画面で考えてみる。
- `ConversationInteractor`クラスは、過去のメッセージの配列を取得する

```swift
// Bad: 1つのクラスに複数の責任を持たせている
class ConversationInteractor {
  let useId: String
  init(userId: String) {
    self.userId = userId
  }

  func fetchAllConversations() {
    let jsonData: Any = fetchRemoteConversationJsonData(for: userId)
    let conversations = convertJsonToConversation(jsonData: jsonData)
    saveToDatabse(conversations: conversations)
  }

  private func fetchRemoteConversationJsonData(for userId: String) {
    // メッセージのJSONデータを取得するためにAPIリクエストを行う
  }

  private func convertJsonToConversation(jsonData: Any) -> [Conversation] {
    // データをパースして、メッセージオブジェクトの配列を作成する
    return []
  }

  private func saveToDatabse(conversations: [Conversation]) {
    // CoreDataやその他類似のデータストアにメッセージを保存する
  }
}
```

- ここではいくつの責務をこのクラスが行っているかというと、以下の通り
  - APIでメッセージを取得する
  - 取得したJSONデータをパースしてオブジェクトを作成する
  - データストアにメッセージを保存する
- もしこれを、APIリクエストを`NSURLSession`、パースを`JSONSerialization`、データストアへの保存をCore Dataに行っているとすると、このクラスはモンスター級に大きなクラスになってしまう

```swift
// Good: 単一責任の原則でクラスを分割する
class ConversationInteractor {
  let userId: String
  let apiService: ConversationAPIService
  let dbHandler: ConversationDBOperation
  init(userId: String,
       apiService: ConversationAPIService,
       dbHandler: ConversationDBOperation) {
    self.userId = userId
    self.apiService = apiService
    self.dbHandler = dbHandler
  }

  func fetchAllConversations() {
    let conversations = apiService.fetchRemoteConversation(for: userId)
    dbHandler.save(conversations: conversations, for: userId)
  }
}

protocol ConversationAPIService {
  func fetchRemoteConversation(for userId: String) -> [Conversation]
}

// メッセージのJSONデータを取得するためにAPIリクエストを行い、データをパースして、メッセージオブジェクトの配列を作成する
class RemoteService: ConversationAPIService {
  func fetchRemoteConversation(for userId: String) -> [Conversation] {
    return []
  }
}

protocol ConversationDBOperation {
  func save(conversations: [Conversation], for userId: String) -> Bool
}

// オブジェクトをデータベースに保存する
class ConversationRepository: ConversationDBOperation {
  func save(conversations: [Conversation], for userId: String) -> Bool {
    // データベースに[Conversation]を保存する処理を取り扱う
    return true
  }
}

class Conversation: Codable {
  // モデルの定義
}
```

## オープンクローズド原則

- この原則を容易に理解するために、ある地域の面積を計算するサンプルで見てみましょう
- 四角形の面積を計算するという要件があるので、四角形とそれに関連する面積を計算するクラスを以下にように作った。

```swift
struct Rectangle {
  let width: CGFloat
  let height: CGFloat
}

struct AreaCalculator {
  func area(rectangle: Rectangle) -> CGFloat {
    return rectangle.width * rectangle.height
  }
}
```

- 次に、四角形だけではなく円の面積を計算したいという要件が出されたので、次のように`AreaCalculator`クラスを変更した
- これはうまく動くが、もし次の要件として三角形の面積を計算したいという要望が出された場合、このクラスは条件分岐でより巨大になってしまう。
- オープンクローズド原則に従うと、既存のクラスは修正すべきではない

```swift
// Bad
struct AreaCalculator {
  func area(shape: Any) -> Double {
    if let rectangle = shape as? Rectangle {
      return rectangle.width * rectangle.height
    } else if let circle = shape as? Circle {
      return .pi * circle.radius * circle.radius
    }
    return 0
  }
}
```

```swift
// Good
protocol GeometricShape {
  func area() -> Double
}

struct Rectangle: GeometricShape {
  let width: Double
  let height: Double
  
  func area() -> Double {
      return width * height
  }
}

struct Cicle: GeometricShape {
  let radius: Double
  
  func area() -> Double {
      return .pi * radius * radius
  }
}

struct Triangle: GeometricShape {
  let length: Double
  let breath: Double
  
  func area() -> Double {
      return length * breath
  }
}

struct AreaCalculator {
  func area(shape: GeometricShape) -> Double {
      return shape.area()
  }
}
```

- では次に、より実践的なコードをみてみよう。
- ListViewかTableViewに製品データと広告データを表示するという要件が出ており、ViewControllerかActivityControllerは以下のようになる。
- これは先程の古い`AreaCalculator`クラスと似ている。もしSuggestionCellという新しいcellを追加で表示する必要が出てきた場合、既存の`ListViewController`クラスを変更する必要がある。これはオープンクローズド原則に従っていない。

```swift
// Bad
class ListViewController: UITableViewController {
  // 非同期処理で取得したデータの配列
  var data: [CellModel] = []

  override func tableView(_ tableView: UITableView,
                          cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cellModel = data[indexPath.row]
    let defaultCell = tableView.dequeueReusableCell(withIdentifier: "DefaultCell")!

    if cellModel.type == .product {
      guard let productCell = tableView.dequeueReusableCell(withIdentifier: ProductCell.reuseId) as? ProductCell else {
        return defaultCell
      }

      productCell.cellModel = cellModel
      return productCell
    } else if cellModel.type == .ad {
      guard let adCell = tableView.dequeueReusableCell(withIdentifier: AdCell.reuseId) as? AdCell else {
        return defaultCell
      }

      adCell.cellModel = cellModel
      return adCell
    }
    return defaultCell
  }
}
```

- では、オープンクローズド原則を適用していこう
- UITableViewCellとセクションのタイプのプロパティを作成するための関数をもつprotocolを作ろう
- SectionContainerはSectionHandlersの全てのタイプを扱う
- 以下のようにすることで、新しいCellのタイプが増えても、既存コードを修正せずに、追加することでオープンクローズドの原則に従うことができる

```swift
// Good
// ただしこのまま貼り付けても動かないので注意
import UIKit

protocol SectionHandler {
  var type: String { get }
  func tableView(_ cellModel: CellModel,
                 _ tableView: UITableView,
                 cellForRowAt indexPath: IndexPath) -> UITableViewCell
}

class SectionContainer {
  var sectionHandlers: [String: SectionHandler] = [:]
  init(handlers: [SectionHandler]) {
      handlers.forEach{ handler in
          sectionHandlers[handler.type] = handler
      }
  }
  
  func tableView(_ cellModel: CellModel,
                  _ tableView: UITableView,
                  cellForRowAt indexPath: IndexPath) -> UITableViewCell {
      guard let sectionHandler = sectionHandlers[cellModel.type.rawvalue] else {
          return UITableViewCell()
      }
  }
}

enum CellModel: String {
  // モデルの定義
  case type = "sometype"
}

enum ListDataType: String {
  // リストの種類
  case product = "product"
  case ad = "ad"
}

class ProductSectionHandler: SectionHandler {
  var type: String {
      return ListDataType.product.rawValue
  }
  
  func tableView(_ cellModel: CellModel,
                  _ tableView: UITableView,
                  cellForRowAt indexPath: IndexPath) -> UITableViewCell {
      guard let productCell = tableView.dequeueReusableCell(withIdentifier: ProductCell.reuseId) as? ProductCell else {
          return UITableViewCell()
      }
      
      productCell.cellModel = cellModel
      return productCell
  }
}

class AdSectionHandler: SectionHandler {
  var type: String {
      return ListDataType.ad.rawValue
  }
  
  func tableView(_ cellModel: CellModel,
                  _ tableView: UITableView,
                  cellForRowAt indexPath: IndexPath) -> UITableViewCell {
      guard let adCell = tableView.dequeueReusableCell(withIdentifier: AdCell.reuseId) as? AdCell else {
          return UITableViewCell()
      }
      
      adCell.cellModel = cellModel
      return adCell
  }
}

class ListViewController: UITableViewController {
  let data: [CellModel] = []
  
  let sectionContainer: SectionContainer
  init(sectionContainer: SectionContainer) {
      self.sectionContainer = sectionContainer
      super.init(style: .plain)
  }
  
  required init?(coder: NSCoder) {
      fatalError("init(coder:) has not been implemented")
  }
  
  override func tableView(_ tableView: UITableView,
                            cellForRowAt indexPath: IndexPath) -> UITableViewCell {
      let cellModel = data[indexPath.row]
      return sectionContainer.tableView(cellModel, tableView, cellForRowAt: indexPath)
  }
}

let supportedSections = SectionContainer(handlers: [ProductSectionHandler(),
                                                    AdSectionHandler()])

let listViewController = ListViewController(sectionContainer: supportedSections)
```

## リスコフの置換原則

- 以下に`Rectangle`と`Square`クラスが存在し、SquareはRectangleの形の一つのため、SquareはRectangleのサブクラスとなっている
- RectangleとSquareの面積を計算する要件が出たので、`AreaCalculator`クラスを使用する

```swift
class Rectangle {
  var width: Double = 0
  var height: Double = 0
}

class Square: Rectangle {
  override var width: Double {
    didSet {
      height = width
    }
  }
  override var height: Double {
    didSet {
      width = height
    }
  }
}

class AreaCalculator {
  func area(rectangle: Rectangle) -> Double {
    return rectangle.width * rectangle.height
  }
}
```

- では単体テストケースを書いてみよう

```swift
func testAreaOfRectangleFor4X3() {
  let rectangle: Rectangle = Rectangle()
  rectangle.height = 3
  rectangle.width = 4

  let areaCalculator = AreaCalculator()
  let areaOfRectangle = areaCalculator.area(rectangle: rectangle)

  XCAssertEqual(areaOfRectangle, 12, "Area of Rectangle not matching")
}

func testAreaOfSquareFor5X5() {
  let square: Square = Square()
  square.height = 5

  let areaCalculator = AreaCalculator()
  let areaOfRectangle = areaCalculator.area(rectangle: square)

  XCAssertEqual(areaOfRectangle, 25, "Area of Square not matching")
}
```

- では、RectangleオブジェクトをSquareオブジェクトに差し替えたら、どうなるだろうか
- このテストケースは失敗してしまう。12ではなく16となってしまう。
- これは親クラスの振る舞いを壊してしまっており、リスコフの置換原則に従っていない

```swift
func testAreaOfRectangleFor4X3() {
  let rectangle: Rectangle = Square()
  rectangle.height = 3
  rectangle.width = 4

  let areaCalculator = AreaCalculator()
  let areaOfRectangle = areaCalculator.area(rectangle: rectangle)

  XCAssertEqual(areaOfRectangle, 12, "Area of Rectangle not matching")
}
```

- 継承を崩すことで、この問題を解決できる
- この解決策は、オープンクローズド原則にも似ており、元々の例はリスコフの置換原則だけではなく、オープンクローズド原則にも従っていなかった

```swift
protocol Shape {
  func area() -> Double
}

class Rectangle: Shape {
  var width: Double = 0.0
  var height: Double = 0.0
  
  internal func area() -> Double {
      return width * height
  }
}

class Square: Shape {
  var side: Double = 0.0
  internal func area() -> Double {
      return side * side
  }
}
```

## インターフェース分離の原則

- オブジェクト指向プログラミングで発生するFATインターフェースの問題を解決する
- FATインターフェースとは、必要以上にたくさんの情報を抱えた多くの関数を持っている
- 以下の例は、`Gesture`Protocolが`didTap`の関数を持っており、ViewがGestureを扱うためにその関数を使用する

```swift
protocol Gesture {
  func didTap()
}

class ProfileImageView: Gesture {
  internal func didTap() {
    // didTapした時の挙動をかく
  }
}
```

- 次に新たな要件として、ダブルタップした時やロングタップした時のgestureが追加されたとする
- だが、一部のViewでは、ダブルタップやロングタップは使用しないとする

```swift
protocol Gesture {
  func didTap()
  func didDoubleTap()
  func didLongTap()
}

class ProfileImageView: Gesture {
  internal func didTap() {
    // didTapした時の挙動をかく
  }

  internal func didDoubleTap() {
    // didTapした時の挙動をかく
  }

  internal func didLongTap() {
    // didTapした時の挙動をかく
  }
}

class UserDetailView: Gesture {
  internal func didTap() {
    // didTapした時の挙動をかく
  }

  internal func didDoubleTap() {}  // 何もしない
  internal func didLongTap() {}  // 何もしない
}
```

- このような問題を、1つの大きなプロトコルではなく、小さなプロトコルに分割することで解決できる
- Swiftでは`@objc`キーをつけることにより、実行が任意の関数をプロトコルに含めることもできるが、Swiftの概念ではプロトコルにある関数は必ず実行することが前提にあるため、そのキーの使用は望ましくない

```swift
protocol TapGesture {
    func didTap()
}

protocol DoubleTapGesture {
    func didDoubleTap()
}

protocol LongTapGesture {
    func didLongTap()
}

class ProfileImageView: TapGesture, DoubleTapGesture, LongTapGesture {
  internal func didTap() {
    // didTapした時の挙動をかく
  }

  internal func didDoubleTap() {
    // didTapした時の挙動をかく
  }

  internal func didLongTap() {
    // didTapした時の挙動をかく
  }
}

class UserDetailView: TapGesture {
  internal func didTap() {
    // didTapした時の挙動をかく
  }
}
```

- では次に、ユーザーのプロファイル画像を表示する例をみてみよう
- `User`クラスと`UserProfileImageView`クラスが以下のようになっている。
- `loadProfileFor`関数が必要としているのは、`profileImageURL`のみだが、Userクラスをそのまま注入しているため、それ以外の不要なデータも注入されてしまっている。

```swift
import Foundation

class User {
  var firstName: String
  var lastName: String
  var profileImageURL: String
  var bio: String
  var dateOfBirth: Date

  init(inFirstName: String,
       inLastName: String,
       inProfileImageURL: String,
       inBio: String,
       inDOB: Date) {
    firstName = inFirstName
    lastName = inLastName
    profileImageURL = inProfileImageURL
    bio = inBio
    dateOfBirth = inDOB
  }
}

class UserProfileImageView {
  func loadProfileFor(user: User) {
    // URLからユーザーのプロファイル画像をロードして、表示する
  }
}
```

- `loadProfileFor`関数で要求されたデータのみをもつプロトコルを新たに定義する

```swift
import Foundation

protocol UserProfileViewDetails {
    var profileImageURL: String { get }
}

class User: UserProfileViewDetails {
  var firstName: String
  var lastName: String
  var profileImageURL: String
  var bio: String
  var dateOfBirth: Date

  init(inFirstName: String,
       inLastName: String,
       inProfileImageURL: String,
       inBio: String,
       inDOB: Date) {
    firstName = inFirstName
    lastName = inLastName
    profileImageURL = inProfileImageURL
    bio = inBio
    dateOfBirth = inDOB
  }
}

class UserProfileImageView {
  func loadProfileFor(user: UserProfileViewDetails) {
    // URLからユーザーのプロファイル画像をロードして、表示する
  }
}
```

## 依存性逆転の原則

- 例として、最初にあげたメッセージアプリを例に考えてみる
- 問題は、`ConversationDataController`クラスという上位レベルのモジュールが、`CoreDataController`クラスという下位レベルのモジュールと結合していること
- 例えば、`ConversationDataController`クラスを他のアプリでも同じものを使うことができるだろうか。他のアプリでは少し変更して、Core Dataではなくファイルシステムにデータを保存する必要がある。
- このケースでは、簡単に他のアプリでこの上位クラスを使用することはできない。理由は、`CoreDataController`クラスという下位レベルのモジュールと密に結合しているため

```swift
class ConversationDataController {
  let database: CoreDataController

  init(inDatabase: CoreDataController) {
    database = inDatabase
  }

  func getAllConversations() {
    let conversations = [Any]()
    database.saveToDatabase(conversations: conversations)
  }
}

class CoreDataController {
  func saveToDatabase(conversations: [Any]) {
    // メッセージを保存
  }
}
```

- `Database`プロトコルを使用することで、この依存性を解決できる
- 以下のように`ConversationDataController`クラスは使用されているデータベースの種類を気にすることなく、抽象プロトコルを使用することができる

```swift
// Good
protocol Database {
    func saveToDatabase(conversations: [Any])
}

class ConversationDataController {
  let database: CoreDataController

  init(inDatabase: Database) {
    database = inDatabase
  }

  func getAllConversations() {
    let conversations = [Any]()
    database.saveToDatabase(conversations: conversations)
  }
}

class CoreDataController: Database {
  func saveToDatabase(conversations: [Any]) {
    // メッセージを保存
  }
}

class FileSystemArchiving: Database {
  func saveToDatabase(conversations: [Any]) {
      // メッセージを保存
  }
}
```
 
## 参考

- [SOLID Principles in Swift](https://vinodhswamy.medium.com/solid-principles-in-swift-7dc2b793fd68)
- [SwiftにおけるBastard Injectionとは](https://scior.hatenablog.com/entry/2020/08/28/210000)
- [protocol内のオプショナルなメソッドについて](https://qiita.com/zwtin/items/ed621e869ee834f25051)