import { MultiSelectArgs, SectionArgType, ButtonArg, FormArg, StaticSelectArgs, Option } from "../types/Messages";

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

const GenerateOptionElement = (options: Option[]) =>
  options.map(({ text, value }) => ({
    text: {
      type: "plain_text",
      text,
      emoji: true,
    },
    value,
  }));

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

export const sectionImage = ({ imageUrl, text }: { imageUrl: string; text: string }) => {
  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text,
    },
    accessory: {
      type: "image",
      image_url: imageUrl,
      alt_text: "picture",
    },
  };
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

const inputStaticSelect = ({ label, options, actionId, blockId, initialOption, placeholder }: StaticSelectArgs) => {
  // default
  const defaultResult = {
    type: "input",
    block_id: blockId,
    label: {
      type: "plain_text",
      text: label,
      emoji: true,
    },
    element: {
      type: "static_select",
      options: GenerateOptionElement(options),
      action_id: actionId,
    },
  };

  if (placeholder) {
    return {
      ...defaultResult,
      element: {
        ...defaultResult.element,
        // NOTE: element: defaultElement e.g. {...}
        placeholder: {
          type: "plain_text",
          text: placeholder,
          emoji: true,
        },
      },
    };
  }

  return {
    ...defaultResult,
    element: {
      ...defaultResult.element,
      // NOTE: element: defaultElement e.g. {...}
      initial_option: {
        text: {
          type: "plain_text",
          text: initialOption!.text,
        },
        value: initialOption!.value,
      },
    },
  };
};

const inputMultiSelect = ({ text, options, actionId, blockId, placeholder }: MultiSelectArgs) => ({
  type: "section",
  block_id: blockId,
  text: {
    type: "mrkdwn",
    text: text,
  },
  accessory: {
    action_id: actionId,
    type: "multi_static_select",
    placeholder: {
      type: "plain_text",
      text: placeholder,
    },
    options: GenerateOptionElement(options),
  },
});

export {
  sectionPlainText,
  sectionMrkdwn,
  sectionFields,
  sectionButton,
  sectionForm,
  inputStaticSelect,
  inputMultiSelect,
};
