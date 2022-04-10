# 課題1（ストレージクラス）

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

### どのような時に、どのストレージクラスを選択するべきでしょうか？

|ストレージクラス|利用シーン|
|-------------|-----------------------------|
|S3 Intelligent-Tiering|アクセスパターンが不明または変化するデータに対して自動的にコストを削減する|
|S3 Standard|アクセス頻度の高いデータ向け|
|S3 Standard-Infrequent Access (S3 Standard-IA) および S3 One Zone-Infrequent Access (S3 One Zone-IA)|アクセス頻度の低いデータ向け|
|S3 Glacier Instant Retrieval|即時アクセスを必要とするアーカイブデータ向け|
|S3 Glacier Flexible Retrieval (旧 S3 Glacier)|即時アクセスを必要としないアクセス頻度の低い長期データ用|
|Amazon S3 Glacier Deep Archive (S3 Glacier Deep Archive)|クラウド上の最も低コストなストレージで数時間で取り出し可能な長期アーカイブやデジタル保存用|
|S3 Outposts|既存の AWS リージョンで適合できないデータレジデンシーの要件がある場合|

![](../../assets/../../assets/aws_s3_storage_class.png)

### ほとんどアクセスされないバケットを作成する場合はどのストレージクラスの選定が良いでしょうか？

- S3 Glacier または S3 Glacier Deep Archive が良いと考える
  - 上記の診断チャートや「ほとんどアクセスされない」ということから判断

### ライフサイクルとは何でしょうか？

- 

### S3にアップロードされる画像は登録以降ほとんど使われないんだけど、一応監査のために取っておく必要があるんだよね。作成から30日経ったら、もっと安いストレージクラスに移動するようにしておいて！

### このログファイルを作成から90日経ったら自動的に消えるように

## S3とは

- S3（Amazon Simple Storage Service）
  - ユーザーがデータを安全に、容量制限なく、データ保存が可能な、クラウド時代のオブジェクトストレージ

- データストアの選択

![](../../assets/../../assets/aws_s3_datastore.png)

- S3の利用シーン
  - 直接PUT/GETする
  - 加工する
  - 別のデータストアにロードする（e.g. ストレージからデータベースへ）
  - 過去のデータをS3に退避させる

![](../../assets/../../assets/aws_s3_use.png)

## 参考

- [[AWS Black Belt Online Seminar] Amazon S3/Glacier 資料及び QA 公開](https://aws.amazon.com/jp/blogs/news/webinar-bb-amazon-s3-glacier-2019/)
- [Amanzon S3 ストレージクラスの概要インフォグラフィック](https://aws.amazon.com/jp/s3/storage-classes-infographic/)