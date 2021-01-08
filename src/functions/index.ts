const functions = require("firebase-functions");

const config = functions.config();
const { App, ExpressReceiver, WorkflowStep } = require("@slack/bolt");
import { addClubStep } from "./workflowStep/addClub";

const expressReceiver = new ExpressReceiver({
  signingSecret: config.slack.signing_secret,
  token: config.slack.bot_token,
  endpoints: "/events",
  processBeforeResponse: true,
});

const app = new App({
  receiver: expressReceiver,
  token: config.slack.bot_token,
  processBeforeResponse: true,
});

app.error(console.log);

// 創部申請用のワークフローから部活動の情報を取得する処理
const workFlowAddClub = new WorkflowStep("add_club", addClubStep);

app.step(workFlowAddClub);

(async () => {
  await app.start(config.slack.port_number || 3000);
  console.log("⚡️ Bolt app is running!");
})();

exports.slack = functions.https.onRequest(expressReceiver.app);
