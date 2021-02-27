import { AllMiddlewareArgs, App, SlackCommandMiddlewareArgs } from "@slack/bolt";
import { getModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { getJoinClubBlocks } from "../blocks/joinClub";

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
};
