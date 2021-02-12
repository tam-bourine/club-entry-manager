import { App } from "@slack/bolt";
import { inputClubModal } from "../blocks/inputClub";
import { getMessageBlocks } from "../blocks/clubInfo";
/* eslint strict: [2, "global"] */

const viewsId = "newClubId";

export const useNewClubCommand = (app: App, approvalChannelId: string) => {
  app.command("/new-club", async ({ ack, body, context, client }) => {
    ack();

    await client.views
      .open({
        context: context.botToken,
        trigger_id: body.trigger_id,
        view: {
          type: "modal",
          callback_id: viewsId,
          title: {
            type: "plain_text",
            text: "部活動申請フォーム",
          },
          blocks: inputClubModal,
          submit: {
            type: "plain_text",
            text: "申請",
          },
        },
      })
      .catch((error) => {
        console.error({ error });
      });
  });

  app.view(viewsId, async ({ ack, view, client }) => {
    ack();

    const { values } = view.state;

    // 初期メンバー表示用のフィールド作成
    const membersField = values.member_name.member.selected_users.map((member: string) => {
      return {
        type: "mrkdwn",
        text: `*<@${member}>*`,
      };
    });

    // 創部申請時に入力した各項目の情報
    const clubInfo = {
      name: values.club_name.name.value,
      description: values.club_description.description.value,
      kibela: values.kibela_url.url.value,
      captainId: `*<@${values.captain_name.captain.selected_user}>*`,
      subCaptainId: `*<@${values.sub_captain_name.sub_captain.selected_user}>*`,
      membersId: membersField,
    };

    // 承認専用チャンネルに対して部活動申請情報を送信
    await client.chat
      .postMessage({
        token: client.token,
        channel: approvalChannelId,
        text: "部活動申請が届きました",
        blocks: getMessageBlocks({ clubInfo }),
      })
      .catch((error) => {
        console.error({ error });
      });
  });
};
