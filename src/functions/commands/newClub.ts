 import { App } from "@slack/bolt";
import { BlockAction } from "@slack/bolt/dist/types/actions/block-action";
import { inputClubModal } from "../blocks/inputClub";
import { getMessageBlocks } from "../blocks/messages/modal";
import { getRejectBlocks } from "../blocks/reject";
import { getApprovalBlocks } from "../blocks/approval";
import { getModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { callNewClub } from "../api/gas";
import { sectionPlainText} from "../blocks/generalComponents";
import { Config } from "../../constant";
import { Club } from "../config/clubConfig";
/* eslint strict: [2, "global"] */

const clubViewsId = "newClubId";
const approvalViewsId = "approvalId";
const rejectViewsId = "rejectId";

export const useNewClubCommand = (app: App, approvalChannelId: string) => {
  app.command("/new-club", async ({ ack, body, context, client }) => {
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

  // 承認専用チャンネルに創部申請情報を流す処理
  app.view(clubViewsId, async ({ ack, view: { state: { values } }, client, body }) => {
    ack();

    const postUserId = body.user.id;
    const userIds = values.member_name.member.selected_users as string[];

    const members = userIds.map(slackId => ({
      name: "nemoto",
      slackId,
    }))

    const clubInfo = {
      club: {
        name: values.club_name.name.value,
        description: values.club_description.description.value,
        budgetUse: values.budget_use.budget.value,
        kibelaUrl: values.kibela_url.url.value,
        channelId: values.channel_id.channel.selected_channel,
      },
      captain: {
        name: "mori",
        slackId: values.captain_name.captain.selected_user,
      },
      members,
    };

    const response = await callNewClub(clubInfo);

    if(response.success) {
      // 初期メンバー表示用のフィールド作成
      const membersField = values.member_name.member.selected_users.map((member: string) => ({
        type: "mrkdwn",
        text: `*<@${member}>*`,
      }));

      const buttons = [
        {
          text: "却下",
          color: "danger",
          actionId: "reject_modal",
        },
        {
          text: "承認",
          color: "primary",
          actionId: "approval_modal",
        },
      ];

      // 承認チャンネルに対して部活動申請情報を送信
      await client.chat
        .postMessage({
          channel: approvalChannelId,
          text: "部活動申請が届きました",
          blocks: getMessageBlocks({
            name: values.club_name.name.value,
            description: values.club_description.description.value,
            budgetUse: values.budget_use.budget.value,
            channelId: `*<#${values.channel_id.channel.selected_channel}>*`,
            captainId: `*<@${values.captain_name.captain.selected_user}>*`,
            membersId: membersField,
            kibela: values.kibela_url.url.value,
            buttons,
          }),
        })
        .catch((error) => {
          console.error({ error });
        });
    } else {
      await client.chat
        .postMessage({
          channel: postUserId,
          text: "エラーが発生しました",
          blocks: [
            sectionPlainText({title: Club.Label.error, text: "エラーが発生しました。開発者に連絡してください"})
          ]
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  });

  // 却下理由入力モーダル表示
  app.action("reject_modal", async ({ ack, client, body, context }) => {
    ack();

    getModal({
      client,
      botToken: context.botToken,
      triggerId: (<BlockAction>body).trigger_id,
      callbackId: rejectViewsId,
      title: Modal.Title.reject,
      blocks: getRejectBlocks(),
      submit: Modal.Button.reject,
    });
  });

  // 承認確認用モーダル表示
  app.action("approval_modal", async ({ ack, client, body, context }) => {
    ack();

    getModal({
      client,
      botToken: context.botToken,
      triggerId: (<BlockAction>body).trigger_id,
      callbackId: approvalViewsId,
      title: Modal.Title.approval,
      blocks: getApprovalBlocks("承認します。よろしいですか？"),
      submit: Modal.Button.approval,
    });
  });
};
