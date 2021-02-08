import Response from "../../shared/Response";
import ApproveInterface from "../../shared/types/ApproveInterface";
import ApproveView from "../../views/Club/ApproveView";

export default class ApproveModel {
  private res = new Response();

  private view = new ApproveView();

  updateClub(params: ApproveInterface) {
    /**
     * Approved : 公認セルを更新
     * Rejected : RegistModel.addClub で追加したクラブの Row を削除
     */
    const { clubId, is_approved } = params;

    if (is_approved) {
      return this.updateApprovedClub(clubId);
    } else {
      return this.deleteRejectedClub(clubId);
    }
  }

  private updateApprovedClub(clubId: ApproveInterface["clubId"]) {
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      const approvedColumnNumber = 7;
      if (sheetTabName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
        const data = sheet?.getDataRange().getValues();
        const isApproved = true;
        data?.map((value, index) => {
          /**
           * value[0] : id
           */
          if (value[0] === clubId) {
            /**
             * 列7 : 公認
             */
            sheet?.getRange(index, approvedColumnNumber).setValue(isApproved);
          }
        });
        return this.view.provide(this.res.created);
      } else return this.view.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }

  private deleteRejectedClub(clubId: ApproveInterface["clubId"]) {
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      if (sheetTabName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
        const data = sheet?.getDataRange().getValues();
        data?.map((value, index) => {
          /**
           * value[0] : id
           */
          if (value[0] === clubId) {
            sheet?.deleteRow(index);
          }
        });
        return this.view.provide(this.res.created);
      } else return this.view.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }
}
