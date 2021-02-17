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
     * Approved : 公認セルを TRUE で更新
     * Rejected : 公認セルを FALSE で更新
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
        /**
         * もし club が Sheets 上に存在しなかった場合は result が全て false になる => not found を返す
         */
        if (result?.every((elem) => typeof elem === "boolean")) return this.view.provide(this.res.notFound);
        return this.view.provide(this.res.created);
      }
      return this.view.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }
}
