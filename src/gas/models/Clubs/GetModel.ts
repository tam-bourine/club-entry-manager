import Response from "../../shared/Response";
import ResponseInterface from "../../types/ResponseInterface";

export default class GetModel {
  private res = new Response();

  fetchClubs() {
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
        return {
          status: 200,
          message: "200 OK",
          clubs: clubs,
        };
      } else return { status: 500, message: "500 Internal Server Error" };
    } catch (error) {
      console.error({ error });
      return { status: 500, message: "500 Internal Server Error" };
    }
  }
}
