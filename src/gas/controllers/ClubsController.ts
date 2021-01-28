/* global ParameterInterface */
// eslint-disable-next-line no-unused-vars
class ClubsController {
  static get() {
    return [];
  }

  static approve(params: ParameterInterface) {
    let response: object;
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
      response = {
        status: 201,
        message: "201 Created",
        success: true,
      };
    } catch (error) {
      response = {
        status: 500,
        message: "500 Internal Server Error",
        success: false,
      };
    }
    return response;
  }
}
