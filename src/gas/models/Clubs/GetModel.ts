import Response from "../../shared/Response";
import ResponseInterface from "../../shared/types/ResponseInterface";
import GetView from "../../views/Clubs/GetView";

export default class GetModel {
  private res = new Response();

  private view = new GetView();

  fetchClubs() {
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      if (sheetTabName) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
        const data = sheet?.getDataRange().getValues();
        const clubs: ResponseInterface["clubs"] = data
          ?.filter((_, index) => index !== 0)
          .map((values: Array<string>) => ({
            id: values[5],
            name: values[1],
          }));
        return this.view.provide({ ...this.res.ok, clubs });
      }
      throw new Error("SHEET_TAB_NAMEが設定されていません");
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }
}
