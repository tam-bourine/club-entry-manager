import ApproveInterface from "../../shared/types/ApproveInterface";
import ApproveView from "../../views/Club/ApproveView";

export default class ApproveModel {
  private view = new ApproveView();

  updateClub(params: ApproveInterface) {
    /**
     * Approved : 公認セルを更新
     * Rejected : RegistModel.addClub で追加したクラブの Row を削除
     */

    // FIXME
    if (params.isApproved) {
      this.updateApprovedClub();
    } else {
      this.deleteRejectedClub();
    }

    // @ts-ignore
    return this.view.provide(params);
  }

  private updateApprovedClub() {}

  private deleteRejectedClub() {}
}
