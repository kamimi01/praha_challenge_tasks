# 課題1

## Table of Contents
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<details>
<summary>Details</summary>

- [以下の要望を実現するコマンドを探してください](#%E4%BB%A5%E4%B8%8B%E3%81%AE%E8%A6%81%E6%9C%9B%E3%82%92%E5%AE%9F%E7%8F%BE%E3%81%99%E3%82%8B%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%82%92%E6%8E%A2%E3%81%97%E3%81%A6%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84)
- [参考](#%E5%8F%82%E8%80%83)

</details>
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 以下の要望を実現するコマンドを探してください

- 特定のコミットとの差分を表示したい

`git diff`

- 差分があるファイル名だけを一覧表示したい（意図しないファイルが変更されていないことを確認する時などに便利です！）

`git diff --name-only`

- ファイル全体の変更内容を追加するのではなく、部分的に選択しながらステージングしたい

`git add -p`

ヒント：patchモードと呼ばれるそうです

- 一時的にここまで加えた変更内容を退避させたい（途中まで作業をした後、最新のマスターブランチを今の作業ブランチにマージしなければいけない時などに便利です。あるいは作業途中で「もう一度最初から違うアプローチを試してみよう」と思い立ち、ここまでの作業を一時保存つつ別の作業を始めたい時にも便利です）

`git stash "<名前>"`

`git stash pop`→直前のstash内容を適用し、スタッシュした履歴は削除される

`git stash apply`→直前のstash内容を適用し、スタッシュした履歴は残る

- 特定ファイルのコミット履歴を見たい

`git log`→私は`--oneline`をつけることが多い。またはtigを使用してます

- 作業中、自分のローカル環境で細かく作業をコミットしていたため、複数に分かれたコミットを1つのコミットにまとめてからプッシュしたい（問題があったときにロールバックしやすいよう、意味のある単位でコミットをまとめる際に役立ちます）

`git rebase -i HEAD~<戻りたいコミット数>`

- 特定のブランチを元に新たなブランチを作成したい

`git checkout -b <新たなブランチ名> <元にするブランチ名>`

ヒント：checkoutに何らかのオプションを指定することになりそうです
リモートリポジトリをクローンする際に全てのコミット履歴が必要なく、最新コミットだけクローンしたい（cloneにかかる時間を短縮するのに役立ちます）

- 他ブランチからのマージ中にコンフリクトが発生したため、ひとまずマージを中断したい

`git merge --abort`

## 参考

- [Gitで部分的にコミットする方法](https://qiita.com/miyohide/items/79ab0ff3b3852289a6be)