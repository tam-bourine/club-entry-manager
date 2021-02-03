import * as functions from "firebase-functions";
import { App, ExpressReceiver } from "@slack/bolt";

import { useNewClubCommand } from "./commands/newClub";

const config = functions.config();

const expressReceiver = new ExpressReceiver({
  signingSecret: config.slack.signing_secret,
  endpoints: "/events",
  processBeforeResponse: true,
});

const app = new App({
  receiver: expressReceiver,
  token: config.slack.bot_token,
});

app.error((err) => {
  return new Promise(() => {
    console.error({ err });
  });
});

useNewClubCommand(app);

(async () => {
  await app.start(config.slack.port_number || 3000);
  console.log("⚡️ Bolt app is running!");
})();

exports.slack = functions.https.onRequest(expressReceiver.app);
