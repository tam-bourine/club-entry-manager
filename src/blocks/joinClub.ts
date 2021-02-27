import { inputMultiSelect } from "./generalComponents";
import { Option } from "../types/Messages";

export const getJoinClubBlocks = (channels: Option[]) => [
  inputMultiSelect({
    text: "部活チャンネル",
    actionId: "join",
    blockId: "join_input",
    options: channels,
    placeholder: "入部したい部活チャンネルを選んでください (複数選択可)",
  }),
];
