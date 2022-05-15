# 課題1

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [サービスのモニタリングのためのツール](#%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%AA%E3%83%B3%E3%82%B0%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AE%E3%83%84%E3%83%BC%E3%83%AB)
- [WEBアプリケーションを安定稼働させるため、上記の他に監視しておいた方が良いメトリクス](#web%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E5%AE%89%E5%AE%9A%E7%A8%BC%E5%83%8D%E3%81%95%E3%81%9B%E3%82%8B%E3%81%9F%E3%82%81%E4%B8%8A%E8%A8%98%E3%81%AE%E4%BB%96%E3%81%AB%E7%9B%A3%E8%A6%96%E3%81%97%E3%81%A6%E3%81%8A%E3%81%84%E3%81%9F%E6%96%B9%E3%81%8C%E8%89%AF%E3%81%84%E3%83%A1%E3%83%88%E3%83%AA%E3%82%AF%E3%82%B9)
- [サービス運用についての整理](#%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E9%81%8B%E7%94%A8%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AE%E6%95%B4%E7%90%86)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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