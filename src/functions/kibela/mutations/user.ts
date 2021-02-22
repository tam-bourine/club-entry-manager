import gql from "graphql-tag";
import { callAPI } from "../../api/kibela";

export const joinGroup = async (userId: string, groupId: string) => {
  const mutation = gql`
    mutation {
      joinGroup(input: {userId: "${userId}", groupId: "${groupId}"}) {
        clientMutationId
      }
    }
  `;

  await callAPI(mutation).catch((err) => {
    throw err;
  });
};
