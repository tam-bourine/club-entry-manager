import fetch from "node-fetch";
import { URL } from "url";
import { CallNewClubArg, CallApproveClubArgs } from "../../types/Messages";
import { Config } from "../../constant";
import ResponseInterface from "../../gas/shared/types/ResponseInterface";

const callAPI = async (params: any, action: string) => {
  const response = await fetch(new URL(`${Config.Gas.END_POINT}?action=${action}`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  return response.json();
};

export const callNewClub = async (params: CallNewClubArg): Promise<ResponseInterface> => callAPI(params, "regist");

export const callApproveClub = async ({
  club: { channelId: slackChannelId },
  authorizer,
}: CallApproveClubArgs): Promise<ResponseInterface> =>
  callAPI(
    {
      slackChannelId,
      authorizer,
      isApproved: true,
    },
    "approve"
  );

export const callNewJoinClub = async (): Promise<ResponseInterface> => callAPI(null, "get");
