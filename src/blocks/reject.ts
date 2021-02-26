import { sectionForm } from "./generalComponents";
import { Club } from "../config/clubConfig";

export const getRejectBlocks = () => {
  return [
    sectionForm({
      label: Club.Label.reject,
      placeholder: Club.Placeholder.rejectReason,
      actionId: "reject",
      blockId: "reject_input",
    }),
  ];
};
