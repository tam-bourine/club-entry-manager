import nodeFetch from "node-fetch";
import { print as printGql } from "graphql/language/printer";
import { ASTNode } from "graphql/language/ast";
import { Config } from "../../constant";
import type { Mutation, Query } from "../../../@types/kibela.d";

export const callAPI = async (
  query: ASTNode
): Promise<{
  noteFromPath: Query["noteFromPath"];
  updateNoteFolder: Mutation["updateNoteFolder"];
  group: Query["group"];
}> => {
  const response = await nodeFetch(`${Config.Kibela.END_POINT}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${Config.Kibela.TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "club-manager/1.0.0",
    },
    body: JSON.stringify({ query: printGql(query) }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`not ok: ${response.statusText}\n${body}`);
  }

  const result = await response.json();
  return result.data;
};
