import ApproveModel from "../../models/Club/ApproveModel";
import ApproveInterface from "../../types/ApproveInterface";

export default class ApproveController {
  private model = new ApproveModel();

  /**
   *  Update That Created Club Approved（CreateClub 6）
   */
  update(params: ApproveInterface) {
    return this.model.updateClub(params);
  }
}
