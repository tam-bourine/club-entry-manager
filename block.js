// ブロックキットを使用しステップ設定モーダルのUIを構築
module.exports = [
  {
    "type": "input",
    "block_id": "task_name_input",
    "element": {
      "type": "plain_text_input",
      "action_id": "name",
      "placeholder": {
        "type": "plain_text",
        "text": "Add a task name"
      }
  },
  "label": {
    "type": "plain_text",
    "text": "部活動名"
  }
},
{
  "type": "input",
  "block_id": "task_description_input",
  "element": {
    "type": "plain_text_input",
    "action_id": "description",
    "placeholder": {
      "type": "plain_text",
      "text": "Add a task name"
    }
  },
  "label": {
    "type": "plain_text",
    "text": "活動内容"
  }
},
{
  "type": "input",
  "block_id": "task_captain_input",
  "element": {
    "type": "plain_text_input",
    "action_id": "captain",
    "placeholder": {
      "type": "plain_text",
      "text": "Add a task name"
    }
  },
  "label": {
    "type": "plain_text",
    "text": "部長名"
  }
},
{
  "type": "input",
  "block_id": "task_member_input",
  "element": {
    "type": "plain_text_input",
    "action_id": "member",
    "placeholder": {
      "type": "plain_text",
      "text": "Add a task name"
    }
  },
  "label": {
    "type": "plain_text",
    "text": "初期メンバー"
  }
}
];
