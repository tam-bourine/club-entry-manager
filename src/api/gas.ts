import fetch from "node-fetch";
import { URL } from "url";
import { CallNewClubArg } from "../types/Messages";
import { Config } from "../constant";

export const callNewClub = async (params: CallNewClubArg): Promise<any> => {
  const fullUrl = new URL(`${Config.Gas.END_POINT}?action=regist`);

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  const responseBody = response.json();
  return responseBody;
};
