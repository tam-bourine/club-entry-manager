# 利用技術
- SlackApp
    - Node.js v12
    - Bolt for JavaScript
- シートAPI
    - Google Apps Script

# セットアップ手順

## Slack App

- Cloud Functions for Firebase
    1. Cloud Functions for Firebaseの登録
    2. プロジェクトを作成
    3. firebase loginの解消方法(Esetでlocalhost:9005を開放)
    4. アカウントをblazeに移行
    5. デプロイ
- Slack
    1. Event SubscriptionsでURLを設定
    2. Permissionsを設定

## GAS

1. スプレッドシートの複製
2. scriptIdの設定
3. claspのインストール
4. clasp push
5. APIとして公開
6. 公開したURLをSlackAppの.envに記入
7. 公開したURLをFirebase上の環境変数に適用