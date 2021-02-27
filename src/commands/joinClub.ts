import { AllMiddlewareArgs, App, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { getModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { getJoinClubBlocks } from "../blocks/joinClub";
import * as slack from "../api/slack";
import * as kibela from "../api/kibela";

const joinClubViewsId = "joinClubId";

export const useJoinClubCommand = (app: App) => {
  app.command(
    "/join-club",
    async ({ ack, body, context: { botToken }, client }: SlackCommandMiddlewareArgs & AllMiddlewareArgs) => {
      ack();

      // TODO: GASに実行ユーザーのデータを送信 -> 未入部の部活チャンネルの一覧情報を受け取る(Bolt側でchannelsとして整形)
      getModal({
        client,
        botToken,
        triggerId: body.trigger_id,
        callbackId: joinClubViewsId,
        title: Modal.Title.join,
        blocks: getJoinClubBlocks([
          { text: "<#C04RUP79K>", value: "C04RUP79K" }, // FIX ME
          { text: "<#C04RUP79X>", value: "C04RUP79X" },
        ]),
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

      const joinClubs: { value: string }[] = values.join_input.join.selected_options;

      const {
        profile: { email },
      } = await slack.user.getById(body.user.id);
      const kibelaUsers = await kibela.query.user.getAll();
      const userKibelaInfo = await kibela.query.user.findByEmail(email, kibelaUsers);

      await Promise.all(
        joinClubs.map(async ({ value: channel }) => {
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
        })
      );
    }
  );
};
