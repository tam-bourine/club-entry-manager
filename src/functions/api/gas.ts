import fetch from "node-fetch";
import { URL } from "url";
import { CallNewClubArg } from "../types/Messages";
import { Config } from "../../constant"

export const callNewClub = async (params: CallNewClubArg): Promise<any> => {
  const GAS_ENDPOINT = Config.Gas.GAS_ENDPOINT as string;
  const fullUrl = new URL(`${GAS_ENDPOINT}?action=regist`);

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })

  if(!response.ok) {
    throw new Error("Faild GAS POST: ");
  }

  const responseBody = response.json();
  return responseBody;
};
