import { AllMiddlewareArgs, App, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { openModal, openAlertModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { getJoinClubBlocks } from "../blocks/joinClub";
import * as gas from "../api/gas";
import { Club } from "../config/clubConfig";
import { Error } from "../config/errorConfig";
import { sectionPlainText } from "../blocks/generalComponents";

const joinClubViewsId = "joinClubId";
export const enableJoinClubCommand = (app: App, approvalChannelId: string) => {
  app.command(
    "/join-club",
    async ({ ack, body, context: { botToken }, client }: SlackCommandMiddlewareArgs & AllMiddlewareArgs) => {
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
          title: Modal.title.NOCLUB,
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
        callbackId: joinClubViewsId,
        title: Modal.title.JOIN,
        blocks: getJoinClubBlocks(injectClubs),
        submit: Modal.button.REQUEST,
      });
    }
  );
};
