import { ResponseInterface } from "../types/ResponseInterface";
import { ParameterInterface } from "../types/ParameterInterface";
import { Util } from "../utils/Util";

export class ClubsController {
  static get() {
    return [];
  }

  static approve(params: ParameterInterface) {
    let response: ResponseInterface;
    try {
      const sheetId: string = PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID");
      const sheet = SpreadsheetApp.openById(sheetId);
      const today: Date = new Date();
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
      response = new Util().makeSuccess({ status: 201, message: "201 Created" });
    } catch (error) {
      response = new Util().makeError({ status: 500, message: "500 Internal Server Error" });
      console.error({ response });
    }
    return response;
  }
}
