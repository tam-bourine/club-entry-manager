import { App } from "@slack/bolt";
import { getModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { clubViewsId } from "../commands/newClub";
import { inputClubModal } from "../blocks/inputClub";

export const useNewClubShortcut = (app: App) => {
  app.shortcut("open_new_club_modal", async ({ ack, body, client, context }) => {
    ack();

    getModal({
      client,
      botToken: context.botToken,
      triggerId: body.trigger_id,
      callbackId: clubViewsId,
      title: Modal.Title.request,
      blocks: inputClubModal,
      submit: Modal.Button.request,
    });
  });
};
