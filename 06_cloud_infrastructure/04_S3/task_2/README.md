# 課題1（バックアップ）

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

  - [S3における「バージョニング」と「レプリケーション」の違い](#s3%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8B%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%8B%E3%83%B3%E3%82%B0%E3%81%A8%E3%83%AC%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%81%AE%E9%81%95%E3%81%84)
  - [レプリケーション](#%E3%83%AC%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)
  - [バージョニング](#%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%8B%E3%83%B3%E3%82%B0)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### S3における「バージョニング」と「レプリケーション」の違い

- バージョニング
  - 同じバケット内でオブジェクトの複数のバリアントを保持する手段のこと
  - バケットに保存されたすべてのバージョンを、保存、取得、復元することができる
  - バージョニングを使用すれば、意図しないユーザーアクションからもアプリケーション障害からも、より簡単に復旧できる
- レプリケーション
  - Amazon S3 バケット間でオブジェクトを自動で非同期的にコピーできる

### レプリケーション

- 2つのリージョンにバケットを作り、クロスリージョンレプリケーションを設定してください
  - 課題1で作成したap-northeast-1（tokyo）に作成したバケットを使用する→バージョニングを有効化する
  - それとは別に、ap-northeast -2（seol）にバケットを作成する

![](../../assets/../../assets/aws_s3_create_bucket_seol.png)

  - レプリケーションルールを作成する

![](../../assets/../../assets/aws_s3_create_replication_rule_1.png)

![](../../assets/../../assets/aws_s3_create_replication_rule_2.png)

![](../../assets/../../assets/aws_s3_create_replication_rule_3.png)

- レプリケーション元のパケットにオブジェクトを新規作成してください
  - `replica`フォルダを作成し、`top_log2.txt`をアップロード

![](../../assets/../../assets/aws_s3_replication_rule_upload_file.png)

- レプリケーション先のバケットにオブジェクトがコピーされていることを確認してください

![](../../assets/../../assets/aws_s3_replication_rule_upload_file_2.png)

### バージョニング

- バージョニングを有効にしたS3バケットを作成し、任意のファイルを保存
  - 課題1でアップロードした、top_log.txtを使用する

- 保存したオブジェクトを削除

![](../../assets/../../assets/aws_s3_delete_object.png)

- 「Show versions」にチェックを入れると、Delete markerがついていることがわかる

![](../../assets/../../assets/aws_s3_delete_object_delete_marker.png)

- バージョニング機能を活かして、削除してしまったファイルを復元

![](../../assets/../../assets/aws_s3_delete_marker.png)

![](../../assets/../../assets/aws_s3_undo_object.png)

## 参考
- [S3 バケットでのバージョニングの使用](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/Versioning.html)
- [オブジェクトのレプリケーション](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/replication.html)
- [削除マーカーの使用](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/DeleteMarker.html)