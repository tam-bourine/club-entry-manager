import { App } from "@slack/bolt";
import { inputClubModal } from "../blocks/inputClub";
/* eslint strict: [2, "global"] */

export const useNewClubCommand = (app: App) => {
  app.command("/new-club", async ({ ack, body, context, client }) => {
    ack();

    await client.views.open({
      context: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        callback_id: "newClubId",
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

  app.view("newClubId", async({ ack, body, view, client }) => {
    ack();

    const clubInfo = view.state.values;
    
  });
};
