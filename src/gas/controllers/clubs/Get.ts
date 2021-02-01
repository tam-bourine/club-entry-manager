import ResponseInterface from "../../types/ResponseInterface";
import Utils from "../../shared/Utils";

export default class Get {
  constructor() {}

  util = new Utils();

  read() {
    try {
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("部活動一覧");
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
    } catch (error) {
      console.error({ error });
      return this.util.makeError({ status: 500, message: "500 Internal Server Error" });
    }
  }
}
