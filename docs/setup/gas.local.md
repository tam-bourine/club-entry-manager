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
