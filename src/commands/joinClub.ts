import { AllMiddlewareArgs, App, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { openModal, openAlertModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { getJoinClubBlocks } from "../blocks/joinClub";
import * as gas from "../api/gas";
import { Club } from "../config/clubConfig";
import { Error } from "../config/errorConfig";
import { sectionPlainText } from "../blocks/generalComponents";

const joinClubViewsId = "joinClubId";
export const useJoinClubCommand = (app: App, approvalChannelId: string) => {
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
            text: Error.Text.notification,
            blocks: [sectionPlainText({ title: Club.Label.error, text: Error.Text.contactDeveloper })],
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
          title: Modal.Title.none,
          text: Error.Text.noExistClub,
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
        title: Modal.Title.join,
        blocks: getJoinClubBlocks(injectClubs),
        submit: Modal.Button.request,
      });
    }
  );
};
