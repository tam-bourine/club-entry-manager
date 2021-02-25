import { SectionArgType, ButtonArg, FormArg } from "../types/Messages";

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

const sectionLabel = (title?: string) => {
  return title
    ? {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${title}*`,
        },
      }
    : {};
};

const sectionPlainText = ({ title, text }: { title?: string; text: SectionArgType }) => {
  return {
    ...sectionLabel(title),
    type: "section",
    fields: [
      {
        type: "plain_text",
        text,
        emoji: true,
      },
    ],
  };
};

const sectionMrkdwn = ({ title, text }: { title: string; text: SectionArgType }) => ({
  ...sectionLabel(title),
  type: "section",
  fields: [
    {
      type: "mrkdwn",
      text,
    },
  ],
});

const sectionFields = ({ title, text }: { title: string; text: SectionArgType }) => ({
  ...sectionLabel(title),
  type: "section",
  fields: text,
});

const sectionButton = (buttons: ButtonArg[]) => {
  const elements = buttons.map(({ text, color, value, actionId }) => {
    return {
      type: "button",
      text: {
        type: "plain_text",
        text: text,
        emoji: true,
      },
      style: color,
      value,
      action_id: actionId,
    };
  });
  return {
    type: "actions",
    elements,
  };
};

const sectionForm = ({ label, placeholder, actionId, blockId }: FormArg) => {
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
