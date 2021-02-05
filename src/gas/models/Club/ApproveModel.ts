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
    const { is_approved } = params;

    if (is_approved) {
      this.updateApprovedClub(params);
    } else {
      this.deleteRejectedClub(params);
    }

    // @ts-ignore
    return this.view.provide(params);
  }

  private updateApprovedClub(params: ApproveInterface) {
    const { clubId } = params;
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
            /**
             * 列7 : 公認
             */
            sheet?.getRange(7, index).setValue("checked");
          }
        });
        return this.view.provide(this.res.created);
      } else return this.view.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }

  private deleteRejectedClub(params: ApproveInterface) {}
}
