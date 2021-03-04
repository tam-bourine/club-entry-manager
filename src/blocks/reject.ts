import { sectionForm } from "./generalComponents";
import { Club } from "../config/clubConfig";

export const getRejectBlocks = () => {
  return [
    sectionForm({
      label: Club.label.reject,
      placeholder: Club.placeholder.rejectReason,
      actionId: "reject",
      blockId: "reject_input",
    }),
  ];
};
