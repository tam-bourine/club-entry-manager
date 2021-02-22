import { App } from "@slack/bolt";
import { useNewClubCommand } from "./commands/newClub";
import { Config } from "../constant";

const app = new App({
  socketMode: Config.General.APP_ENV === "local",
  appToken: Config.Slack.APP_TOKEN,
  token: Config.Slack.BOT_TOKEN,
  signingSecret: Config.Slack.SIGNING_SECRET,
});

app.error((err) => {
  return new Promise(() => {
    console.error({ err });
  });
});

useNewClubCommand(app, Config.Slack.APPROVAL_CHANNEL_ID);

(async () => {
  await app.start(Config.Slack.Bolt.SERVE_PORT ?? 3000);
  console.log("⚡️ Bolt app is running!");

  if (Config.General.APP_ENV === "local") {
    app.client.chat.postMessage({
      token: process.env.SLACK_BOT_TOKEN,
      text: `<!here> アプリ起動: <@${Config.Slack.Bolt.DEBUG_USER}>`,
      channel: Config.Slack.APPROVAL_CHANNEL_ID,
    });
  }
})();
