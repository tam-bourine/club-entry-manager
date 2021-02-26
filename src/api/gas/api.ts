import fetch from "node-fetch";
import { URL } from "url";
import { CallNewClubArg } from "../../types/Messages";
import { Config } from "../../constant";
import ResponseInterface from "../../gas/shared/types/ResponseInterface";

export const callNewClub = async (params: CallNewClubArg): Promise<ResponseInterface> => {
  const fullUrl = new URL(`${Config.Gas.END_POINT}?action=regist`);

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  return response.json();
};
