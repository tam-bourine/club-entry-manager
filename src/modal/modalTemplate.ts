import { Modal } from "../config/modalConfig";
import { ModalArg, AlertModalArg } from "../types/Messages";
import { sectionImage } from "../blocks/generalComponents";

export const openModal = async ({ client, botToken, triggerId, callbackId, title, blocks, submit }: ModalArg) => {
  await client.views
    .open({
      context: botToken,
      trigger_id: triggerId,
      view: {
        type: "modal",
        callback_id: callbackId,
        title: {
          type: "plain_text",
          text: title,
          emoji: true,
        },
        blocks,
        submit: {
          type: "plain_text",
          text: submit,
        },
        close: {
          type: "plain_text",
          text: Modal.button.cancel,
        },
      },
    })
    .catch((error) => {
      console.error({ error }); // `dispatch_failed`と出た際にはこの中身を探る
    });
};

export const openAlertModal = async ({ client, botToken, triggerId, title, text, imageUrl }: AlertModalArg) => {
  await client.views
    .open({
      context: botToken,
      trigger_id: triggerId,
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: title,
          emoji: true,
        },
        blocks: [
          sectionImage({
            text,
            imageUrl,
          }),
        ],
        close: {
          type: "plain_text",
          text: Modal.Button.close,
        },
      },
    })
    .catch((error) => {
      console.error({ error });
    });
};
