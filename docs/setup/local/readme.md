# local ブランチ用開発環境

## local ブランチ用開発環境の要件

- 開発用ワークスペースが必要
  - 開発用ワークスペースにて、開発者1人につき1つの SlackApp が必要
- 開発用スプレッドシート(のエンドポイント)が必要

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
