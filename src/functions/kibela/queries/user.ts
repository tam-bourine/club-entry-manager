import gql from "graphql-tag";
import { callAPI } from "../../api/kibela";
import type { User } from "../../../../@types/kibela.d";

// TODO: SlackApp 側で SlackId から Email を取得、はダメそう
// Kibela Id で検索する方向で
export const getKibelaId = () => {};

export const fetchUserByKibelaId = () => {};

export const getAll = async (): Promise<User[]> => {
  const query = gql`
    query {
      group(id: "${process.env.KIBELA_HOME_ID}") {
        users(first: 100) {
          nodes {
            id
            realName
            email
          }
        }
      }
    }
  `;
  const data = await callAPI(query);
  return data.group.users.nodes;
};
