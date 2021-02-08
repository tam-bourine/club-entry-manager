// ブロックキットを使用しステップ設定モーダルのUIを構築
import { clubLabel, placeholder } from "../clubConfig";

const inputComponentName = {
  type: "input",
  block_id: "club_name",
  element: {
    type: "plain_text_input",
    action_id: "name",
    placeholder: {
      type: "plain_text",
      text: placeholder.clubName,
    },
  },
  label: {
    type: "plain_text",
    text: clubLabel.clubName,
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
      text: placeholder.description,
    },
  },
  label: {
    type: "plain_text",
    text: clubLabel.description,
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
      text: placeholder.kibelaUrl,
    },
  },
  label: {
    type: "plain_text",
    text: clubLabel.kibelaUrl,
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
      text: placeholder.captain,
    },
  },
  label: {
    type: "plain_text",
    text: clubLabel.captain,
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
      text: placeholder.subCaptain,
    },
  },
  label: {
    type: "plain_text",
    text: clubLabel.subCaptain,
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
      text: placeholder.member,
    },
  },
  label: {
    type: "plain_text",
    text: clubLabel.member,
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
