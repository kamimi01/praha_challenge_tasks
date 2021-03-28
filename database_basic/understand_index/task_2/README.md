# 課題

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [環境構築](#%E7%92%B0%E5%A2%83%E6%A7%8B%E7%AF%89)
  - [DockerからプルしてMySQLにログインする](#docker%E3%81%8B%E3%82%89%E3%83%97%E3%83%AB%E3%81%97%E3%81%A6mysql%E3%81%AB%E3%83%AD%E3%82%B0%E3%82%A4%E3%83%B3%E3%81%99%E3%82%8B)
  - [GUIツールを使用する](#gui%E3%83%84%E3%83%BC%E3%83%AB%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%99%E3%82%8B)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 環境構築

### DockerからプルしてMySQLにログインする

1. Dockerイメージをpullする

```bash
docker pull genschsa/mysql-employees
```

1. コンテナを起動する

```bash
docker run -d \
  --name mysql-employees \
  -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=password \
  -v $PWD/data:/var/lib/mysql \
  genschsa/mysql-employees
```

1. shellに入る

```bash
docker exec -it <コンテナID> /bin/bash
```

1. MySQLにログインする（パスワードを聞かれるので、入力する）

```bash
mysql -u root -p
```

### GUIツールを使用する

- 今回は普段から使用しているMySQL Workbenchを使用する

## 参考

- [Docker で MySQL コンテナを起動しました](https://qiita.com/pugiemonn/items/b17288494e4b627f4475)