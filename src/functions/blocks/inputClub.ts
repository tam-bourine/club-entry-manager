// ブロックキットを使用しステップ設定モーダルのUIを構築
const clubName = "部活動名";
const description = "活動内容";
const kibelaUrl = "Kibela URL"
const captain = "部長名";
const subCaptain = "副部長名";
const member = "初期メンバー";

const inputComponentName = {
  type: "input",
  block_id: "club_name",
  element: {
    type: "plain_text_input",
    action_id: "name",
    placeholder: {
      type: "plain_text",
      text: "部活動名を入力してください",
    },
  },
  label: {
    type: "plain_text",
    text: clubName,
  },
};

const inputComponentDescription = {
  type: "input",
  block_id: "club_description",
  element: {
    type: "plain_text_input",
    multiline: true,
    action_id: "description",
    placeholder: {
      type: "plain_text",
      text: "活動内容とどの程度部費が必要かを入力してください",
    },
  },
  label: {
    type: "plain_text",
    text: description,
  },
};

const inputComponentKibelaUrl = {
  type: "input",
  block_id: "kibela_url",
  element: {
    type: "plain_text_input",
    action_id: "url",
    placeholder: {
      type: "plain_text",
      text: "KibelaのURLを入力してください",
    },
  },
  label: {
    type: "plain_text",
    text: kibelaUrl,
  },
};

const inputComponentCaptain = {
  type: "input",
  block_id: "captain_name",
  element: {
    type: "users_select",
    action_id: "captain",
    placeholder: {
      type: "plain_text",
      text: "部長を選択してください",
    },
  },
  label: {
    type: "plain_text",
    text: captain,
  },
};

const inputComponentSubCaptain = {
  type: "input",
  block_id: "sub_captain_name",
  element: {
    type: "users_select",
    action_id: "sub_captain",
    placeholder: {
      type: "plain_text",
      text: "副部長を選択してください",
    },
  },
  label: {
    type: "plain_text",
    text: subCaptain,
  },
};

const inputComponentMember = {
  type: "input",
  block_id: "member_name",
  element: {
    type: "multi_users_select",
    action_id: "member",
    placeholder: {
      type: "plain_text",
      text: "部員を選択してください",
    },
  },
  label: {
    type: "plain_text",
    text: member,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const inputClubModal = [
  inputComponentName,
  inputComponentDescription,
  inputComponentKibelaUrl,
  inputComponentCaptain,
  inputComponentSubCaptain,
  inputComponentMember,
];
