import { App } from "@slack/bolt";
import { useNewClubCommand } from "./commands/newClub";
import { Config } from "./constant";

const app = new App({
  socketMode: true,
  token: Config.Slack.Bot.TOKEN,
  appToken: Config.Slack.App.TOKEN,
});

app.error((err) => {
  return new Promise(() => {
    console.error({ err });
  });
});

useNewClubCommand(app, Config.Slack.APPROVAL_CHANNEL_ID);

(async () => {
  await app.start(Config.Bolt.PORT ?? 3000);
  console.log("⚡️ Bolt app is running!");
})();
