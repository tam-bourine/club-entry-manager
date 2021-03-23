# club-manager

## 利用技術

-   SlackApp
    -   Node.js v10
    -   [Bolt for JavaScript](https://github.com/slackapi/bolt-js)
-   シート API
    -   [Google Apps Script](https://developers.google.com/gsuite/aspects/appsscript?hl=ja)
    -   [clasp](https://github.com/google/clasp)
-   FaaS
    -   [Firebase](https://firebase.google.com/?hl=ja)

## セットアップ手順

### クローン・パッケージのインストール

```shell
git clone https://github.com/tam-bourine/club-manager.git
cd club-manager
cd src/functions
npm install
cd ../..
```

### SlackApp

<!-- NOTE: lagacy -->

1. [SlackAPI の your apps](https://api.slack.com/apps)で 任意の名前で Bot を作成
1. アプリの表示名の設定
   - FeaturesのApp Homeを開く
   ![image](https://user-images.githubusercontent.com/57348761/110273975-1f212f80-8011-11eb-91f9-54cbd839ebaa.png)
   - Your App’s Presence in Slack 内のEditをクリックし、アプリの表示名を設定
   ![image](https://user-images.githubusercontent.com/57348761/110274558-6d82fe00-8012-11eb-8447-4cc45aa5d4f8.png)
1. [SlackAPI](https://api.slack.com/)の Permissons で Bot Token Scopes を設定
   ![image](https://user-images.githubusercontent.com/39648121/90381396-4980bf00-e0b8-11ea-85e4-390d38a41d55.png)
    - channels:history
    - chat:write
    - chat:write.customize
    - commands
    - groups:history
    - groups:write
    - im:history
    - mpim:history
    - users.profile:read
    - users:read
    - users:read.email
1. ワークスペースにインストール
1. Basic Information の Singing Secret を src/functions/config.json の signing_secret に設定
1. Permissions の中にある、Bot User OAuth Access Token を src/functions/config.json の bot_token に設定

1. [Firebase コンソール](https://console.firebase.google.com/u/0/?hl=ja)にアクセス
1. プロジェクトを作成
    - <img width="861" alt="スクリーンショット 2020-12-14 10 41 44" src="https://user-images.githubusercontent.com/39648121/102048895-422db000-3e23-11eb-993b-42b5605b168d.png">
    - <img width="772" alt="スクリーンショット 2020-12-14 10 41 54" src="https://user-images.githubusercontent.com/39648121/102048902-4659cd80-3e23-11eb-9a24-63c78c04b32b.png">
    - <img width="901" alt="スクリーンショット 2020-12-14 10 42 12" src="https://user-images.githubusercontent.com/39648121/102048907-478afa80-3e23-11eb-9103-e4c6999b8ad3.png">
    - <img width="734" alt="スクリーンショット 2020-12-14 10 43 10" src="https://user-images.githubusercontent.com/39648121/102048917-49ed5480-3e23-11eb-8f89-e8dbb04a6866.png">
1. プロジェクトのプランを Blaze に移行
    - <img width="809" alt="スクリーンショット 2020-12-14 10 50 03" src="https://user-images.githubusercontent.com/39648121/102048925-4c4fae80-3e23-11eb-979c-f4d155f46c14.png">
    - <img width="646" alt="スクリーンショット 2020-12-14 10 50 17" src="https://user-images.githubusercontent.com/39648121/102048929-4d80db80-3e23-11eb-9dbd-2f2db392b8f4.png">
    - 必要なら請求先アカウントを作成（ここでは説明は省く）
    - <img width="535" alt="スクリーンショット 2020-12-14 10 51 07" src="https://user-images.githubusercontent.com/39648121/102048931-4eb20880-3e23-11eb-9a76-b4c176ea8ccb.png">
    - 必要なら予算アラートを設定（ここでは説明は省く）
    - <img width="534" alt="スクリーンショット 2020-12-14 10 51 20" src="https://user-images.githubusercontent.com/39648121/102048935-4fe33580-3e23-11eb-9cd6-5c4e0c078efb.png">
1. アカウントを選択して Firebase にログイン
    ```shell
    firebase login
    ```
1. projects リストを確認
    ```shell
    firebase projects:list
    ```
    - 次のようなリストが表示される
    - <img width="751" alt="スクリーンショット 2020-12-14 10 43 57" src="https://user-images.githubusercontent.com/39648121/102048922-4b1e8180-3e23-11eb-9dae-00449c58db3e.png">
1. projects を選択
    ```shell
    firebase use [Project ID]
    ```
    ```shell
    firebase projects:list
    ```
    - Project Id の値のところに current がついていれば OK
    - <img width="844" alt="スクリーンショット 2020-12-14 10 44 50" src="https://user-images.githubusercontent.com/39648121/102048924-4b1e8180-3e23-11eb-8853-2ef98ecc353a.png">
1. 環境変数の設定
    - singing_secret と bot_token の内容は src/functions/config.json の内容に置き換えて実行する
        ```shell
        firebase functions:config:set slack.signing_secret='signing_secret' slack.bot_token='bot_token'
        ```
    - 例
        ```shell
        firebase functions:config:set slack.signing_secret='1a2b3c4d5e6f7g8h9i' slack.bot_token='xoxp-000011112222'
        ```
1. デプロイ
    ```shell
    firebase deploy --only functions
    ```
1. Event Subscriptions の設定

    - SlackApp の設定で Basic Information→Event Subscriptions に行き、次の URL を設定

        - "https://us-central1-[プロジェクト ID].cloudfunctions.net/slack"
        - 例: https://us-central1-hoge1fuga2.cloudfunctions.net/slack
        - ![スクリーンショット 2020-12-14 15 36 13](https://user-images.githubusercontent.com/39648121/102048937-51146280-3e23-11eb-982f-1c3241e54a87.png)
        - ![102048938-51acf900-3e23-11eb-9f54-8148a779604b](https://user-images.githubusercontent.com/39648121/103493791-baadec80-4e76-11eb-90dc-c52f71c92c63.png)

    - Subscribe to bot events を開き、次の Bot User Event を追加
        - message.channels
        - message.groups
        - message.im
        - message.mpim
        - workflow_step_execute
        - ![スクリーンショット 2020-12-14 15 37 06](https://user-images.githubusercontent.com/39648121/102048940-52458f80-3e23-11eb-9e96-b7816c95878a.png)
        - Save Changes をクリックして保存

### GAS

1. スプレッドシートの作成
    - [https://drive.google.com/](https://drive.google.com/) を開いて画面左にある、「新規」ボタンを押す
      ![image](https://user-images.githubusercontent.com/39648121/101321714-22d5d680-38a9-11eb-8941-4c250afc909e.png)
    - 任意の名前をつけて保存する
      ![image](https://user-images.githubusercontent.com/39648121/101870006-182a8280-3bc4-11eb-89e5-18afe7620ae1.png)
          <!-- 後々、setUpSheet()関数に変更予定 -->
    - シートの名前を「部活動一覧」に変更する
      ![image](https://user-images.githubusercontent.com/39648121/101871767-7d33a780-3bc7-11eb-875a-51849e3467f3.png)
    - シートの 1 行目に、以下に示すカラム定義を入れる - id,部活名,活動,部費利用目的,kibela_url,Slack チャンネル,申請日,公認,承認者\_SlackID,承認者,部長\_SlackID,部長,部員 1_SlackID,部員 1,...,部員 10_SlackID,部員 10
      ![image](https://user-images.githubusercontent.com/38882716/109269787-5e50c300-7850-11eb-8cd3-c7cfe9437633.png)
      ![image](https://user-images.githubusercontent.com/38882716/109269784-5db82c80-7850-11eb-97c7-be7540876df6.png)
      ![image](https://user-images.githubusercontent.com/38882716/109269782-5c86ff80-7850-11eb-9f90-17c3036f38cc.png)
          <!-- 後々、setUpSheet()関数に変更ここまで -->
2. Google Apps Script の作成
    - ツール → スクリプトエディターを開く
      ![image](https://user-images.githubusercontent.com/39648121/101870059-34c6ba80-3bc4-11eb-9ea5-6110afa61873.png)
    - 左上の「無題のプロジェクト」をクリックして、お好きなプロジェクト名に変更
      ![image](https://user-images.githubusercontent.com/39648121/101870290-a7379a80-3bc4-11eb-8cd2-56778cc58ec8.png)
    - メニューから「ファイル」→「保存」を選択して保存
3. scriptId の設定
    - スクリプトファイルを開いたまま、ファイル → プロジェクトのプロパティをクリック
        - ![image](https://user-images.githubusercontent.com/39648121/101322980-4568ef00-38ab-11eb-80ed-6e3a69881978.png)
    - スクリプト ID をコピー
        - ![image](https://user-images.githubusercontent.com/39648121/101323769-8c0b1900-38ac-11eb-9a03-a802ab0bf87e.png)
    - ターミナルで次のコマンドを実行
        ```shell
        cp .clasp.json.example .clasp.json
        ```
    - .clasp.json の **[ここにスクリプト ID を入れる]** のところを ↑ でコピーしたスクリプト ID に張り替え
        - 例 ↓
        - ![image](https://user-images.githubusercontent.com/39648121/101324166-23706c00-38ad-11eb-99a2-c5cca05276ac.png)
4. スクリプトのプロパティの設定
    - 再度スクリプトファイルを開き、ファイル → プロジェクトのプロパティをクリック
    - スクリプトのプロパティをクリック
    - 行を追加をクリックしプロパティに「SHEET_TAB_NAME」を入力、値に「部活動一覧」を入力
        - ![image](https://user-images.githubusercontent.com/38882716/109267761-707d3200-784d-11eb-8545-714fab39be50.png)
    - 行を追加をクリックしプロパティに「SLACK_WORKSPACE_URL」を入力、値に Slack のワークスペースの URL を入力
        - 例: `https://example.slack.com`
    - 保存をクリック
5. ローカルのコードを script ファイルに反映
    - https://script.google.com/home/usersettingsw を開いて、Google Apps Script API をオンにする。
    - ターミナルで次を実行
        ```shell
        npm install -g @google/clasp
        clasp login
        ```
    - Google アカウントを選択してログイン
    - ターミナルで次を実行
        ```shell
        clasp push
        ```
    - 次のように聞かれるので、y を押してエンター
        ```shell
        ? Manifest file has been updated. Do you want to push and overwrite? (y/N)
        ```
6. GAS プロジェクトを API として公開
    - メニューから「公開」→「WEB アプリケーションとして導入」
      ![image](https://user-images.githubusercontent.com/39648121/101870385-da7a2980-3bc4-11eb-9a21-659aa2f8e646.png)
    - Execute the app as を "Me"に。</br>Who has access to the app を "Anyone even enonymous"に設定して、Deploy(公開)ボタンをクリック
      ![image](https://user-images.githubusercontent.com/39648121/101870515-1a411100-3bc5-11eb-8f11-90b397ef0392.png)
    - 公開後の URL をコピー
      ![image](https://user-images.githubusercontent.com/39648121/101870625-5aa08f00-3bc5-11eb-9c17-18e13ad6d284.png)
7. Postman などで ↑ の URL を叩いて動作確認
    - ![image](https://user-images.githubusercontent.com/38882716/109268429-69a2ef00-784e-11eb-8004-7eb38079e5b0.png)

### SocketMode での開発方法

※club-manager の SlackApp に招待してもらっている前提

### SocketMode 有効化の手順
1. SettingsのSocket Modeを開く
   ![image](https://user-images.githubusercontent.com/57348761/110275590-afad3f00-8014-11eb-9ee3-353b887b5ddd.png)
1. Enable Socket Modeを有効化
   ![image](https://user-images.githubusercontent.com/57348761/110275351-331a6080-8014-11eb-8c78-014946790d96.png)
1. Modal内のToken Nameに名前を入力
   ![image](https://user-images.githubusercontent.com/57348761/110275345-31509d00-8014-11eb-9247-762ce547bbf5.png)
1. Generateボタンを押す
#### .env の作成

`cp .env.example .env`で.env をコピーし、その中にある各値を以下の手順で取得 & 貼り付けしていく。

##### [SLACK_APP_TOKEN]

赤枠をクリック(モーダルを開く)

![basicInfo1](https://user-images.githubusercontent.com/39585292/108169723-6caa2b00-713c-11eb-9e14-4879d2b5526c.png)

赤枠内の Copy をクリック

![basicInfo2](https://user-images.githubusercontent.com/39585292/108169657-57cd9780-713c-11eb-86d1-ec9ebbe02561.png)

##### [SLACK_BOT_TOKEN]

赤枠内の Copy をクリック

![InstallApp](https://user-images.githubusercontent.com/39585292/108169749-76339300-713c-11eb-9c7b-e76df49731f9.png)

##### [SLACK_APPROVAL_CHANNEL_ID]

開発用チャンネルの ID を`Copy link`を押して、
https://tam-bourine.slack.com/archives/xxxxx の xxxx をコピー(今回はコピー済)

![copyLink](https://user-images.githubusercontent.com/39585292/108169784-85b2dc00-713c-11eb-863d-2da8df918d98.png)

#### サーバ起動方法

`npm run serve`で bolt 起動

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
