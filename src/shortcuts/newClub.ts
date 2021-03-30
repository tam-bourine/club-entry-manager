import { App } from "@slack/bolt";
import { openModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { inputClubModal } from "../blocks/inputClub";

export const enableNewClubShortcut = (app: App) => {
  app.shortcut("open_new_club_modal", async ({ ack, body, client, context }) => {
    await ack();

    openModal({
      client,
      botToken: context.botToken,
      triggerId: body.trigger_id,
      callbackId: Modal.id.NEW_CLUB_VIEWS_ID,
      title: Modal.title.REQUEST,
      blocks: inputClubModal,
      submit: Modal.button.REQUEST,
    });
  });
};
