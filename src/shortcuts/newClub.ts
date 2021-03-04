import { App } from "@slack/bolt";
import { getModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { inputClubModal } from "../blocks/inputClub";

export const enableNewClubShortcut = (app: App) => {
  app.shortcut("open_new_club_modal", async ({ ack, body, client, context }) => {
    ack();

    getModal({
      client,
      botToken: context.botToken,
      triggerId: body.trigger_id,
      callbackId: Modal.id.clubViewsId,
      title: Modal.Title.request,
      blocks: inputClubModal,
      submit: Modal.Button.request,
    });
  });
};
