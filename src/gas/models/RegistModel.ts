import Response from "../shared/Response";
import RegistInterface from "../types/RegistInterface";

export default class RegistModel {
  private res = new Response();

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
        return this.res.success({ status: 201, message: "201 Created" });
      } else return this.res.error({ status: 500, message: "500 Internal Server Error" });
    } catch (error) {
      console.error({ error });
      return this.res.error({ status: 500, message: "500 Internal Server Error" });
    }
  }
}
