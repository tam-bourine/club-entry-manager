import gql from "graphql-tag";
import { callAPI } from "../api";

export const addMemberToGroup = async (groupId: string, userId: string) => {
  const mutation = gql`
    mutation {
      joinGroup(input: {groupId: ${groupId}, userId: ${userId}}) {
        clientMutationId
      }
    }
  `;

  await callAPI(mutation).catch((err) => console.error(err));
};
