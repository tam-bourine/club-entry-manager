'use strict';
const functions = require('firebase-functions');
const config = functions.config();
const blocks = require('./blocks/inputClub.js');
const { App, ExpressReceiver, WorkflowStep } = require('@slack/bolt');

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  endpoints: '/events',
  processBeforeResponse: true
});

const app = new App({
  receiver: expressReceiver,
  token: config.slack.bot_token,
  processBeforeResponse: true
});

app.error(console.log);

// Slackの処理はここから書き始める
const workflowStep = new WorkflowStep('add_club', {
  // edit：ステップをワークフローに追加する際に実行
  edit: async ({ ack, step, configure }) => {
    console.log({ step })
    try {
      await ack();
      console.log('ワークフローステップと正常に通信できました');
    } catch(err) {
      console.error({ err });
    }

    try {
      await configure({ blocks });
      console.log('ワークフローステップ用のモーダルを表示できました');
    } catch(err) {
      console.error({ err });
    }
  },

  // save：ワークフローステップモーダルから値が送信されると実行される
  save: async ({ ack, step, view, update }) => {
    try {
      await ack();
      console.log('ワークフローステップからデータを送信する際に正常に通信できました');
    } catch(err) {
      console.error({ err });
    }

    const { values } = view.state;
    const name = values.task_name_input.name;
    const description = values.task_description_input.description;
    const captain = values.task_captain_input.captain;
    const member_1st = values.task_member_1st_input.member_1st;
    const member_2nd = values.task_member_2nd_input.member_2nd;

    // 創部をする際にワークフローから送られてくるデータの内容を表現するオブジェクト
    const inputs = {
      name: { value: name.value },
      description: { value: description.value },
      captain: { value: captain.value },
      member_1st: { value: member_1st.value },
      member_2nd: { value: member_2nd.value }
    };

    try {
      await update({ inputs });
      console.log('ワークフローステップが正常に保存されました');
    } catch(err) {
      console.error({ err });
    }
  },

  // イベント受信した内容を元に色々な処理を記述(ワークフローから値が送信されたら実行される処理)
  execute: async ({ step, complete, fail }) => {
    // ワークフローから送られてきた部活動に関する情報
    const { inputs } = step;
    
    try {
      await complete({ inputs });
      console.log({ inputs });
    } catch(err) {
      // ワークフローのアクティビティにエラーメッセージが表示される
      await fail({ error: { message: err } });
    }
  },
});

app.step(workflowStep);
// Slackの処理はここまで

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

exports.slack = functions.https.onRequest(expressReceiver.app);