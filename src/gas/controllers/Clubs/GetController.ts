import ResponseInterface from "../../types/ResponseInterface";
import Response from "../../shared/Response";
// import Constants from "../../shared/Constants";

export default class GetController {
  constructor() {}

  res = new Response();

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
        return this.res.makeSuccess({
          status: 200,
          message: "200 OK",
          clubs: clubs,
        });
      } else return this.util.makeError({ status: 500, message: "500 Internal Server Error" });
    } catch (error) {
      console.error({ error });
      return this.res.makeError({ status: 500, message: "500 Internal Server Error" });
    }
  }
}
