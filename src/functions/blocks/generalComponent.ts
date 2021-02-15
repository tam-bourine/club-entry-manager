import { sectionArg, buttonArg, formArg } from "../types/getMessage";

export const header = (title: string) => {
  return {
    type: "header",
    text: {
      type: "plain_text",
      text: title,
      emoji: true,
    },
  };
};

export const divider = {
  type: "divider",
};

const label = ({ text }: sectionArg) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: `*${text}*`,
  },
});

const plainText = ({ text }: sectionArg) => ({
  type: "section",
  text: {
    type: "plain_text",
    text,
    emoji: true,
  },
});

const mrkdwn = ({ text }: sectionArg) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text,
  },
});

const fields = ({ text }: sectionArg) => ({
  type: "section",
  fields: text,
});

const button = ({ buttonOptions }: buttonArg) => {
  const elements = buttonOptions.map((item) => {
    return {
      type: "button",
      text: {
        type: "plain_text",
        text: item.text,
        emoji: true
      },
      style: item.color,
      value: "click_me_123",
      action_id: item.action_id
    }
  });
  return {
    type: "actions",
    elements
  }
}

const form = ({ label, placeholder, actionId, blockId }: formArg) => {
  return {
    type: "input",
    block_id: blockId,
    element: {
      type: "plain_text_input",
      multiline: true,
      action_id: actionId,
      placeholder: {
        type: "plain_text",
        text: placeholder,
      },
    },
    label: {
      type: "plain_text",
      text: label,
    },
  }
}

export { label, plainText, mrkdwn, fields, button, form };
