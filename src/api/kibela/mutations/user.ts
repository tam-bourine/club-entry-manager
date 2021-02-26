import gql from "graphql-tag";
import { callAPI } from "../api";

export const joinGroup = async (userId: string, groupId: string) => {
  const mutation = gql`
    mutation {
      joinGroup(input: {userId: "${userId}", groupId: "${groupId}"}) {
        clientMutationId
      }
    }
  `;

  await callAPI(mutation).catch((err) => {
    console.error(err);
  });
};
