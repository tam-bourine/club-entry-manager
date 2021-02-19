import { SectionArgType, buttonArg, formArg } from "../types/Messages";

export const header = (title: string) => ({
  type: "header",
  text: {
    type: "plain_text",
    text: title,
    emoji: true,
  },
});

export const divider = {
  type: "divider",
};

const sectionLabel = (title: string) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: `*${title}*`,
  },
});

const sectionPlainText = ({ title, text }: { title?: string; text: SectionArgType }) => {
  const section = {
    type: "section",
    text: {
      type: "plain_text",
      text,
      emoji: true,
    },
  };
  if (!title) {
    return section;
  }
  return {
    ...sectionLabel(title),
    ...section,
  };
};

const sectionMrkdwn = ({ title, text }: { title: string; text: SectionArgType }) => ({
  ...sectionLabel(title),
  type: "section",
  text: {
    type: "mrkdwn",
    text,
  },
});

const sectionFields = ({ title, text }: { title: string; text: SectionArgType }) => ({
  ...sectionLabel(title),
  type: "section",
  fields: text,
});

const sectionButton = (buttons: buttonArg[]) => {
  const elements = buttons.map((item) => {
    return {
      type: "button",
      text: {
        type: "plain_text",
        text: item.text,
        emoji: true,
      },
      style: item.color,
      value: "click_me_123",
      action_id: item.actionId,
    };
  });
  return {
    type: "actions",
    elements,
  };
};

const sectionForm = ({ label, placeholder, actionId, blockId }: formArg) => {
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
  };
};

export { sectionPlainText, sectionMrkdwn, sectionFields, sectionButton, sectionForm };
