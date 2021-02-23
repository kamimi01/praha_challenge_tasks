# 課題 3

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 質問 1

> そもそも、なぜ元の関数はカバレッジ 100%のテストを書けなかったのでしょうか？

### 回答

- 実行する度にランダムな値を返す関数の戻り値を元に処理の分岐を行っていたため。条件分岐(Branch)のいずれかはテストすることができるが、値によって処理が変わるので、カバレッジを 100%にすることはできない。

## 質問 2

> 依存性の注入とは何でしょうか？どのような問題を解決するために使われるのでしょうか？

### 回答

- [Dependency Injection（以下 DI）とは](#dependency-injection以下-diとは)参照

## 質問 3

> 依存性の注入を実施することで、モジュール同士の結合度の強さはどのように変化したでしょうか？

### 回答

## 質問 4

> 今回のような単体テストで外部サービスとの通信が発生すると、どのようなデメリットがあるでしょうか？

### 回答

- 単体テストの実行結果が、不安定となってしまう。
  - 外部サービスに何らかの障害が発生した場合、または外部サービスの仕様が変わった場合などに単体テストが成功しなくなるなどが起こる可能性がある。

## Dependency Injection に関する整理

### Dependency Injection（以下 DI）とは

- DI は、独立性と拡張性のあるモジュールを作成するための簡単な方法。
  - Node.js においては、DI はあまり人気ではないが、Node.js に関しても、DI のメリットはある
  - Node.js では、モジュールパターン（`require`など）があるため、DI は不要という説があるが、それは誤解。
- DI は、モジュール内で直接依存性オブジェクトを作成または、要求する代わりになる方法。

- 例えば、以下のシンプルな Service モジュールを想像する。
  - これは良さそうに見える。Service は、ビジネスロジックに対し、User repository はデータソースとのやりとりに対して責任を持っている。しかし、以下 2 つの問題が存在する。
    1. service は、特定のリポジトリと結合している。もし何か他のものに変えたい場合、コード全体を修正する必要がある。プログラミング共通のルールとして、実装ではなくインターフェースへのプログラミング、というのがあるが、それに違反している。
    2. このモジュールのテストのしやすさに関して問題がある。もし getUsers メソッドのテストをしたい場合、Sinon や Jest.mock やその他のスタブライブラリを使用して、usersRepository のスタブを作成する必要がある。

```javascript
const User = require("./User");
const UsersRepository = requrie("./users-repository");

async function getUsers() {
  return UsersRepository.findAll();
}

async function addUser(userData) {
  const user = new User(userData);

  return UsersRepository.addUser(user);
}

module.exports = {
  getUsers,
  addUser,
};
```

- 上記 2 つの問題を解消するために、Dependency Injection を使用して修正する。
- まず、usersRepository を直接`requre`するのではなく、パラメータとして渡すようにする。
  - そうすると、Service はもはやリポジトリモジュールと結合していないが、usersRepository を引数に渡すことで require できている。これはテストのしやすさに大きな影響がある。
  - これにより、依存性オブジェクトから Sinon を外すことが可能になり、usersRepository を注入することで、Sinon の代替が可能になった。
  - さらに、service と repository を疎結合にすることで、変更に対しての柔軟性が生まれた。

```javascript
const User = require("./User");

// usersRepositoryをrequireするのではなく、引数に渡す
function UsersService(usersRepository) {
  async function getUsers() {
    return usersRepository.findAll();
  }

  async function addUser(userData) {
    const user = new User(userData);

    return usersRepository.addUser(user);
  }

  return {
    getUsers,
    addUser,
  };
}
```

#### DIのメリット・デメリット

- メリット
  - 依存性を減らすこと
  - 再利用性が高いコード
  - テスタビリティの高いコード
  - 読みやすいコード
  - 単一責任の原則に沿ったコード
- デメリット
  - 複雑さが増す。大抵、単一責任の原則のためにクラスの数が増える。そしてそれは常に利益があることとは限らない。
  - ランタイムの種類の解決が、わずかにパフォーマンスに影響を及ぼす

### Node.js における Denpendency Injection - classes vs functions

- Node.js で DI があまり人気ではない別の理由として、DI は OOP（Object Oriented Programming）だけの概念という神話があるが、それは正しくない。
- もちろん、class の中で依存性オブジェクトをどう注入するかは明らか。コンストラクタがあり、1 つ 1 つ依存性オブジェクトを注入していけばいい。

```javascript
class UsersSercie {
  constructor({ usersRepository, mailer, logger }) {
    this.usersRepository = usersRepository;
    this.mailer = mailer;
    this.logger = logger;
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async addUser(user) {
    await this.usersRepository.addUser(user);
    this.logger.info(`User created: ${user}`);
    await this.mailer.sendConfirmationLink(user);
    this.logger.info(`Confirmation link sent: ${user}`);
  }

  module.exports = UsersService;

  const usersService = new UsersService({
    usersRepository,
    mailer,
    logger
  })
}
```

- TypeScript を使うことで、要求されている依存性オブジェクトを型で特定することができる。

```javascript
// 依存オブジェクトの型を定義する
type UsersDependencies = {
  usersRepository: UsersRepository
  mailer: Mailer
  logger: Logger
}

export class UsersService {
  constructor(
    private depedencies: UsersDependencies
  ) {}

  async findAll() {
    return this.dependencies.usersRepository.findAll();
  }

  async findAll() {
    return this.depedencies.usersRepository.findAll();
  }

  async addUser(user) {
    await this.dependencies.usersRepository.addUser(user);
    this.dependencies.logger.info(`User created: ${user}`);
    await this.dependencies.mailer.sendConfirmationLink(user);
    this.dependencies.logger.info(`Confirmation link sent: ${user}`);
  }
}

const usersService = new UsersService({
  usersRepository,
  mailer,
  logger
})
```

- JavaScript は、クラスだけではなく、function でも同じことをやるには、パラメータを使う。
- まず、以下のように、パラメータとして依存性オブジェクトをとり、別の function やオブジェクトを返す function を作成する。そうすると、内部の function から依存性オブジェクトにアクセスすることが可能になる。
- このように、DI は、クラスだけではなく function でも使用可能。

```javascript
type UsersDependencies = {
  usersRepository: UsersRepository
  mailer: Mailer
  logger: Logger
};

export const usersService = (dependencies: UsersDependencies) => {
  const findAll = () => dependencies.usersRepository.findAll();

  const addUser = user => {
    await dependencies.usersRepository.addUser(user)
    dependencies.logger.info(`User created: ${user}`)
    await dependencies.mailer.sendConfirmationLink(user)
    dependencies.logger.info(`Confirmation link sent: ${user}`)
  };

  return {
    findAll,
    addUser
  };
}

const service = usersService({
  usersRepository,
  mailer,
  logger
});
```

### オーケストレーションとツール

- DI のデメリットは、事前に全ての準備をしておく必要があること。例えば、これまでの例では、もし users service を作成したい場合は、repository と mailer と logger を作成しておく必要がある。その上、repository と mailer の両方が依存性オブジェクトを保持している可能性があるので、結局構造全体を作成しておく必要がある。

```javascript
const UsersRepository = require("./users-repository");
const Mailer = require("./mailer");
const Logger = require("./logger");
const UsersService = require("./users-service");
const InMemoryDataSource = require("./users-repository/data-source/in-memory");

const logger = new Logger({
  level: process.env || "dev",
});
const dataSource = new InMemoryDataSource();
const mailer = new Mailer({
  templates: "/emails",
  logger,
});
const usersRepository = new UsersRepository({
  logger,
  dataSource,
});

const usersService = new UsersService({
  usersRepository,
  mailer,
  logger,
});

module.exports = {
  usersService,
};
```

- このデメリットを解消するための方法として、Node.js の DI ライブラリが存在する。
- 有名なのは、Awilix、Inversigy、TypeDI。
  - TypeDI と Awilix は、非常に似ており、JavaScript と TypeScript の両方で動作する。
  - 一方、Inversify は、TypeScript のみで動作する。（TSH では、Awilix がよく使用される。）
- Awilix を使用することで、依存性を解決する特別なコンテナを作成することができる。開発者がすべきことは、基本のブロックを作成することのみ。今までのコードの場合だと、DataSource や Logger といった Sevice や level や templates といったパラメータをさす。
- 残りの UsersService, UsersRepository, Mailer は、Awilix によって自動的に依存性解決される。開発者がすべきことは、解決者の型を示すことのみ。

```javascript
const UsersRepository = require("./users-repository");
const Mailer = require("./mailer");
const Logger = require("./logger");
const UsersService = require("./users-service");
const InMemoryDataSource = require("./users-repository/data-source/in-memory");
const { createContainer, asClass } = require("awilix");

const createAppContainer = async () => {
  const container = createContainer();

  container.register({
    logger: asClass(Logger).inject(() => ({ level: process.env || "dev" })),
    dataSource: asClass(InMemoryDataSource),
    mailer: asClass(Mailer).inject(() => ({ templates: "/emails" })),
    usersRepository: asClass(UsersRepository),
    usersService: asClass(UsersService),
  });

  return container;
};

(async () => {
  const container = await createAppContainer();

  const usersService = container.resolve("usersService");
})();
```

- Awilix コンテナで resolve メソッドを呼ぶと、全ての constructor や function のパラメータを調べて、コンテナに同じ名前の依存関係があるかを確認し、それを解決する。
- これにより、開発者は、依存関係を 1 つ 1 つ作成する必要がなくなる。開発者は、ブロックを提供し、特定の service を取得するための resolve メソッドを呼ぶだけで良い。著者は、Awilix と TypeDi の両方でチェックすること推奨する。

### Dependency Injection の種類

- Dependency Injection には 3 種類存在する。
  - コンストラクターインジェクション
  - セッターインジェクション
  - インターフェースインジェクション

#### コンストラクターインジェクション

- コンストラクタに、依存性オブジェクトを渡すこと
  - 以下では、Fooクラスのコンストラクタに、Barクラスのオブジェクトを渡している。
- Pico-Container や GUICE で使用。
- コンストラクタの引数にインスタンスを渡し、メンバ変数に設定する方法。
- もし引数が渡されなかったらデフォルトのインスタンスを作成する。

```php
class Foo {
  /** @var Bar */
  protected $bar;

  public function __constructor(Bar $bar = null) {
      // メンバ変数として Bar インスタンスを作成しておく
      $this->bar = $bar ? $bar : new Bar;
  }

  public function play() {
      // メンバ変数の Bar インスタンスからメソッドを呼び出す
      if ($this->bar->getSomething() === 1) {
          return true;
      }

      return false;
  }
}
```

#### セッターインジェクション

- セッターメソッドを使用して、クラスにオブジェクトを注入する
- `setBar()`メソッドでBarオブジェクトを注入している。
- Javaのフレームワーク`Spring`などで採用されている。
- コンストラクは引数を取らない。
- インスタンス 化後、そのインスタンスのsetterメソッドを使用して、オブジェクトを注入する。

```php
class Foo {
  /** @var Bar */
  protected $bar;

  public function setBar(Bar $bar) {
      $this->bar = $bar;
  }

  public function play() {
      if ($this->bar->getSomething() === 1) {
          return true;
      }

      return false;
  }
}
```

#### インターフェースインジェクション

- メソッドの引数にオブジェクトを渡す

```php
public function play(Bar $bar) {  // Bar クラスのインスタンスを受け取るようにした。
    if ($bar->getSomething() === 1) {
        return true;
    }

    return false;
}
```

#### コンストラクタインジェクションとセッターインジェクション

- [抄訳: Constructor Injection vs. Setter Injection](https://qiita.com/1000k/items/df08e0dd5e64ec72cb3e)では、結論として、コンストラクタインジェクションが推奨されている。
- コンストラクタインジェクションが推奨されている理由について
  - パラメータの順序を指定でき、循環参照に陥る危険がない。
  - セッターインジェクションだと、何度もsetterの呼びだしを行う必要がある。
    - 面倒な上、コールし忘れの危険性もある。またsetする順番が決まっている場合は面倒。
  - **コンストラクタインジェクションであれば、コンストラクタさえかけば、指定した順に自動でクラスをインスタンス化する。コンストラクトした時点で全ての設定が完了するので、あとはそのオブジェクトを確実に使用できる。**
  - コンストラクタインジェクションであれば、コンストラクタに渡す引数が不足している場合は、コンパイルエラーが出る。

```java
//// セッターインジェクションの場合
// Database クラスのインスタンス化 
Database db = new Database();

// 設定
db.setUsername("username");
db.setPassword("password");
db.setUrl("jdbc:....");

// OfflineQueue クラスのインスタンス化
OfflineQueue queue = new OfflineQueue();

// 設定
queue.setDatabase(db);

// CreditCardProcessor クラスに、上で作ったインスタンスを setter でセットする
// セッターインジェクションしている↓
CreditCardProcessor processor = new CreditCardProcessor();
processor.setOfflineQueue(queue);
processor.setDatabase(db);
```

```java
//// コンストラクタインジェクションの場合
CreditCardProcessor processor = new CreditCardProcessor(?queue?, ?db?);

// 必要となるインスタンスを作成する
Database db = new Database("username", "password", "jdbc:....");
OfflineQueue queue = new OfflineQueue(db);

// コンストラクタに渡してやる
CreditCardProcessor processor = new CreditCardProcessor(queue, db);
```

## 参考

- [JavaScript dependency injection in Node.js – friends or foes?](https://tsh.io/blog/dependency-injection-in-node-js/)
- [抄訳: Constructor Injection vs. Setter Injection](https://qiita.com/1000k/items/df08e0dd5e64ec72cb3e)
- [依存性注入(DI)の解説とやり方](https://qiita.com/1000k/items/aef6aed46b0fc34cc15e)
- [Inversion of Control Containers and the Dependency Injection pattern](https://www.martinfowler.com/articles/injection.html#FormsOfDependencyInjection)
- [All You Need to Know About Dependency Injection](https://dzone.com/articles/all-you-need-to-know-about-dependency-injection)
- [SpringでField InjectionよりConstructor Injectionが推奨される理由](http://pppurple.hatenablog.com/entry/2016/12/29/233141)
- [ユニットテストにまつわる10の勘違い](https://dev.classmethod.jp/articles/10_errors_about_unit_testing/)