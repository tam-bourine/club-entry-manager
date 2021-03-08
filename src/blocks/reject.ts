import { sectionForm } from "./generalComponents";
import { Club } from "../config/clubConfig";

export const getRejectBlocks = () => {
  return [
    sectionForm({
      label: Club.label.REJECT,
      placeholder: Club.placeholder.REJECT_REASON,
      actionId: "reject",
      blockId: "reject_input",
    }),
  ];
};
