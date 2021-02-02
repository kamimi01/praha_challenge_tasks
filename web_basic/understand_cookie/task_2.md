# 課題2

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [クイズ1](#%E3%82%AF%E3%82%A4%E3%82%BA1)
- [クイズ2](#%E3%82%AF%E3%82%A4%E3%82%BA2)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## クイズ1

* クッキーに`Expires`属性と`max-age`属性が付与されていました。この場合のクッキーの有効期限はどうなるでしょうか？

<details><summary>想定回答</summary>

* `max-age`に設定している値が優先される。

* 参考
  * [Set-Cookie](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Set-Cookie)

</details>

## クイズ2

* アプリケーションがクッキーを使用する際に、ユーザに対して事前に行っておくべきことは何でしょうか？（ヒント：GDPR、個人情報保護法改正案）

<details><summary>想定回答</summary>

* 改正個人情報保護法におけるクッキーの規制
  * 個人保護法とは、個人情報の取り扱い方を示したもので、日本で2003年に制定
  * 2020/06に個人情報保護法の改正が成立
  * 改正個人情報保護法では、**クッキーは「個人関連情報」とし、特定の個人が識別できない要素と定義**している。そのため、日本ではクッキーを利用したユーザ情報保存や広告配信がすぐにできなくなるわけではない。
  * **クッキーの提供先企業が誰の個人情報なのかがわかる個人データになることが想定される場合、提供先の企業が本人の同意を得たことを確認することを、提供元企業に義務付ける。**

* GDPRにおけるクッキーの規制
  * GDPRとは、生活者の個人データを自分自身でコントロールできるようにするための法律で、欧州で2018年に施行
  * **クッキーも個人情報に値する。**
  * 利用するためには、ユーザから同意を得ることが必要。

* 参考
  * [改正個人情報保護法が成立、クッキーと個人情報のひも付けに同意取得を義務化](https://xtech.nikkei.com/atcl/nxt/news/18/08052/)
  * [改正個人情報保護法が成立！cookieの取り扱いやGDPR・CCPAとの違いは？](https://webtan.impress.co.jp/u/2020/07/02/36588)
  * [Cookie規制で企業のデータ保持はどう変わる？ GDPR・CCPAの動向もおさらい](https://webtan.impress.co.jp/e/2020/03/24/35459)

</details>