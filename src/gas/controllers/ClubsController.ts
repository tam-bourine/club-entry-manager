import { ResponseInterface } from "../types/ResponseInterface";
import { ParameterInterface } from "../types/ParameterInterface";
import { Util } from "../utils/Util";

export class ClubsController {
  static get() {
    return [];
  }

  static approve(params: ParameterInterface) {
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
        return new Util().makeSuccess({ status: 201, message: "201 Created" });
      }
    } catch (error) {
      console.log({ error });
      return new Util().makeError({ status: 500, message: "500 Internal Server Error" });
    }
  }
}
