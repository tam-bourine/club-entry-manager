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
      text: Club.Placeholder.clubName,
    },
  },
  label: {
    type: "plain_text",
    text: Club.Label.clubName,
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
      text: Club.Placeholder.description,
    },
  },
  label: {
    type: "plain_text",
    text: Club.Label.description,
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
      text: Club.Placeholder.budgetUse,
    },
  },
  label: {
    type: "plain_text",
    text: Club.Label.budgetUse,
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
      text: Club.Placeholder.kibelaUrl,
    },
  },
  label: {
    type: "plain_text",
    text: Club.Label.kibelaUrl,
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
      text: Club.Placeholder.captain,
    },
  },
  label: {
    type: "plain_text",
    text: Club.Label.captain,
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
      text: Club.Placeholder.member,
    },
  },
  label: {
    type: "plain_text",
    text: Club.Label.member,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const inputClubModal = [
  inputComponentName,
  inputComponentDescription,
  inputComponentBudgetUse,
  inputComponentKibelaUrl,
  inputComponentCaptain,
  inputComponentMember,
];
