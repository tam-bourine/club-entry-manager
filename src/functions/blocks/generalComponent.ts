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

export const section = ({ text, textType }: sectionArg) => {
  switch (textType) {
    case "label": {
      return {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*${text}*`,
        },
      };
    }
    case "plain_text": {
      return {
        type: "section",
        text: {
          type: textType,
          text,
          emoji: true,
        },
      };
    }
    case "mrkdwn": {
      return {
        type: "section",
        text: {
          type: textType,
          text,
        },
      };
    }
    case "fields": {
      return {
        type: "section",
        fields: text,
      };
    }
    default:
      return {
        type: "section",
        text: {
          type: "plain_text",
          text: "Error",
        },
      };
  }
};
