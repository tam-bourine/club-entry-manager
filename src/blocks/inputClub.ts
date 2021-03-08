// ブロックキットを使用しステップ設定モーダルのUIを構築
import { Club } from "../config/clubConfig";

const inputComponentName = {
  type: "input",
  block_id: "club_name",
  element: {
    type: "plain_text_input",
    action_id: "name",
    placeholder: {
      type: "plain_text",
      text: Club.placeholder.CLUB_NAME,
    },
  },
  label: {
    type: "plain_text",
    text: Club.label.CLUB_NAME,
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
      text: Club.placeholder.DESCRIPTION,
    },
  },
  label: {
    type: "plain_text",
    text: Club.label.DESCRIPTION,
  },
};

const inputComponentBudgetUse = {
  type: "input",
  block_id: "budget_use",
  element: {
    type: "plain_text_input",
    multiline: true,
    action_id: "budget",
    placeholder: {
      type: "plain_text",
      text: Club.placeholder.BUDGETUSE,
    },
  },
  label: {
    type: "plain_text",
    text: Club.label.BUDGETUSE,
  },
};

const inputComponentChannel = {
  type: "input",
  block_id: "channel_id",
  element: {
    type: "channels_select",
    action_id: "channel",
    placeholder: {
      type: "plain_text",
      text: Club.placeholder.CHANNEL,
    },
  },
  label: {
    type: "plain_text",
    text: Club.label.CHANNEL,
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
      text: Club.placeholder.CAPTAIN,
    },
  },
  label: {
    type: "plain_text",
    text: Club.label.CAPTAIN,
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
      text: Club.placeholder.MEMBER,
    },
  },
  label: {
    type: "plain_text",
    text: Club.label.MEMBER,
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
      text: Club.placeholder.KIBELA_URL,
    },
  },
  label: {
    type: "plain_text",
    text: Club.label.KIBELA_URL,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const inputClubModal = [
  inputComponentName,
  inputComponentDescription,
  inputComponentBudgetUse,
  inputComponentChannel,
  inputComponentCaptain,
  inputComponentMember,
  inputComponentKibelaUrl,
];
