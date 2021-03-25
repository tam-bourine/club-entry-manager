import { AllMiddlewareArgs, App, SlackShortcutMiddlewareArgs } from "@slack/bolt";
import { Modal } from "../config/modalConfig";
import { openModal, openAlertModal } from "../modal/modalTemplate";
import * as gas from "../api/gas";
import { Error } from "../config/errorConfig";
import { Club } from "../config/clubConfig";
import { sectionPlainText } from "../blocks/generalComponents";
import { getJoinClubBlocks } from "../blocks/joinClub";

export const enableJoinClubShortcut = (app: App, approvalChannelId: string) => {
  app.shortcut(
    "open_join_club_modal",
    async ({ ack, body, client, context: { botToken } }: SlackShortcutMiddlewareArgs & AllMiddlewareArgs) => {
      ack();

      const response = await gas.api.callNewJoinClub();
      if (!response.success) {
        console.error(response, null, "\n");
        await client.chat
          .postMessage({
            channel: approvalChannelId,
            text: Error.text.NOTIFICATION,
            blocks: [sectionPlainText({ title: Club.label.ERROR, text: Error.text.CONTACT_DEVELOPER })],
          })
          .catch((error) => {
            console.error({ error });
          });
        return;
      }

      const { clubs } = response;
      if (!clubs) {
        await openAlertModal({
          client,
          botToken,
          triggerId: body.trigger_id,
          title: Modal.title.NO_CLUB,
          text: Error.text.NO_EXIST_CLUB,
          imageUrl: Error.image.SORRY,
        });
        return;
      }
      const injectClubs = clubs.map(({ id, name }) => ({
        text: name,
        value: id,
      }));

      openModal({
        client,
        botToken,
        triggerId: body.trigger_id,
        callbackId: Modal.id.JOIN_CLUB_VIEWS_ID,
        title: Modal.title.JOIN,
        blocks: getJoinClubBlocks(injectClubs),
        submit: Modal.button.REQUEST,
      });
    }
  );
};
