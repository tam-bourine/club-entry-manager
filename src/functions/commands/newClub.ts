import { App } from "@slack/bolt";
import { BlockAction } from "@slack/bolt/dist/types/actions/block-action";
import { inputClubModal } from "../blocks/inputClub";
import { getMessageBlocks } from "../blocks/messages/modal";
import { getRejectBlocks } from "../blocks/reject";
import { getApprovalBlocks } from "../blocks/approval";
import { getModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
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
  app.view(clubViewsId, async ({ ack, view, client }) => {
    ack();

    const { values } = view.state;

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
        token: client.token,
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
