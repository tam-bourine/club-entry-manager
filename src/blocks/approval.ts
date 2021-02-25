import { sectionPlainText } from "./generalComponents";

export const getApprovalBlocks = (text: string) => {
  return [sectionPlainText({ text })];
};
