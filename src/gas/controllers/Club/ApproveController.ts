import ApproveModel from "../../models/Club/ApproveModel";
import ApproveInterface from "../../types/ApproveInterface";

export default class ApproveController {
  private approve = new ApproveModel();

  create(params: ApproveInterface) {
    return this.approve.addClub(params);
  }

  update(params: ApproveInterface) {
    return this.approve.confirmIsApproved(params);
  }
}
