<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [課題1と2](#%E8%AA%B2%E9%A1%8C1%E3%81%A82)
  - [eslint-config-airbnbを導入](#eslint-config-airbnb%E3%82%92%E5%B0%8E%E5%85%A5)
  - [pre-commitの作成](#pre-commit%E3%81%AE%E4%BD%9C%E6%88%90)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# 課題1と2

## eslint-config-airbnbを導入

- configの導入

```shell
yarn add install-peerdeps eslint-config-airbnb eslint-plugin-import --dev
```

- `.eslintrc.js`の`extends`に`airbnb`を追加

- 実行結果

```
$  yarn lint-fix                      
yarn run v1.22.10
$ eslint --fix ./index.js && prettier --write ./index.js

/Users/mikaurakawa/Desktop/praha_challenge/07_team_development/01_use_lint/sample_project/index.js
  14:1  warning  Unexpected console statement  no-console

✖ 1 problem (0 errors, 1 warning)

index.js 65ms
✨  Done in 1.29s.
```

## pre-commitの作成

- huskyの導入

```shell
yarn add husky --dev
```

- Automatic

```shell
npx husky-init && yarn
```

- pre-commitの作成

```shell
npx husky add .husky/pre-commit "yarn lint-fix"
```