import ResponseInterface from "../../types/ResponseInterface";
import Utils from "../../shared/Response";
// import Constants from "../../shared/Constants";

export default class GetController {
  constructor() {}

  util = new Utils();

  show() {
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      if (sheetTabName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
        const data = sheet?.getDataRange().getValues();
        const clubs: ResponseInterface["clubs"] = [];
        data?.map((value) => {
          clubs.push({
            id: value[0],
            name: value[1],
          });
        });
        return this.util.makeSuccess({
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
}
