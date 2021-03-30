# local ブランチ用 Google Apps Script のセットアップ

## [1] スプレッドシートの作成手順

### ■ スプレッドシートの作成

GoogleDrive / 共有ドライブ / club-manager / GAS 環境 / 個人環境 / [自分の名前] のスプレッドシートを作成する

<img width="1001" alt="スクリーンショット 2021-03-30 11 33 34" src="https://user-images.githubusercontent.com/39585292/112924912-f2fa5980-914b-11eb-9d74-1398423e35ac.png">

<!--後々、setUpSheet()関数に変更予定 -->

シートの名前を"部活動一覧"に変更する

![image](https://user-images.githubusercontent.com/39648121/101871767-7d33a780-3bc7-11eb-875a-51849e3467f3.png)

部活動一覧シートの1行目を以下のように入力する

||A|B|C|D|E|F|G|H|I|J|K|L|M|N|O ~ AD|AE|AF|
|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|
|1|id|部活名|活動|部費利用目的|kibela_url|Slack チャンネル|申請日|公認|承認者\_SlackID|承認者|部長\_SlackID|部長|部員 1_SlackID|部員 1|...|部員 10_SlackID|部員 10|

![image](https://user-images.githubusercontent.com/38882716/109269787-5e50c300-7850-11eb-8cd3-c7cfe9437633.png)

![image](https://user-images.githubusercontent.com/38882716/109269784-5db82c80-7850-11eb-97c7-be7540876df6.png)

![image](https://user-images.githubusercontent.com/38882716/109269782-5c86ff80-7850-11eb-9f90-17c3036f38cc.png)
<!--後々、setUpSheet()関数に変更ここまで -->

ツール / スクリプトエディタ をクリックし GAS のエディタ画面を開く

<img width="988" alt="スクリーンショット 2021-03-30 11 39 03" src="https://user-images.githubusercontent.com/39585292/112925375-b8dd8780-914c-11eb-91f2-b41e0d0d9e78.png">

<img width="988" alt="スクリーンショット 2021-03-30 11 40 42" src="https://user-images.githubusercontent.com/39585292/112925399-c5fa7680-914c-11eb-8649-8e443df1e76b.png">

ファイル / プロジェクトのプロパティ を開く

<img width="988" alt="スクリーンショット 2021-03-30 11 43 23" src="https://user-images.githubusercontent.com/39585292/112925868-884a1d80-914d-11eb-8b72-5525528492b9.png">

プロジェクトのプロパティ / 情報 / スクリプトID の値を、.clasp.json ファイルの"scriptId"の value として貼り付ける

<img width="988" alt="スクリーンショット 2021-03-30 11 43 48" src="https://user-images.githubusercontent.com/39585292/112925821-71a3c680-914d-11eb-9a59-7f635e6c05ce.png">

プロジェクトのプロパティ / スクリプトのプロパティ から、プロパティと値を設定する

<img width="988" alt="スクリーンショット 2021-03-30 11 48 03" src="https://user-images.githubusercontent.com/39585292/112926109-ec6ce180-914d-11eb-8c01-2d449d7c0009.png">

公開 / ウェブアプリケーションとして導入… をクリック

<img width="988" alt="スクリーンショット 2021-03-30 11 52 33" src="https://user-images.githubusercontent.com/39585292/112926593-9ea4a900-914e-11eb-8acf-3fd84d722b12.png">

Project version を `New`, Execute the app as を `Me` に,

Who has access to the app を `Anyone, even anonymous` にして更新ボタンを押す

<img width="988" alt="スクリーンショット 2021-03-30 11 52 24" src="https://user-images.githubusercontent.com/39585292/112926608-a5332080-914e-11eb-8529-2fdff792cfbf.png">

切り替わったモーダルの Current web app URL をコピーし、.env ファイルの`GAS_ENDPOINT=`の右辺に貼り付ける

<img width="988" alt="スクリーンショット 2021-03-30 11 52 51" src="https://user-images.githubusercontent.com/39585292/112926612-a6fce400-914e-11eb-98f4-c99813df42ab.png">



## [2] スクリプトエディタとローカル環境の設定

## [3] 動作確認


### GAS

1. Google Apps Script の作成
    - ツール → スクリプトエディターを開く
      ![image](https://user-images.githubusercontent.com/39648121/101870059-34c6ba80-3bc4-11eb-9ea5-6110afa61873.png)
    - 左上の「無題のプロジェクト」をクリックして、お好きなプロジェクト名に変更
      ![image](https://user-images.githubusercontent.com/39648121/101870290-a7379a80-3bc4-11eb-8cd2-56778cc58ec8.png)
    - メニューから「ファイル」→「保存」を選択して保存
2. scriptId の設定
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
3. スクリプトのプロパティの設定
    - 再度スクリプトファイルを開き、ファイル → プロジェクトのプロパティをクリック
    - スクリプトのプロパティをクリック
    - 行を追加をクリックしプロパティに「SHEET_TAB_NAME」を入力、値に「部活動一覧」を入力
        - ![image](https://user-images.githubusercontent.com/38882716/109267761-707d3200-784d-11eb-8545-714fab39be50.png)
    - 行を追加をクリックしプロパティに「SLACK_WORKSPACE_URL」を入力、値に Slack のワークスペースの URL を入力
        - 例: `https://example.slack.com`
    - 保存をクリック
4. ローカルのコードを script ファイルに反映
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
5. GAS プロジェクトを API として公開
    - メニューから「公開」→「WEB アプリケーションとして導入」
      ![image](https://user-images.githubusercontent.com/39648121/101870385-da7a2980-3bc4-11eb-9a21-659aa2f8e646.png)
    - Execute the app as を "Me"に。</br>Who has access to the app を "Anyone even enonymous"に設定して、Deploy(公開)ボタンをクリック
      ![image](https://user-images.githubusercontent.com/39648121/101870515-1a411100-3bc5-11eb-8f11-90b397ef0392.png)
    - 公開後の URL をコピー
      ![image](https://user-images.githubusercontent.com/39648121/101870625-5aa08f00-3bc5-11eb-9c17-18e13ad6d284.png)
6. Postman などで ↑ の URL を叩いて動作確認
    - ![image](https://user-images.githubusercontent.com/38882716/109268429-69a2ef00-784e-11eb-8004-7eb38079e5b0.png)
