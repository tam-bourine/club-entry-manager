import Constants from "../../shared/Constants";
import Response from "../../shared/Response";
import ApproveInterface from "../../shared/types/ApproveInterface";
import ApproveView from "../../views/Club/ApproveView";

interface UpdateIsApprovedParams {
  slackChannelId: ApproveInterface["slackChannelId"];
  isApproved: ApproveInterface["isApproved"];
}

interface CreateClubSheetParams {
  slackChannelId: ApproveInterface["slackChannelId"];
}

export default class ApproveModel {
  private res = new Response();

  private view = new ApproveView();

  private constants = new Constants();

  approveClub(params: ApproveInterface) {
    /**
     * @description
     *  Bolt 側からは基本的に TRUE で送信されて来るが
     *  UI の変更などで FALSE で送信が追加された場合も想定する
     *
     *  Approved : 公認セルを TRUE で更新
     *  Rejected : 公認セルを FALSE で更新
     */
    const { slackChannelId, isApproved } = params;

    const response = this.updateIsApproved({ slackChannelId, isApproved });

    /**
     * @description
     *  updateApprovedclub が成功し、かつ公認が TRUE の場合は createClubSheet をコールしてシート作成
     */
    if (response === this.res.created && isApproved) return this.view.provide(this.createClubSheet(params));
    return this.view.provide(response);
  }

  private updateIsApproved(params: UpdateIsApprovedParams) {
    const { slackChannelId, isApproved } = params;
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
         *  TODO: slack channnel の id で行うように変更
         */
        const existsClubInRow = data?.map((rowData, rowIndex) => {
          return rowData.includes(slackChannelId) && rowIndex;
        });
        /**
         * @description
         *  existsClubInRow の各要素 exists が false 以外(clubId と id が一致するクラブが存在する)の場合
         *  sheet?.getRange(exists + 1, this.constants.SPREAD_SHEET.APPROVED_COLUMN_NUMBER).setValue(isApproved)
         *  が実行される
         *
         *  result
         *    [false, Range, false, false, ..., false] のようなデータになる
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
         */
        if (results?.every((result) => typeof result === "boolean")) return this.res.notFound;
        return this.res.created;
      }
      return this.res.internalServer;
    } catch (error) {
      console.error({ error });
      return this.res.internalServer;
    }
  }

  private createClubSheet(params: CreateClubSheetParams) {
    const { slackChannelId } = params;
    return this.res.created;
  }
}
