import { form } from "../blocks/generalComponent";
import { Club } from "../clubConfig"

export const getApprovalBlocks = () => {
  return [
    form({ 
      label: Club.Label.reject, 
      placeholder: Club.Placeholder.rejectReason, 
      actionId: "reject", 
      blockId: "reject_input" 
    }),
  ]
}