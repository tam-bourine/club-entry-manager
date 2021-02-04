import RegistInterface from "../../types/RegistInterface";
import Utils from "../../shared/Response";

export default class RegistController {
  constructor() {}

  util = new Utils();

  create(params: RegistInterface) {
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
        return this.util.makeSuccess({ status: 201, message: "201 Created" });
      }
    } catch (error) {
      console.error({ error });
      return this.util.makeError({ status: 500, message: "500 Internal Server Error" });
    }
  }
}
