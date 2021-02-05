import ApproveInterface from "../../types/ApproveInterface";
import ApproveView from "../../views/Club/ApproveView";

export default class ApproveModel {
  private approve = new ApproveView();

  addClub(params: ApproveInterface) {
    // FIXME
    // @ts-ignore
    return this.approve.provide(params);
  }

  confirmIsApproved(params: ApproveInterface) {
    // FIXME
    // @ts-ignore
    return this.approve.provide(params);
  }
}
