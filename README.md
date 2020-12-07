# Club Manager

## Setup

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
