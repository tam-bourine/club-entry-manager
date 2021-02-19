import Constants from "../../shared/Constants";
import Response from "../../shared/Response";
import ApproveInterface from "../../shared/types/ApproveInterface";
import ApproveView from "../../views/Club/ApproveView";

interface UpdateApprovedClubParams {
  clubId: ApproveInterface["clubId"];
  isApproved: ApproveInterface["isApproved"];
}

export default class ApproveModel {
  private res = new Response();

  private view = new ApproveView();

  private constants = new Constants();

  updateClub(params: ApproveInterface) {
    /**
     * Approved : 公認セルを TRUE で更新
     * Rejected : 公認セルを FALSE で更新
     */
    const { clubId, isApproved } = params;

    // return this.view.provide({ status: 2000000000, message: `${clubId} was isApproved: ${isApproved}` });

    return this.updateApprovedClub({ clubId, isApproved });
  }

  private updateApprovedClub(params: UpdateApprovedClubParams) {
    const { clubId, isApproved } = params;
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      if (sheetTabName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
        const data = sheet?.getDataRange().getValues();
        /**
         * @description
         *  &&
         *    @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Logical_AND
         *
         *  `rowData.includes && rowIndex` によって、 clubId が行に含まれている場合
         *  && の右の rowIndex(クラブが含まれる行の index)が return される
         *  clubId が行に含まれていない場合は false が return される
         *
         *  existsClubInRow
         *    [false, 4, false, false, ... ,false] のようなデータになる
         *
         */
        const existsClubInRow = data?.map((rowData, rowIndex) => {
          return rowData.includes(clubId) && rowIndex;
        });
        /**
         * @description
         *  existsClubInRow の各要素 exists が false 以外(clubId と id が一致するクラブが存在する)の場合
         *  sheet?.getRange(exists + 1, this.constants.SPREAD_SHEET.APPROVED_COLUMN_NUMBER).setValue(isApproved)
         *  が実行される
         *
         *  result
         *    [false, Range, false, false, ..., false] のようなデータになる
         *
         */
        const results = existsClubInRow?.map((exists) => {
          return (
            exists &&
            sheet?.getRange(exists + 1, this.constants.SPREAD_SHEET.APPROVED_COLUMN_NUMBER).setValue(isApproved)
          );
        });
        /**
         * @description
         *  Array.prototype.every
         *    @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/every
         *
         *  results に false が含まれない(シートの更新が正常に終了した)場合
         *  201 created を返す
         *
         */
        if (results?.every((result) => typeof result === "boolean")) return this.view.provide(this.res.notFound);
        return this.view.provide(this.res.created);
      }
      return this.view.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }
}
