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

    return this.updateApprovedClub(clubId);
  }

  private updateApprovedClub(clubId: ApproveInterface["clubId"]) {
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      if (sheetTabName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
        const data = sheet?.getDataRange().getValues();
        // WIP: 動いとらん
        const existsClubInRow = data?.map((rowData, rowIndex) => {
          return rowData.includes(clubId) && rowIndex;
        });
        const result = existsClubInRow?.map((exists) => {
          /**
           * exists : Row に club が存在する場合その Row の index, 存在しない場合は false
           *          Sheets の Row は 1 開始なので exists + 1 で合わせる
           */
          return (
            exists &&
            sheet?.getRange(exists + 1, this.constants.SPREAD_SHEET.APPROVED_COLUMN_NUMBER).setValue(this.isApproved)
          );
        });
      }
      return this.view.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }
}
