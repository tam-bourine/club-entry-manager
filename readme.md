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
     - スプレッドシートを作成する
2. Google Apps Scriptの作成
    - [https://drive.google.com/](https://drive.google.com/) を開いて画面左にある、「新規」ボタンを押す
    - 最下部の「アプリを追加」を押してダイアログを開く
    ![image](https://user-images.githubusercontent.com/35181442/62426765-348ef300-b724-11e9-9925-8cbfb71e85a4.png)
    - ダイアログの検索ボックスに「script」と入力
    ![image](https://user-images.githubusercontent.com/39648121/101322069-bd361a00-38a9-11eb-8c2c-a590fe332f11.png)
    - リストに出てきた「Google Apps Script」をクリック→インストールボタンを押す
    ![image](https://user-images.githubusercontent.com/39648121/101322154-e6ef4100-38a9-11eb-87cb-4f2e405a9a6c.png)
    - 権限の確認が出てくるので、続行→自分のアカウントを選択
    ![image](https://user-images.githubusercontent.com/39648121/101322214-038b7900-38aa-11eb-8ac3-212a62db8a1d.png)
    - OKをクリック
    ![image](https://user-images.githubusercontent.com/39648121/101322392-4a796e80-38aa-11eb-97b6-ad54af7810ac.png)
    - もう一度「作成」ボタンを押して「スクリプト」選択
    ![image](https://user-images.githubusercontent.com/39648121/101322497-7e549400-38aa-11eb-910d-aae54295f186.png)
    - 左上の「無題のプロジェクト」をクリックして、お好きなプロジェクト名に変更
    ![image](https://user-images.githubusercontent.com/39648121/101322527-8ad8ec80-38aa-11eb-917c-f5b0a12a4ca5.png)
    - メニューから「ファイル」→「保存」を選択して保存
3. scriptIdの設定
    - ターミナルで次のコマンドを実行
        ```shell
        cp .clasp.json.example .clasp.json
        ```
    - ファイル→プロジェクトのプロパティーをクリック
        - ![image](https://user-images.githubusercontent.com/39648121/101322980-4568ef00-38ab-11eb-80ed-6e3a69881978.png)
    - スクリプトIDをコピー
        - ![image](https://user-images.githubusercontent.com/39648121/101323769-8c0b1900-38ac-11eb-9a03-a802ab0bf87e.png)
    - .clasp.jsonの **[ここにスクリプトIDを入れる]** のところを↑でコピーしたスクリプトIDに張り替え
        - 例↓
        - ![image](https://user-images.githubusercontent.com/39648121/101324166-23706c00-38ad-11eb-99a2-c5cca05276ac.png)
4. ローカルのコードをscriptファイルに反映
    - ターミナルで次を実行
    ```shell
    npm install -g @google/clasp
    clasp push
    ```
7. GASプロジェクトをAPIとして公開
    - メニューから「公開」→「WEBアプリケーションとして導入」
     ![image](https://user-images.githubusercontent.com/39648121/101328044-d98a8480-38b2-11eb-8016-f779243aec1e.png)
    - Execute the app as を "Me"に。</br>Who has access to the app を "Anyone even enonymous"に設定して、Deploy(公開)ボタンをクリック
    - 公開後のURLをコピー
8. 公開したURLをSlackAppの.envに記入
    - ```shell
        cp functions/.env.example functions/.env
        ```
    - .envの"API_URL="に 7. でコピーしたURLを貼り付ける
9. 公開したURLをFirebase上の環境変数に適用
    - 
