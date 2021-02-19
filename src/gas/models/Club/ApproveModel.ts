import Constants from "../../shared/Constants";
import Response from "../../shared/Response";
import ApproveInterface from "../../shared/types/ApproveInterface";
import ApproveView from "../../views/Club/ApproveView";

export default class ApproveModel {
  private res = new Response();

  private view = new ApproveView();

  private constants = new Constants();

  updateClub(params: ApproveInterface) {
    /**
     * Approved : 公認セルを更新
     * Rejected : RegistModel.addClub で追加したクラブの Row を削除
     */
    const { clubId, isApproved } = params;

    if (isApproved) {
      return this.updateApprovedClub(clubId);
    }
    return this.deleteRejectedClub(clubId);
  }

  private updateApprovedClub(clubId: ApproveInterface["clubId"]) {
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      if (sheetTabName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
        const data = sheet?.getDataRange().getValues();
        const isApproved = true;
        data?.map((value, index) => {
          /**
           * value[0] : id
           */
          /**
           * 列7 : 公認
           */
          return (
            value[0] === clubId &&
            sheet?.getRange(index, this.constants.SPREAD_SHEET.APPROVED_COLUMN_NUMBER).setValue(isApproved)
          );
        });
        return this.view.provide(this.res.created);
      }
      return this.view.provide(this.res.internalServer);
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
          return value[0] === clubId && sheet?.deleteRow(index);
        });
        return this.view.provide(this.res.created);
      }
      return this.view.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }
}
