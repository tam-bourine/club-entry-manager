import fetch from "node-fetch";
import { URL } from "url";
import { CallNewClubArg, CallApproveClubArgs, CallJoinClubArgs, CallApiPostArgs } from "../../types/Messages";
import { Config } from "../../constant";
import ResponseInterface from "../../gas/shared/types/ResponseInterface";

const callAPIPost = async (params: CallApiPostArgs, action: "regist" | "approve" | "join"): Promise<ResponseInterface> => {
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

export const callNewClub = async (params: CallNewClubArg) => callAPIPost(params, "regist");

export const callApproveClub = async (params: CallApproveClubArgs) => {
  const data = await callAPIPost(
    params,
    "approve"
  );
  return data;
}

export const callNewJoinClub = async () => callAPIGet("get");

export const callJoinClub = async ({
  club: { channelId: slackChannelId },
  member,
}: CallJoinClubArgs) =>
  callAPIPost(
    {
      slackChannelId,
      member,
    },
    "join"
  );
