import ApproveModel from "../../models/Club/ApproveModel";
import ApproveInterface from "../../types/ApproveInterface";

export default class ApproveController {
  private model = new ApproveModel();

  /**
   * Add New Club（CreateClub 3, 4）
   */
  create(params: ApproveInterface) {
    return this.model.addClub(params);
  }

  /**
   * Confirm That Created Club Approved（CreateClub 6）
   */
  update(params: ApproveInterface) {
    return this.model.confirmIsApproved(params);
  }
}
