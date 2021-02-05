import Response from "../../shared/Response";
import RegistInterface from "../../types/RegistInterface";
import RegistView from "../../views/Club/RegistView";

export default class RegistModel {
  private res = new Response();

  private regist = new RegistView();

  addClub(params: RegistInterface) {
    try {
      const sheetId = PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID");
      if (sheetId) {
        const sheet = SpreadsheetApp.openById(sheetId);
        const today = new Date();
        sheet.appendRow([
          params.clubId,
          params.clubName,
          params.captainName,
          params.collaboratorName1st,
          params.collaboratorName2nd,
          today,
          "",
          params.captainId,
          params.collaboratorId1st,
          params.collaboratorId2nd,
        ]);
        return this.regist.provide(this.res.created);
      } else return this.regist.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.regist.provide(this.res.internalServer);
    }
  }
}
