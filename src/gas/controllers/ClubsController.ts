// eslint-disable-next-line no-unused-vars
class ClubsController {
  static get() {
    return [];
  }

  static approve(params: object) {
    const sheet = SpreadsheetApp.openById('129KSPJnEEE6do0mtV19gSr-IbfI8xDdDBjSmAhUrUN8');
    const today = new Date();
    sheet.appendRow([params.clubId, params.clubName, params.captainName, params.collaboratorName1st, params.collaboratorName2nd, today, '', params.captainId, params.collaboratorId1st, params.collaboratorId2nd]);
    return params;
  }
}
