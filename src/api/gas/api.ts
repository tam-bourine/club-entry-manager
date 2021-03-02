import fetch from "node-fetch";
import { URL } from "url";
import { CallNewClubArg, CallApproveClubArgs } from "../../types/Messages";
import { Config } from "../../constant";
import ResponseInterface from "../../gas/shared/types/ResponseInterface";

const callAPIPost = async (params: any, action: "regist" | "approve" | "join") => {
  const response = await fetch(new URL(`${Config.Gas.END_POINT}?action=${action}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return response.json();
};
const callAPIGet = async (action: "get") => {
  const response = await fetch(new URL(`${Config.Gas.END_POINT}?action=${action}`), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const callNewClub = async (params: CallNewClubArg): Promise<ResponseInterface> => callAPIPost(params, "regist");

export const callApproveClub = async ({
  club: { channelId: slackChannelId },
  authorizer,
}: CallApproveClubArgs): Promise<ResponseInterface> =>
  callAPIPost(
    {
      slackChannelId,
      authorizer,
      isApproved: true,
    },
    "approve"
  );

export const callNewJoinClub = async (): Promise<ResponseInterface> => callAPIGet("get");
