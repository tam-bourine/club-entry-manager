import gql from "graphql-tag";
import { callAPI } from "../api";
import type { User } from "../../../../@types/kibela.d";
import { Config } from "../../../constant";

// TODO: SlackApp 側で SlackId から Email を取得、はダメそう
// Kibela Id で検索する方向で
export const getKibelaId = () => {};

export const fetchUserByKibelaId = () => {};

export const getAll = async (): Promise<User[]> => {
  const query = gql`
    query {
      group(id: "${Config.Kibela.HOME_GROUP_ID}") {
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
  const data = await callAPI(query).catch((err) => {
    console.error(err);
  });
  return data.group.users.nodes;
};

export const findByEmail = (email: string, users: User[]): User => {
  const hitUser = users.find((u) => u.email === email);
  if (!hitUser) {
    throw new Error(`not ok: not found user by this email (${email})`);
  }
  return hitUser;
};
