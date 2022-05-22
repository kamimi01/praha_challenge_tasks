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