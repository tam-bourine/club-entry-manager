import Response from "../../shared/Response";
import ResponseInterface from "../../types/ResponseInterface";
import GetView from "../../views/Clubs/GetView";

export default class GetModel {
  private res = new Response();

  private get = new GetView();

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
        return this.get.provide({ ...this.res.ok, clubs });
      } else return this.get.provide(this.res.internalServer);
    } catch (error) {
      console.error({ error });
      return this.get.provide(this.res.internalServer);
    }
  }
}
