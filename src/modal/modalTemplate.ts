import { Modal } from "../config/modalConfig";
import { ModalArg } from "../types/Messages";

export const getModal = async ({ client, botToken, triggerId, callbackId, title, blocks, submit }: ModalArg) => {
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
          text: Modal.Button.cancel,
        },
      },
    })
    .catch((error) => {
      console.error({ error });
    });
};
