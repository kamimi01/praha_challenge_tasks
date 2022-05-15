# 課題1

## Table of Contents
<!-- START doctoc -->
<!-- END doctoc -->

## サービスのモニタリングのためのツール

- 一定期間で一定数以上、フロントエンドのWEBアプリケーションがクラッシュしていたら、開発者にSlackで知らせる
  - [Sentry](https://sentry.io/welcome/)

- フロントエンドで何らかのエラーが発生したら、直前までユーザが実施した作業手順、ブラウザの実行環境等の情報を付与して開発者に通知する
  - [LogRocket](https://logrocket.com/)

- バックエンドのアプリケーションが（メモリ不足などの理由で）クラッシュしたら、自動的にアプリケーションを再起動しつつ、開発者にSlackで知らせる
  - [Zabbix](https://www.zabbix.com/jp)

- APIからのレスポンスタイムが5秒以上かかっているエンドポイントを可視化する。もし5秒以上かかっているレスポンスが全体の1割を超えたら開発者にSlackで知らせる
  - [NewRelic](https://newrelic.com/jp)

- データベースのスロークエリを可視化して、レスポンスに5秒以上かかるクエリがある場合は開発者にSlackで知らせる
  - [Data](https://www.datadoghq.com/ja/)

## WEBアプリケーションを安定稼働させるため、上記の他に監視しておいた方が良いメトリクス

- メトリクスとは
  - > システムリソースのある時点での測定値のこと
  - システムで発生しているさまざまなアクティビティの状態を伝えるのに適している
- 役に立つメトリクス
  1. スループット：どのくらいの頻度でこの処理が発生しているか
  2. エラー率：どのくらいの頻度で失敗しているか
  3. レイテンシ：完了するまでにどのくらいの時間がかかるか

## サービス運用についての整理

- システム運用アンチパターン
  - アラート疲れ
    - アラートシステムに多くのノイズを発生させてしまい、それらが無視されるようになった結果、アラートが発生しているのが正常だと見られてしまうこと
    - 割れ窓理論と同じ気がする
  - オンコールローテーション
    - あるシステムやプロセスの最初の連絡先としての担当者を定めたスケジュールのこと
    - 責任は組織によって異なる
  - 自動通知システム
    - 異常な状態に最初に気づいたのが顧客にならないように、自動通知システムが必要
    - 例えば
      - PagerDuty
      - VictorOps
      - Opsgenie
      - Oncall
  



## 参考

- [7 Application Monitoring Tools to Catch Errors on Frontend](https://geekflare.com/frontend-web-monitoring/)
- [LogRocket](https://logrocket.com/)
- [ユーザー行動を動画で記録できる「LogRocket」の使い方・設定方法【JSコード1行で簡単導入】](https://tekito-style.me/columns/howto-use-logrocket)
- [詳解 NewRelic で監視＆性能改善〜その１](https://qiita.com/wapa5pow/items/e3ef018af270cc2ad014)
- [[Datadog]Database MonitoringでAurora MySQL 8のクエリをモニタリングしてみた](https://blog.adachin.me/archives/49289)