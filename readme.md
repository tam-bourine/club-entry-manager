# Club Manager
## 利用技術
- SlackApp
    - Node.js v12
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

### Slack App
- Cloud Functions for Firebase
    1. Cloud Functions for Firebaseの登録
    2. プロジェクトを作成
    3. firebase loginの解消方法(Esetでlocalhost:9005を開放)
    4. アカウントをblazeに移行
    5. デプロイ
- Slack
    1. Event SubscriptionsでURLを設定
    2. Permissionsを設定

### GAS
1. スプレッドシートの作成
    - [https://drive.google.com/](https://drive.google.com/) を開いて画面左にある、「新規」ボタンを押す
    ![image](https://user-images.githubusercontent.com/39648121/101321714-22d5d680-38a9-11eb-8941-4c250afc909e.png)
    - 任意の名前をつけて保存する
    ![image](https://user-images.githubusercontent.com/39648121/101870006-182a8280-3bc4-11eb-89e5-18afe7620ae1.png)
    <!-- 後々、setUpSheet()関数に変更 -->
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
8. 公開したURLをSlackAppの.envに記入
    - ```shell
        cp functions/.env.example functions/.env
        ```
    - .envの"API_URL="にコピーしたURLを貼り付ける
9. 公開したURLをFirebase上の環境変数に適用
    ```shell
    functions:config:set api.url="${コピーしたURL}
    ```
