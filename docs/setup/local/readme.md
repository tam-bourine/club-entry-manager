# local ブランチ用開発環境

## local ブランチ用開発環境の要件

- 開発用Slackワークスペースが必要
  - Slackワークスペースにて、開発者1人につき1つの local ブランチ用SlackApp が必要
- 開発用スプレッドシートが必要
  - 開発者1人につき1つの local ブランチ用スプレッドシートが必要

## 環境構築

### [1] ローカル開発環境

```zsh
git clone https://github.com/tam-bourine/club-manager.git
cd club-manager
npm i & npm run postinstall:types-gas
```

### [2] Google Apps Script

[こちら](gas.local.md)

### [3] SlackApp (Bolt for TypeScript)

[こちら](slack.local.md)
