import { AllMiddlewareArgs, App, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { getModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { getJoinClubBlocks } from "../blocks/joinClub";
import { Club } from "../config/clubConfig";
import { sectionPlainText } from "../blocks/generalComponents";
import * as slack from "../api/slack";
import * as kibela from "../api/kibela";
import * as gas from "../api/gas";

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
            text: "エラーが発生しました",
            blocks: [sectionPlainText({ title: Club.Label.error, text: "エラーが発生しました。" })],
          })
          .catch((error) => {
            console.error({ error });
          });
        return;
      }

      const { clubs } = response;
      if (!clubs) return;
      const injectClubs = clubs.map(({ id, name }) => ({
        text: name,
        value: id,
      }));

      getModal({
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

  app.view(
    joinClubViewsId,
    async ({
      ack,
      view: {
        state: { values },
      },
      client,
      body,
    }) => {
      ack();

      const { value: channel }: { value: string } = values.join_input.join.selected_options;

      const {
        profile: { email },
      } = await slack.user.getById(body.user.id);
      const kibelaUsers = await kibela.query.user.getAll();
      const userKibelaInfo = await kibela.query.user.findByEmail(email, kibelaUsers);

      // TODO: GASに申請処理 -> 部活紹介記事のKibelaUrlを貰う
      const kibelaUrl = "https://tambourine.kibe.la/notes/17232"; // FIX ME
      // if (!response.success) return

      await Promise.all([
        client.conversations.invite({
          channel,
          users: body.user.id,
        }),
        (async () => {
          const group = await kibela.query.group.getByNoteUrl(kibelaUrl);
          kibela.mutation.user.joinGroup(userKibelaInfo.id, group.id);
        })(),
      ]);
    }
  );
};
