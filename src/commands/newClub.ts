import { App, AllMiddlewareArgs, ButtonClick, InteractiveMessage, SlackActionMiddlewareArgs } from "@slack/bolt";
import { BlockAction } from "@slack/bolt/dist/types/actions/block-action";
import { getMessageBlocks } from "../blocks/messages/modal";
import { getRejectBlocks } from "../blocks/reject";
import { getApprovalBlocks } from "../blocks/approval";
import { openModal } from "../modal/modalTemplate";
import { Modal } from "../config/modalConfig";
import { sectionPlainText } from "../blocks/generalComponents";
import { Club } from "../config/clubConfig";
import { ButtonArg } from "../types/Messages";
// import * as kibela from "../api/kibela";
import * as slack from "../api/slack";
import * as gas from "../api/gas";
import { Config } from "../constant";
import { ErrorAlert } from "../config/errorConfig";
/* eslint strict: [2, "global"] */

export const enableNewClubCommand = (app: App, approvalChannelId: string) => {
  // 承認専用チャンネルに創部申請情報を流す処理
  app.view(
    Modal.id.NEW_CLUB_VIEWS_ID,
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

      if (!response.success || !response?.club?.id) {
        await client.chat
          .postMessage({
            channel: approvalChannelId,
            text: ErrorAlert.text.NOTIFICATION,
            blocks: [sectionPlainText({ title: Club.label.ERROR, text: ErrorAlert.text.CONTACT_DEVELOPER })],
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
          value: `${values.channel_id.channel.selected_channel},${response?.club?.id}`,
        },
        {
          text: "承認",
          color: "primary",
          actionId: "approval_modal",
          value: `${values.channel_id.channel.selected_channel},${response?.club?.id}`,
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
      callbackId: Modal.id.REJECT_VIEWS_ID,
      title: Modal.title.REJECT,
      blocks: getRejectBlocks(),
      submit: Modal.button.REJECT,
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

      const [channelId, id] = payload.value.split(",");

      openModal({
        client,
        botToken: context.botToken,
        triggerId: body.trigger_id,
        callbackId: Modal.id.APPROVAL_VIEWS_ID,
        title: Modal.title.APPROVAL,
        blocks: getApprovalBlocks({ text: `<#${channelId}>`, value: id }),
        submit: Modal.button.APPROVAL,
      });
    }
  );

  app.view(
    Modal.id.APPROVAL_VIEWS_ID,
    async ({
      ack,
      view: {
        state: { values },
      },
      client,
      body,
    }) => {
      try {
        await ack();
      } catch (error) {
        throw new Error(error);
      }

      const id = values.approval_input.approval.selected_option.value as string;
      const authorizer = await slack.user.getById(body.user.id);

      /* 16. シートの承認APIをコール */
      const response = await gas.api.callApproveClub({
        club: { id },
        authorizer: {
          slackId: authorizer.id,
          name: authorizer.real_name,
        },
        isApproved: true,
      });

      const { success, club } = response;

      if (!success || !club || !club.name || /*! club.kibelaUrl || */ !club.members || !club.channelId) {
        await client.chat
          .postMessage({
            channel: approvalChannelId,
            text: ErrorAlert.text.NOTIFICATION,
            blocks: [sectionPlainText({ title: Club.label.ERROR, text: ErrorAlert.text.CONTACT_DEVELOPER })],
          })
          .catch((error) => {
            console.error({ error });
          });
        return;
      }

      const { name, kibelaUrl, members, channelId } = club;

      // await kibela.mutation.note.moveOfficialFolder({ name, kibelaUrl });

      // // NOTE: slack user ids -> user emails
      // const memberEmails = await Promise.all(
      //   members.map(async ({ slackId }) => (await slack.user.getById(slackId)).profile!.email)
      // );
      // const group = await kibela.query.group.getByNoteUrl(kibelaUrl);
      // // NOTE: kibela users -> target kibela users
      // kibela.query.user.getAll().then((users) =>
      //   memberEmails
      //     .map((email) => kibela.query.user.findByEmail(email, users))
      //     .map(async (hitUser) => {
      //       await kibela.mutation.user.joinGroup(hitUser.id, group.id);
      //     })
      // );

      // NOTE: Alert in approval channel
      await client.chat
        .postMessage({
          token: client.token,
          channel: approvalChannelId,
          text: `<#${channelId}>が承認されました:tada:`,
        })
        .catch((error) => {
          console.error({ error });
        });

      // NOTE: Alert in club channel
      await client.chat
        .postMessage({
          token: client.token,
          channel: channelId,
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
