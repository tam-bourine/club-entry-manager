import { App } from "@slack/bolt";
import { useNewClubCommand } from "./commands/newClub";
import { Config } from "./constant";
import { useNewClubShortcut } from "./shortcuts/newClub";

export const app = new App({
  socketMode: Config.General.APP_ENV === Config.General.APP_ENV_TYPE.LOCAL,
  appToken: Config.Slack.APP_TOKEN,
  token: Config.Slack.BOT_TOKEN,
  signingSecret: Config.Slack.SIGNING_SECRET,
});

app.error((err) => {
  return new Promise(() => {
    console.error({ err });
  });
});

useNewClubShortcut(app);
useNewClubCommand(app, Config.Slack.APPROVAL_CHANNEL_ID);

(async () => {
  await app.start(Config.Slack.Bolt.SERVE_PORT ?? 3000);
  console.log("⚡️ Bolt app is running!");

  if (Config.General.APP_ENV === Config.General.APP_ENV_TYPE.LOCAL) {
    app.client.chat.postMessage({
      token: Config.Slack.BOT_TOKEN,
      text: `<!here> アプリ起動: <@${Config.Slack.Bolt.DEBUG_USER}>`,
      channel: Config.Slack.APPROVAL_CHANNEL_ID,
    });
  }
})();
