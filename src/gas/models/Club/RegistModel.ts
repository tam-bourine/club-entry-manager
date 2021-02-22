import Response from "../../shared/Response";
import RegistInterface from "../../shared/types/RegistInterface";
import RegistView from "../../views/Club/RegistView";

export default class RegistModel {
  private res = new Response();

  private view = new RegistView();

  addClub(params: RegistInterface) {
    const { club, captain, members } = params;
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      if (sheetTabName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
        const today = new Date();
        /* 
        appendRow()用に配列形式に変更
        appendRow()の仕様: https://developers.google.com/apps-script/reference/spreadsheet/sheet#appendRow(Object)
        カラム定義: /docs/columns/clubs.json, /docs/columns/clubs.png
        */
        const record = [
          Utilities.getUuid(),
          club.name,
          club.description,
          club.budgetUse,
          club.kibelaUrl,
          today.toISOString(),
          false,
          "", // 承認者_SlackID
          "", // 承認者
          captain.slackId,
          captain.name,
        ];

        // メンバーの数だけ繰り返し
        members.forEach((member) => {
          record.push(member.slackId, member.name);
        });

        sheet?.appendRow(record);
        return this.view.provide(this.res.created);
      }
      return this.view.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }
}
