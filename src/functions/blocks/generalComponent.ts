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
