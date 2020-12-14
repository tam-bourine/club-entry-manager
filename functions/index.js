"use strict";
const functions = require("firebase-functions");
const config = functions.config();

const { App, ExpressReceiver } = require("@slack/bolt");
const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  endpoints: "/events",
  processBeforeResponse: true,
});
const app = new App({
  receiver: expressReceiver,
  token: config.slack.bot_token,
  processBeforeResponse: true,
});
app.error(console.log);

// Slackの処理はここから書き始める
app.message("hello", async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
});
// Slackの処理はここまで

exports.slack = functions.https.onRequest(expressReceiver.app);
