const { App, WorkflowStep } = require('@slack/bolt');
const blocks = require('./block.js');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

app.message('hello', async ({ message, say }) => {
  await say(`Hey there <@${message.user}>!`);
});

// WorkflowStep インスタンスを生成
const ws = new WorkflowStep('new_data', {
  // edit：ステップをワークフローに追加する際に実行
  edit: async ({ ack, step, configure }) => {
    await ack();// Slack からイベントを受信したことを確認するのにack関数は必須で呼び出す
    await configure({ blocks });// blocksを元にステップ設定モーダルをオープンする
  },

  // save：モーダルから値が送信されると実行される
  save: async ({ ack, step, view, update }) => {
    await ack();

    const { values } = view.state;
    const name = values.task_name_input.name;
    const description = values.task_description_input.description;
    const captain = values.task_captain_input.captain;
    const member = values.task_member_input.member;

    const inputs = {// ステップ実行時にアプリが受け取ることを期待するデータの内容を表現するオブジェクト
      name: { value: name.value },
      description: { value: description.value },
      captain: { value: captain.value },
      member: { value: member.value }
    };

    const outputs = [// ステップ実行が正常に完了した際に次のステップに提供するデータの保存
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
    await update({ inputs, outputs });// update:ステップの設定を保存

  },

  // イベント受信した内容を元に色々な処理を記述(ワークフローから値が送信されたら実行される処理)
  execute: async ({ step, complete, fail }) => {
    console.log('---------- execute -----------');
    const { inputs } = step;
    console.log(inputs);
    const outputs = {
      name: inputs.name.value,
      description: inputs.description.value,
      captain: inputs.captain.value,
      member: inputs.member.value
    };
    // もし全て OK なら
    await complete({ outputs });
  },
});

app.step(ws);


// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();

