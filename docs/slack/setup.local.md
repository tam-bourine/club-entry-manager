# local 環境の構築

## local 環境の仕様

- 開発環境用ワークスペースが必要
  - 開発環境用ワークスペースにて、開発者1人につき1つの SlackApp が必要

## SlackApp の作成手順

### ■ アプリの作成

[Slack API: Applications](https://api.slack.com/apps)にアクセス

Create New App ボタンから以下のように入力し Create App ボタンを押してアプリを作成する。(App Name は誰のアプリなのか分かりやすくする)

<img width="840" alt="スクリーンショット 2021-03-29 13 43 55" src="https://user-images.githubusercontent.com/39585292/112788053-fa126080-9094-11eb-8f18-f7900410844e.png">

### ■ OAuth & Permissions の設定

左サイドバーの Features / OAuth & Permissions にアクセス

OAuth & Permissions / Scopes / Bot Token Scopes / Add an OAuth Scope より、以下全ての Scope を入力し追加する

- 無条件で必要
  - `channels:history`
  - `groups:history`
  - `im:history`
  - `mpim:history`
- conversations.invite() に必要
  - `channels:manage`
  - `groups:write`
  - `im:write`
  - `mpim:write`
- app.shortcut() に必要
  - `commands`
- chat.postMessage() に必要
  - `chat:write`
  - `chat:write.customize`
- users.info() に必要
  - `users:read`
  - `users:read.email`
  - `users.profile:read`

Scopeを追加していくと↓のようになる

<img width="840" alt="スクリーンショット 2021-03-29 13 54 43" src="https://user-images.githubusercontent.com/39585292/112788663-56c24b00-9096-11eb-8aac-59d116b1938a.png">

### ■ Socket Mode の設定

左サイドバーの Settings / Socket Mode にアクセス

Socket Mode / Connect using Socket Mode / Enable Socket Mode をクリック

Token Name は適当に入力し Generate を押す

![スクリーンショット 2021-03-29 14 09 29](https://user-images.githubusercontent.com/39585292/112789605-6a6eb100-9098-11eb-9f02-1659a13757b0.png)

### ■ Event Subscriptions の設定

左サイドバーの Features / Event Subscriptions にアクセス

Event Subscriptions / Enable Events の右にあるトグルボタンを押して On にする。

![スクリーンショット 2021-03-29 14 21 31](https://user-images.githubusercontent.com/39585292/112790327-1238ae80-909a-11eb-9d92-869143731f7a.png)

Event Subscriptions / Subscribe to bot events / Add Bot User Event より、以下全ての Event を追加する

- `message.channels`
- `message.groups`
- `message.im`
- `message.mpim`

### ■ Interactivity & Shortcuts の設定

左サイドバーの Features / Interactivity & Shortcuts にアクセス

Interactivity & Shortcuts / Shortcuts / Create New Shotrcut より、以下の手順で創部用と入部用の2つの Shortcut を追加する

#### ■ [1] Globalを選択 (共通)

![スクリーンショット 2021-03-29 14 26 35](https://user-images.githubusercontent.com/39585292/112790724-f4b81480-909a-11eb-939d-ecd2f3d3c705.png)

#### ■ [2.1] "部活を作る" ショートカット

Name に`部活を作る`、 Short Description に`創部`、 Callback ID に`open_new_club_modal`を入力し Create を押す

![スクリーンショット 2021-03-29 14 31 56](https://user-images.githubusercontent.com/39585292/112791004-8aec3a80-909b-11eb-8efb-e26c1b981a74.png)

#### ■ [2.2] "部活に入る" ショートカット

Name に`部活に入る`、 Short Description に`入部`、 Callback ID に`open_join_club_modal`を入力し Create を押す

以下のようになれば Save Changes を押す

![スクリーンショット 2021-03-29 14 36 02](https://user-images.githubusercontent.com/39585292/112791252-1960bc00-909c-11eb-90b7-bdef30afcb94.png)

### ■ アプリのインストール

左サイドバーの Settings / Install App にアクセス

Install App to Your Team / Install to Workspace をクリック

権限リクエストの承認画面が出てくるので許可するをクリック

![スクリーンショット 2021-03-29 14 38 52](https://user-images.githubusercontent.com/39585292/112791419-7eb4ad00-909c-11eb-8034-50586dd5ce3b.png)

これで SlackApp 用サイト上での設定は完了

## ローカル環境の設定 (`.env`ファイルの設定)

### ■ SLACK_APP_TOKEN

左サイドバーの Settings / Basic Information にアクセス

Basic Information / App-Level Tokens / [先程作ったトークン] をクリック

![スクリーンショット 2021-03-29 14 59 05](https://user-images.githubusercontent.com/39585292/112792949-5bd7c800-909f-11eb-8c18-fd0bd4d78cd3.png)

`xapp-`から始まる Token を .env ファイルの`SLACK_APP_TOKEN=`の右辺に貼り付ける

![スクリーンショット 2021-03-29 14 59 46](https://user-images.githubusercontent.com/39585292/112793028-8295fe80-909f-11eb-8616-98e2631f5763.png)

### ■ SLACK_BOT_TOKEN

左サイドバーの Features / OAuth & Permissions にアクセス

OAuth & Permissions / OAuth Tokens & Redirect URLs / OAuth Tokens for Your Team / Bot User OAuth Token にある、
`xoxb-`から始まる Token を .env ファイルの`SLACK_BOT_TOKEN=`の右辺に貼り付ける

![スクリーンショット 2021-03-29 15 05 43](https://user-images.githubusercontent.com/39585292/112793492-5cbd2980-90a0-11eb-86c3-8d5211abf244.png)


### ■ SLACK_SIGNING_SECRET

左サイドバーの Settings / Basic Information にアクセス

Basic Information / App Credentials / Signing Secret / Show より、Signing Secret をコピー

![スクリーンショット 2021-03-29 14 44 39](https://user-images.githubusercontent.com/39585292/112791965-8163d200-909d-11eb-8c4e-0b685ac6c1c1.png)

この Secret を .env ファイルの`SLACK_SIGNING_SECRET=`の右辺に貼り付ける

### ■ BOLT_DEBUG_USER_ID

Slack アプリのウィンドウ右上にある自分のアイコンをクリック

![スクリーンショット 2021-03-29 15 10 45](https://user-images.githubusercontent.com/39585292/112793938-16b49580-90a1-11eb-9fd9-c0a8d1158a63.png)

プロフィールを表示するをクリック

![スクリーンショット 2021-03-29 15 10 49](https://user-images.githubusercontent.com/39585292/112794008-30ee7380-90a1-11eb-9f2e-44650874fc64.png)

その他ボタンから、メンバーID をコピーをクリック

![スクリーンショット 2021-03-29 15 10 56](https://user-images.githubusercontent.com/39585292/112794069-46639d80-90a1-11eb-8ee4-6eeccc1628ec.png)

この ID を .env ファイルの`BOLT_DEBUG_USER_ID=`の右辺に貼り付ける

### ■ SLACK_APPROVAL_CHANNEL_ID

Slack アプリの左サイドバーにある #p_club-manager_承認専用 チャンネルを右クリックし、リンクをコピーをクリック

![スクリーンショット 2021-03-29 15 17 10](https://user-images.githubusercontent.com/39585292/112797713-c17b8280-90a6-11eb-8b86-df831e7d7bcc.png)

コピーしたURLの末尾のチャンネルID(https://~~~.slack.com/archives/[チャンネルID])を、
.env ファイルの`SLACK_APPROVAL_CHANNEL_ID=`の右辺に貼り付ける


### ■ SLACK_DEBUG_CHANNEL_ID

Slack アプリの左サイドバーにある #p_club-manager_notification チャンネルを右クリックし、リンクをコピーをクリック

コピーしたURLの末尾のチャンネルID(https://~~~.slack.com/archives/[チャンネルID])を、
.env ファイルの`SLACK_DEBUG_CHANNEL_ID=`の右辺に貼り付ける

### ■ GAS_ENDPOINT

部活動一覧: dev のスプレッドシートを開く

![スクリーンショット 2021-03-29 15 55 10](https://user-images.githubusercontent.com/39585292/112798293-ab21f680-90a7-11eb-9441-785f9ea226dd.png)

ツール / スクリプトエディタ をクリックしGASのエディタ画面を開く

![スクリーンショット 2021-03-29 15 55 19](https://user-images.githubusercontent.com/39585292/112800394-9004b600-90aa-11eb-837d-94615bda7e52.png)

![スクリーンショット 2021-03-29 15 55 30](https://user-images.githubusercontent.com/39585292/112800525-b88cb000-90aa-11eb-8ba4-59330c0e4b76.png)

公開 / ウェブアプリケーションとして導入… をクリック

![スクリーンショット 2021-03-29 15 55 36](https://user-images.githubusercontent.com/39585292/112800609-d65a1500-90aa-11eb-9df7-e8b0e8175bb9.png)

Project version を `New`, Execute the app as を `Me` に,

Who has access to the app を `Anyone, even anonymous` にして更新ボタンを押す

![スクリーンショット 2021-03-29 15 56 31](https://user-images.githubusercontent.com/39585292/112800916-3fda2380-90ab-11eb-8fd4-f57286700511.png)

切り替わったモーダルの Current web app URL をコピーし、.env ファイルの`GAS_ENDPOINT=`の右辺に貼り付ける

![スクリーンショット 2021-03-29 15 56 38](https://user-images.githubusercontent.com/39585292/112801162-862f8280-90ab-11eb-8942-bcef8cc3d793.png)

### ■ SlackApp をチャンネルに追加

各チャンネル(#p_club-manager_notification, #テスト専用部活動チャンネル, #p_club-manager_承認専用)にて"/invite"と打ち、このチャンネルにアプリを追加するボタンを押す

![スクリーンショット 2021-03-29 16 56 23](https://user-images.githubusercontent.com/39585292/112804834-d3155800-90af-11eb-9ef4-98ad7ffa8c0f.png)

出てきたモーダルの検索欄で先程作成したアプリ名を選び、追加する

![スクリーンショット 2021-03-29 17 01 41](https://user-images.githubusercontent.com/39585292/112805395-7fefd500-90b0-11eb-990f-0be366b3ae65.png)

## 動作確認

### ■ ローカル環境側

club-manager フォルダ下で`npm run bolt:dev`を実行すると正常にサーバが起動し、
#p_club-manager_notification にてアプリ起動なう⚡️と出れば環境構築終了

<!-- TODO: Kibela系はβ版になってから書く -->
