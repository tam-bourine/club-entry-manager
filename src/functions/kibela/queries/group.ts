import gql from "graphql-tag";
import type { Group } from "../../../../@types/kibela.d";
import { KibelaAPI } from "../../api/kibela";

export const getGroup = async (): Promise<Group> => {
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
  return KibelaAPI(query);
};
