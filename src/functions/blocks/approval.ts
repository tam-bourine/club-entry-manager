import { label, plainText } from "./generalComponent";

export const getApprovalBlocks = (text: string) => {
  return [
    plainText({ text })
  ]
}