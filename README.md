# club-manager

## 利用技術

-   SlackApp
    -   Node.js v12
    -   [Bolt for JavaScript](https://github.com/slackapi/bolt-js)
    -   [TypeScript](https://www.typescriptlang.org/)
-   シート API
    -   [Google Apps Script](https://developers.google.com/gsuite/aspects/appsscript?hl=ja)
    -   [clasp](https://github.com/google/clasp)

## セットアップ手順

### リポジトリのインストール

```zsh
git clone https://github.com/tam-bourine/club-manager.git
cd club-manager
npm i & npm run postinstall:types-gas
```

### Google Apps Script

[ドキュメントはこちら](docs/setup/gas.local.md)

### SlackApp

[ドキュメントはこちら](docs/setup/slack.local.md)

## Software Design

### GAS

いわゆる [MVC パターン](https://ja.wikipedia.org/wiki/Model_View_Controller) 風味です。Model2MVC のほう。

![](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/MVC-Process.svg/1024px-MVC-Process.svg.png)

> https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller

以上の図のように単方向に処理が流れます。

`gas/` では以下の様な流れで API を返します。

1. ユーザが GAS のエンドポイントにリクエストを投げる
2. `gas/routes.ts` で `gas/controllers` 以下の controller にユーザアクションを送る
3. controller は `gas/models` 以下の model にユーザアクションから必要な処理を呼び出す。
4. model は Google Sheets に格納されたデータを取得し、 `gas/views` 以下の view に `provide` でデータを送る。
5. view はレスポンスに必要な情報をデータに付与、結果を `return` する。
6. `gas/routes.ts` から view の結果をユーザにレスポンスとして返す
    - これちょっと隠蔽出来なかった、本当は view から直接返すみたいな書き方がいい

#### `gas/` の備考

-   view が html とかを返すことはない
    -   レスポンスを整形するのみ
    -   正直要らない気がするが切り出すことで model がまだシンプルになった
-   controller は model の処理を呼び出すだけ
    -   **呼び出すだけ**
    -   データの整形・計算とかは model の役割
-   model がかなりファットになってきた
    -   一応 controller から直に呼び出すメソッド以外は全部 `private` 修飾子がついている
    -   `private` を別のレイヤーに切り出しても良いかも
    -   discussion need って感じです
