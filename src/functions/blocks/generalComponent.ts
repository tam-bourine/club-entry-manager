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

const label = (title: string) => ({
  type: "section",
  text: {
    type: "mrkdwn",
    text: `*${title}*`,
  },
});

const plainText = ({ title, text }: { title: string; text: sectionArgType }) => ({
  ...label(title),
  type: "section",
  text: {
    type: "plain_text",
    text,
    emoji: true,
  },
});

const mrkdwn = ({ title, text }: { title: string; text: sectionArgType }) => ({
  ...label(title),
  type: "section",
  text: {
    type: "mrkdwn",
    text,
  },
});

const fields = ({ title, text }: { title: string; text: sectionArgType }) => ({
  ...label(title),
  type: "section",
  fields: text,
});

export { plainText, mrkdwn, fields };
