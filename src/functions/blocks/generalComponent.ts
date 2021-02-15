import { sectionArgType } from "../types/getMessage";

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

const sectionPlainText = ({ title, text }: { title: string; text: sectionArgType }) => ({
  ...sectionLabel(title),
  type: "section",
  text: {
    type: "plain_text",
    text,
    emoji: true,
  },
});

const sectionMrkdwn = ({ title, text }: { title: string; text: sectionArgType }) => ({
  ...sectionLabel(title),
  type: "section",
  text: {
    type: "mrkdwn",
    text,
  },
});

const sectionFields = ({ title, text }: { title: string; text: sectionArgType }) => ({
  ...sectionLabel(title),
  type: "section",
  fields: text,
});

export { sectionPlainText, sectionMrkdwn, sectionFields };
