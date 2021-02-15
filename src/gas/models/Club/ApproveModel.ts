import Constants from "../../shared/Constants";
import Response from "../../shared/Response";
import ApproveInterface from "../../shared/types/ApproveInterface";
import ApproveView from "../../views/Club/ApproveView";

export default class ApproveModel {
  private res = new Response();

  private view = new ApproveView();

  private constants = new Constants();

  private isApproved = false;

  updateClub(params: ApproveInterface) {
    /**
     * Approved : 公認セルを更新
     * Rejected : RegistModel.addClub で追加したクラブの Row を削除
     */
    const { clubId, isApproved } = params;

    // return this.view.provide({ status: 2000000000, message: `${clubId} was isApproved: ${isApproved}` });

    this.isApproved = isApproved;

    if (this.isApproved) {
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
        // WIP: 動いとらん
        const foo = data?.reduce((acc, cur, index) => {
          return [{ targetColumnNumber: cur.findIndex((elem) => elem === clubId), targetRowNumber: index }];
        });
        return this.view.provide({ status: 8274081, message: `${foo![0].targetColumnNumber}` });
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
