import { inputStaticSelect, sectionPlainText } from "./generalComponents";
import { Option } from "../types/Messages";

export const getApprovalBlocks = (channel: Option) => [
  inputStaticSelect({
    label: "部活チャンネル",
    actionId: "approval",
    blockId: "approval_input",
    options: [channel],
    initialOption: channel,
  }),
  sectionPlainText({ text: "承認します。よろしいですか？" }),
];
