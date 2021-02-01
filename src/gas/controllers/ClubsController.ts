import ResponseInterface from "../types/ResponseInterface";
import ParameterInterface from "../types/ParameterInterface";
import Util from "../utils/Util";

export default class ClubsController {
  constructor() {}

  util = new Util();

  get() {
    try {
      const sheetId = PropertiesService.getScriptProperties().getProperty("SPREAD_SHEET_ID");
      if (sheetId) {
        const sheet = SpreadsheetApp.openById(sheetId).getSheetByName("部活動一覧");
        const data = sheet?.getRange(1, 1).getValues();
        const clubs: ResponseInterface["clubs"] = [];
        data?.map((value) => {
          clubs.push({
            id: value[0],
            name: value[1],
          });
        });
        return new Util().makeSuccess({
          status: 200,
          message: "200 OK",
          clubs: clubs,
        });
      }
    } catch (error) {
      console.error({ error });
      return this.util.makeError({ status: 500, message: "500 Internal Server Error" });
    }
  }

  approve(params: ParameterInterface) {
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
