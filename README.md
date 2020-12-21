# club-manager
## 利用技術
- SlackApp
    - Node.js v10
    - Bolt for JavaScript
- シートAPI
    - Google Apps Script
 
## セットアップ手順
 
### ■ フォーマッターの有効化

```zsh
mkdir .vscode && touch .vscode/settings.json
``` 
`settings.json`に以下を追記
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": true
}
```

### クローン・パッケージのインストール
```shell
git clone https://github.com/tam-bourine/club-manager.git
cd club-manager
cd src/functions
npm install
cd ../..
```

### SlackApp
1. [SlackAPI の your apps](https://api.slack.com/apps)で 任意の名前でBotを作成
1. [SlackAPI](https://api.slack.com/)の Permissons で Bot Token Scopes を設定
   ![image](https://user-images.githubusercontent.com/39648121/90381396-4980bf00-e0b8-11ea-85e4-390d38a41d55.png)
    - channels:history
    - chat:write
    - groups:history
    - im:history
    - mpim:history
    - workflow.steps:execute
1. ワークスペースにインストール
1. Basic Information の Singing Secretを src/functions/config.jsonの signing_secret に設定
1. Permissionsの中にある、Bot User OAuth Access Token を src/functions/config.json の bot_token に設定

1. [Firebaseコンソール](https://console.firebase.google.com/u/0/?hl=ja)にアクセス
1. プロジェクトを作成
    - <img width="861" alt="スクリーンショット 2020-12-14 10 41 44" src="https://user-images.githubusercontent.com/39648121/102048895-422db000-3e23-11eb-993b-42b5605b168d.png">
    - <img width="772" alt="スクリーンショット 2020-12-14 10 41 54" src="https://user-images.githubusercontent.com/39648121/102048902-4659cd80-3e23-11eb-9a24-63c78c04b32b.png">
    - <img width="901" alt="スクリーンショット 2020-12-14 10 42 12" src="https://user-images.githubusercontent.com/39648121/102048907-478afa80-3e23-11eb-9103-e4c6999b8ad3.png">
    - <img width="734" alt="スクリーンショット 2020-12-14 10 43 10" src="https://user-images.githubusercontent.com/39648121/102048917-49ed5480-3e23-11eb-8f89-e8dbb04a6866.png">
1. プロジェクトのプランをBlazeに移行
    - <img width="809" alt="スクリーンショット 2020-12-14 10 50 03" src="https://user-images.githubusercontent.com/39648121/102048925-4c4fae80-3e23-11eb-979c-f4d155f46c14.png">
    - <img width="646" alt="スクリーンショット 2020-12-14 10 50 17" src="https://user-images.githubusercontent.com/39648121/102048929-4d80db80-3e23-11eb-9dbd-2f2db392b8f4.png">
    - 必要なら請求先アカウントを作成（ここでは説明は省く）
    - <img width="535" alt="スクリーンショット 2020-12-14 10 51 07" src="https://user-images.githubusercontent.com/39648121/102048931-4eb20880-3e23-11eb-9a76-b4c176ea8ccb.png">
    - 必要なら予算アラートを設定（ここでは説明は省く）
    - <img width="534" alt="スクリーンショット 2020-12-14 10 51 20" src="https://user-images.githubusercontent.com/39648121/102048935-4fe33580-3e23-11eb-9cd6-5c4e0c078efb.png">
1. アカウントを選択してFirebaseにログイン
    ```shell
    firebase login
    ```
1. projectsリストを確認
    ```shell
    firebase projects list
    ```
    - 次のようなリストが表示される
    - <img width="751" alt="スクリーンショット 2020-12-14 10 43 57" src="https://user-images.githubusercontent.com/39648121/102048922-4b1e8180-3e23-11eb-9dae-00449c58db3e.png">
1. projectsを選択
    ```shell
    firebase use [Project ID]
    ```
    ```shell
    firebase projects list
    ```
    - Project Idの値のところにcurrentがついていればOK
    - <img width="844" alt="スクリーンショット 2020-12-14 10 44 50" src="https://user-images.githubusercontent.com/39648121/102048924-4b1e8180-3e23-11eb-8853-2ef98ecc353a.png">
1. 環境変数の設定
    - SLACK_BOT_TOKENとSLACK_SIGNING_SECRETの内容は src/functions/config.json の内容に置き換えて実行する
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
1. Event Subscriptionsの設定
    - SlackAppの設定でBasic Information→Event Subscriptionsに行き、次のURLを設定
        - "https://us-central1-[プロジェクトID].cloudfunctions.net/slack"
        - 例: https://us-central1-hoge1fuga2.cloudfunctions.net/slack
        - ![スクリーンショット 2020-12-14 15 36 13](https://user-images.githubusercontent.com/39648121/102048937-51146280-3e23-11eb-982f-1c3241e54a87.png)
        - ![スクリーンショット 2020-12-14 15 36 44](https://user-images.githubusercontent.com/39648121/102048938-51acf900-3e23-11eb-9f54-8148a779604b.png)
    - Subscribe to bot eventsを開き、次のBot User Eventを追加
        - message.channels
        - message.groups
        - message.im
        - message.mpim
        - workflow_step_execute
        - ![スクリーンショット 2020-12-14 15 37 06](https://user-images.githubusercontent.com/39648121/102048940-52458f80-3e23-11eb-9e96-b7816c95878a.png)
        - Save Changesをクリックして保存
### GAS
1. スプレッドシートの作成
    - [https://drive.google.com/](https://drive.google.com/) を開いて画面左にある、「新規」ボタンを押す
    ![image](https://user-images.githubusercontent.com/39648121/101321714-22d5d680-38a9-11eb-8941-4c250afc909e.png)
    - 任意の名前をつけて保存する
    ![image](https://user-images.githubusercontent.com/39648121/101870006-182a8280-3bc4-11eb-89e5-18afe7620ae1.png)
    <!-- 後々、setUpSheet()関数に変更予定 -->
    - シートの名前を「部活動一覧」に変更する
        ![image](https://user-images.githubusercontent.com/39648121/101871767-7d33a780-3bc7-11eb-875a-51849e3467f3.png)
    - シートの1行目に、次のカラム定義を入れる
        - id,部活名,部長,発起人1,発起人2,申請日,公認,部長_SlackID,発起人1_SlackID,発起人2_SlackID
        ![image](https://user-images.githubusercontent.com/39648121/101871220-8b34f880-3bc6-11eb-8514-c9ce610eb895.png)
    <!-- 後々、setUpSheet()関数に変更ここまで -->
2. Google Apps Scriptの作成
    - ツール→スクリプトエディターを開く
    ![image](https://user-images.githubusercontent.com/39648121/101870059-34c6ba80-3bc4-11eb-9ea5-6110afa61873.png)
    - 左上の「無題のプロジェクト」をクリックして、お好きなプロジェクト名に変更
    ![image](https://user-images.githubusercontent.com/39648121/101870290-a7379a80-3bc4-11eb-8cd2-56778cc58ec8.png)
    - メニューから「ファイル」→「保存」を選択して保存
3. scriptIdの設定
    - スクリプトファイルを開いたまま、ファイル→プロジェクトのプロパティーをクリック
        - ![image](https://user-images.githubusercontent.com/39648121/101322980-4568ef00-38ab-11eb-80ed-6e3a69881978.png)
    - スクリプトIDをコピー
        - ![image](https://user-images.githubusercontent.com/39648121/101323769-8c0b1900-38ac-11eb-9a03-a802ab0bf87e.png)
    - ターミナルで次のコマンドを実行
        ```shell
        cp .clasp.json.example .clasp.json
        ```
    - .clasp.jsonの **[ここにスクリプトIDを入れる]** のところを↑でコピーしたスクリプトIDに張り替え
        - 例↓
        - ![image](https://user-images.githubusercontent.com/39648121/101324166-23706c00-38ad-11eb-99a2-c5cca05276ac.png)
4. ローカルのコードをscriptファイルに反映
    - https://script.google.com/home/usersettingsw を開いて、Google Apps Script APIをオンにする。
    - ターミナルで次を実行
        ```shell
        npm install -g @google/clasp
        clasp login
        ```
    - Googleアカウントを選択してログイン
    - ターミナルで次を実行
        ```shell
        clasp push
        ```
    - 次のように聞かれるので、yを押してエンター
        ```shell
        ? Manifest file has been updated. Do you want to push and overwrite? (y/N) 
        ```
7. GASプロジェクトをAPIとして公開
    - メニューから「公開」→「WEBアプリケーションとして導入」
     ![image](https://user-images.githubusercontent.com/39648121/101870385-da7a2980-3bc4-11eb-9a21-659aa2f8e646.png)
    - Execute the app as を "Me"に。</br>Who has access to the app を "Anyone even enonymous"に設定して、Deploy(公開)ボタンをクリック
    ![image](https://user-images.githubusercontent.com/39648121/101870515-1a411100-3bc5-11eb-8f11-90b397ef0392.png)
    - 公開後のURLをコピー
    ![image](https://user-images.githubusercontent.com/39648121/101870625-5aa08f00-3bc5-11eb-9c17-18e13ad6d284.png)
8. 公開したURLをSlackAppの config.json に記入
    - src/functions/config.json の url にコピーしたURLを貼り付ける
    - 例
        ```json
        "api": {
            "url": "https://example.com"
        }
        ```

9. 公開したURLをFirebase上の環境変数に適用
    ```shell
    firebase functions:config:set api.url="[コピーしたURL]"
    ```
    - 例: 
        ```shell
        firebase functions:config:set api.url="https://example.com"
        ```