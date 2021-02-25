import ApproveModel from "../../models/Club/ApproveModel";
import ApproveInterface from "../../shared/types/ApproveInterface";

export default class ApproveController {
  private model = new ApproveModel();

  update(params: ApproveInterface) {
    return this.model.approveClub(params);
  }
}
