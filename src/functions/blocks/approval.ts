import { sectionPlainText } from "./generalComponents";

export const getApprovalBlocks = (channelId: string, text: string) => {
  return [sectionPlainText({ title: "チャンネルID", text: channelId }), sectionPlainText({ text })];
};
