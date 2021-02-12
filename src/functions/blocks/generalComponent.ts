import { sectionArg } from "../types/getMessage";

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

export { label, plainText, mrkdwn, fields };
