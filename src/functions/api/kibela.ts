import nodeFetch from "node-fetch";
import { print as printGql } from "graphql/language/printer";
import { ASTNode } from "graphql/language/ast";

export const KibelaAPI = async (query: ASTNode): Promise<any> => {
  const response = await nodeFetch(`https://${process.env.KIBELA_TEAM}.kibe.la/api/v1`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.KIBELA_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent": "KibelaAPITestFromCurl",
    },
    body: JSON.stringify({
      query: printGql(query),
      variables: {},
    }),
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`not ok: ${response.statusText}\n${body}`);
  }

  const result = await response.json();
  return result.data;
};
