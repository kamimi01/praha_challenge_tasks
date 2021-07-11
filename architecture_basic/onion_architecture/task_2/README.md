# 課題 2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->



<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## クイズ1

- DDDやそこで採用されているオニオンアーキテクチャは、GUIアプリケーション（例えばiOSアプリやWebアプリのようなクライアントアプリ）だけ、またはサーバーサイド（例えばAPIなど）だけに適用できるアーキテクチャなのでしょうか？

<details><summary>回答例</summary>

- きちんとした回答は見つけられませんでしたが、以下が浦川の認識です。
- Webだと基本的にはサーバーサイドがメインとあるが、クライアントにも適用できないわけではない認識。この層はクライアント、この層はサーバーサイドというように分かれているわけではなく、クライアントでもサーバーサイドでもどの層も存在しうるという認識で正しいか？
    - 例えば、iOSアプリのようなクライアントアプリでは、直接データアクセスをせずにAPIを介すことがほとんどではないかと思うが、ローカルストレージ（KeychainやUserDefaults、Realm、CoreDataなど端末内、Webアプリでいうとおそらくローカルストレージ）にデータを保存する場合などはインフラ層などの考えがそのまま適用できる
    - 逆に、サーバーサイドのAPIは、GUIはないものの、APIのI/F部分はクライアントとのリクエスト/レスポンスであるため、サーバーサイドだからプレゼンテーション層が存在しないというわけでもない認識

- 参考
  - [クライアントサイドとサーバーサイドをオニオンアーキテクチャに当てはめようとしたときの相関についてのlittle_handsさん回答](https://twitter.com/little_hand_s/status/1219052238284320768)
  - [little_hands/ddd-q-and-a](https://github.com/little-hands/ddd-q-and-a/issues/282)

</details>