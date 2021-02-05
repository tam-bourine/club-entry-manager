import ApproveModel from "../../models/Club/ApproveModel";
import ApproveInterface from "../../types/ApproveInterface";

export default class ApproveController {
  private approve = new ApproveModel();

  /**
   * Add New Club（CreateClub 3, 4）
   */
  create(params: ApproveInterface) {
    return this.approve.addClub(params);
  }

  /**
   * Confirm That Created Club Approved（CreateClub 6）
   */
  update(params: ApproveInterface) {
    return this.approve.confirmIsApproved(params);
  }
}
