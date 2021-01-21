// ブロックキットを使用しステップ設定モーダルのUIを構築
const clubName = "部活動名";
const description = "活動内容";
const captain = "部長名";
const collaborator1st = "初期メンバー1";
const collaborator2nd = "初期メンバー2";

const inputComponentName = {
  type: "input",
  block_id: "task_name_input",
  element: {
    type: "plain_text_input",
    action_id: "name",
    placeholder: {
      type: "plain_text",
      text: "Add a task name",
    },
  },
  label: {
    type: "plain_text",
    text: clubName,
  },
};

const inputComponentDescription = {
  type: "input",
  block_id: "task_description_input",
  element: {
    type: "plain_text_input",
    action_id: "description",
    placeholder: {
      type: "plain_text",
      text: "Add a task name",
    },
  },
  label: {
    type: "plain_text",
    text: description,
  },
};

const inputComponentCaptain = {
  type: "input",
  block_id: "task_captain_input",
  element: {
    type: "plain_text_input",
    action_id: "captain",
    placeholder: {
      type: "plain_text",
      text: "Add a task name",
    },
  },
  label: {
    type: "plain_text",
    text: captain,
  },
};

const inputComponentMember1st = {
  type: "input",
  block_id: "task_member_1st_input",
  element: {
    type: "plain_text_input",
    action_id: "member_1st",
    placeholder: {
      type: "plain_text",
      text: "Add a task name",
    },
  },
  label: {
    type: "plain_text",
    text: collaborator1st,
  },
};

const inputComponentMember2nd = {
  type: "input",
  block_id: "task_member_2nd_input",
  element: {
    type: "plain_text_input",
    action_id: "member_2nd",
    placeholder: {
      type: "plain_text",
      text: "Add a task name",
    },
  },
  label: {
    type: "plain_text",
    text: collaborator2nd,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const inputClubModal = [
  inputComponentName,
  inputComponentDescription,
  inputComponentCaptain,
  inputComponentMember1st,
  inputComponentMember2nd,
];
