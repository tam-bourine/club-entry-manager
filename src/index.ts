import { App } from "@slack/bolt";
import { ChatPostMessageArguments } from "@slack/web-api";
import { Config } from "./constant";
import * as slackAPI from "./api/slack";
import { enableNewClubCommand } from "./commands/newClub";
import { enableNewClubShortcut } from "./shortcuts/newClub";
import { enableJoinClubShortcut } from "./shortcuts/joinClub";

export const app = new App({
  socketMode: true,
  appToken: Config.Slack.APP_TOKEN,
  token: Config.Slack.BOT_TOKEN,
  processBeforeResponse:
    Config.General.APP_ENV === Config.General.APP_ENV_TYPE.STG ||
    Config.General.APP_ENV === Config.General.APP_ENV_TYPE.PRD,
});

app.error((err) => {
  return new Promise(() => {
    console.error({ err });
  });
});

enableNewClubShortcut(app);
enableJoinClubShortcut(app, Config.Slack.APPROVAL_CHANNEL_ID);
enableNewClubCommand(app, Config.Slack.APPROVAL_CHANNEL_ID);

(async () => {
  await app.start(Config.Slack.Bolt.SERVE_PORT);
  console.log(`⚡️ Bolt app is running! on PORT: ${Config.Slack.Bolt.SERVE_PORT}!`);

  if (Config.General.APP_ENV === Config.General.APP_ENV_TYPE.LOCAL) {
    const userResult = await slackAPI.user.getById(Config.Slack.Bolt.DEBUG_USER);
    const name = userResult.profile?.display_name || userResult.real_name;
    const icon = userResult.profile?.image_original;

    const msgOption: ChatPostMessageArguments = {
      token: Config.Slack.BOT_TOKEN,
      text: "アプリ起動なう :zap:",
      channel: Config.Slack.DEBUG_CHANNEL_ID,
      icon_url: icon,
      username: name,
    };

    console.info(JSON.stringify(msgOption, null, 2));
    await app.client.chat.postMessage(msgOption);
  }
})();
