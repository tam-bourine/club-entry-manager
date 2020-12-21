'use strict';
const axios = require('axios');
// json-serverにPOSTする際のURL
const url = 'http://localhost:3000/club';
// Slackのワークフローから送られてくる創部申請データのダミー
const newClubData = {
  name: 'バスケ部',
  description: 'バスケします。',
  captain: 'huga',
  member_1st: 'hoge',
  member_2nd: 'kaka'
}

// 今回はテストなので送られたダミーデータは「db.json」に格納される
async function postNewClub(clubData) {
  try {
    const res = await axios.post(url, {
      "club_name": clubData.name,
      "club_description": clubData.description,
      "captain": clubData.captain,
      "collaborator1": clubData.member_1st,
      "collaborator2": clubData.member_2nd
    });
    console.log(res.data);
  } catch(err) {
    console.error({err});
  }
}

postNewClub(newClubData);


