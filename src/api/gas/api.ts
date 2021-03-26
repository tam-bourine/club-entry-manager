import fetch from "node-fetch";
import { URL } from "url";
import { CallNewClubArg, CallApproveClubArgs, CallJoinClubArgs, CallApiPostArgs } from "../../types/Messages";
import { Config } from "../../constant";
import ResponseInterface from "../../gas/shared/types/ResponseInterface";

const callAPIPost = async (
  params: CallApiPostArgs,
  action: "regist" | "approve" | "join"
): Promise<ResponseInterface> => {
  const response = await fetch(new URL(`${Config.Gas.END_POINT}?action=${action}`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  return response.json();
};

const callAPIGet = async (action: "get"): Promise<ResponseInterface> => {
  const response = await fetch(new URL(`${Config.Gas.END_POINT}?action=${action}`), {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const callNewClub = async (params: CallNewClubArg) => callAPIPost(params, "regist");

export const callApproveClub = async (params: CallApproveClubArgs) => {
  const response = await callAPIPost(params, "approve");
  return response;
};

export const callNewJoinClub = async () => {
  const response = await callAPIGet("get");
  return response;
};

export const callJoinClub = async (params: CallJoinClubArgs) => {
  const response = await callAPIPost(params, "join");
  return response;
};
