import { App, AllMiddlewareArgs, ButtonClick, InteractiveMessage, SlackActionMiddlewareArgs } from "@slack/bolt";
import { BlockAction } from "@slack/bolt/dist/types/actions/block-action";
import { inputClubModal } from "../blocks/inputClub";
import { getMessageBlocks } from "../blocks/messages/modal";
import { getRejectBlocks } from "../blocks/reject";
import { getApprovalBlocks } from "../blocks/approval";
import { openModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { sectionPlainText } from "../blocks/generalComponents";
import { Club } from "../config/clubConfig";
import { ButtonArg } from "../types/Messages";
import * as kibela from "../api/kibela";
import * as slack from "../api/slack";
import * as gas from "../api/gas";
import { Config } from "../constant";
import { Error } from "../config/errorConfig";
/* eslint strict: [2, "global"] */

export const enableNewClubCommand = (app: App, approvalChannelId: string) => {
  app.command("/new-club", async ({ ack, body, context, client }) => {
    ack();

    openModal({
      client,
      botToken: context.botToken,
      triggerId: body.trigger_id,
      callbackId: Modal.id.clubViewsId,
      title: Modal.title.request,
      blocks: inputClubModal,
      submit: Modal.button.request,
    });
  });

  // 承認専用チャンネルに創部申請情報を流す処理
  app.view(
    Modal.id.clubViewsId,
    async ({
      ack,
      view: {
        state: { values },
      },
      client,
    }) => {
      ack();

      const memberIds = values.member_name.member.selected_users as string[];
      const members = await Promise.all(
        memberIds.map(async (slackId) => {
          const { id, real_name: realName } = await slack.user.getById(slackId);
          return {
            slackId: id,
            name: realName,
          };
        })
      );
      const captain = await slack.user.getById(values.captain_name.captain.selected_user);
      const clubInfo = {
        club: {
          name: values.club_name.name.value,
          description: values.club_description.description.value,
          budgetUse: values.budget_use.budget.value,
          kibelaUrl: values.kibela_url.url.value,
          channelId: values.channel_id.channel.selected_channel,
        },
        captain: {
          slackId: captain.id,
          name: captain.real_name,
        },
        members,
      };
      const response = await gas.api.callNewClub(clubInfo);
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

      // 初期メンバー表示用のフィールド作成
      const membersField = values.member_name.member.selected_users.map((member: string) => ({
        type: "mrkdwn",
        text: `*<@${member}>*`,
      }));

      const buttons: ButtonArg[] = [
        {
          text: "却下",
          color: "danger",
          actionId: "reject_modal",
          value: values.channel_id.channel.selected_channel,
        },
        {
          text: "承認",
          color: "primary",
          actionId: "approval_modal",
          value: values.channel_id.channel.selected_channel,
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
    }
  );

  // 却下理由入力モーダル表示
  app.action("reject_modal", async ({ ack, client, body, context }) => {
    ack();

    openModal({
      client,
      botToken: context.botToken,
      triggerId: (<BlockAction>body).trigger_id,
      callbackId: Modal.id.rejectViewsId,
      title: Modal.title.reject,
      blocks: getRejectBlocks(),
      submit: Modal.button.reject,
    });
  });

  // 承認確認用モーダル表示
  app.action(
    "approval_modal",
    async ({
      ack,
      body,
      payload,
      client,
      context,
    }: SlackActionMiddlewareArgs<InteractiveMessage<ButtonClick>> & AllMiddlewareArgs) => {
      ack();

      openModal({
        client,
        botToken: context.botToken,
        triggerId: body.trigger_id,
        callbackId: Modal.id.approvalViewsId,
        title: Modal.title.approval,
        blocks: getApprovalBlocks({ text: `<#${payload.value}>`, value: payload.value }),
        submit: Modal.button.approval,
      });
    }
  );

  app.view(
    Modal.id.approvalViewsId,
    async ({
      ack,
      view: {
        state: { values },
      },
      client,
      body,
    }) => {
      ack();

      const clubChannelId = values.approval_input.approval.selected_option.value as string;
      const authorizer = await slack.user.getById(body.user.id);

      /* 16. シートの承認APIをコール */
      const response = await gas.api.callApproveClub({
        club: {
          channelId: clubChannelId,
        },
        authorizer: {
          slackId: authorizer.id,
          name: authorizer.real_name,
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
      if (!club.name || !club.kibelaUrl || !club.members) return;
      const { name, kibelaUrl, members } = club;

      await kibela.mutation.note.moveOfficialFolder({ name, kibelaUrl });

      // NOTE: slack user ids -> user emails
      const memberEmails = await Promise.all(
        members.map(async ({ slackId }) => (await slack.user.getById(slackId)).profile!.email)
      );
      const group = await kibela.query.group.getByNoteUrl(kibelaUrl);
      // NOTE: kibela users -> target kibela users
      kibela.query.user.getAll().then((users) =>
        memberEmails
          .map((email) => kibela.query.user.findByEmail(email, users))
          .map(async (hitUser) => {
            await kibela.mutation.user.joinGroup(hitUser.id, group.id);
          })
      );

      // NOTE: Alert in approval channel
      await client.chat
        .postMessage({
          token: client.token,
          channel: approvalChannelId,
          text: `<#${clubChannelId}>が承認されました:tada:`,
        })
        .catch((error) => {
          console.error({ error });
        });

      // NOTE: Alert in club channel
      await client.chat
        .postMessage({
          token: client.token,
          channel: clubChannelId,
          text:
            Config.General.APP_ENV === Config.General.APP_ENV_TYPE.LOCAL
              ? `@channel 部活申請が承認されました:tada:`
              : `<!channel> 部活申請が承認されました:tada:`,
        })
        .catch((error) => {
          console.error({ error });
        });
    }
  );
};
