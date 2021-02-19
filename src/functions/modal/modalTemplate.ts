import { Modal } from "../config/modalConfig";
import { modalArg } from "../types/getMessage";

export const getModal = async({ modalInfo }: modalArg)  => {
  await modalInfo.client.views
    .open({
      context: modalInfo.botToken,
      trigger_id: modalInfo.triggerId,
      view: {
        type: "modal",
        callback_id: modalInfo.callbackId,
        title: {
          type: "plain_text",
          text: modalInfo.title,
          emoji: true
        },
        blocks: modalInfo.blocks,
        submit: {
          type: "plain_text",
          text: modalInfo.submit,
        },
        close: {
          type: "plain_text",
          text: Modal.Button.cancel
        }
      }
    })
    .catch((error) => {
      console.error({ error });
    });
}