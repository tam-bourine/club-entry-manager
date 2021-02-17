import { App } from "@slack/bolt";
import { useNewClubCommand } from "./commands/newClub";
import { Bolt, Slack } from "./constant";

const app = new App({
  socketMode: true,
  token: Slack.Bot.TOKEN,
  appToken: Slack.App.TOKEN,
});

app.error((err) => {
  return new Promise(() => {
    console.error({ err });
  });
});

useNewClubCommand(app, Slack.APPROVAL_CHANNEL_ID);

(async () => {
  await app.start(Bolt.PORT ?? 3000);
  console.log("⚡️ Bolt app is running!");
})();
