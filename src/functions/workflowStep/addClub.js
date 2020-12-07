'use strict';
const inputClubBlock = require('../blocks/inputClub.js');

// ステップをワークフローに追加する際に実行
const editStep = async ({ ack, step, configure }) => {
  console.log({ step })
  
  try {
    await ack();
    console.log('ワークフローステップと正常に通信できました');
  } catch(err) {
    console.error({ err });
  }

  try {
    await configure({ inputClubBlock });
    console.log('ワークフローステップ用のモーダルを表示できました');
  } catch(err) {
    console.error({ err });
  }
}

// ワークフローステップモーダルから値が送信されると実行される
const saveStep = async ({ ack, view, update }) => {
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
}

// イベント受信した内容を元に色々な処理を記述(ワークフローから値が送信されたら実行される処理)
const excuteStep = async ({ step, complete, fail }) => {
  // ワークフローから送られてきた部活動に関する情報
  const { inputs } = step;

  try {
    await complete({ inputs });
    console.log({ inputs });
  } catch(err) {
    // ワークフローのアクティビティにエラーメッセージが表示される
    await fail({ error: { message: err } });
  }
}

const addClubStep = {
  edit: editStep,
  save: saveStep,
  execute: excuteStep
}

module.exports = addClubStep;