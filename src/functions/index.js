'use strict';

const functions = require('firebase-functions');
const config = functions.config();
const addClubStep = require('./workflowStep/addClub.js');
const { App, ExpressReceiver, WorkflowStep } = require('@slack/bolt');

const expressReceiver = new ExpressReceiver({
  //signingSecret: process.env.SLACK_SIGNING_SECRET,
  signingSecret: config.slack.signing_secret,
  token: config.slack.bot_token,
  endpoints: '/events',
  processBeforeResponse: true
});

const app = new App({
  receiver: expressReceiver,
  //token: config.slack.bot_token,
  processBeforeResponse: true
});

app.error(console.log);

// 創部申請用のワークフローから部活動の情報を取得する処理
const addClubStep = new WorkflowStep('add_club', addClubStep);

app.step(addClubStep);
// Slackの処理はここまで

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

exports.slack = functions.https.onRequest(expressReceiver.app);