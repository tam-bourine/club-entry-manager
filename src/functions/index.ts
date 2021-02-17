import { App } from "@slack/bolt";
import * as dotenv from "dotenv";

import { useNewClubCommand } from "./commands/newClub";

dotenv.config();

const app = new App({
  socketMode: true,
  token: process.env.SLACK_BOT_TOKEN!,
  appToken: process.env.SLACK_APP_TOKEN!,
});

app.error((err) => {
  return new Promise(() => {
    console.error({ err });
  });
});

useNewClubCommand(app, process.env.SLACK_APPROVAL_CHANNEL_ID!);

(async () => {
  await app.start(parseInt(process.env.BOLT_PORT!, 10) ?? 3000);
  console.log("⚡️ Bolt app is running!");
})();
