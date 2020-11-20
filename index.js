// {}:分割代入
const { App, WorkflowStep } = require('@slack/bolt');

// いつも通り Bolt アプリを初期化
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
    // ブロックキットを使用しステップ設定モーダルのUIを構築
    const blocks = [
      {
			"type": "input",
			"block_id": "task_name_input",
			"element": {
				"type": "plain_text_input",
				"action_id": "name",
				"placeholder": {
					"type": "plain_text",
					"text": "Add a task name"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "部活動名"
			}
		},
		{
			"type": "input",
			"block_id": "task_description_input",
			"element": {
				"type": "plain_text_input",
				"action_id": "description",
				"placeholder": {
					"type": "plain_text",
					"text": "Add a task name"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "活動内容"
			}
		},
		{
			"type": "input",
			"block_id": "task_minister_input",
			"element": {
				"type": "plain_text_input",
				"action_id": "minister",
				"placeholder": {
					"type": "plain_text",
					"text": "Add a task name"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "部長名"
			}
		},
		{
			"type": "input",
			"block_id": "task_founder1_input",
			"element": {
				"type": "plain_text_input",
				"action_id": "founder1",
				"placeholder": {
					"type": "plain_text",
					"text": "Add a task name"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "設立発起人1"
			}
		},
		{
			"type": "input",
			"block_id": "task_founder2_input",
			"element": {
				"type": "plain_text_input",
				"action_id": "founder2",
				"placeholder": {
					"type": "plain_text",
					"text": "Add a task name"
				}
			},
			"label": {
				"type": "plain_text",
				"text": "設立発起人2"
			}
		},
    ];
    await configure({ blocks });// blocksを元にステップ設定モーダルをオープンする
  },
  // save：モーダルから値が送信されると実行される
  save: async ({ ack, step, view, update }) => {
    await ack();

    const { values } = view.state;
    const name = values.task_name_input.name;
    const description = values.task_description_input.description;
    const minister = values.task_minister_input.minister;
    const founder1 = values.task_founder1_input.founder1;
    const founder2 = values.task_founder2_input.founder2;
                
    const inputs = {// ステップ実行時にアプリが受け取ることを期待するデータの内容を表現するオブジェクト
      name: { value: name.value },
      description: { value: description.value },
      minister: { value: minister.value },
      founder1: { value: founder1.value },
      founder2: { value: founder2.value }
    };

    const outputs = [// ステップ実行が正常に完了した際に次のステップに提供するデータの保存(????)
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
      minister: inputs.minister.value,
      founder1: inputs.founder1.value,
      founder2: inputs.founder2.value,
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

