// ブロックキットを使用しステップ設定モーダルのUIを構築
const clubName = '部活動名';
const description = '活動内容';
const captain = '部長名';
const collaborator1 = '初期メンバー1';
const collaborator2 = '初期メンバー2';

const inputClub = [
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
      "text": clubName
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
      "text": description
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
      "text": captain
    }
  },
  {
    "type": "input",
    "block_id": "task_member1_input",
    "element": {
      "type": "plain_text_input",
      "action_id": "member1",
      "placeholder": {
        "type": "plain_text",
        "text": "Add a task name"
      }
    },
    "label": {
      "type": "plain_text",
      "text": collaborator1
    }
  },
  {
    "type": "input",
    "block_id": "task_member2_input",
    "element": {
      "type": "plain_text_input",
      "action_id": "member2",
      "placeholder": {
        "type": "plain_text",
        "text": "Add a task name"
      }
    },
    "label": {
      "type": "plain_text",
      "text": collaborator2
    }
  }
];

module.exports = inputClub;