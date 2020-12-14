// ブロックキットを使用しステップ設定モーダルのUIを構築
const club_name = '部活動名';
const description = '活動内容';
const captain = '部長名';
const collaborator_1st = '初期メンバー1';
const collaborator_2nd = '初期メンバー2';

const input_component_name = {
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
    "text": club_name
  }
}

const input_component_description = {
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
}

const input_component_captain = {
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
}

const input_component_member_1st = {
  "type": "input",
  "block_id": "task_member_1st_input",
  "element": {
    "type": "plain_text_input",
    "action_id": "member_1st",
    "placeholder": {
      "type": "plain_text",
      "text": "Add a task name"
    }
  },
  "label": {
    "type": "plain_text",
    "text": collaborator_1st
  }
}

const input_component_member_2nd = {
  "type": "input",
  "block_id": "task_member_2nd_input",
  "element": {
    "type": "plain_text_input",
    "action_id": "member_2nd",
    "placeholder": {
      "type": "plain_text",
      "text": "Add a task name"
    }
  },
  "label": {
    "type": "plain_text",
    "text": collaborator_2nd
  }
}

const input_club_modal = [
  input_component_name,
  input_component_description,
  input_component_captain,
  input_component_member_1st,
  input_component_member_2nd
]

module.exports = input_club_modal;