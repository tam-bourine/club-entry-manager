import axios from 'axios'
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

export interface ClubData {
  name: string,
  description: string,
  captain: string,
  member_1st: string,
  member_2nd: string,
}

// 今回はテストなので送られたダミーデータは「db.json」に格納される
async function postNewClub({ name, description, captain, member_1st, member_2nd }: ClubData) {
  try {
    const res = await axios.post(url, {
      "club_name": name,
      "club_description": description,
      "captain": captain,
      "collaborator1": member_1st,
      "collaborator2": member_2nd
    });
    console.log(res.data);
  } catch(err) {
    console.error({err});
  }
}

postNewClub(newClubData);


