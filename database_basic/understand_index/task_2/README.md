# 課題

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->



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