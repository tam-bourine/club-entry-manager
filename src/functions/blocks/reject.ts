import { form } from "./generalComponent";
import { Club } from "../config/clubConfig"

export const getRejectBlocks = () => {
  return [
    form({ 
      label: Club.Label.reject, 
      placeholder: Club.Placeholder.rejectReason, 
      actionId: "reject", 
      blockId: "reject_input" 
    }),
  ]
}