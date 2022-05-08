# 課題1

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [expand and contract patternとは](#expand-and-contract-pattern%E3%81%A8%E3%81%AF)
- [開発環境でマイグレーションを実施した時は問題なかったのに、本番環境で実施したら失敗することが時々あります。特に既存テーブルのカラムにNOT NULL制約を追加する時によく起きるのですが、何故でしょうか？この失敗を避けるためには、どのような対策が有効でしょうか？](#%E9%96%8B%E7%99%BA%E7%92%B0%E5%A2%83%E3%81%A7%E3%83%9E%E3%82%A4%E3%82%B0%E3%83%AC%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E5%AE%9F%E6%96%BD%E3%81%97%E3%81%9F%E6%99%82%E3%81%AF%E5%95%8F%E9%A1%8C%E3%81%AA%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%AE%E3%81%AB%E6%9C%AC%E7%95%AA%E7%92%B0%E5%A2%83%E3%81%A7%E5%AE%9F%E6%96%BD%E3%81%97%E3%81%9F%E3%82%89%E5%A4%B1%E6%95%97%E3%81%99%E3%82%8B%E3%81%93%E3%81%A8%E3%81%8C%E6%99%82%E3%80%85%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99%E7%89%B9%E3%81%AB%E6%97%A2%E5%AD%98%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB%E3%81%AE%E3%82%AB%E3%83%A9%E3%83%A0%E3%81%ABnot-null%E5%88%B6%E7%B4%84%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B%E6%99%82%E3%81%AB%E3%82%88%E3%81%8F%E8%B5%B7%E3%81%8D%E3%82%8B%E3%81%AE%E3%81%A7%E3%81%99%E3%81%8C%E4%BD%95%E6%95%85%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B%E3%81%93%E3%81%AE%E5%A4%B1%E6%95%97%E3%82%92%E9%81%BF%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB%E3%81%AF%E3%81%A9%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA%E5%AF%BE%E7%AD%96%E3%81%8C%E6%9C%89%E5%8A%B9%E3%81%A7%E3%81%97%E3%82%87%E3%81%86%E3%81%8B)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## expand and contract patternとは

- データベース管理者とソフトウェア開発者が、稼働時間に影響を与えることなく、古いデータ構造から新しいデータ構造へデータを移行するためのプロセス
- プロセス
  1. 新しいスキーマを構築してデプロイ
  ![](../../../assets/service_ope_migration_1.png)
  2. インターフェースを展開する
    - 読み込みは元のスキーマを見る
    - 書き込み操作をすると、元のスキーマと新しいスキーマの両方を見る
  ![](../../../assets/service_ope_migration_2.png)
  3. 既存のデータを新しいスキーマに移行する
    - 既存の値をコピーするだけでいい場合もあれば、2つのスキーマの違いを考慮して、データを変更する場合もある
  ![](../../../assets/service_ope_migration_3.png)
  4. 新しいインターフェースをテストする
    - 本番クライアントはまだ元のスキーマを正として使用する
  ![](../../../assets/service_ope_migration_4.png)
  5. 読み取りを新しいインターフェースから行うよう変更
  ![](../../../assets/service_ope_migration_5.png)
  6. 書き込みも新しいインターフェースから行うよう変更
  ![](../../../assets/service_ope_migration_6.png)
  7. システムから元のスキーマを削除する
  ![](../../../assets/service_ope_migration_7.png)

## 開発環境でマイグレーションを実施した時は問題なかったのに、本番環境で実施したら失敗することが時々あります。特に既存テーブルのカラムにNOT NULL制約を追加する時によく起きるのですが、何故でしょうか？この失敗を避けるためには、どのような対策が有効でしょうか？

- なぜか？
  - `NOT NULL`制約をかけたいカラムに`NULL`の値が入っている場合、エラーが発生する
- 対策
  - 制約を追加する前に、`NULL`の値を別の値へ変更してから、マイグレーションを行う

## 参考

- [Using the expand and contract pattern for schema changes](https://www.prisma.io/dataguide/types/relational/expand-and-contract-pattern)
- [NOT NULL制約追加時のinvalid use of NULL valueを解消する](https://www.tech-blog.startup-technology.com/2020/45eab0643a96ca9278d2/)
- [rails db:migrate 時にエラーが発生しました。](https://teratail.com/questions/250175?rss=all)