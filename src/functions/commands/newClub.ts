import { App } from "@slack/bolt";
import { inputClubModal } from "../blocks/inputClub";
import { postMessageBlock } from "../blocks/clubInfo";
/* eslint strict: [2, "global"] */

const viewsId = "newClubId";

export const useNewClubCommand = (app: App, approvalChannelId: string ) => {
  app.command("/new-club", async ({ ack, body, context, client }) => {
    ack();

    await client.views.open({
      context: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: viewsId,
        title: {
          type: "plain_text",
          text: "部活動申請フォーム"
        },
        blocks: inputClubModal,
        submit: {
          "type": "plain_text",
          "text": "申請"
        }
      }
    })
    .catch((error) => {
      console.error({ error });
    });
  });

  app.view(viewsId, async({ ack, view, client }) => {
    ack();

    const values = view.state.values;
    // 創部申請の各項目
    const clubInfo = {
      name: values.club_name_input.name.value,
      description: values.club_description_input.description.value,
      kibela: values.kibela_url_input.url.value,
      captainId: values.captain_name_input.captain.selected_user,
      subCaptainId: values.sub_captain_name_input.sub_captain.selected_user,
      membersId: values.member_name_input.member.selected_users
    }

    // 初期メンバー表示用のフィールド作成
    const collaboratorsId = clubInfo.membersId.map((member: string) => {
      return {
        "type": "mrkdwn",
        "text": `*<@${member}>*`
      }
    })

    // 承認専用チャンネルに対して部活動申請情報を送信
    await client.chat.postMessage({
      token: client.token,
      channel: approvalChannelId,
      text: "部活動申請が届きました",
      blocks: postMessageBlock({ clubInfo, collaboratorsId })
    })
    .catch((error) => {
      console.error({ error });
    });
  });
};
