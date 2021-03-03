import { inputStaticSelect } from "./generalComponents";
import { Option } from "../types/Messages";
import { Club } from "../config/clubConfig"

export const getJoinClubBlocks = (channels: Option[]) => [
  inputStaticSelect({
    label: Club.Label.clubChannel,
    actionId: "join",
    blockId: "join_input",
    options: channels,
    placeholder: Club.Placeholder.selectJoinClub,
  }),
];
