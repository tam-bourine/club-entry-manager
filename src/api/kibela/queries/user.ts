import gql from "graphql-tag";
import type { Maybe } from "graphql/jsutils/Maybe.d";
import { callAPI } from "../api";
import type { User } from "../../../../@types/kibela.d";
import { Config } from "../../../constant";

export const getAll = async (): Promise<Maybe<Array<Maybe<User>>>> => {
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
  const data = await callAPI(query);
  if (data == null) {
    throw new Error("Cannot get users nodes");
  }
  return data.group.users.nodes;
};

export const findByEmail = (email: string, users: Maybe<Array<Maybe<User>>>): User => {
  const hitUser = users?.find((u) => u?.email === email);
  if (!hitUser) {
    throw new Error(`not ok: not found user by this email (${email})`);
  }
  return hitUser;
};
