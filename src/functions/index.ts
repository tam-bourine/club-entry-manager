import { App } from "@slack/bolt";
import * as dotenv from "dotenv";

import { useNewClubCommand } from "./commands/newClub";

dotenv.config();

const app = new App({
  token: process.env.SLACK_BOT_TOKEN!,
  appToken: process.env.SLACK_APP_TOKEN!,
  processBeforeResponse: true,
});

app.error((err) => {
  return new Promise(() => {
    console.error({ err });
  });
});

useNewClubCommand(app, process.env.SLACK_APPROVAL_CHANNEL_ID!);

(async () => {
  await app.start(Number(process.env.BOLT_PORT) || 3000);
  console.log("⚡️ Bolt app is running!");
})();
