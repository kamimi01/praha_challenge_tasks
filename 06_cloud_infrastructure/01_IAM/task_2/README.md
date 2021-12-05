# 課題2

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

## なぜ毎回ルートユーザとしてアクセスするのではなく、管理者権限のIAMユーザでログインした方が良いのでしょうか？

- ルートユーザーは、権限が強く、AWSアカウントの全てのAWSサービスとリソースに完全なアクセス権限を持っている。その上、IAMユーザーのようにアクセスポリシーを設定することもできないため、流出した時のリストが非常に高い。
- IAMユーザーは、アクセスポリシーを設定することで、アクセス権限を制御することができるため、こちらを使うべき

## PowerUserAcesssポリシーを付与したIAMユーザーで、IAMのダッシュボードを開くと、何が表示されるか？

- > Provides full access to AWS services and resources, but does not allow management of Users and groups.

- IAMユーザーに関する操作は不可能、という警告が表示される

![](../../assets/../../assets/aws_poweruser_iam_1.png)

![](../../assets/../../assets/aws_poweruser_iam_2.png)

## AdministratorAccessポリシーを直接ユーザに付与する方法と、グループに付与してユーザを所属させる方法を紹介しました。どのような理由で、どちらの方が適切だと感じますか？

- 後者「グループに付与してユーザを所属させる」の方が適切と考える
  - 同じポリシーを付与したいユーザーが複数存在する場合に、ユーザーを作成する度に毎回ポリシーを設定するのは手間がかかる。既に特定のポリシーを定義したグループに追加する方が容易に作成できる。
  - 直接ユーザーにポリシーを紐づけていると、そのユーザーが削除されるとどのようなポリシーを設定していたかという情報も同じく失われてしまうが、グループに紐づけているだけであれば、その情報は失われずまた再利用可能となる

## EC2インスタンスにSSH接続してS3バケットの中身を一覧表示するaws cliコマンドを実行するとどうなるか

```bash
$ aws s3 ls s3://prahatest
Unable to locate credentials. You can configure credentials by running "aws configure".
```

- エラーが発生

## 上記のS3バケットに対してのみ、バケットに保存されているオブジェクトを一覧表示する操作を許可するロールをEC2インスタンスに付与する

1. 上記のようなロールを作成する
2. そのロールをEC2インスタンスに付与する
3. `aws s3 ls s3://prahatest`を実行する

- 確認結果
  - prahatestバケットへのアクセスのみ許可している状態のため、prahatest2バケットへのアクセスではエラーが発生する
  - prahatestバケットには、`prahatest`というファイルをアップロードしているため、オブジェクト一覧としてそのファイル名が表示される

```bash
$ aws s3 ls s3://prahatest
2021-12-05 06:11:46          9 prahatest

$ aws s3 ls s3://prahatest2
An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied
```

## EC2インスタンスにロールを付与するべきか直接ポリシーを付与するべきか、迷われることがあるかもしれません。どのような理由で、どちらの方が適切だと感じますか？

- ロールを付与すべきと考える
  - ロールは、複数のポリシーを保持することができる。同じポリシーをアタッチしたいEC2が複数存在する場合、毎回ポリシーを各EC2インスタンすに対して設定する必要があり、手間がかかる
  - またEC2インスタンスが削除された場合、どのようなポリシーが設定されていたのかという情報も同時に失われてしまうが、ロールとして複数のポリシーをまとめていた場合、そのロール単位で再利用することができる

## 参考

- [Amazon EC2 インスタンスに、Amazon S3 バケットへのアクセス権を付与するにはどうすればよいですか?](https://aws.amazon.com/jp/premiumsupport/knowledge-center/ec2-instance-access-s3-bucket/)