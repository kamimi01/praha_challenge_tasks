# ペアのクイズ

## 行ったこと

- AWS S3で静的ホスティングした`index.html`を`http://localhost:8000`内のボタンを押下した際にGETでアクセスする（表示はしない）
  - S3の設定は以下の通り
    - Cross-Origin Resource Sharing (CORS)の設定：[corsRules.json](./aws_hosting/corsRules.json)
    - それ以外は全てデフォルトの設定
      - 「ブロックパブリックアクセス (バケット設定)」もオン
        - CORSの設定を行わない状態で、確認するとパブリックアクセスが許可されていないため、`403 Forbuddden`が表示され、アクセスできない
        - CORSの設定を行うと、アクセス可能になる
  - ※AWSのコストをなるべく抑えるため、既にS3バケットは削除済み

- 疑問
  - CORSの設定方法はわかったが、別ドメインからのアクセスを許可する場合、AWSのS3の場合は、CORSの設定よりもバケットポリシーを使う方が自然なのだろうか？？
  - 上記の設定でCORS設定をしたが、パブリックアクセスを全て許可していると表示され、許可しないと表示されない。それはCORSの設定をしているか否かには関係ないように見えた。どうすれば特定のドメインのみCORSの設定で許可できるんだろうか。。

## 参考

- [静的ウェブサイトの設定](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/HostingWebsiteOnS3Setup.html)
- [Cross-Origin Resource Sharing (CORS)](https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/dev/cors.html#cors-eval-criteria)