import Constants from "../../shared/Constants";
import Response from "../../shared/Response";
import ResponseInterface from "../../shared/types/ResponseInterface";
import GetView from "../../views/Clubs/GetView";

export default class GetModel {
  private res = new Response();

  private view = new GetView();

  private constants = new Constants();

  fetchClubs() {
    try {
      const sheetTabName = PropertiesService.getScriptProperties().getProperty("SHEET_TAB_NAME");
      if (!sheetTabName) {
        throw new Error("SHEET_TAB_NAMEが設定されていません");
      }

      const idArrayNumber = this.constants.SPREAD_SHEET.CLUBS.ID_COLUMN_NUMBER - 1;
      const slackChannelIdArrayNumber = this.constants.SPREAD_SHEET.CLUBS.SLACK_CHANNEL_ID_COLUMN_NUMBER - 1;
      const clubNameArrayNumber = this.constants.SPREAD_SHEET.CLUBS.CLUB_NAME_COLUMN_NUMBER - 1;

      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetTabName);
      const data = sheet?.getDataRange().getValues();
      const clubs: ResponseInterface["clubs"] = data
        ?.filter((_, index) => index !== 0)
        .map((values: Array<string>) => ({
          id: values[idArrayNumber],
          channelId: values[slackChannelIdArrayNumber],
          name: values[clubNameArrayNumber],
        }));
      return this.view.provide({ ...this.res.ok, clubs });
    } catch (error) {
      console.error({ error });
      return this.view.provide(this.res.internalServer);
    }
  }
}
