const { App, WorkflowStep } = require('@slack/bolt');
const blocks = require('./blocks/inputClub.js');
require('dotenv').config();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
});

const workflowStep = new WorkflowStep('new_data', {
  // edit：ステップをワークフローに追加する際に実行
  edit: async ({ ack, step, configure }) => {
    await ack();
    await configure({ blocks });
  },

  // save：ワークフローステップモーダルから値が送信されると実行される
  save: async ({ ack, step, view, update }) => {
    await ack();

    const { values } = view.state;
    const name = values.task_name_input.name;
    const description = values.task_description_input.description;
    const captain = values.task_captain_input.captain;
    const member1 = values.task_member1_input.member1;
    const member2 = values.task_member2_input.member2;

    // ステップ実行時にアプリが受け取ることを期待するデータの内容を表現するオブジェクト
    const inputs = {
      name: { value: name.value },
      description: { value: description.value },
      captain: { value: captain.value },
      member1: { value: member1.value },
      member2: { value: member2.value }
    };

    // ステップ実行が正常に完了した際に次のステップに提供するデータの保存
    const outputs = [
      {
        type: 'text',
        name: 'taskName',
        label: 'Task name',
      },
      {
        type: 'text',
        name: 'taskDescription',
        label: 'Task description',
      }
    ];
    await update({ inputs, outputs });
  },

  // イベント受信した内容を元に色々な処理を記述(ワークフローから値が送信されたら実行される処理)
  execute: async ({ step, complete, fail }) => {
    const { inputs } = step;
    console.log({ inputs });
    const outputs = {
      name: inputs.name.value,
      description: inputs.description.value,
      captain: inputs.captain.value,
      member1: inputs.member1.value,
      member2: inputs.member2.value
    };
    await complete({ outputs });
  },
});

app.step(workflowStep);

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

