import { AllMiddlewareArgs, App, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { Modal } from "../config/modalConfig";
import { getJoinClubBlocks } from "../blocks/joinClub";
import { Club } from "../config/clubConfig";
import { sectionPlainText } from "../blocks/generalComponents";
import { openModal, openAlertModal } from "../modal/modalTemplate";
import { Error } from "../config/errorConfig";
import * as slack from "../api/slack";
import * as kibela from "../api/kibela";
import * as gas from "../api/gas";

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
            text: Error.text.notification,
            blocks: [sectionPlainText({ title: Club.Label.error, text: Error.text.contactDeveloper })],
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
          title: Modal.title.noClub,
          text: Error.text.noExistClub,
          imageUrl: Error.image.sorry,
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
        title: Modal.title.join,
        blocks: getJoinClubBlocks(injectClubs),
        submit: Modal.button.request,
      });
    }
  );

  app.view(
    joinClubViewsId,
    async ({
      ack,
      view: {
        state: { values },
      },
      client,
      body: {
        user: { id: slackUserId },
      },
    }) => {
      ack();

      const { value: channel }: { value: string } = values.join_input.join.selected_option;

      const member = await slack.user.getById(slackUserId);
      const kibelaUsers = await kibela.query.user.getAll();
      const userKibelaInfo = await kibela.query.user.findByEmail(member.profile.email, kibelaUsers);

      const response = await gas.api.callJoinClub({
        club: {
          channelId: channel,
        },
        member: {
          slackId: member.id,
          name: member.real_name,
        },
      });
      if (!response.success) {
        await client.chat
          .postMessage({
            channel: approvalChannelId,
            text: Error.text.notification,
            blocks: [sectionPlainText({ title: Club.Label.error, text: Error.text.contactDeveloper })],
          })
          .catch((error) => {
            console.error({ error });
          });
        return;
      }

      const { club } = response;
      if (!club) return;
      if (!club.kibelaUrl) return;
      const { kibelaUrl } = club;

      await Promise.all([
        client.conversations.invite({
          channel,
          users: slackUserId,
        }),
        (async () => {
          const group = await kibela.query.group.getByNoteUrl(kibelaUrl);
          kibela.mutation.user.joinGroup(userKibelaInfo.id, group.id);
        })(),
      ]);
    }
  );
};
