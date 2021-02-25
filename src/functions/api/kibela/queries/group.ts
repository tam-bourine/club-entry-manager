import gql from "graphql-tag";
import { callAPI } from "../api";
import type { Group } from "../../../../../@types/kibela.d";
import { Config } from "../../../../constant";

export const getByNoteUrl = async (url: string): Promise<Group> => {
  const query = gql`
    query {
      noteFromPath(path: "${url}") {
        id
        groups {
          id
          name
        }
      }
    }
  `;

  const data = await callAPI(query);

  // 部活紹介記事は"Home"と"部活グループ"に含まれている => "部活グループ"のみを取得
  return data.noteFromPath.groups.filter((group: Group) => group.id !== Config.Kibela.HOME_GROUP_ID)[0];
};
